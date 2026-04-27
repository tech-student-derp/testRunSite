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
const loginBtn = document.getElementById("login-btn");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    loginBtn.disabled = true;
    loginBtn.innerText = "Logging in...";

    setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        let user = users.find(u => u.username === username);

        if (!user) {
            const temp = JSON.parse(localStorage.getItem("tempUser"));
            if (temp && temp.username === username) {
                user = temp;
            }
        }

        if (!user) {
            alert("User not found");

            loginBtn.disabled = false;
            loginBtn.innerText = "Login";
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(user));

        alert(`Welcome back, ${user.username}`);

        window.location.href = "/index.html";

    }, 600);
});