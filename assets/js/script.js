const productData = {
    "bs-shirt": {
        rating: 4.8,
        sold: 320,
        reviews: 86,
        stock: "In stock",
        delivery: "Pickup or campus delivery",
        material: "Cotton blend",
        badge: "Best Seller",
        review: "Soft fabric, clean print, and easy to wear on regular class days.",
        sizes: "S, M, L, XL"
    },
    "bs-shirt-2": {
        rating: 4.6,
        sold: 210,
        reviews: 54,
        stock: "Limited sizes",
        delivery: "Pickup available",
        material: "Breathable cotton",
        badge: "Student Pick",
        review: "A simple CCS staple with a comfortable everyday fit.",
        sizes: "M, L, XL"
    },
    "bs-shirt-3": {
        rating: 4.7,
        sold: 180,
        reviews: 49,
        stock: "In stock",
        delivery: "Campus delivery",
        material: "Soft jersey",
        badge: "New Drop",
        review: "Good print contrast and a solid choice for organization events.",
        sizes: "S, M, L"
    },
    "bs-it-3": {
        rating: 4.5,
        sold: 150,
        reviews: 38,
        stock: "Preorder",
        delivery: "Ships after preorder cutoff",
        material: "Cotton jersey",
        badge: "Classic",
        review: "Classic layout, durable print, and works well for casual use.",
        sizes: "M, L, XL"
    },
    "act-ad-2": {
        rating: 4.9,
        sold: 410,
        reviews: 112,
        stock: "In stock",
        delivery: "Fast campus pickup",
        material: "Premium cotton blend",
        badge: "Top Rated",
        review: "Popular pick because the design is bold without feeling too busy.",
        sizes: "S, M, L"
    },
    "act-ad": {
        rating: 4.4,
        sold: 95,
        reviews: 27,
        stock: "Few left",
        delivery: "Pickup available",
        material: "Cotton blend",
        badge: "Value Pick",
        review: "Clean student-project merch with a straightforward campus look.",
        sizes: "M, L"
    }
};

const cards = Array.from(document.querySelectorAll(".product-card"));
const overlay = document.getElementById("overlay");
const sidebar = document.getElementById("product-sidebar");
const closeBtn = document.getElementById("close-sidebar");
const sidePreorderBtn = document.getElementById("side-preorder-btn");
const menuBtn = document.getElementById("menu-btn");
const leftSidebar = document.getElementById("left-sidebar");
const closeLeft = document.getElementById("close-left");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-products");
const emptyProducts = document.getElementById("empty-products");
const cartCount = document.getElementById("cart-count");
const zoomWrapper = document.querySelector(".img-zoom-wrapper");
const lens = document.querySelector(".zoom-lens");
const zoomResult = document.querySelector(".zoom-result");
const heroSlider = document.getElementById("hero-slider");
const heroSlideTitle = document.getElementById("hero-slide-title");
const heroDots = document.getElementById("hero-dots");

let activeCategory = "all";
let activeProductId = "";
let activeHeroSlide = 0;
let heroTimer = null;

function getStoredArray(key) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

function getStoredObject(key) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        return data && typeof data === "object" ? data : null;
    } catch {
        return null;
    }
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    if (!cartCount) return;

    const totalQty = getStoredArray("cart").reduce((sum, item) => {
        return sum + (Number(item.qty) || 1);
    }, 0);

    cartCount.textContent = totalQty;
}

function getCardProduct(card) {
    const id = card.dataset.id;
    const data = productData[id] || {};

    return {
        id,
        img: card.querySelector(".product-img")?.src || "",
        name: card.querySelector(".prod-name")?.textContent.trim() || "Unnamed item",
        price: card.querySelector(".price")?.textContent.trim() || "₱0",
        category: card.querySelector(".product-tag")?.textContent.trim() || "Merch",
        rating: data.rating || Number(card.dataset.rating) || 0,
        sold: data.sold || Number(card.dataset.sold) || 0,
        reviews: data.reviews || 0,
        stock: data.stock || "Preorder",
        delivery: data.delivery || "Pickup available",
        material: data.material || "Cotton blend",
        badge: data.badge || "CCS Merch",
        review: data.review || "No review highlight yet.",
        sizes: data.sizes || "S, M, L"
    };
}

function createStars(rating) {
    const stars = document.createElement("span");
    stars.className = "rating-stars";
    stars.style.setProperty("--rating-percent", `${Math.max(0, Math.min(rating, 5)) / 5 * 100}%`);
    stars.setAttribute("aria-label", `${rating} out of 5 stars`);
    return stars;
}

function renderProductInfo() {
    cards.forEach(card => {
        const product = getCardProduct(card);
        const productInfo = card.querySelector(".product-info");
        if (!productInfo || productInfo.querySelector(".product-meta")) return;

        const badge = document.createElement("span");
        badge.className = "product-badge";
        badge.textContent = product.badge;

        const ratingRow = document.createElement("div");
        ratingRow.className = "rating-row";
        ratingRow.appendChild(createStars(product.rating));

        const ratingText = document.createElement("span");
        ratingText.textContent = `${product.rating} (${product.reviews})`;
        ratingRow.appendChild(ratingText);

        const productMeta = document.createElement("div");
        productMeta.className = "product-meta";

        const sold = document.createElement("span");
        sold.textContent = `${product.sold}+ sold`;

        const stock = document.createElement("span");
        stock.textContent = product.stock;

        const sizes = document.createElement("span");
        sizes.textContent = `Sizes: ${product.sizes}`;

        productMeta.append(sold, stock, sizes);

        const delivery = document.createElement("p");
        delivery.className = "delivery-note";
        delivery.textContent = product.delivery;

        productInfo.prepend(badge);
        productInfo.append(ratingRow, productMeta, delivery);
    });
}

function addToCart(card) {
    const product = getCardProduct(card);
    const cart = getStoredArray("cart");
    const existing = cart.find(item => item.id === product.id && item.size === "M");

    if (existing) {
        existing.qty = (Number(existing.qty) || 1) + 1;
    } else {
        cart.push({
            id: product.id,
            img: product.img,
            name: product.name,
            price: product.price,
            size: "M",
            qty: 1
        });
    }

    saveCart(cart);
    window.location.href = "/assets/html/checkout.html";
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function openProductDetails(card) {
    const product = getCardProduct(card);
    activeProductId = product.id;

    const sideImg = document.getElementById("side-img");
    if (sideImg) {
        sideImg.src = product.img;
        sideImg.alt = product.name;
    }

    setText("side-category", product.category);
    setText("side-name", product.name);
    setText("side-rating", `Rating: ${product.rating} / 5`);
    setText("side-sold", `Sold: ${product.sold}+ | Reviews: ${product.reviews}`);
    setText("side-price", `Price: ${product.price}`);
    setText("side-sizes", `Sizes: ${product.sizes}`);
    setText("side-stock", `Status: ${product.stock}`);
    setText("side-delivery", `Delivery: ${product.delivery}`);
    setText("side-material", `Material: ${product.material}`);
    setText("side-review", `"${product.review}"`);

    if (zoomResult) {
        zoomResult.style.backgroundImage = `url("${product.img}")`;
    }

    sidebar?.classList.add("active");
    sidebar?.setAttribute("aria-hidden", "false");
    overlay?.classList.add("active");
}

function closeProductDetails() {
    sidebar?.classList.remove("active");
    sidebar?.setAttribute("aria-hidden", "true");
    overlay?.classList.remove("active");
}

function openLeftMenu() {
    leftSidebar?.classList.add("active");
    leftSidebar?.setAttribute("aria-hidden", "false");
    overlay?.classList.add("active");
}

function closeLeftMenu() {
    leftSidebar?.classList.remove("active");
    leftSidebar?.setAttribute("aria-hidden", "true");
    overlay?.classList.remove("active");
}

function closeAllPanels() {
    closeProductDetails();
    closeLeftMenu();
}

function renderAuthArea() {
    const authArea = document.getElementById("auth-area");
    if (!authArea) return;

    const user = getStoredObject("loggedInUser");
    if (!user) return;

    authArea.innerHTML = "";

    const block = document.createElement("div");
    block.className = "user-block";

    const welcome = document.createElement("span");
    welcome.textContent = `Welcome, ${user.username || "Student"}`;

    const logout = document.createElement("button");
    logout.className = "logout-btn";
    logout.type = "button";
    logout.textContent = "Log out";
    logout.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.reload();
    });

    block.append(welcome, logout);
    authArea.appendChild(block);
}

function applyProductFilters() {
    const query = searchInput?.value.trim().toLowerCase() || "";
    let visibleCount = 0;

    cards.forEach(card => {
        const product = getCardProduct(card);
        const searchable = `${product.name} ${product.category} ${product.badge}`.toLowerCase();
        const matchesSearch = searchable.includes(query);
        const matchesCategory = activeCategory === "all" || card.dataset.category === activeCategory;
        const shouldShow = matchesSearch && matchesCategory;

        card.hidden = !shouldShow;
        if (shouldShow) visibleCount += 1;
    });

    if (emptyProducts) {
        emptyProducts.hidden = visibleCount > 0;
    }
}

function sortProducts() {
    const grid = document.getElementById("product-grid");
    if (!grid || !sortSelect) return;

    const sortedCards = [...cards];

    sortedCards.sort((a, b) => {
        const mode = sortSelect.value;
        const aPrice = Number(a.dataset.price) || 0;
        const bPrice = Number(b.dataset.price) || 0;
        const aSold = Number(a.dataset.sold) || 0;
        const bSold = Number(b.dataset.sold) || 0;
        const aRating = Number(a.dataset.rating) || 0;
        const bRating = Number(b.dataset.rating) || 0;

        if (mode === "popular") return bSold - aSold;
        if (mode === "rating") return bRating - aRating;
        if (mode === "low-high") return aPrice - bPrice;
        if (mode === "high-low") return bPrice - aPrice;
        return cards.indexOf(a) - cards.indexOf(b);
    });

    sortedCards.forEach(card => grid.appendChild(card));
    applyProductFilters();
}

function initHeroSlideshow() {
    const slides = Array.from(document.querySelectorAll(".slide-card"));
    if (!slides.length || !heroDots) return;

    function getSlideName(slide) {
        return slide.querySelector("img")?.alt || "Featured Product";
    }

    function setHeroSlide(index) {
        activeHeroSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            const offset = (slideIndex - activeHeroSlide + slides.length) % slides.length;
            slide.classList.remove("active", "next", "back", "hidden-slide");

            if (offset === 0) {
                slide.classList.add("active");
            } else if (offset === 1) {
                slide.classList.add("next");
            } else if (offset === 2) {
                slide.classList.add("back");
            } else {
                slide.classList.add("hidden-slide");
            }
        });

        Array.from(heroDots.children).forEach((dot, dotIndex) => {
            dot.classList.toggle("active", dotIndex === activeHeroSlide);
        });

        if (heroSlideTitle) {
            heroSlideTitle.textContent = getSlideName(slides[activeHeroSlide]);
        }
    }

    function restartHeroTimer() {
        window.clearInterval(heroTimer);
        heroTimer = window.setInterval(() => {
            setHeroSlide(activeHeroSlide + 1);
        }, 2800);
    }

    slides.forEach((slide, index) => {
        const dot = document.createElement("button");
        dot.className = "hero-dot";
        dot.type = "button";
        dot.setAttribute("aria-label", `Show featured product ${index + 1}`);
        dot.addEventListener("click", () => {
            setHeroSlide(index);
            restartHeroTimer();
        });
        heroDots.appendChild(dot);

        slide.addEventListener("click", () => {
            setHeroSlide(index);
            restartHeroTimer();
        });
    });

    heroSlider?.addEventListener("mouseenter", () => window.clearInterval(heroTimer));
    heroSlider?.addEventListener("mouseleave", restartHeroTimer);
    heroSlider?.addEventListener("focusin", () => window.clearInterval(heroTimer));
    heroSlider?.addEventListener("focusout", restartHeroTimer);

    setHeroSlide(0);
    restartHeroTimer();
}

cards.forEach(card => {
    card.querySelector(".product-image-btn")?.addEventListener("click", () => {
        openProductDetails(card);
    });

    card.querySelector(".preorder-btn")?.addEventListener("click", () => {
        addToCart(card);
    });
});

document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".category-btn.active")?.classList.remove("active");
        button.classList.add("active");
        activeCategory = button.dataset.category || "all";
        applyProductFilters();
    });
});

searchForm?.addEventListener("submit", event => {
    event.preventDefault();
    applyProductFilters();
});

searchInput?.addEventListener("input", applyProductFilters);
sortSelect?.addEventListener("change", sortProducts);

sidePreorderBtn?.addEventListener("click", () => {
    const card = cards.find(item => item.dataset.id === activeProductId);
    if (card) addToCart(card);
});

closeBtn?.addEventListener("click", closeProductDetails);
menuBtn?.addEventListener("click", openLeftMenu);
closeLeft?.addEventListener("click", closeLeftMenu);
overlay?.addEventListener("click", closeAllPanels);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeAllPanels();
    }
});

if (zoomWrapper && lens && zoomResult) {
    zoomWrapper.addEventListener("mouseenter", () => {
        if (window.matchMedia("(max-width: 620px)").matches) return;
        lens.style.display = "block";
        zoomResult.style.display = "block";
    });

    zoomWrapper.addEventListener("mouseleave", () => {
        lens.style.display = "none";
        zoomResult.style.display = "none";
    });

    zoomWrapper.addEventListener("mousemove", event => {
        const rect = zoomWrapper.getBoundingClientRect();
        const lensSize = 110;
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        x = Math.max(lensSize / 2, Math.min(x, rect.width - lensSize / 2));
        y = Math.max(lensSize / 2, Math.min(y, rect.height - lensSize / 2));

        lens.style.left = `${x - lensSize / 2}px`;
        lens.style.top = `${y - lensSize / 2}px`;
        zoomResult.style.backgroundPosition = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
    });
}

window.addEventListener("storage", updateCartCount);

renderAuthArea();
renderProductInfo();
initHeroSlideshow();
updateCartCount();
sortProducts();
