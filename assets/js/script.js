const cards = document.querySelectorAll(".product-card");

const productData = {
    "bs-shirt": { rating: 4.8, sold: 320, review: "actually bussin quality ngl", sizes: "S, M, L, XL" },
    "bs-shirt-2": { rating: 4.6, sold: 210, review: "clean design and comfy", sizes: "M, L, XL" },
    "bs-shirt-3": { rating: 4.7, sold: 180, review: "perfect for daily wear", sizes: "S, M, L" },
    "bs-it-3": { rating: 4.5, sold: 150, review: "simple but solid 🔥", sizes: "M, L, XL" },
    "act-ad-2": { rating: 4.9, sold: 410, review: "elite design fr", sizes: "S, M, L" },
    "act-ad": { rating: 4.4, sold: 95, review: "underrated piece ngl", sizes: "M, L" }
};

const preview = document.getElementById("hover-preview");

const sidebar = document.getElementById("product-sidebar");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("close-sidebar");

const menuBtn = document.getElementById("menu-btn");
const leftSidebar = document.getElementById("left-sidebar");
const closeLeft = document.getElementById("close-left");

const zoomWrapper = document.querySelector(".img-zoom-wrapper");
const lens = document.querySelector(".zoom-lens");
const zoomResult = document.querySelector(".zoom-result");

let hoverTimer;

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {

        hoverTimer = setTimeout(() => {

            const id = card.dataset.id;
            const data = productData[id];
            if (!data || !preview) return;

            const img = card.querySelector(".product-img");

            document.getElementById("preview-img").src = img.src;
            document.getElementById("preview-name").innerText =
                card.querySelector(".prod-name").innerText;

            document.getElementById("preview-rating").innerHTML =
                `⭐ <b>${data.rating} / 5</b>`;

            document.getElementById("preview-sold").innerHTML =
                `🔥 <b>${data.sold}+</b> sold`;

            document.getElementById("preview-price").innerHTML =
                `💰 <b>${card.querySelector(".price").innerText}</b>`;

            document.getElementById("preview-review").innerHTML =
                `💬 <i>"${data.review}"</i>`;

            document.getElementById("preview-sizes").innerHTML =
                `Sizes: <b>${data.sizes}</b>`;

            preview.classList.add("active");

        }, 500);
    });

    card.addEventListener("mouseleave", () => {
        clearTimeout(hoverTimer);
        preview?.classList.remove("active");
    });
});

function openSidebar(card, img, data) {

    if (!sidebar) return;

    document.getElementById("side-img").src = img.src;

    document.getElementById("side-name").innerText =
        card.querySelector(".prod-name").innerText;

    document.getElementById("side-rating").innerHTML =
        `⭐ ${data.rating} / 5`;

    document.getElementById("side-sold").innerHTML =
        `🔥 ${data.sold}+ sold`;

    document.getElementById("side-price").innerHTML =
        card.querySelector(".price").innerText;

    document.getElementById("side-sizes").innerHTML =
        `Sizes: ${data.sizes}`;

    document.getElementById("side-review").innerHTML =
        `"${data.review}"`;

    sidebar.classList.add("active");
    overlay?.classList.add("active");

    const zoomBg = document.querySelector(".zoom-result");
    if (zoomBg) {
        zoomBg.style.backgroundImage = `url(${img.src})`;
    }
}

cards.forEach(card => {
    const img = card.querySelector(".product-img");

    img.addEventListener("click", () => {
        const id = card.dataset.id;
        const data = productData[id];
        if (!data) return;

        openSidebar(card, img, data);
    });
});

function closeSidebar() {
    sidebar?.classList.remove("active");
    overlay?.classList.remove("active");
}

closeBtn?.addEventListener("click", closeSidebar);

function openLeft() {
    leftSidebar?.classList.add("active");
    overlay?.classList.add("active");
}

function closeLeftSidebar() {
    leftSidebar?.classList.remove("active");
    overlay?.classList.remove("active");
}

menuBtn?.addEventListener("click", openLeft);
closeLeft?.addEventListener("click", closeLeftSidebar);

overlay?.addEventListener("click", () => {
    closeSidebar();
    closeLeftSidebar();
});

if (zoomWrapper && lens && zoomResult) {

    zoomWrapper.addEventListener("mouseenter", () => {
        lens.style.display = "block";
        zoomResult.style.display = "block";
    });

    zoomWrapper.addEventListener("mouseleave", () => {
        lens.style.display = "none";
        zoomResult.style.display = "none";
    });

    zoomWrapper.addEventListener("mousemove", (e) => {

        const rect = zoomWrapper.getBoundingClientRect();

        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        const lensSize = 120;

        x = Math.max(lensSize / 2, Math.min(x, rect.width - lensSize / 2));
        y = Math.max(lensSize / 2, Math.min(y, rect.height - lensSize / 2));

        lens.style.left = `${x - lensSize / 2}px`;
        lens.style.top = `${y - lensSize / 2}px`;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        zoomResult.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
        zoomResult.style.backgroundSize = "250%";
    });
}

document.addEventListener("DOMContentLoaded", () => {

    const authArea = document.getElementById("auth-area");

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user) {

        authArea.innerHTML = `
            <span id="welcome-user">Welcome, ${user.username}</span>
        `;

    }

});

document.addEventListener("DOMContentLoaded", () => {

    const authArea = document.getElementById("auth-area");

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    function logout() {
        localStorage.removeItem("loggedInUser");
        location.reload();
    }

    if (user) {

        authArea.innerHTML = `
            <div class="user-block">
                <div>Welcome, ${user.username}</div>
                <button class="logout-btn" id="logout-btn">Log out</button>
            </div>
        `;

        document.getElementById("logout-btn").addEventListener("click", logout);

    }

});