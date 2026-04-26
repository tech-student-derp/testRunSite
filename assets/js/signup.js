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