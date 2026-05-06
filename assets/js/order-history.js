const ordersKey = "orders";
const statusKey = "lastTransactionStatus";

const historyList = document.getElementById("history-list");
const emptyHistory = document.getElementById("empty-history");
const statusFilter = document.getElementById("status-filter");
const completedCount = document.getElementById("completed-count");
const failedCount = document.getElementById("failed-count");
const totalSpent = document.getElementById("total-spent");
const progressSteps = ["pending", "delivery", "complete/failed"];

function getArray(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

function getObject(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value && typeof value === "object" ? value : null;
    } catch {
        return null;
    }
}

function formatPeso(amount) {
    return `₱${Number(amount || 0).toLocaleString("en-PH")}`;
}

function formatDate(value) {
    if (!value) return "No date";

    return new Intl.DateTimeFormat("en-PH", {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(new Date(value));
}

function getHistory() {
    const orders = getArray(ordersKey).map(order => ({
        ...order,
        status: order.status || "complete",
        transactionId: order.transactionId || order.id
    }));

    const pendingPurchase = getObject("pendingPurchase");
    if (pendingPurchase && !orders.some(order => order.transactionId === pendingPurchase.id)) {
        orders.push({
            ...pendingPurchase,
            status: pendingPurchase.status || "pending",
            transactionId: pendingPurchase.id
        });
    }

    const lastStatus = getObject(statusKey);
    const shouldIncludeLastStatus = lastStatus && (
        lastStatus.status === "failed" ||
        !orders.some(order => order.transactionId === lastStatus.id)
    );

    if (shouldIncludeLastStatus) {
        orders.push({
            ...lastStatus,
            transactionId: lastStatus.id
        });
    }

    return orders.sort((a, b) => {
        const aDate = new Date(a.completedAt || a.createdAt || 0);
        const bDate = new Date(b.completedAt || b.createdAt || 0);
        return bDate - aDate;
    });
}

function createItemRow(item) {
    const row = document.createElement("div");
    row.className = "item-row";

    const img = document.createElement("img");
    img.src = item.img || "/assets/img/ico/WMSU logo.png";
    img.alt = item.name || "Order item";

    const details = document.createElement("div");

    const name = document.createElement("strong");
    name.textContent = item.name || "Unnamed item";

    const meta = document.createElement("p");
    meta.className = "item-meta";
    meta.textContent = `${item.size || "Size not set"} | Qty ${Number(item.qty) || 1} | ${item.price || "₱0"}`;

    details.append(name, meta);
    row.append(img, details);
    return row;
}

function getProgressState(order, step) {
    if (step === "complete/failed") {
        return order.status === "failed" ? "failed" : order.status === "complete" ? "complete" : "";
    }

    if (order.status === "failed") {
        return step === "pending" ? "complete" : "";
    }

    if (step === "pending") return "complete";
    if (step === "delivery" && (order.status === "delivery" || order.status === "complete")) return "complete";
    return "";
}

function createProgressBreadcrumb(order) {
    const nav = document.createElement("nav");
    nav.className = "status-breadcrumb";
    nav.setAttribute("aria-label", "Purchase progress");

    progressSteps.forEach((step, index) => {
        const crumb = document.createElement("span");
        const state = getProgressState(order, step);
        crumb.className = `breadcrumb-step ${state}`.trim();
        crumb.textContent = step;
        nav.appendChild(crumb);

        if (index < progressSteps.length - 1) {
            const divider = document.createElement("span");
            divider.className = "breadcrumb-divider";
            divider.textContent = ">";
            nav.appendChild(divider);
        }
    });

    return nav;
}

function createHistoryItem(order) {
    const item = document.createElement("article");
    item.className = "history-item";

    const top = document.createElement("div");
    top.className = "history-top";

    const titleBox = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = order.orderId || order.id || "Transaction";

    const meta = document.createElement("p");
    meta.className = "history-meta";
    meta.textContent = formatDate(order.completedAt || order.createdAt);

    titleBox.append(title, meta);

    const status = document.createElement("span");
    status.className = `status-pill ${order.status}`;
    status.textContent = order.status;

    top.append(titleBox, status);

    const details = document.createElement("div");
    details.className = "history-details";
    details.innerHTML = `
        <span>Transaction: ${order.transactionId || order.id || "-"}</span>
        <span>Payment: ${order.paymentMethod || "-"}</span>
        <span>Customer: ${order.customerName || "-"}</span>
    `;

    const list = document.createElement("div");
    list.className = "item-list";
    const items = Array.isArray(order.items) ? order.items : [];

    if (items.length) {
        items.forEach(product => list.appendChild(createItemRow(product)));
    } else {
        const reason = document.createElement("p");
        reason.className = "history-meta";
        reason.textContent = order.reason || "No item details saved for this transaction.";
        list.appendChild(reason);
    }

    const total = document.createElement("div");
    total.className = "history-total";
    total.innerHTML = `<span>Total</span><strong>${formatPeso(order.total)}</strong>`;

    item.append(top, createProgressBreadcrumb(order), details, list, total);
    return item;
}

function renderSummary(history) {
    const completed = history.filter(order => order.status === "complete");
    const failed = history.filter(order => order.status === "failed");
    const spent = completed.reduce((sum, order) => sum + Number(order.total || 0), 0);

    completedCount.textContent = completed.length;
    failedCount.textContent = failed.length;
    totalSpent.textContent = formatPeso(spent);
}

function renderHistory() {
    const filter = statusFilter.value;
    const history = getHistory();
    const filtered = filter === "all" ? history : history.filter(order => order.status === filter);

    historyList.innerHTML = "";
    renderSummary(history);

    emptyHistory.hidden = filtered.length > 0;
    historyList.hidden = filtered.length === 0;

    filtered.forEach(order => {
        historyList.appendChild(createHistoryItem(order));
    });
}

statusFilter.addEventListener("change", renderHistory);
window.addEventListener("storage", renderHistory);

renderHistory();
