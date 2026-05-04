function getPendingPurchase() {
    try {
        const purchase = JSON.parse(localStorage.getItem("pendingPurchase"));
        return purchase && typeof purchase === "object" ? purchase : null;
    } catch {
        return null;
    }
}

function formatPeso(amount) {
    return `₱${(Number(amount) || 0).toLocaleString("en-PH")}`;
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
    window.location.href = "/assets/html/purchase-otp.html";
});
