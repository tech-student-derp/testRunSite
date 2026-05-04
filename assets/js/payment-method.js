const summaryItemsEl = document.getElementById("summary-items");
const subtotalEl = document.getElementById("subtotal");
const serviceFeeEl = document.getElementById("service-fee");
const grandTotalEl = document.getElementById("grand-total");
const methodFieldsEl = document.getElementById("method-fields");
const paymentForm = document.getElementById("payment-form");
const formMessage = document.getElementById("form-message");
const placeOrderBtn = document.getElementById("place-order-btn");
const backBtn = document.getElementById("back-btn");

const serviceFee = 0;

function getCart() {
    try {
        const cart = JSON.parse(localStorage.getItem("cart"));
        return Array.isArray(cart) ? cart : [];
    } catch {
        return [];
    }
}

function parsePrice(price) {
    const amount = String(price || "").replace(/[^\d.]/g, "");
    return Number(amount) || 0;
}

function formatPeso(amount) {
    return `₱${amount.toLocaleString("en-PH")}`;
}

function getCartTotal(cart) {
    return cart.reduce((sum, item) => {
        const qty = Number(item.qty) || 1;
        return sum + parsePrice(item.price) * qty;
    }, 0);
}

function createSummaryItem(item) {
    const wrapper = document.createElement("div");
    wrapper.className = "summary-item";

    const img = document.createElement("img");
    img.src = item.img || "/assets/img/ico/WMSU logo.png";
    img.alt = item.name || "Cart item";

    const details = document.createElement("div");

    const name = document.createElement("h3");
    name.textContent = item.name || "Unnamed item";

    const meta = document.createElement("p");
    const qty = Number(item.qty) || 1;
    meta.textContent = `${item.size || "Size not set"} | Qty ${qty} | ${item.price || "₱0"}`;

    details.append(name, meta);
    wrapper.append(img, details);

    return wrapper;
}

function renderSummary() {
    const cart = getCart();
    summaryItemsEl.innerHTML = "";

    if (!cart.length) {
        const empty = document.createElement("p");
        empty.className = "empty-order";
        empty.textContent = "Your cart is empty. Add an item before choosing payment.";
        summaryItemsEl.appendChild(empty);
        placeOrderBtn.disabled = true;
    } else {
        cart.forEach(item => summaryItemsEl.appendChild(createSummaryItem(item)));
        placeOrderBtn.disabled = false;
    }

    const subtotal = getCartTotal(cart);
    const grandTotal = subtotal + serviceFee;

    subtotalEl.textContent = formatPeso(subtotal);
    serviceFeeEl.textContent = formatPeso(serviceFee);
    grandTotalEl.textContent = formatPeso(grandTotal);
}

function getSelectedMethod() {
    return document.querySelector("input[name='paymentMethod']:checked")?.value || "GCash";
}

function renderMethodFields() {
    const method = getSelectedMethod();
    methodFieldsEl.innerHTML = "";

    if (method === "GCash") {
        methodFieldsEl.innerHTML = `
            <label>
                GCash Number
                <input id="gcash-number" name="gcashNumber" type="tel" placeholder="09XXXXXXXXX" required>
            </label>
            <p class="method-note">GCash does not need a reference number before payment. The app generates a random reference after a successful transaction.</p>
        `;
        return;
    }

    if (method === "Card") {
        methodFieldsEl.innerHTML = `
            <label>
                Cardholder Name
                <input id="card-name" name="cardName" type="text" autocomplete="cc-name" required>
            </label>
            <div class="form-grid">
                <label>
                    Card Number
                    <input id="card-number" name="cardNumber" type="text" inputmode="numeric" autocomplete="cc-number" placeholder="1234 5678 9012 3456" required>
                </label>
                <label>
                    Expiry Date
                    <input id="card-expiry" name="cardExpiry" type="text" inputmode="numeric" autocomplete="cc-exp" placeholder="MM/YY" required>
                </label>
            </div>
        `;
        return;
    }

    const note = document.createElement("p");
    note.className = "empty-order";
    note.textContent = "No extra payment details needed. Please prepare the exact amount on pickup.";
    methodFieldsEl.appendChild(note);
}

function setMessage(message, isSuccess = false) {
    formMessage.textContent = message;
    formMessage.classList.toggle("success", isSuccess);
}

document.querySelectorAll("input[name='paymentMethod']").forEach(input => {
    input.addEventListener("change", () => {
        setMessage("");
        renderMethodFields();
    });
});

paymentForm.addEventListener("submit", event => {
    event.preventDefault();

    const cart = getCart();
    if (!cart.length) {
        setMessage("Your cart is empty. Please go back and add an item first.");
        return;
    }

    if (!paymentForm.checkValidity()) {
        paymentForm.reportValidity();
        setMessage("Please complete the required fields.");
        return;
    }

    const formData = new FormData(paymentForm);
    const transaction = {
        id: `TXN-${Date.now()}`,
        orderId: `ORD-${Date.now()}`,
        items: cart,
        customerName: formData.get("customerName"),
        customerPhone: formData.get("customerPhone"),
        customerNotes: formData.get("customerNotes"),
        paymentMethod: getSelectedMethod(),
        total: getCartTotal(cart) + serviceFee,
        status: "pending",
        createdAt: new Date().toISOString()
    };

    localStorage.setItem("pendingPurchase", JSON.stringify(transaction));
    localStorage.removeItem("purchaseOtpCode");
    const isGcash = transaction.paymentMethod === "GCash";
    setMessage(isGcash ? "Redirecting to the mock GCash payment page..." : "Payment details saved. Redirecting to verification...", true);

    window.setTimeout(() => {
        window.location.href = isGcash ? "/assets/html/mock-gcash.html" : "/assets/html/purchase-otp.html";
    }, 500);
});

backBtn.addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
        return;
    }

    window.location.href = "/assets/html/checkout.html";
});

window.addEventListener("storage", renderSummary);

renderSummary();
renderMethodFields();
