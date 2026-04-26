const cards = document.querySelectorAll(".product-card");
const preview = document.getElementById("hover-preview");

let hoverTimer;

const productData = {
    "bs-shirt": {
        rating: 4.8,
        sold: 320,
        review: "actually bussin quality ngl",
        sizes: "S, M, L, XL"
    },
    "bs-shirt-2": {
        rating: 4.6,
        sold: 210,
        review: "clean design and comfy",
        sizes: "M, L, XL"
    },
    "bs-shirt-3": {
        rating: 4.7,
        sold: 180,
        review: "perfect for daily wear",
        sizes: "S, M, L"
    },
    "bs-it-3": {
        rating: 4.5,
        sold: 150,
        review: "simple but solid 🔥",
        sizes: "M, L, XL"
    },
    "act-ad-2": {
        rating: 4.9,
        sold: 410,
        review: "elite design fr",
        sizes: "S, M, L"
    },
    "act-ad": {
        rating: 4.4,
        sold: 95,
        review: "underrated piece ngl",
        sizes: "M, L"
    }
};

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {

        hoverTimer = setTimeout(() => {

            const id = card.dataset.id;
            const data = productData[id];

            if (!data) return;

            const imgSrc = card.querySelector(".product-img").src;

            document.getElementById("preview-img").src = imgSrc;

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
        preview.classList.remove("active");
    });
});

const sidebar = document.getElementById("product-sidebar");
const closeBtn = document.getElementById("close-sidebar");

cards.forEach(card => {
    const img = card.querySelector(".product-img");

    img.addEventListener("click", () => {
        const id = card.dataset.id;
        const data = productData[id];

        if (!data) return;

        document.getElementById("side-img").src =
            img.src;

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
    });
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
});

window.addEventListener("click", (e) => {
    if (e.target === sidebar) {
        sidebar.classList.remove("active");
    }
});