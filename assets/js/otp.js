let generatedCode = "";
let cooldown = 10;
let interval = null;

const input = document.getElementById("otp-input");
const verifyBtn = document.getElementById("verify-btn");
const resendBtn = document.getElementById("resend-btn");

const overlay = document.getElementById("otp-overlay");
const otpText = document.getElementById("otp-text");
const otpClose = document.getElementById("otp-close");

function showPopup(message) {
    otpText.innerText = message;
    overlay.classList.add("active");
}

function closePopup() {
    overlay.classList.remove("active");
}

otpClose.addEventListener("click", closePopup);

function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendCode() {
    generatedCode = generateCode();

    console.log("OTP:", generatedCode);

    showPopup(`Your OTP Code: ${generatedCode}`);

    startCooldown();
}

function startCooldown() {
    resendBtn.disabled = true;

    let time = cooldown;

    resendBtn.innerText = `Resend Code (${time})`;

    clearInterval(interval);

    interval = setInterval(() => {
        time--;

        resendBtn.innerText = `Resend Code (${time})`;

        if (time <= 0) {
            clearInterval(interval);
            resendBtn.disabled = false;
            resendBtn.innerText = "Resend Code";
        }
    }, 1000);
}

verifyBtn.addEventListener("click", () => {
    if (input.value.trim() === generatedCode) {

        showPopup("Verified successfully. Please login to continue.");

        setTimeout(() => {
            window.location.href = "/assets/html/login.html";
        }, 1000);

    } else {
        showPopup("Wrong code, try again");
    }
});

resendBtn.addEventListener("click", () => {
    sendCode();
});

sendCode();