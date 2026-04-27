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

toggleIcon.addEventListener("click", () => {
    togglePassword("login-password", toggleIcon);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = form[0].value.trim();
    const password = form[1].value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u =>
        u.username === username && u.password === password
    );

    if (!user) {
        alert("Invalid username or password");
        return;
    }

    alert(`Welcome back, ${user.username}`);

    window.location.href = "/index.html";
});