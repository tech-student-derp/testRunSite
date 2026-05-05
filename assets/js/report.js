const reportProducts = {
    "bs-shirt": {
        name: "BSCS Shirt",
        img: "/assets/img/bs-shirt.png",
        merchant: "College of Computing Studies - BSCS Department"
    },
    "bs-shirt-2": {
        name: "BSIT Shirt",
        img: "/assets/img/bs-shirt-2.png",
        merchant: "College of Computing Studies - BSIT Department"
    },
    "bs-shirt-3": {
        name: "ACT AD Shirt",
        img: "/assets/img/bs-shirt-3.png",
        merchant: "College of Computing Studies - ACT AD Department"
    },
    "bs-it-3": {
        name: "BSIT Classic Shirt",
        img: "/assets/img/bs-it-3.jpg",
        merchant: "College of Computing Studies - BSIT Department"
    },
    "act-ad-2": {
        name: "ACT AD Premium Shirt",
        img: "/assets/img/act-ad-2.jpg",
        merchant: "College of Computing Studies - ACT AD Department"
    },
    "act-ad": {
        name: "BSCS Classic Shirt",
        img: "/assets/img/act-ad.jpg",
        merchant: "College of Computing Studies - BSCS Department"
    },
    "bscs-lanyard": {
        name: "BSCS Lanyard",
        img: "/assets/img/bscs-lanyard.png",
        merchant: "College of Computing Studies - BSCS Department"
    },
    "bsit-lanyard": {
        name: "BSIT Lanyard",
        img: "/assets/img/bsit-lanyard.png",
        merchant: "College of Computing Studies - BSIT Department"
    },
    "bsit-lanyard-2": {
        name: "BSIT Alternate Lanyard",
        img: "/assets/img/bsit-lanyard-2.png",
        merchant: "College of Computing Studies - BSIT Department"
    },
    "ccs-lanyard": {
        name: "CCS Lanyard",
        img: "/assets/img/ccs-lanyard.png",
        merchant: "College of Computing Studies"
    },
    "coe-jacket": {
        name: "COE Jacket",
        img: "/assets/img/coe-jacket.png",
        merchant: "College of Engineering"
    },
    "coe-yellow-jacket": {
        name: "COE Yellow Jacket",
        img: "/assets/img/coe-yellow-jacket.png",
        merchant: "College of Engineering"
    },
    "python-shirt": {
        name: "Python Shirt",
        img: "/assets/img/python-shirt.png",
        merchant: "College of Computing Studies - BSCS Department"
    }
};

try {
    const approvedProducts = JSON.parse(localStorage.getItem("approvedProducts")) || [];
    if (Array.isArray(approvedProducts)) {
        approvedProducts.forEach(item => {
            reportProducts[item.id] = {
                name: item.name || "Merchant Product",
                img: item.img || "/assets/img/bs-shirt.png",
                imageKey: item.imageKey || "",
                merchant: item.merchant || "Merchant"
            };
        });
    }
} catch {
    // Static report products are enough when stored merchant products are unavailable.
}

const params = new URLSearchParams(window.location.search);
const productId = params.get("product") || "bs-shirt";
const product = reportProducts[productId] || reportProducts["bs-shirt"];
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

function getStoredArray(key) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

document.title = `Report ${product.name} | WMSU Merch`;

const image = document.getElementById("report-product-image");
const backLink = document.getElementById("back-product");

if (image) {
    image.src = product.img;
    image.alt = product.name;
}

if (image && product.imageKey) {
    getMerchantImageUrl(product.imageKey)
        .then(url => {
            if (url) image.src = url;
        })
        .catch(() => {});
}

if (backLink) {
    backLink.href = `/assets/html/product-info.html?product=${encodeURIComponent(productId)}`;
}

const nameEl = document.getElementById("report-product-name");
const merchantEl = document.getElementById("report-merchant");
if (nameEl) nameEl.textContent = product.name;
if (merchantEl) merchantEl.textContent = `Merchant: ${product.merchant}`;

document.getElementById("report-form")?.addEventListener("submit", event => {
    event.preventDefault();

    const selectedIssues = Array.from(document.querySelectorAll('input[name="issue"]:checked')).map(input => input.value);
    const details = document.getElementById("report-details")?.value.trim() || "";
    const status = document.getElementById("report-status");

    if (!selectedIssues.length && !details) {
        if (status) status.textContent = "Please select at least one issue or add details before submitting.";
        return;
    }

    const reports = getStoredArray("productReports");
    let reporter = "Guest user";

    try {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser?.username) reporter = loggedInUser.username;
    } catch {
        reporter = "Guest user";
    }

    reports.unshift({
        id: `REPORT-${Date.now()}`,
        productId,
        productName: product.name,
        merchant: product.merchant,
        reporter,
        issues: selectedIssues,
        details,
        status: "pending",
        createdAt: new Date().toISOString()
    });

    localStorage.setItem("productReports", JSON.stringify(reports));
    event.target.reset();

    if (status) {
        status.textContent = "Report submitted. The admin review queue now has this product report.";
    }
});
