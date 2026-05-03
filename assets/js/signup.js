const allowedDomains = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com", "icloud.com"];

const form = document.getElementById("signup-form");
const signupBtn = document.getElementById("signup-btn");
const signupMessage = document.getElementById("signup-message");
const checkbox = document.getElementById("agree-check");
const acceptBtn = document.getElementById("accept-btn");
const overlayTerms = document.getElementById("terms-overlay");

function getUsers() {
    try {
        const users = JSON.parse(localStorage.getItem("users"));
        return Array.isArray(users) ? users : [];
    } catch {
        return [];
    }
}

function isValidEmail(email) {
    const basicPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicPattern.test(email)) return false;

    const domain = email.split("@")[1].toLowerCase();
    return allowedDomains.includes(domain);
}

function isValidPhone(phone) {
    return /^09\d{9}$/.test(phone);
}

function setMessage(message, isSuccess = false) {
    signupMessage.textContent = message;
    signupMessage.classList.toggle("success", isSuccess);
}

function togglePassword(button) {
    const input = document.getElementById(button.dataset.target);
    const icon = button.querySelector("img");
    if (!input || !icon) return;

    const showPassword = input.type === "password";
    input.type = showPassword ? "text" : "password";
    icon.src = showPassword ? "/assets/img/ico/eye-open.png" : "/assets/img/ico/eye-close.png";
    button.setAttribute("aria-label", showPassword ? "Hide password" : "Show password");
}

document.querySelectorAll(".toggle-pass").forEach(button => {
    button.addEventListener("click", () => togglePassword(button));
});

checkbox.addEventListener("change", () => {
    acceptBtn.disabled = !checkbox.checked;
});

acceptBtn.addEventListener("click", () => {
    overlayTerms.classList.add("hidden");
    signupBtn.disabled = false;
});

form.addEventListener("submit", event => {
    event.preventDefault();
    setMessage("");

    if (!form.checkValidity()) {
        form.reportValidity();
        setMessage("Please complete all required fields.");
        return;
    }

    const formData = new FormData(form);
    const given = formData.get("given").trim();
    const middle = formData.get("middle").trim();
    const surname = formData.get("surname").trim();
    const username = formData.get("username").trim();
    const email = formData.get("email").trim();
    const phone = formData.get("phone").trim();
    const birthdate = formData.get("birthdate");
    const sex = formData.get("sex");
    const course = formData.get("course").trim().toUpperCase();
    const year = formData.get("year");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (username.length < 3) {
        setMessage("Username must be at least 3 characters.");
        return;
    }

    if (!isValidEmail(email)) {
        setMessage("Please use a valid email domain like Gmail, Outlook, Yahoo, Hotmail, or iCloud.");
        return;
    }

    if (!isValidPhone(phone)) {
        setMessage("Phone number must use the format 09XXXXXXXXX.");
        return;
    }

    if (password.length < 6) {
        setMessage("Password must be at least 6 characters.");
        return;
    }

    if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        return;
    }

    const users = getUsers();
    const userExists = users.some(user => {
        return user.username?.toLowerCase() === username.toLowerCase() || user.email?.toLowerCase() === email.toLowerCase();
    });

    if (userExists) {
        setMessage("Username or email already exists.");
        return;
    }

    const tempUser = {
        id: Date.now(),
        name: `${given} ${middle ? middle + "." : ""} ${surname}`.replace(/\s+/g, " ").trim(),
        given,
        middle,
        surname,
        username,
        email,
        phone,
        birthdate,
        sex,
        course,
        year,
        password,
        role: "user",
        verified: false
    };

    localStorage.setItem("tempUser", JSON.stringify(tempUser));
    setMessage("Account details saved. Redirecting to OTP...", true);

    window.setTimeout(() => {
        window.location.href = "/assets/html/otp.html";
    }, 450);
});
