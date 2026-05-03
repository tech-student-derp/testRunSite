const STATUS_KEY = "lastTransactionStatus";

function getStatus() {
    try {
        const status = JSON.parse(localStorage.getItem(STATUS_KEY));
        return status && typeof status === "object" ? status : null;
    } catch {
        return null;
    }
}

function formatPeso(amount) {
    return `₱${Number(amount || 0).toLocaleString("en-PH")}`;
}

const status = getStatus();
const card = document.getElementById("status-card");
const icon = document.getElementById("status-icon");
const title = document.getElementById("status-title");
const message = document.getElementById("status-message");

if (!status) {
    card.classList.add("failed");
    icon.textContent = "!";
    title.textContent = "No Transaction Found";
    message.textContent = "There is no recent transaction status to display. Please go back to the store and checkout again.";
} else {
    const failed = status.status === "failed";

    card.classList.toggle("failed", failed);
    icon.textContent = failed ? "×" : "✓";
    title.textContent = failed ? "Transaction Failed" : "Transaction Complete";
    message.textContent = failed
        ? status.reason || "The transaction could not be verified."
        : "Your mock purchase was verified successfully. The order has been saved.";

    document.getElementById("order-id").textContent = status.orderId || status.id || "-";
    document.getElementById("transaction-id").textContent = status.id || "-";
    document.getElementById("payment-method").textContent = status.paymentMethod || "-";
    document.getElementById("total").textContent = formatPeso(status.total);
}
