const form = document.getElementById("login-form");
const usernameInput = document.getElementById("login-username");
const passwordInput = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");
const loginMessage = document.getElementById("login-message");

const demoAccounts = {
    ADMIN: {
        password: "69420",
        role: "admin",
        redirect: "/assets/html/admin/admin-dashboard.html"
    },
    MERCHANT: {
        password: "12345",
        role: "merchant",
        redirect: "/assets/html/merchant/merchant-dashboard.html"
    }
};

function getUsers() {
    try {
        const users = JSON.parse(localStorage.getItem("users"));
        return Array.isArray(users) ? users : [];
    } catch {
        return [];
    }
}

function setMessage(message, isSuccess = false) {
    loginMessage.textContent = message;
    loginMessage.classList.toggle("success", isSuccess);
}

function setLoading(isLoading) {
    loginBtn.disabled = isLoading;
    loginBtn.textContent = isLoading ? "Logging in..." : "Login";
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

form.addEventListener("submit", event => {
    event.preventDefault();
    setMessage("");

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        setMessage("Please enter both username and password.");
        return;
    }

    setLoading(true);

    window.setTimeout(() => {
        const demo = demoAccounts[username.toUpperCase()];

        if (demo && demo.password === password) {
            localStorage.setItem("loggedInUser", JSON.stringify({
                username: username.toUpperCase(),
                role: demo.role
            }));

            setMessage("Login successful. Redirecting...", true);
            window.location.href = demo.redirect;
            return;
        }

        const user = getUsers().find(item => {
            return item.username?.toLowerCase() === username.toLowerCase() && item.password === password;
        });

        if (!user) {
            setMessage("Invalid username or password.");
            setLoading(false);
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify({
            ...user,
            role: user.role || "user"
        }));

        setMessage("Login successful. Redirecting...", true);
        window.location.href = "/index.html";
    }, 450);
});
