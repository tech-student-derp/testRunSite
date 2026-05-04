document.querySelectorAll("[data-back-button]").forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();

        if (window.history.length > 1) {
            window.history.back();
            return;
        }

        const fallback = button.getAttribute("href") || button.dataset.fallback || "/index.html";
        window.location.href = fallback;
    });
});
