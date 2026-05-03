const OTP_KEY = "purchaseOtpCode";
const STATUS_KEY = "lastTransactionStatus";
const COOLDOWN_SECONDS = 20;
const MAX_ATTEMPTS = 3;

const digits = Array.from(document.querySelectorAll(".otp-digit"));
const verifyBtn = document.getElementById("verify-purchase-btn");
const resendBtn = document.getElementById("resend-btn");
const failBtn = document.getElementById("fail-btn");
const message = document.getElementById("verify-message");
const overlay = document.getElementById("otp-overlay");
const mockCode = document.getElementById("mock-code");
const otpText = document.getElementById("otp-text");
const otpClose = document.getElementById("otp-close");

let generatedCode = "";
let attempts = 0;
let cooldownTimer = null;

function getPendingPurchase() {
    try {
        const transaction = JSON.parse(localStorage.getItem("pendingPurchase"));
        return transaction && typeof transaction === "object" ? transaction : null;
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

function formatPeso(amount) {
    return `₱${Number(amount || 0).toLocaleString("en-PH")}`;
}

function setMessage(text, isSuccess = false) {
    message.textContent = text;
    message.classList.toggle("success", isSuccess);
}

function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function showPopup(transaction) {
    otpText.textContent = `Use this mock code to verify ${transaction.id}.`;
    mockCode.textContent = generatedCode;
    overlay.classList.add("active");
}

function closePopup() {
    overlay.classList.remove("active");
    digits[0]?.focus();
}

function startCooldown() {
    let remaining = COOLDOWN_SECONDS;
    resendBtn.disabled = true;
    resendBtn.textContent = `Resend Code (${remaining})`;

    window.clearInterval(cooldownTimer);
    cooldownTimer = window.setInterval(() => {
        remaining -= 1;
        resendBtn.textContent = `Resend Code (${remaining})`;

        if (remaining <= 0) {
            window.clearInterval(cooldownTimer);
            resendBtn.disabled = false;
            resendBtn.textContent = "Resend Code";
        }
    }, 1000);
}

function sendCode() {
    const transaction = getPendingPurchase();
    if (!transaction) return;

    generatedCode = generateCode();
    localStorage.setItem(OTP_KEY, generatedCode);
    showPopup(transaction);
    setMessage("A new mock verification code was generated.", true);
    startCooldown();
}

function getEnteredCode() {
    return digits.map(input => input.value).join("");
}

function clearDigits() {
    digits.forEach(input => {
        input.value = "";
    });
    digits[0]?.focus();
}

function saveStatus(transaction, status, reason) {
    const result = {
        ...transaction,
        status,
        reason,
        completedAt: new Date().toISOString()
    };

    localStorage.setItem(STATUS_KEY, JSON.stringify(result));
    localStorage.removeItem(OTP_KEY);

    if (status === "complete") {
        const orders = getOrders();
        orders.push({
            ...transaction,
            id: transaction.orderId,
            transactionId: transaction.id,
            status: "complete"
        });
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.removeItem("cart");
    }

    localStorage.removeItem("pendingPurchase");
}

function goToStatus() {
    window.location.href = "/assets/html/transaction-status.html";
}

function failTransaction(reason) {
    const transaction = getPendingPurchase();
    if (!transaction) return;

    saveStatus(transaction, "failed", reason);
    goToStatus();
}

digits.forEach((input, index) => {
    input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "").slice(0, 1);

        if (input.value && digits[index + 1]) {
            digits[index + 1].focus();
        }
    });

    input.addEventListener("keydown", event => {
        if (event.key === "Backspace" && !input.value && digits[index - 1]) {
            digits[index - 1].focus();
        }
    });

    input.addEventListener("paste", event => {
        event.preventDefault();
        const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

        digits.forEach((digit, digitIndex) => {
            digit.value = pasted[digitIndex] || "";
        });

        const nextEmpty = digits.find(digit => !digit.value);
        (nextEmpty || digits[digits.length - 1])?.focus();
    });
});

verifyBtn.addEventListener("click", () => {
    const transaction = getPendingPurchase();
    if (!transaction) {
        setMessage("No pending transaction found.");
        return;
    }

    const enteredCode = getEnteredCode();
    if (enteredCode.length !== 6) {
        setMessage("Please enter the full 6-digit code.");
        return;
    }

    if (enteredCode !== generatedCode) {
        attempts += 1;
        clearDigits();

        if (attempts >= MAX_ATTEMPTS) {
            failTransaction("Too many wrong verification attempts.");
            return;
        }

        setMessage(`Wrong code. ${MAX_ATTEMPTS - attempts} attempt(s) left.`);
        return;
    }

    saveStatus(transaction, "complete", "Purchase OTP verified.");
    setMessage("Transaction verified. Redirecting...", true);
    verifyBtn.disabled = true;

    window.setTimeout(goToStatus, 700);
});

resendBtn.addEventListener("click", () => {
    attempts = 0;
    clearDigits();
    sendCode();
});

failBtn.addEventListener("click", () => {
    failTransaction("Transaction was manually marked as failed.");
});

otpClose.addEventListener("click", closePopup);

const transaction = getPendingPurchase();
if (!transaction) {
    setMessage("No pending transaction found. Please checkout again.");
    verifyBtn.disabled = true;
    resendBtn.disabled = true;
    failBtn.disabled = true;
} else {
    document.getElementById("txn-id").textContent = transaction.id;
    document.getElementById("txn-method").textContent = transaction.paymentMethod;
    document.getElementById("txn-total").textContent = formatPeso(transaction.total);

    generatedCode = localStorage.getItem(OTP_KEY) || "";
    if (!generatedCode) {
        sendCode();
    } else {
        showPopup(transaction);
        startCooldown();
    }
}
