const productData = {
    "bs-shirt": {
        rating: 4.8,
        sold: 320,
        reviews: 86,
        stock: "In stock",
        delivery: "Pickup or campus delivery",
        material: "Cotton blend",
        badge: "BSCS Pick",
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
        badge: "BSIT Pick",
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
        badge: "ACT AD Drop",
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
        badge: "BSIT Classic",
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
        badge: "ACT AD Top Rated",
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
        badge: "BSCS Value Pick",
        review: "Clean student-project merch with a straightforward campus look.",
        sizes: "M, L"
    },
    "bscs-lanyard": {
        rating: 4.5,
        sold: 120,
        reviews: 31,
        stock: "In stock",
        delivery: "Campus pickup",
        material: "Polyester strap",
        badge: "BSCS Accessory",
        review: "Useful everyday lanyard with a clean department look.",
        sizes: "One size"
    },
    "bsit-lanyard": {
        rating: 4.6,
        sold: 135,
        reviews: 36,
        stock: "In stock",
        delivery: "Campus pickup",
        material: "Polyester strap",
        badge: "BSIT Accessory",
        review: "Simple lanyard for lab days, IDs, and keys.",
        sizes: "One size"
    },
    "bsit-lanyard-2": {
        rating: 4.4,
        sold: 88,
        reviews: 22,
        stock: "Preorder",
        delivery: "Pickup after preorder cutoff",
        material: "Woven polyester",
        badge: "BSIT Accessory",
        review: "Clean accessory that pairs well with the department shirt.",
        sizes: "One size"
    },
    "ccs-lanyard": {
        rating: 4.7,
        sold: 160,
        reviews: 42,
        stock: "In stock",
        delivery: "Campus pickup",
        material: "Printed polyester",
        badge: "CCS Accessory",
        review: "Sharp print and a sturdy hook for daily campus use.",
        sizes: "One size"
    },
    "coe-jacket": {
        rating: 4.8,
        sold: 74,
        reviews: 28,
        stock: "Limited sizes",
        delivery: "Pickup or campus delivery",
        material: "Lightweight fleece blend",
        badge: "COE Outerwear",
        review: "Polished COE branding with a comfortable lightweight fit.",
        sizes: "S, M, L, XL"
    },
    "coe-yellow-jacket": {
        rating: 4.7,
        sold: 69,
        reviews: 25,
        stock: "Preorder",
        delivery: "Ships after preorder cutoff",
        material: "Fleece blend",
        badge: "COE Highlight",
        review: "Bright event-ready jacket with a strong engineering-college look.",
        sizes: "S, M, L, XL"
    },
    "python-shirt": {
        rating: 4.6,
        sold: 101,
        reviews: 39,
        stock: "In stock",
        delivery: "Pickup available",
        material: "Cotton blend",
        badge: "Coding Pick",
        review: "Fun programming-themed shirt for classes and org days.",
        sizes: "S, M, L, XL"
    }
};

let cards = Array.from(document.querySelectorAll(".product-card"));
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
const authPopup = document.getElementById("auth-popup");
const closeAuthPopup = document.getElementById("close-auth-popup");
const MERCHANT_IMAGE_DB = "wmsuMerchImages";
const MERCHANT_IMAGE_STORE = "productImages";

let activeCategory = "all";
let activeProductId = "";
let activeHeroSlide = 0;
let heroTimer = null;

function openMerchantImageDb() {
    return new Promise((resolve, reject) => {
        if (!("indexedDB" in window)) {
            reject(new Error("IndexedDB is unavailable."));
            return;
        }

        const request = indexedDB.open(MERCHANT_IMAGE_DB, 1);
        request.onupgradeneeded = () => {
            if (!request.result.objectStoreNames.contains(MERCHANT_IMAGE_STORE)) {
                request.result.createObjectStore(MERCHANT_IMAGE_STORE);
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function getMerchantImageUrl(key) {
    if (!key) return "";

    const db = await openMerchantImageDb();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(MERCHANT_IMAGE_STORE, "readonly");
        const request = tx.objectStore(MERCHANT_IMAGE_STORE).get(key);
        request.onsuccess = () => {
            db.close();
            resolve(request.result ? URL.createObjectURL(request.result) : "");
        };
        request.onerror = () => {
            db.close();
            reject(request.error);
        };
    });
}

async function hydrateProductImage(img, product) {
    if (!img || !product?.imageKey) return;

    try {
        const url = await getMerchantImageUrl(product.imageKey);
        if (url) img.src = url;
    } catch {
        // Keep the fallback image if the IndexedDB image cannot be loaded.
    }
}

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

function isLoggedIn() {
    return Boolean(getStoredObject("loggedInUser"));
}

function showAuthPopup() {
    if (!authPopup) return;
    authPopup.hidden = false;
    closeAuthPopup?.focus();
}

function hideAuthPopup() {
    if (authPopup) authPopup.hidden = true;
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

function getProductSoldQuantity(productId) {
    return getStoredArray("orders")
        .filter(order => order.status === "complete")
        .reduce((total, order) => {
            const items = Array.isArray(order.items) ? order.items : [];
            return total + items.reduce((sum, item) => {
                return item.id === productId ? sum + (Number(item.qty) || 1) : sum;
            }, 0);
        }, 0);
}

function getCardProduct(card) {
    const id = card.dataset.id;
    const data = productData[id] || {};
    const baseSold = data.sold || Number(card.dataset.sold) || 0;

    return {
        id,
        img: card.querySelector(".product-img")?.src || "",
        name: card.querySelector(".prod-name")?.textContent.trim() || "Unnamed item",
        price: card.querySelector(".price")?.textContent.trim() || "₱0",
        category: card.querySelector(".product-tag")?.textContent.trim() || "Merch",
        rating: data.rating || Number(card.dataset.rating) || 0,
        sold: baseSold + getProductSoldQuantity(id),
        reviews: data.reviews || 0,
        stock: data.stock || "Preorder",
        delivery: data.delivery || card.dataset.delivery || "Pickup available",
        material: data.material || card.dataset.material || "Cotton blend",
        badge: data.badge || "WMSU Merch",
        review: data.review || "No review highlight yet.",
        sizes: data.sizes || card.dataset.sizes || "S, M, L"
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
    if (!isLoggedIn()) {
        showAuthPopup();
        return;
    }

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

function renderMerchantShortcut() {
    const shortcut = document.getElementById("merchant-add-product");
    const user = getStoredObject("loggedInUser");
    if (!shortcut) return;

    shortcut.hidden = user?.role !== "merchant";
}

function renderApprovedProducts() {
    const section = document.getElementById("merchant-releases");
    const groups = document.getElementById("merchant-product-groups");
    if (!section || !groups) return;

    const approvedProducts = getStoredArray("approvedProducts");
    groups.innerHTML = "";

    if (!approvedProducts.length) {
        section.hidden = true;
        return;
    }

    section.hidden = false;

    const typeLabels = {
        shirts: "Merchant Released Shirts",
        lanyard: "Merchant Released Lanyards",
        stickers: "Merchant Released Stickers",
        pins: "Merchant Released Pins",
        accessories: "Merchant Released Accessories"
    };

    const grouped = approvedProducts.reduce((result, product) => {
        const type = product.productType || "accessories";
        result[type] = result[type] || [];
        result[type].push(product);
        return result;
    }, {});

    Object.entries(grouped).forEach(([type, products]) => {
        const group = document.createElement("section");
        group.className = "merchant-product-group";
        group.setAttribute("aria-labelledby", `merchant-${type}-title`);

        const title = document.createElement("h3");
        title.id = `merchant-${type}-title`;
        title.textContent = typeLabels[type] || `Merchant Released ${type}`;

        const grid = document.createElement("div");
        grid.className = "merchant-type-grid";

        products.forEach(product => {
            if (!product.id) return;

            const article = document.createElement("article");
            article.className = "product-card";
            article.dataset.id = product.id;
            article.dataset.category = String(product.category || "merchant").toLowerCase().replace(/\s+/g, "-");
            article.dataset.rating = product.rating || "4.5";
            article.dataset.sold = product.sold || "0";
            article.dataset.price = product.price || "0";
            article.dataset.sizes = product.sizes || "One size";
            article.dataset.material = product.material || "Merchant listed material";
            article.dataset.delivery = product.delivery || "Merchant pickup or campus delivery";

            article.innerHTML = `
                <button class="product-image-btn" type="button" aria-label="View ${product.name} details">
                    <img src="${product.img || "/assets/img/bs-shirt.png"}" alt="${product.name}" class="product-img">
                </button>
                <div class="product-info">
                    <p class="product-tag">${product.category || "Merchant"} · ${product.productType || "Product"}</p>
                    <h3 class="prod-name">${product.name}</h3>
                    <p class="price">₱${Number(product.price || 0).toLocaleString("en-PH")}</p>
                </div>
                <a class="details-link" href="/assets/html/product-info.html?product=${encodeURIComponent(product.id)}">View Details</a>
                <button class="preorder-btn" type="button">Preorder</button>
            `;

            hydrateProductImage(article.querySelector(".product-img"), product);
            grid.appendChild(article);
        });

        group.append(title, grid);
        groups.appendChild(group);
    });

    cards = Array.from(document.querySelectorAll(".product-card"));
}

function bindProductCards() {
    cards.forEach(card => {
        if (card.dataset.bound === "true") return;
        card.dataset.bound = "true";

        card.querySelector(".product-image-btn")?.addEventListener("click", () => {
            window.location.href = `/assets/html/product-info.html?product=${encodeURIComponent(card.dataset.id || "")}`;
        });

        card.querySelector(".preorder-btn")?.addEventListener("click", () => {
            addToCart(card);
        });
    });
}

function saveMailThread(thread) {
    const threads = getStoredArray("mailThreads");
    threads.unshift(thread);
    localStorage.setItem("mailThreads", JSON.stringify(threads));
}

function initMailForm() {
    const form = document.getElementById("mail-form");
    if (!form) return;

    form.addEventListener("submit", event => {
        event.preventDefault();
        const user = getStoredObject("loggedInUser");
        const recipient = document.getElementById("mail-recipient").value;
        const subject = document.getElementById("mail-subject").value.trim();
        const message = document.getElementById("mail-message").value.trim();
        const status = document.getElementById("mail-status");

        saveMailThread({
            id: `MAIL-${Date.now()}`,
            recipient,
            sender: user?.username || "Guest user",
            subject,
            message,
            status: "pending",
            replies: [],
            createdAt: new Date().toISOString()
        });

        form.reset();
        if (status) status.textContent = `Message sent to ${recipient}.`;
        renderMailThreads();
    });
}

function renderMailThreads() {
    const list = document.getElementById("mail-thread-list");
    if (!list) return;

    const user = getStoredObject("loggedInUser");
    const sender = user?.username || "Guest user";
    const threads = getStoredArray("mailThreads").filter(thread => {
        return thread.sender === sender || thread.recipient === sender;
    }).slice(0, 3);

    list.innerHTML = "";
    threads.forEach(thread => {
        const latestReply = Array.isArray(thread.replies) ? thread.replies.at(-1) : null;
        const article = document.createElement("article");
        article.innerHTML = `
            <strong>${thread.subject} (${thread.status})</strong>
            <p>${latestReply ? `Reply from ${latestReply.from}: ${latestReply.message}` : `${thread.sender} to ${thread.recipient}: ${thread.message}`}</p>
        `;
        list.appendChild(article);
    });
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

    const sortedCards = Array.from(grid.querySelectorAll(".product-card"));

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

renderApprovedProducts();
bindProductCards();

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
closeAuthPopup?.addEventListener("click", hideAuthPopup);
authPopup?.addEventListener("click", event => {
    if (event.target === authPopup) {
        hideAuthPopup();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeAllPanels();
        hideAuthPopup();
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

window.addEventListener("storage", event => {
    updateCartCount();

    if (event.key === "approvedProducts") {
        renderApprovedProducts();
        bindProductCards();
        renderProductInfo();
        applyProductFilters();
    }
});

renderAuthArea();
renderMerchantShortcut();
renderProductInfo();
initMailForm();
renderMailThreads();
initHeroSlideshow();
updateCartCount();
sortProducts();
