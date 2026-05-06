function getPendingPurchase() {
    try {
        const purchase = JSON.parse(localStorage.getItem("pendingPurchase"));
        return purchase && typeof purchase === "object" ? purchase : null;
    } catch {
        return null;
    }
}

function getOrders() {
    try {
        const orders = JSON.parse(localStorage.getItem("orders"));
        return Array.isArray(orders) ? orders : [];
    } catch {
        return [];
    }
}

function getStoredArray(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

function updateApprovedProductSales(items) {
    const approvedProducts = getStoredArray("approvedProducts");
    if (!approvedProducts.length) return;

    let changed = false;
    items.forEach(item => {
        const product = approvedProducts.find(entry => entry.id === item.id);
        if (!product) return;

        const qty = Number(item.qty) || 1;
        if (Number.isFinite(Number(product.stock))) {
            product.stock = Math.max(0, Number(product.stock) - qty);
        }
        changed = true;
    });

    if (changed) {
        localStorage.setItem("approvedProducts", JSON.stringify(approvedProducts));
    }
}

function formatPeso(amount) {
    return `₱${(Number(amount) || 0).toLocaleString("en-PH")}`;
}

function completeGcashPurchase(purchase) {
    const completedPurchase = {
        ...purchase,
        status: "complete",
        reason: "Purchase OTP verified and mock GCash payment confirmed.",
        completedAt: new Date().toISOString()
    };

    const orders = getOrders();
    orders.push({
        ...purchase,
        id: purchase.orderId,
        transactionId: purchase.id,
        status: "complete",
        completedAt: completedPurchase.completedAt
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("lastTransactionStatus", JSON.stringify(completedPurchase));
    updateApprovedProductSales(Array.isArray(purchase.items) ? purchase.items : []);
    localStorage.removeItem("cart");
    localStorage.removeItem("pendingPurchase");
}

const purchase = getPendingPurchase();
const totalEl = document.getElementById("payment-total");
const referenceEl = document.getElementById("mock-reference");

if (totalEl && purchase) {
    totalEl.textContent = formatPeso(purchase.total);
}

if (referenceEl) {
    referenceEl.textContent = `GCASH-${Math.floor(100000000000 + Math.random() * 900000000000)}`;
}

document.getElementById("mock-paid-btn")?.addEventListener("click", () => {
    const latestPurchase = getPendingPurchase();

    if (latestPurchase) {
        completeGcashPurchase(latestPurchase);
    }

    window.location.href = "/assets/html/transaction-status.html";
});
