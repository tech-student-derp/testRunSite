(function () {
    const STORAGE_KEY = "wmsuTheme";
    const DARK = "dark";
    const LIGHT = "light";

    function getSavedTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY) === DARK ? DARK : LIGHT;
        } catch {
            return LIGHT;
        }
    }

    function applyTheme(theme) {
        const isDark = theme === DARK;
        document.documentElement.dataset.theme = isDark ? DARK : LIGHT;
        document.documentElement.style.colorScheme = isDark ? DARK : LIGHT;
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            // The UI can still switch for the current page if storage is unavailable.
        }
    }

    function syncToggle(button, theme) {
        if (!button) return;
        const isDark = theme === DARK;
        button.setAttribute("aria-pressed", String(isDark));
        button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
        button.title = isDark ? "Switch to light mode" : "Switch to dark mode";
        button.textContent = isDark ? "Light Mode" : "Dark Mode";
    }

    function setTheme(theme) {
        applyTheme(theme);
        saveTheme(theme);
        syncToggle(document.getElementById("theme-toggle"), theme);
    }

    applyTheme(getSavedTheme());

    document.addEventListener("DOMContentLoaded", () => {
        const button = document.getElementById("theme-toggle");
        syncToggle(button, getSavedTheme());

        button?.addEventListener("click", () => {
            const current = document.documentElement.dataset.theme === DARK ? DARK : LIGHT;
            setTheme(current === DARK ? LIGHT : DARK);
        });
    });

    window.addEventListener("storage", event => {
        if (event.key === STORAGE_KEY) {
            const theme = event.newValue === DARK ? DARK : LIGHT;
            applyTheme(theme);
            syncToggle(document.getElementById("theme-toggle"), theme);
        }
    });
})();
