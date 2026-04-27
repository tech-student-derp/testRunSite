function togglePass(id, el) {
    const input = document.getElementById(id);

    if (input.type === "password") {
        input.type = "text";
        el.src = "/assets/img/ico/eye-open.png";
    } else {
        input.type = "password";
        el.src = "/assets/img/ico/eye-close.png";
    }
}

const allowedDomains = [
    "gmail.com",
    "outlook.com",
    "yahoo.com",
    "hotmail.com",
    "icloud.com"
];

function isValidEmail(email) {
    const basicPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicPattern.test(email)) return false;

    const domain = email.split("@")[1].toLowerCase();
    return allowedDomains.includes(domain);
}

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const given = form[0].value.trim();
    const middle = form[1].value.trim();
    const surname = form[2].value.trim();

    const username = form[3].value.trim();
    const email = form[4].value.trim();
    const phone = form[5].value.trim();
    const birthdate = form[6].value;
    const sex = form[7].value;
    const course = form[8].value.trim();
    const year = form[9].value;

    const password = form[10].value;
    const confirmPassword = form[11].value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Please enter a valid email (gmail, outlook, yahoo, etc).");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(user =>
        user.username === username || user.email === email
    );

    if (userExists) {
        alert("Username or email already exists.");
        return;
    }

    const tempUser = {
        id: Date.now(),
        name: `${given} ${middle ? middle + "." : ""} ${surname}`,
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
        password
    };

    localStorage.setItem("tempUser", JSON.stringify(tempUser));

    window.location.href = "/assets/html/otp.html";
});

const checkbox = document.getElementById("agree-check");
const acceptBtn = document.getElementById("accept-btn");
const overlayTerms = document.getElementById("terms-overlay");
const signupBtn = document.querySelector("form button");

signupBtn.disabled = true;

checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        acceptBtn.disabled = false;
        acceptBtn.classList.add("active");
    } else {
        acceptBtn.disabled = true;
        acceptBtn.classList.remove("active");
    }
});

acceptBtn.addEventListener("click", () => {
    overlayTerms.style.display = "none";
    signupBtn.disabled = false;
});