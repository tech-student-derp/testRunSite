const baseProducts = [
    { name: "BSCS Shirt", category: "CCS", price: 259, stock: 24 },
    { name: "BSIT Shirt", category: "CCS", price: 259, stock: 18 },
    { name: "ACT AD Shirt", category: "CCS", price: 259, stock: 15 },
    { name: "BSIT Classic Shirt", category: "CCS", price: 259, stock: 12 },
    { name: "ACT AD Premium Shirt", category: "CCS", price: 259, stock: 18 },
    { name: "BSCS Classic Shirt", category: "CCS", price: 259, stock: 9 },
    { name: "BSCS Lanyard", category: "CCS", price: 99, stock: 40 },
    { name: "BSIT Lanyard", category: "CCS", price: 99, stock: 36 },
    { name: "BSIT Alternate Lanyard", category: "CCS", price: 109, stock: 28 },
    { name: "CCS Lanyard", category: "CCS", price: 109, stock: 32 },
    { name: "Python Shirt", category: "CCS", price: 279, stock: 20 },
    { name: "COE Jacket", category: "COE", price: 499, stock: 14 },
    { name: "COE Yellow Jacket", category: "COE", price: 529, stock: 11 }
];

const MERCHANT_IMAGE_DB = "wmsuMerchImages";
const MERCHANT_IMAGE_STORE = "productImages";

function openMerchantImageDb() {
    return new Promise((resolve, reject) => {
        if (!("indexedDB" in window)) {
            reject(new Error("IndexedDB is unavailable."));
            return;
        }

        const request = indexedDB.open(MERCHANT_IMAGE_DB, 1);
        request.onupgradeneeded = () => {
            if (!request.result.objectStoreNames.contains(MERCHANT_IMAGE_STORE)) {
                request.result.createObjectStore(MERCHANT_IMAGE_STORE);
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function saveMerchantImage(key, file) {
    const db = await openMerchantImageDb();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(MERCHANT_IMAGE_STORE, "readwrite");
        tx.objectStore(MERCHANT_IMAGE_STORE).put(file, key);
        tx.oncomplete = () => {
            db.close();
            resolve(key);
        };
        tx.onerror = () => {
            db.close();
            reject(tx.error);
        };
    });
}

async function getMerchantImageUrl(key) {
    if (!key) return "";

    const db = await openMerchantImageDb();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(MERCHANT_IMAGE_STORE, "readonly");
        const request = tx.objectStore(MERCHANT_IMAGE_STORE).get(key);
        request.onsuccess = () => {
            db.close();
            resolve(request.result ? URL.createObjectURL(request.result) : "");
        };
        request.onerror = () => {
            db.close();
            reject(request.error);
        };
    });
}

async function hydrateProductImage(img, product) {
    if (!img || !product?.imageKey) return;

    try {
        const url = await getMerchantImageUrl(product.imageKey);
        if (url) img.src = url;
    } catch {
        // Keep the fallback image if the IndexedDB image cannot be loaded.
    }
}

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result));
        reader.addEventListener("error", () => reject(reader.error));
        reader.readAsDataURL(file);
    });
}

function getStoredArray(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

function getStoredObject(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value && typeof value === "object" ? value : null;
    } catch {
        return null;
    }
}

function formatPeso(amount) {
    return `₱${(Number(amount) || 0).toLocaleString("en-PH")}`;
}

function formatDate(value) {
    if (!value) return "Just now";
    return new Date(value).toLocaleString("en-PH", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function getOrders() {
    return getStoredArray("orders");
}

function getReports() {
    return getStoredArray("productReports");
}

function getMerchantProducts() {
    return getStoredArray("approvedProducts");
}

function getMerchantProductRequests() {
    return getStoredArray("merchantProductRequests");
}

function saveMerchantProductRequests(requests) {
    localStorage.setItem("merchantProductRequests", JSON.stringify(requests));
}

function saveApprovedProducts(products) {
    localStorage.setItem("approvedProducts", JSON.stringify(products));
}

function getMailThreads() {
    return getStoredArray("mailThreads");
}

function saveMailThreads(threads) {
    localStorage.setItem("mailThreads", JSON.stringify(threads));
}

function getAdminLogs() {
    return getStoredArray("adminLogs");
}

function saveAdminLogs(logs) {
    localStorage.setItem("adminLogs", JSON.stringify(logs));
}

function addAdminLog(type, action) {
    const logs = getAdminLogs();
    logs.unshift({
        id: `LOG-${Date.now()}`,
        type,
        action,
        createdAt: new Date().toISOString()
    });
    saveAdminLogs(logs.slice(0, 40));
}

function sendThread({ recipient, sender, subject, message, productId = "", reportId = "" }) {
    const threads = getMailThreads();
    threads.unshift({
        id: `MAIL-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        recipient,
        sender,
        subject,
        message,
        status: "pending",
        productId,
        reportId,
        replies: [],
        createdAt: new Date().toISOString()
    });
    saveMailThreads(threads);
}

function guardRoleAccess() {
    const path = window.location.pathname;
    const user = getStoredObject("loggedInUser");
    const isAdminPage = path.includes("/assets/html/admin/");
    const isMerchantPage = path.includes("/assets/html/merchant/");

    if (!isAdminPage && !isMerchantPage) return true;

    const expectedRole = isAdminPage ? "admin" : "merchant";
    if (user?.role === expectedRole) return true;

    const fallback = user?.role === "admin"
        ? "/assets/html/admin/admin-dashboard.html"
        : user?.role === "merchant"
            ? "/assets/html/merchant/merchant-dashboard.html"
            : "/assets/html/login.html";

    window.location.replace(fallback);
    return false;
}

function notifyMerchantProductReview(request, status) {
    const approved = status === "approved";
    const subject = approved ? "Product approved" : "Product rejected";
    const message = approved
        ? `${request.name} was approved and is now visible on the storefront.`
        : `${request.name} was rejected. ${request.adminNote || "Please review the listing details and submit again."}`;

    sendThread({
        recipient: "merchant",
        sender: "Admin",
        subject,
        message,
        productId: request.id
    });
}

function getAllProducts() {
    return [...baseProducts, ...getMerchantProducts()];
}

function getOrderItems(order) {
    return Array.isArray(order.items) ? order.items : [];
}

function getDepartmentTotals(orders) {
    const totals = { CCS: 0, COE: 0 };

    orders.forEach(order => {
        getOrderItems(order).forEach(item => {
            const name = String(item.name || "").toUpperCase();
            const qty = Number(item.qty) || 1;

            if (name.includes("COE")) {
                totals.COE += qty;
            } else {
                totals.CCS += qty;
            }
        });
    });

    return totals;
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function renderLogout() {
    document.querySelectorAll("#logout-btn").forEach(button => {
        button.addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            window.location.href = "/index.html";
        });
    });
}

function renderAdminDashboard() {
    const activityList = document.getElementById("admin-activity-list");
    if (!activityList) return;

    const orders = getOrders();
    const reports = getReports();
    const users = getStoredArray("users");
    const total = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);

    setText("admin-total-sales", formatPeso(total));
    setText("admin-order-count", String(orders.length));
    setText("admin-report-count", String(reports.length));
    setText("admin-user-count", String(users.length));

    activityList.innerHTML = "";
    if (!orders.length) {
        activityList.innerHTML = "<li>No completed purchase activity yet.</li>";
    } else {
        orders.slice(-6).reverse().forEach(order => {
            const itemNames = getOrderItems(order).map(item => `${item.name} x${item.qty || 1}`).join(", ");
            const li = document.createElement("li");
            li.textContent = `${order.customerName || "A student"} bought ${itemNames || "merch"} for ${formatPeso(order.total)}.`;
            activityList.appendChild(li);
        });
    }

    renderPieChart(orders);
    renderBarChart(orders);
    renderProductApprovals();
    renderAdminMail();
    renderAdminLogs();
    renderAdminUsers();
}

function renderProductApprovals() {
    const list = document.getElementById("admin-product-approval-list");
    if (!list) return;

    const requests = getMerchantProductRequests();
    const pending = requests.filter(request => request.status === "pending");
    list.innerHTML = "";

    if (!pending.length) {
        list.innerHTML = '<p class="panel-note">No pending merchant product approvals.</p>';
        return;
    }

    pending.forEach(request => {
        const row = document.createElement("div");
        row.className = "approval-row";
        row.innerHTML = `
            <img src="${request.img || "/assets/img/bs-shirt.png"}" alt="${request.name}">
            <div class="approval-main">
                <strong>${request.name}</strong>
                <p class="panel-note">${request.category} | ${request.productType || "Product"} | ${formatPeso(request.price)} | Stock ${request.stock}</p>
                <p class="panel-note">Sizes: ${request.sizes || "One size"} | Material: ${request.material || "Merchant listed"} | ${request.delivery || "Campus pickup"}</p>
                <p class="panel-note">SKU: ${request.sku || "No SKU"} | Mode: ${request.visibility || "public"} | Low stock alert: ${request.lowStockThreshold ?? "none"}</p>
                <p class="panel-note">${request.description || "No description provided."}</p>
                <p class="panel-note">Image: ${request.imageName || "Uploaded image"} | Tags: ${request.tags || "none"}</p>
                <p class="panel-note">Submitted by ${request.merchant || "Merchant"}.</p>
            </div>
            <div class="approval-actions">
                <textarea rows="2" placeholder="Admin message to merchant"></textarea>
                <button class="accept-btn" type="button">Accept</button>
                <button class="reject-btn" type="button">Reject</button>
            </div>
        `;

        hydrateProductImage(row.querySelector("img"), request);
        const note = row.querySelector("textarea");
        row.querySelector(".accept-btn").addEventListener("click", () => reviewProductRequest(request.id, "approved", note.value));
        row.querySelector(".reject-btn").addEventListener("click", () => reviewProductRequest(request.id, "rejected", note.value));
        list.appendChild(row);
    });
}

function reviewProductRequest(id, status, note) {
    const requests = getMerchantProductRequests();
    const request = requests.find(item => item.id === id);
    if (!request) return;

    request.status = status;
    request.adminNote = note || (status === "approved" ? "Approved for storefront display." : "Rejected. Please review the listing details.");
    request.reviewedAt = new Date().toISOString();
    saveMerchantProductRequests(requests);

    if (status === "approved") {
        const approved = getMerchantProducts();
        if (!approved.some(item => item.id === request.id)) {
            approved.unshift({
                ...request,
                sold: 0,
                rating: 4.5,
                reviews: 0,
                stockLabel: request.visibility === "preorder" ? "Preorder" : "In stock",
                sizes: request.sizes || "One size",
                material: request.material || "Merchant listed material",
                delivery: request.delivery || "Merchant pickup or campus delivery",
                description: request.description || "Merchant-added product approved by admin."
            });
            saveApprovedProducts(approved);
        }
    }

    notifyMerchantProductReview(request, status);
    addAdminLog(status === "approved" ? "APPROVE" : "REJECT", `${request.name} ${status} by admin.`);

    renderAdminDashboard();
    renderProductApprovals();
    renderMerchantProducts();
    renderMerchantMail();
}

function renderPieChart(orders) {
    const chart = document.getElementById("admin-pie-chart");
    const legend = document.getElementById("admin-pie-legend");
    if (!chart || !legend) return;

    const totals = getDepartmentTotals(orders);
    const values = [totals.CCS, totals.COE];
    const total = values.reduce((sum, value) => sum + value, 0) || 1;
    const ccs = values[0] / total * 100;

    chart.style.background = `conic-gradient(#c40000 0 ${ccs}%, #111 ${ccs}% 100%)`;

    legend.innerHTML = "";
    [
        ["#c40000", "CCS", totals.CCS],
        ["#111", "COE", totals.COE]
    ].forEach(([color, label, value]) => {
        const row = document.createElement("div");
        row.className = "legend-row";
        row.innerHTML = `<span><i class="legend-dot" style="background:${color}"></i>${label}</span><strong>${value}</strong><span>${Math.round(value / total * 100)}%</span>`;
        legend.appendChild(row);
    });

    if (!orders.length) {
        chart.style.background = "conic-gradient(#c40000 0 65%, #111 65% 100%)";
    }
}

function renderBarChart(orders) {
    const chart = document.getElementById("admin-bar-chart");
    if (!chart) return;

    const mockDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const counts = mockDays.map((day, index) => {
        const real = orders.filter((_, orderIndex) => orderIndex % mockDays.length === index).length;
        return real || [5, 8, 6, 10, 7][index];
    });
    const max = Math.max(...counts, 1);

    chart.innerHTML = "";
    mockDays.forEach((day, index) => {
        const row = document.createElement("div");
        row.className = "bar-row";
        row.innerHTML = `<span>${day}</span><div class="bar-track"><div class="bar-fill" style="width:${counts[index] / max * 100}%"></div></div><strong>${counts[index]}</strong>`;
        chart.appendChild(row);
    });
}

function renderAdminReports() {
    const reportList = document.getElementById("admin-report-list");
    if (!reportList) return;

    const reports = getReports();
    const resolvedCount = reports.filter(report => report.status === "resolved").length;

    setText("reports-total", String(reports.length));
    setText("reports-pending", String(reports.length - resolvedCount));
    setText("reports-resolved", String(resolvedCount));

    reportList.innerHTML = "";
    if (!reports.length) {
        reportList.innerHTML = '<p class="empty-report">No submitted product reports yet.</p>';
        return;
    }

    reports.forEach((report, index) => {
        const row = document.createElement("div");
        const status = report.status === "resolved" ? "resolved" : "pending";
        row.className = "report-row";
        row.innerHTML = `
            <span class="r-type">${(report.issues || ["Product report"])[0]}</span>
            <span class="r-target">${report.productName || "Unknown product"}</span>
            <span class="r-status ${status}">${status}</span>
            <button class="view-btn" type="button">View</button>
            <button class="resolve-btn ${status === "resolved" ? "disabled" : ""}" type="button">${status === "resolved" ? "Resolved" : "Resolve"}</button>
            <div class="report-details" hidden>
                <p>${report.details || "No extra details."}</p>
                <p>Merchant: ${report.merchant || "Unknown merchant"}</p>
                <p>${report.resolutionNote ? `Resolution: ${report.resolutionNote}` : "No resolution note yet."}</p>
            </div>
        `;

        row.querySelector(".view-btn").addEventListener("click", () => {
            row.querySelector(".report-details").hidden = !row.querySelector(".report-details").hidden;
        });

        row.querySelector(".resolve-btn").addEventListener("click", () => {
            if (reports[index].status === "resolved") return;
            const note = window.prompt("Resolution message for the customer/report queue:", "We reviewed the product report and took the needed moderation action.");
            reports[index].status = "resolved";
            reports[index].resolutionNote = note || "Reviewed by admin.";
            reports[index].resolvedAt = new Date().toISOString();
            localStorage.setItem("productReports", JSON.stringify(reports));
            sendThread({
                recipient: "merchant",
                sender: "Admin",
                subject: `Report reviewed: ${reports[index].productName || "Product"}`,
                message: reports[index].resolutionNote,
                productId: reports[index].productId,
                reportId: reports[index].id || ""
            });
            if (reports[index].reporter) {
                sendThread({
                    recipient: reports[index].reporter,
                    sender: "Admin",
                    subject: `Your report was reviewed`,
                    message: reports[index].resolutionNote,
                    productId: reports[index].productId,
                    reportId: reports[index].id || ""
                });
            }
            sendThread({
                recipient: "admin",
                sender: "System",
                subject: "Report resolved",
                message: `${reports[index].productName || "Product"} was marked resolved.`,
                productId: reports[index].productId,
                reportId: reports[index].id || ""
            });
            addAdminLog("RESOLVE", `Report resolved for ${reports[index].productName || "product"}.`);
            renderAdminReports();
        });

        reportList.appendChild(row);
    });
}

function renderAdminMail() {
    const list = document.getElementById("admin-mail-list");
    if (!list) return;

    const threads = getMailThreads().filter(thread => thread.recipient === "admin");
    list.innerHTML = "";

    if (!threads.length) {
        list.innerHTML = '<p class="panel-note">No user mail for admin yet.</p>';
        return;
    }

    threads.slice(0, 6).forEach(thread => {
        list.appendChild(createMailRow(thread, "admin"));
    });
}

function renderMerchantDashboard() {
    const activityList = document.getElementById("merchant-activity-list");
    const notifications = document.getElementById("merchant-notifications");
    if (!activityList || !notifications) return;

    const orders = getOrders();
    const products = getAllProducts();
    const requests = getMerchantProductRequests();
    const customers = new Set(orders.map(order => order.customerName || order.customerPhone || "Student"));
    const total = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);

    setText("merchant-total-revenue", formatPeso(total));
    setText("merchant-order-count", String(orders.length));
    setText("merchant-product-count", String(products.length));
    setText("merchant-customer-count", String(customers.size));

    activityList.innerHTML = "";
    notifications.innerHTML = "";

    if (!orders.length) {
        activityList.innerHTML = "<li>No purchase notifications yet.</li>";
        notifications.innerHTML = "";
    }

    requests.slice(0, 4).forEach(request => {
        const item = document.createElement("div");
        item.className = "notification-item";
        item.innerHTML = `<p><strong>${request.name}</strong><br>Product request ${request.status}. ${request.adminNote || "Waiting for admin review."}</p><time>${formatDate(request.reviewedAt || request.createdAt)}</time>`;
        notifications.appendChild(item);
    });

    if (!orders.length && !requests.length) {
        notifications.innerHTML = '<p class="panel-note">New purchases and product review updates will appear here.</p>';
        return;
    }

    orders.slice(-6).reverse().forEach(order => {
        const itemNames = getOrderItems(order).map(item => `${item.name} x${item.qty || 1}`).join(", ");
        const li = document.createElement("li");
        li.textContent = `New purchase: ${order.customerName || "Student"} bought ${itemNames || "merch"}.`;
        activityList.appendChild(li);

        const item = document.createElement("div");
        item.className = "notification-item";
        item.innerHTML = `<p><strong>Order ${order.id || order.orderId}</strong><br>${itemNames || "Merch order"} paid via ${order.paymentMethod || "payment method"}.</p><time>${formatDate(order.completedAt || order.createdAt)}</time>`;
        notifications.appendChild(item);
    });
}

function renderMerchantProducts() {
    const list = document.getElementById("merchant-product-list");
    const form = document.getElementById("merchant-add-product-form");
    const message = document.getElementById("merchant-product-message");
    const activity = document.getElementById("merchant-product-activity");
    if (!list || !form) return;

    function draw() {
        const requests = getMerchantProductRequests();
        const user = getStoredObject("loggedInUser");
        const merchantName = user?.username || "Merchant";
        const merchantRequests = requests.filter(product => {
            return !product.merchant || product.merchant === merchantName || merchantName === "MERCHANT";
        });
        const products = [...baseProducts, ...merchantRequests];
        list.innerHTML = "";

        products.forEach(product => {
            const row = document.createElement("div");
            row.className = "product-row";
            row.classList.add(`is-${product.status || "approved"}`);
            row.innerHTML = `
                <span class="p-name">${product.name}</span>
                <span class="p-seller">${product.category} | ${product.productType || "shirt"} | Stock: ${product.stock} | Sizes: ${product.sizes || "One size"} | <span class="status-chip ${product.status || "approved"}">${product.status || "approved"}</span></span>
                <span class="p-price">${formatPeso(product.price)}</span>
                <button class="flag-btn" type="button">Edit</button>
                <button class="delete-btn" type="button">Hide</button>
                <p class="product-extra">${product.description || "System product."} ${product.adminNote ? `Admin note: ${product.adminNote}` : ""}</p>
            `;
            row.querySelector(".flag-btn").addEventListener("click", () => {
                if (product.status === "pending") {
                    if (message) message.textContent = `${product.name} is still pending admin review.`;
                    return;
                }

                document.getElementById("new-product-name").value = `${product.name} Copy`;
                document.getElementById("new-product-price").value = Number(product.price) || "";
                document.getElementById("new-product-stock").value = Number(product.stock) || "";
                document.getElementById("new-product-description").value = product.description || "";
                if (message) message.textContent = `${product.name} loaded as a draft copy. Submit it as a new review request after editing.`;
            });
            row.querySelector(".delete-btn").addEventListener("click", () => {
                row.hidden = true;
                if (message) message.textContent = `${product.name} hidden from this control view.`;
            });
            list.appendChild(row);
        });
    }

    if (!form.dataset.bound) {
        form.dataset.bound = "true";
        form.addEventListener("submit", async event => {
            event.preventDefault();

            const requests = getMerchantProductRequests();
            const user = getStoredObject("loggedInUser");
            const imageInput = document.getElementById("new-product-image");
            const imageFile = imageInput.files?.[0];
            const productType = document.getElementById("new-product-type").value;
            const selectedSizes = Array.from(document.querySelectorAll('input[name="shirt-size"]:checked')).map(input => input.value);
            const allowedExtensions = [".jpg", ".jpeg", ".png", ".svg", ".webp"];
            const allowedTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/webp"];

            if (!imageFile) {
                if (message) message.textContent = "Please choose a product image before submitting.";
                return;
            }

            if (productType === "shirts" && !selectedSizes.length) {
                if (message) message.textContent = "Please select at least one available shirt size.";
                return;
            }

            const fileName = imageFile.name.toLowerCase();
            const hasAllowedExtension = allowedExtensions.some(extension => fileName.endsWith(extension));
            const hasAllowedType = !imageFile.type || allowedTypes.includes(imageFile.type);

            if (!hasAllowedExtension || !hasAllowedType) {
                if (message) message.textContent = "Invalid image file. Please use .jpg, .png, .svg, or .webp only.";
                imageInput.value = "";
                return;
            }

            const productId = `MERCH-${Date.now()}`;
            const product = {
                id: productId,
                name: document.getElementById("new-product-name").value.trim(),
                sku: document.getElementById("new-product-sku").value.trim(),
                price: Number(document.getElementById("new-product-price").value) || 0,
                stock: Number(document.getElementById("new-product-stock").value) || 0,
                lowStockThreshold: Number(document.getElementById("new-product-low-stock").value) || 0,
                category: document.getElementById("new-product-category").value,
                productType,
                sizes: productType === "shirts" ? selectedSizes.join(", ") : "One size",
                material: document.getElementById("new-product-material").value.trim() || "Merchant listed material",
                delivery: document.getElementById("new-product-delivery").value,
                visibility: document.getElementById("new-product-visibility").value,
                tags: document.getElementById("new-product-tags").value.trim(),
                description: document.getElementById("new-product-description").value.trim(),
                img: "",
                imageKey: `product-image-${productId}`,
                imageName: imageFile.name,
                merchant: user?.username || "Merchant",
                status: "pending",
                createdAt: new Date().toISOString()
            };

            try {
                await saveMerchantImage(product.imageKey, imageFile);
            } catch {
                product.img = await readFileAsDataUrl(imageFile);
                delete product.imageKey;
            }

            requests.unshift(product);
            saveMerchantProductRequests(requests);
            addAdminLog("CREATE", `${product.name} submitted by ${product.merchant}.`);
            form.reset();
            updateSizePanel();
            if (message) message.textContent = `${product.name} was submitted to admin for approval.`;
            if (activity) {
                const li = document.createElement("li");
                li.textContent = `${product.name} submitted for admin approval with ${product.imageName}.`;
                activity.prepend(li);
            }
            draw();
            renderMerchantDashboard();
        });
    }

    draw();
}

function updateSizePanel() {
    const typeSelect = document.getElementById("new-product-type");
    const sizePanel = document.getElementById("shirt-size-panel");
    if (!typeSelect || !sizePanel) return;

    const isShirt = typeSelect.value === "shirts";
    sizePanel.hidden = !isShirt;
    sizePanel.querySelectorAll("input").forEach(input => {
        if (!isShirt) input.checked = false;
    });
}

function createMailRow(thread, actor) {
    const row = document.createElement("div");
    row.className = actor === "admin" ? "mail-row" : "report-row";
    const latestReply = thread.replies?.at?.(-1);
    row.innerHTML = `
        <span class="r-type">${thread.subject || "Message"}</span>
        <span class="r-target">${thread.sender}: ${thread.message}</span>
        <span class="r-status ${thread.status === "replied" ? "resolved" : "pending"}">${thread.status || "pending"}</span>
        <button class="view-btn" type="button">View</button>
        <button class="resolve-btn" type="button">${thread.status === "replied" ? "Reply Again" : "Reply"}</button>
        <div class="mail-reply-box" hidden>
            <p class="panel-note">${latestReply ? `Last reply: ${latestReply.message}` : "No replies yet."}</p>
            <textarea rows="3" placeholder="Write a reply"></textarea>
            <button class="resolve-btn" type="button">Send Reply</button>
        </div>
    `;

    const box = row.querySelector(".mail-reply-box");
    row.querySelector(".view-btn").addEventListener("click", () => {
        box.hidden = !box.hidden;
    });
    row.querySelector(".resolve-btn").addEventListener("click", () => {
        box.hidden = false;
        box.querySelector("textarea").focus();
    });
    box.querySelector("button").addEventListener("click", () => {
        const text = box.querySelector("textarea").value.trim();
        if (!text) return;

        const threads = getMailThreads();
        const saved = threads.find(item => item.id === thread.id);
        if (!saved) return;

        saved.status = "replied";
        saved.replies = Array.isArray(saved.replies) ? saved.replies : [];
        saved.replies.push({
            from: actor,
            message: text,
            createdAt: new Date().toISOString()
        });
        saveMailThreads(threads);
        addAdminLog("UPDATE", `${actor} replied to ${saved.subject || "message"}.`);
        renderAdminMail();
        renderMerchantMail();
    });

    return row;
}

function renderMerchantMail() {
    const list = document.getElementById("merchant-mail-list");
    if (!list) return;

    const threads = getMailThreads().filter(thread => thread.recipient === "merchant");
    setText("merchant-inbox-count", String(threads.length));
    setText("merchant-unread-count", String(threads.filter(thread => thread.status !== "replied").length));
    setText("merchant-replied-count", String(threads.filter(thread => thread.status === "replied").length));
    list.innerHTML = "";

    if (!threads.length) {
        list.innerHTML = '<p class="panel-note">No merchant mail yet.</p>';
        return;
    }

    threads.forEach(thread => {
        list.appendChild(createMailRow(thread, "merchant"));
    });
}

function renderMerchantCustomers() {
    const list = document.getElementById("merchant-customer-list");
    if (!list) return;

    const orders = getOrders();
    const users = getStoredArray("users");
    const customerMap = new Map();

    users.forEach(user => {
        customerMap.set(user.username || user.email || user.id, {
            name: user.username || user.name || "Student",
            email: user.email || "No email",
            orders: 0,
            total: 0,
            lastItem: "No orders yet"
        });
    });

    orders.forEach(order => {
        const key = order.customerName || order.username || order.customerPhone || "Student";
        const existing = customerMap.get(key) || {
            name: key,
            email: order.customerEmail || order.customerPhone || "No contact saved",
            orders: 0,
            total: 0,
            lastItem: "Merch order"
        };
        existing.orders += 1;
        existing.total += Number(order.total) || 0;
        existing.lastItem = getOrderItems(order).map(item => item.name).filter(Boolean).join(", ") || existing.lastItem;
        customerMap.set(key, existing);
    });

    list.innerHTML = "";
    const customers = Array.from(customerMap.values()).slice(0, 10);

    if (!customers.length) {
        list.innerHTML = '<p class="panel-note">Registered users and buyers will appear here.</p>';
        return;
    }

    customers.forEach(customer => {
        const row = document.createElement("div");
        row.className = "product-row";
        row.innerHTML = `
            <span class="p-name">${customer.name}</span>
            <span class="p-seller">${customer.orders} orders | Last item: ${customer.lastItem}</span>
            <span class="p-price">${formatPeso(customer.total)}</span>
            <button class="flag-btn" type="button">Message</button>
            <button class="delete-btn" type="button">Flag</button>
        `;

        row.querySelector(".flag-btn").addEventListener("click", () => {
            sendThread({
                recipient: "admin",
                sender: "Merchant",
                subject: `Customer follow-up: ${customer.name}`,
                message: `Merchant wants to follow up with ${customer.name} about ${customer.lastItem}.`
            });
            row.querySelector(".flag-btn").textContent = "Queued";
        });

        row.querySelector(".delete-btn").addEventListener("click", () => {
            sendThread({
                recipient: "admin",
                sender: "Merchant",
                subject: `Customer flag: ${customer.name}`,
                message: `${customer.name} was flagged for merchant review.`
            });
            row.querySelector(".delete-btn").textContent = "Flagged";
        });

        list.appendChild(row);
    });
}

function renderAdminUsers() {
    const panel = document.querySelector(".user-panel");
    if (!panel || panel.dataset.dynamicBound) return;

    const storedUsers = getStoredArray("users");
    if (!storedUsers.length) {
        panel.dataset.dynamicBound = "true";
        return;
    }

    storedUsers.slice(0, 8).forEach(user => {
        const row = document.createElement("div");
        row.className = "user-row";
        row.innerHTML = `
            <span class="u-name">${user.username || user.name || "student"}</span>
            <span class="u-email">${user.email || "No email"}</span>
            <span class="u-role">${user.role || "user"} | ${user.verified ? "Verified" : "Unverified"}</span>
            <button class="warn-btn" type="button">Warn</button>
            <button class="ban-btn" type="button">Ban</button>
        `;
        panel.appendChild(row);
    });

    panel.dataset.dynamicBound = "true";
}

function renderAdminLogs() {
    const panel = document.querySelector(".log-panel");
    if (!panel) return;

    document.getElementById("dynamic-log-list")?.remove();

    const logs = getAdminLogs();
    const list = document.createElement("div");
    list.id = "dynamic-log-list";

    if (!logs.length) {
        list.innerHTML = '<p class="panel-note">No saved admin activity yet.</p>';
        panel.prepend(list);
        return;
    }

    logs.slice(0, 12).forEach(log => {
        const entry = document.createElement("div");
        const type = String(log.type || "INFO").toLowerCase();
        entry.className = "log-entry";
        entry.innerHTML = `
            <span class="log-time">${formatDate(log.createdAt)}</span>
            <span class="log-action">${log.action || "System activity"}</span>
            <span class="log-type ${type === "reject" || type === "delete" ? "danger" : type === "resolve" || type === "approve" ? "ok" : type === "warn" ? "warn" : "info"}">${log.type || "INFO"}</span>
        `;
        list.appendChild(entry);
    });

    panel.prepend(list);
}

function initContextButtons() {
    document.querySelectorAll(".product-panel .flag-btn").forEach(button => {
        if (button.dataset.bound) return;
        button.dataset.bound = "true";
        button.addEventListener("click", () => {
            button.textContent = button.textContent === "Edit" ? "Saved" : "Flagged";
        });
    });

    document.querySelectorAll(".product-panel .delete-btn").forEach(button => {
        if (button.dataset.bound) return;
        button.dataset.bound = "true";
        button.addEventListener("click", () => {
            button.closest(".product-row")?.remove();
        });
    });

    document.querySelectorAll(".report-panel .resolve-btn:not(.disabled)").forEach(button => {
        if (button.dataset.bound) return;
        button.dataset.bound = "true";
        button.addEventListener("click", () => {
            const row = button.closest(".report-row");
            row?.querySelector(".r-status")?.classList.remove("pending");
            row?.querySelector(".r-status")?.classList.add("resolved");
            if (row?.querySelector(".r-status")) row.querySelector(".r-status").textContent = "Resolved";
            button.textContent = "Done";
        });
    });

    document.querySelectorAll(".warn-btn").forEach(button => {
        if (button.dataset.bound) return;
        button.dataset.bound = "true";
        button.addEventListener("click", () => {
            const row = button.closest(".user-row");
            const username = row?.querySelector(".u-name")?.textContent || "user";
            button.textContent = "Warned";
            button.disabled = true;
            addAdminLog("WARN", `${username} was warned by admin.`);
        });
    });

    document.querySelectorAll(".ban-btn").forEach(button => {
        if (button.dataset.bound) return;
        button.dataset.bound = "true";
        button.addEventListener("click", () => {
            const row = button.closest(".user-row");
            const username = row?.querySelector(".u-name")?.textContent || "user";
            row?.classList.add("banned");
            button.textContent = "Banned";
            button.disabled = true;
            addAdminLog("DELETE", `${username} was banned by admin.`);
        });
    });
}

renderLogout();
guardRoleAccess();
renderAdminDashboard();
renderProductApprovals();
renderAdminReports();
renderMerchantDashboard();
renderMerchantProducts();
renderMerchantMail();
renderMerchantCustomers();
renderAdminUsers();
renderAdminLogs();
initContextButtons();

document.getElementById("new-product-type")?.addEventListener("change", updateSizePanel);
updateSizePanel();

window.addEventListener("storage", () => {
    renderAdminDashboard();
    renderProductApprovals();
    renderAdminReports();
    renderMerchantDashboard();
    renderMerchantProducts();
    renderMerchantMail();
    renderMerchantCustomers();
    renderAdminUsers();
    renderAdminLogs();
    initContextButtons();
});
