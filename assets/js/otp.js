const CODE_KEY = "mockOtpCode";
const COOLDOWN_SECONDS = 20;

const digits = Array.from(document.querySelectorAll(".otp-digit"));
const verifyBtn = document.getElementById("verify-btn");
const resendBtn = document.getElementById("resend-btn");
const message = document.getElementById("msg");
const emailTarget = document.getElementById("email-target");
const overlay = document.getElementById("otp-overlay");
const otpText = document.getElementById("otp-text");
const mockCode = document.getElementById("mock-code");
const otpClose = document.getElementById("otp-close");

let generatedCode = "";
let cooldownTimer = null;

function getTempUser() {
    try {
        const user = JSON.parse(localStorage.getItem("tempUser"));
        return user && typeof user === "object" ? user : null;
    } catch {
        return null;
    }
}

function getUsers() {
    try {
        const users = JSON.parse(localStorage.getItem("users"));
        return Array.isArray(users) ? users : [];
    } catch {
        return [];
    }
}

function setMessage(text, isSuccess = false) {
    message.textContent = text;
    message.classList.toggle("success", isSuccess);
}

function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function showPopup(code, email) {
    otpText.textContent = `Mock code generated for ${email || "your email"}.`;
    mockCode.textContent = code;
    overlay.classList.add("active");
}

function closePopup() {
    overlay.classList.remove("active");
    digits[0]?.focus();
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
    const tempUser = getTempUser();
    generatedCode = generateCode();
    localStorage.setItem(CODE_KEY, generatedCode);

    showPopup(generatedCode, tempUser?.email);
    setMessage("A new mock code was generated.", true);
    startCooldown();
}

function completeSignup() {
    const tempUser = getTempUser();
    if (!tempUser) {
        setMessage("No pending signup found. Please create an account again.");
        return false;
    }

    const users = getUsers();
    const alreadySaved = users.some(user => {
        return user.username?.toLowerCase() === tempUser.username?.toLowerCase() || user.email?.toLowerCase() === tempUser.email?.toLowerCase();
    });

    if (!alreadySaved) {
        users.push({
            ...tempUser,
            verified: true
        });
        localStorage.setItem("users", JSON.stringify(users));
    }

    localStorage.removeItem("tempUser");
    localStorage.removeItem(CODE_KEY);
    return true;
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
    const enteredCode = getEnteredCode();

    if (enteredCode.length !== 6) {
        setMessage("Please enter the full 6-digit code.");
        return;
    }

    if (enteredCode !== generatedCode) {
        setMessage("Wrong code. Please check the popup code and try again.");
        clearDigits();
        return;
    }

    if (!completeSignup()) return;

    setMessage("Verified successfully. Redirecting to login...", true);
    verifyBtn.disabled = true;

    window.setTimeout(() => {
        window.location.href = "/assets/html/login.html";
    }, 900);
});

resendBtn.addEventListener("click", () => {
    clearDigits();
    sendCode();
});

otpClose.addEventListener("click", closePopup);

const tempUser = getTempUser();
if (!tempUser) {
    emailTarget.textContent = "No pending signup found.";
    setMessage("Please sign up first before verifying an account.");
    verifyBtn.disabled = true;
    resendBtn.disabled = true;
} else {
    emailTarget.textContent = tempUser.email;
    generatedCode = localStorage.getItem(CODE_KEY) || "";

    if (!generatedCode) {
        sendCode();
    } else {
        showPopup(generatedCode, tempUser.email);
        startCooldown();
    }
}
