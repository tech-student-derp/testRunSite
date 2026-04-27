function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);

    if (input.type === "password") {
        input.type = "text";
        icon.src = "/assets/img/ico/eye-open.png";
    } else {
        input.type = "password";
        icon.src = "/assets/img/ico/eye-close.png";
    }
}

const toggleIcon = document.getElementById("toggle-pass");
const form = document.querySelector("form");
const loginBtn = form.querySelector("button[type='submit']");

toggleIcon.addEventListener("click", () => {
    togglePassword("login-password", toggleIcon);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = form[0].value.trim();
    const password = form[1].value;

    loginBtn.disabled = true;
    loginBtn.innerText = "Logging in...";

    setTimeout(() => {

        if (username === "ADMIN" && password === "69420") {
            localStorage.setItem("loggedInUser", JSON.stringify({
                username: "ADMIN",
                role: "admin"
            }));

            window.location.href = "/assets/html/admin/admin-dashboard.html";
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u =>
            u.username === username && u.password === password
        );

        if (!user) {
            alert("Invalid username or password");

            loginBtn.disabled = false;
            loginBtn.innerText = "Login";
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify({
            ...user,
            role: "user"
        }));

        window.location.href = "/index.html";

    }, 600);
});