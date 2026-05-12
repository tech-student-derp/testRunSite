const products = {
    "bs-shirt": {
        name: "BSCS Shirt",
        category: "CCS - BSCS",
        price: "₱259",
        img: "/assets/img/bs-shirt.png",
        rating: 4.8,
        reviews: 86,
        sold: 320,
        stock: "In stock",
        delivery: "Pickup or campus delivery",
        material: "Cotton blend",
        sizes: "S, M, L, XL",
        merchant: "College of Computing Studies - BSCS Department",
        description: "A clean BSCS department shirt made for regular campus wear, organization days, and preorder batches. The fabric is light enough for daily use while keeping the print readable.",
        comments: [
            { name: "Mika", rating: 5, text: "The print looks clean and the shirt feels comfortable during long classes." },
            { name: "Andre", rating: 4, text: "Good fit overall. I just wish there were more XL stocks during preorder week." },
            { name: "Jessa", rating: 5, text: "Simple design, nice fabric, and easy pickup at the department office." }
        ]
    },
    "bs-shirt-2": {
        name: "BSIT Shirt",
        category: "CCS - BSIT",
        price: "₱259",
        img: "/assets/img/bs-shirt-2.png",
        rating: 4.6,
        reviews: 54,
        sold: 210,
        stock: "Limited sizes",
        delivery: "Pickup available",
        material: "Breathable cotton",
        sizes: "M, L, XL",
        merchant: "College of Computing Studies - BSIT Department",
        description: "A straightforward BSIT shirt with a breathable cotton feel and a neat department layout for student events and daily campus use.",
        comments: [
            { name: "Renz", rating: 5, text: "The material is breathable and the shirt does not feel heavy." },
            { name: "Clara", rating: 4, text: "Nice shirt, but the medium size sells out fast." },
            { name: "Joel", rating: 5, text: "Worth the preorder price and easy to match with jeans." }
        ]
    },
    "bs-shirt-3": {
        name: "ACT AD Shirt",
        category: "CCS - ACT AD",
        price: "₱259",
        img: "/assets/img/bs-shirt-3.png",
        rating: 4.7,
        reviews: 49,
        sold: 180,
        stock: "In stock",
        delivery: "Campus delivery",
        material: "Soft jersey",
        sizes: "S, M, L",
        merchant: "College of Computing Studies - ACT AD Department",
        description: "A soft jersey ACT AD shirt with strong print contrast, made for campus activities and casual department wear.",
        comments: [
            { name: "Nico", rating: 5, text: "The design stands out without being too loud." },
            { name: "Aira", rating: 4, text: "Soft fabric and good print, but I hope XL gets added next batch." },
            { name: "Sam", rating: 5, text: "Looks great for group photos during department events." }
        ]
    },
    "bs-it-3": {
        name: "BSIT Classic Shirt",
        category: "CCS - BSIT",
        price: "₱259",
        img: "/assets/img/bs-it-3.jpg",
        rating: 4.5,
        reviews: 38,
        sold: 150,
        stock: "Preorder",
        delivery: "Ships after preorder cutoff",
        material: "Cotton jersey",
        sizes: "M, L, XL",
        merchant: "College of Computing Studies - BSIT Department",
        description: "A classic BSIT preorder design with durable print and a familiar department look for students who prefer a simpler style.",
        comments: [
            { name: "Dane", rating: 4, text: "Classic design and decent fabric for the price." },
            { name: "Ivy", rating: 5, text: "The print stayed clean after washing." },
            { name: "Mark", rating: 4, text: "Good shirt, just remember it is preorder so pickup takes time." }
        ]
    },
    "act-ad-2": {
        name: "ACT AD Premium Shirt",
        category: "CCS - ACT AD",
        price: "₱259",
        img: "/assets/img/act-ad-2.jpg",
        rating: 4.9,
        reviews: 112,
        sold: 410,
        stock: "In stock",
        delivery: "Fast campus pickup",
        material: "Premium cotton blend",
        sizes: "S, M, L",
        merchant: "College of Computing Studies - ACT AD Department",
        description: "A top-rated ACT AD shirt with a premium cotton blend and bolder department styling for students who want a sharper campus merch piece.",
        comments: [
            { name: "Kath", rating: 5, text: "Best looking ACT AD shirt so far. The print is clear." },
            { name: "Lance", rating: 5, text: "Comfortable and the pickup process was quick." },
            { name: "Bea", rating: 5, text: "The design looks premium for the price." }
        ]
    },
    "act-ad": {
        name: "BSCS Classic Shirt",
        category: "CCS - BSCS",
        price: "₱259",
        img: "/assets/img/act-ad.jpg",
        rating: 4.4,
        reviews: 27,
        sold: 95,
        stock: "Few left",
        delivery: "Pickup available",
        material: "Cotton blend",
        sizes: "M, L",
        merchant: "College of Computing Studies - BSCS Department",
        description: "A value pick for BSCS students who want a clean department shirt with a simple print and an easy campus pickup option.",
        comments: [
            { name: "Lea", rating: 4, text: "Simple and affordable. Good for regular school days." },
            { name: "Paolo", rating: 4, text: "The shirt is okay, but more sizes would help." },
            { name: "Kim", rating: 5, text: "Nice option when you need department merch quickly." }
        ]
    },
    "bscs-lanyard": {
        name: "BSCS Lanyard",
        category: "CCS - BSCS",
        price: "₱99",
        img: "/assets/img/bscs-lanyard.png",
        rating: 4.5,
        reviews: 31,
        sold: 120,
        stock: "In stock",
        delivery: "Campus pickup",
        material: "Polyester strap with metal hook",
        sizes: "One size",
        merchant: "College of Computing Studies - BSCS Department",
        description: "A BSCS lanyard mockup for IDs, keys, and daily campus use.",
        comments: [
            { name: "Erika", rating: 5, text: "The strap feels sturdy and the department label is easy to read." },
            { name: "Jay", rating: 4, text: "Good everyday lanyard for the price." }
        ]
    },
    "bsit-lanyard": {
        name: "BSIT Lanyard",
        category: "CCS - BSIT",
        price: "₱99",
        img: "/assets/img/bsit-lanyard.png",
        rating: 4.6,
        reviews: 36,
        sold: 135,
        stock: "In stock",
        delivery: "Campus pickup",
        material: "Polyester strap with swivel hook",
        sizes: "One size",
        merchant: "College of Computing Studies - BSIT Department",
        description: "A BSIT lanyard mockup with a clean department style for daily ID use.",
        comments: [
            { name: "Aldrin", rating: 5, text: "Simple, clean, and useful for lab days." },
            { name: "Mara", rating: 4, text: "Nice print and easy pickup." }
        ]
    },
    "bsit-lanyard-2": {
        name: "BSIT Alternate Lanyard",
        category: "CCS - BSIT",
        price: "₱109",
        img: "/assets/img/bsit-lanyard-2.png",
        rating: 4.4,
        reviews: 22,
        sold: 88,
        stock: "Preorder",
        delivery: "Pickup after preorder cutoff",
        material: "Woven polyester strap",
        sizes: "One size",
        merchant: "College of Computing Studies - BSIT Department",
        description: "An alternate BSIT lanyard mockup for students who want a cleaner department accessory.",
        comments: [
            { name: "Louie", rating: 4, text: "Good accessory, especially with the department shirt." },
            { name: "Tina", rating: 5, text: "The strap design looks neat." }
        ]
    },
    "ccs-lanyard": {
        name: "CCS Lanyard",
        category: "CCS",
        price: "₱109",
        img: "/assets/img/ccs-lanyard.png",
        rating: 4.7,
        reviews: 42,
        sold: 160,
        stock: "In stock",
        delivery: "Campus pickup",
        material: "Printed polyester strap",
        sizes: "One size",
        merchant: "College of Computing Studies",
        description: "A CCS lanyard mockup for IDs, keys, and student organization events.",
        comments: [
            { name: "Carlo", rating: 5, text: "The print is sharp and the hook feels reliable." },
            { name: "Neri", rating: 4, text: "Nice department accessory." }
        ]
    },
    "coe-jacket": {
        name: "COE Jacket",
        category: "CE",
        price: "₱499",
        img: "/assets/img/coe-jacket.png",
        rating: 4.8,
        reviews: 28,
        sold: 74,
        stock: "Limited sizes",
        delivery: "Pickup or campus delivery",
        material: "Lightweight fleece blend",
        sizes: "S, M, L, XL",
        merchant: "College of Engineering",
        description: "A College of Engineering jacket mockup for cooler classrooms, campus events, and organization activities.",
        comments: [
            { name: "Miguel", rating: 5, text: "Warm enough for class and still light to carry." },
            { name: "Aya", rating: 4, text: "Looks polished with the COE branding." }
        ]
    },
    "coe-yellow-jacket": {
        name: "COE Yellow Jacket",
        category: "EE",
        price: "₱529",
        img: "/assets/img/coe-yellow-jacket.png",
        rating: 4.7,
        reviews: 25,
        sold: 69,
        stock: "Preorder",
        delivery: "Ships after preorder cutoff",
        material: "Fleece blend with ribbed cuffs",
        sizes: "S, M, L, XL",
        merchant: "College of Engineering",
        description: "A brighter COE jacket mockup for students who want a stronger engineering-college color statement.",
        comments: [
            { name: "June", rating: 5, text: "The color stands out nicely during events." },
            { name: "Rei", rating: 4, text: "Good jacket, but preorder timing matters." }
        ]
    },
    "python-shirt": {
        name: "Python Shirt",
        category: "CCS - BSCS",
        price: "₱279",
        img: "/assets/img/python-shirt.png",
        rating: 4.6,
        reviews: 39,
        sold: 101,
        stock: "In stock",
        delivery: "Pickup available",
        material: "Cotton blend",
        sizes: "S, M, L, XL",
        merchant: "College of Computing Studies - BSCS Department",
        description: "A Python-themed shirt mockup for programming classes, org days, and casual campus wear.",
        comments: [
            { name: "Iris", rating: 5, text: "Fun design for programming subjects." },
            { name: "Ken", rating: 4, text: "Comfortable and easy to match with jeans." }
        ]
    }
};

Object.values(products).forEach(product => {
    product.rating = 0;
    product.reviews = 0;
    product.sold = 0;
    product.comments = [];
});

try {
    const approvedProducts = JSON.parse(localStorage.getItem("approvedProducts")) || [];
    const moderation = getStoredObject("adminProductModeration") || {};
    if (Array.isArray(approvedProducts)) {
        approvedProducts.forEach(item => {
            if (moderation[item.id]?.hidden) return;

            products[item.id] = {
                name: item.name,
                category: item.category || "Merchant",
                price: `₱${Number(item.price || 0).toLocaleString("en-PH")}`,
                img: item.img || "/assets/img/bs-shirt.png",
                imageKey: item.imageKey || "",
                rating: item.rating || 0,
                reviews: item.reviews || 0,
                sold: item.sold || 0,
                stock: item.stockLabel || `Stock: ${item.stock ?? "Available"}`,
                delivery: item.delivery || "Merchant pickup or campus delivery",
                material: item.material || "Merchant listed material",
                sizes: item.sizes || "S, M, L",
                merchant: item.merchant || "College Department Head",
                description: item.description || `Merchant-added ${item.productType || "product"} approved by admin for the storefront.`,
                comments: []
            };
        });
    }
} catch {
    // Keep static product details if approved product storage is unavailable.
}

const params = new URLSearchParams(window.location.search);
const productId = params.get("product") || "bs-shirt";
const hiddenProducts = getStoredObject("adminProductModeration") || {};
if (hiddenProducts[productId]?.hidden) {
    window.location.replace("/index.html#products");
}
const product = products[productId] || products["bs-shirt"];
const storedReviewKey = `reviews-${productId}`;
const deletedReviewKey = `deleted-reviews-${productId}`;
const MERCHANT_IMAGE_DB = "wmsuMerchImages";
const MERCHANT_IMAGE_STORE = "productImages";
let selectedSize = "";

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

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function getStoredArray(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

function getStoredObject(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value && typeof value === "object" ? value : null;
    } catch {
        return null;
    }
}

function isLoggedIn() {
    return Boolean(getStoredObject("loggedInUser"));
}

function canPostReview() {
    const user = getStoredObject("loggedInUser");
    return Boolean(user?.username || user?.email || user?.id);
}

function getReviewUsername() {
    const user = getStoredObject("loggedInUser");
    return user?.username || "Student";
}

function isAdminUser() {
    const user = getStoredObject("loggedInUser");
    return user?.role === "admin";
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function saveMailThreads(threads) {
    localStorage.setItem("mailThreads", JSON.stringify(threads));
}

function saveApprovedProducts(products) {
    localStorage.setItem("approvedProducts", JSON.stringify(products));
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (!cartCount) return;

    const count = getStoredArray("cart").reduce((total, item) => total + (Number(item.qty) || 1), 0);
    cartCount.textContent = count;
}

function getAllReviews() {
    const deletedReviews = new Set(getStoredArray(deletedReviewKey));
    const defaultReviews = product.comments
        .map((review, index) => ({
            ...review,
            source: "default",
            reviewId: `default-${index}`
        }))
        .filter(review => !deletedReviews.has(review.reviewId));

    const storedReviews = getStoredArray(storedReviewKey).map((review, index) => ({
        ...review,
        source: "stored",
        reviewId: review.id || `stored-${index}`
    }));

    return [...defaultReviews, ...storedReviews];
}

function deleteReview(review) {
    if (!isAdminUser()) return;

    if (review.source === "default") {
        const deletedReviews = getStoredArray(deletedReviewKey);
        if (!deletedReviews.includes(review.reviewId)) {
            deletedReviews.push(review.reviewId);
            localStorage.setItem(deletedReviewKey, JSON.stringify(deletedReviews));
        }
    } else {
        const storedReviews = getStoredArray(storedReviewKey);
        const updatedReviews = storedReviews.filter((item, index) => {
            const itemId = item.id || `stored-${index}`;
            return itemId !== review.reviewId;
        });
        localStorage.setItem(storedReviewKey, JSON.stringify(updatedReviews));
    }

    const metrics = getDisplayMetrics();
    updateApprovedProductMetrics(metrics);
    hydrateProduct();
    renderReviews();
}

function getCompletedOrders() {
    return getStoredArray("orders").filter(order => order.status === "complete");
}

function getPurchasedQuantity() {
    return getCompletedOrders().reduce((total, order) => {
        const items = Array.isArray(order.items) ? order.items : [];
        return total + items.reduce((sum, item) => {
            return item.id === productId ? sum + (Number(item.qty) || 1) : sum;
        }, 0);
    }, 0);
}

function getDisplayMetrics() {
    const visibleReviews = getAllReviews();
    const visibleTotal = visibleReviews.reduce((sum, review) => sum + (Number(review.rating) || 0), 0);
    const rating = visibleReviews.length
        ? visibleTotal / visibleReviews.length
        : 0;

    return {
        rating: Number(rating.toFixed(1)),
        reviews: visibleReviews.length,
        sold: getPurchasedQuantity()
    };
}

function ratingPercent(rating) {
    return `${Math.max(0, Math.min(Number(rating) || 0, 5)) / 5 * 100}%`;
}

function normalizeRating(value) {
    const rating = Number(value) || 0;
    return Math.max(1, Math.min(5, Math.round(rating)));
}

function initStarPicker() {
    const input = document.getElementById("review-rating");
    const picker = document.getElementById("review-star-picker");
    const hint = document.getElementById("review-rating-hint");
    if (!input || !picker) return;

    const stars = Array.from(picker.querySelectorAll(".star-choice"));
    let selected = Number(input.value) || 0;

    function paint(value, isPreview = false) {
        stars.forEach(star => {
            const rating = Number(star.dataset.rating) || 0;
            star.classList.toggle("is-preview", isPreview && rating <= value);
            star.classList.toggle("is-active", !isPreview && rating <= selected);
            star.setAttribute("aria-checked", selected === rating ? "true" : "false");
        });

        if (hint) {
            hint.textContent = value
                ? `${value} out of 5 stars`
                : selected
                    ? `${selected} out of 5 stars`
                    : "Choose a rating";
        }
    }

    stars.forEach(star => {
        const rating = Number(star.dataset.rating) || 0;

        star.addEventListener("mouseenter", () => paint(rating, true));
        star.addEventListener("focus", () => paint(rating, true));
        star.addEventListener("mouseleave", () => paint(selected));
        star.addEventListener("blur", () => paint(selected));
        star.addEventListener("click", () => {
            selected = rating;
            input.value = String(rating);
            paint(selected);
        });
    });

    input.addEventListener("rating-reset", () => {
        selected = 0;
        input.value = "";
        paint(selected);
    });

    paint(selected);
}

function updateReviewAccess() {
    const allowed = canPostReview();
    const form = document.getElementById("review-form");
    const note = document.getElementById("review-login-note");
    const button = document.getElementById("post-review-btn");
    if (!form) return;

    form.querySelectorAll(".star-choice, #review-comment").forEach(control => {
        control.disabled = !allowed;
    });

    if (button) button.disabled = !allowed;
    if (note) {
        note.textContent = allowed
            ? "Your review will be posted under your account name."
            : "Log in or register to post a comment.";
    }
}

function formatReviewCount(count) {
    const total = Number(count) || 0;
    return `${total} ${total === 1 ? "review" : "reviews"}`;
}

function updateApprovedProductMetrics(metrics) {
    const approvedProducts = getStoredArray("approvedProducts");
    const index = approvedProducts.findIndex(item => item.id === productId);
    if (index === -1) return;

    approvedProducts[index] = {
        ...approvedProducts[index],
        rating: metrics.rating,
        reviews: metrics.reviews
    };
    saveApprovedProducts(approvedProducts);
}

function notifyMerchantReview(review, metrics) {
    const threads = getStoredArray("mailThreads");
    threads.unshift({
        id: `MAIL-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        recipient: "merchant",
        sender: review.name || "Student",
        subject: `New review: ${product.name}`,
        message: `${review.name || "A student"} rated ${product.name} ${review.rating} out of 5. "${review.text}" Current average: ${metrics.rating} from ${formatReviewCount(metrics.reviews)}.`,
        status: "pending",
        productId,
        reportId: "",
        replies: [],
        createdAt: new Date().toISOString()
    });
    saveMailThreads(threads);
}

function getProductSizes() {
    return String(product.sizes || "")
        .split(",")
        .map(size => size.trim())
        .filter(Boolean);
}

function renderSizeOptions() {
    const sizePicker = document.getElementById("size-picker");
    const sizeOptions = document.getElementById("size-options");
    const sizes = getProductSizes();

    if (!sizePicker || !sizeOptions) return;

    sizeOptions.innerHTML = "";

    if (!sizes.length) {
        sizePicker.hidden = true;
        selectedSize = "One size";
        return;
    }

    selectedSize = sizes[0];

    sizes.forEach(size => {
        const button = document.createElement("button");
        button.className = "size-option";
        button.type = "button";
        button.textContent = size;
        button.setAttribute("aria-pressed", size === selectedSize ? "true" : "false");
        button.classList.toggle("active", size === selectedSize);

        button.addEventListener("click", () => {
            selectedSize = size;

            sizeOptions.querySelectorAll(".size-option").forEach(option => {
                const isActive = option === button;
                option.classList.toggle("active", isActive);
                option.setAttribute("aria-pressed", isActive ? "true" : "false");
            });
        });

        sizeOptions.appendChild(button);
    });
}

function renderReviews() {
    const list = document.getElementById("review-list");
    const reviews = getAllReviews();
    const canDeleteReviews = isAdminUser();
    if (!list) return;

    list.innerHTML = "";

    if (!reviews.length) {
        list.innerHTML = '<p class="empty-review">No comments yet. Be the first student to review this product.</p>';
        return;
    }

    reviews.forEach(review => {
        const card = document.createElement("article");
        card.className = "review-card";

        const header = document.createElement("header");
        const reviewMeta = document.createElement("div");
        const name = document.createElement("strong");
        const stars = document.createElement("span");
        const comment = document.createElement("p");

        name.textContent = review.name || "Student";
        reviewMeta.className = "review-meta";
        stars.className = "stars";
        stars.style.setProperty("--rating-percent", ratingPercent(review.rating));
        stars.setAttribute("aria-label", `${review.rating} out of 5 stars`);
        comment.textContent = review.text || "";

        reviewMeta.append(name, stars);
        header.append(reviewMeta);

        if (canDeleteReviews) {
            const deleteButton = document.createElement("button");
            deleteButton.className = "review-delete-btn";
            deleteButton.type = "button";
            deleteButton.textContent = "Delete";
            deleteButton.setAttribute("aria-label", `Delete review by ${review.name || "Student"}`);
            deleteButton.addEventListener("click", () => {
                const confirmed = window.confirm("Delete this review comment?");
                if (confirmed) deleteReview(review);
            });
            header.appendChild(deleteButton);
        }

        card.append(header, comment);
        list.appendChild(card);
    });
}

function hydrateProduct() {
    const metrics = getDisplayMetrics();

    document.title = `${product.name} | WMSU Merch`;
    setText("product-category", product.category);
    setText("product-name", product.name);
    setText("rating-score", metrics.rating.toFixed(1));
    setText("rating-count", formatReviewCount(metrics.reviews));
    setText("sold-count", `${metrics.sold} sold`);
    setText("product-price", product.price);
    setText("merchant-name", product.merchant);
    setText("product-description", product.description);
    setText("product-sizes", product.sizes);
    setText("product-stock", product.stock);
    setText("product-material", product.material);
    setText("product-delivery", product.delivery);
    setText("review-summary", metrics.reviews
        ? `Average rating ${metrics.rating.toFixed(1)} from ${formatReviewCount(metrics.reviews)}.`
        : "No ratings yet.");

    const image = document.getElementById("product-image");
    const stars = document.getElementById("rating-stars");
    const reportLink = document.getElementById("report-link");

    if (image) {
        image.src = product.img;
        image.alt = product.name;
    }

    if (product.imageKey) {
        getMerchantImageUrl(product.imageKey)
            .then(url => {
                if (!url) return;
                product.img = url;
                if (image) image.src = url;
                const preview = document.getElementById("zoom-preview");
                if (preview) preview.style.backgroundImage = `url("${url}")`;
            })
            .catch(() => {});
    }

    if (stars) {
        stars.style.setProperty("--rating-percent", ratingPercent(metrics.rating));
        stars.setAttribute("aria-label", metrics.reviews ? `${metrics.rating.toFixed(1)} out of 5 stars` : "No ratings yet");
    }

    if (reportLink) {
        reportLink.href = `/assets/html/report.html?product=${encodeURIComponent(productId)}`;
    }
}

function initZoom() {
    const zoom = document.getElementById("image-zoom");
    const lens = document.getElementById("zoom-lens");
    const preview = document.getElementById("zoom-preview");
    if (!zoom || !lens || !preview) return;

    preview.style.backgroundImage = `url("${product.img}")`;

    zoom.addEventListener("mouseenter", () => {
        if (window.matchMedia("(max-width: 620px)").matches) return;
        lens.style.display = "block";
        preview.classList.add("active");
    });

    zoom.addEventListener("mouseleave", () => {
        lens.style.display = "none";
        preview.classList.remove("active");
    });

    zoom.addEventListener("mousemove", event => {
        const rect = zoom.getBoundingClientRect();
        const lensSize = 120;
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        x = Math.max(lensSize / 2, Math.min(x, rect.width - lensSize / 2));
        y = Math.max(lensSize / 2, Math.min(y, rect.height - lensSize / 2));

        lens.style.left = `${x - lensSize / 2}px`;
        lens.style.top = `${y - lensSize / 2}px`;
        preview.style.backgroundPosition = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
    });
}

document.getElementById("add-cart-btn")?.addEventListener("click", () => {
    if (!isLoggedIn()) {
        window.alert("Please log in or register before preordering.");
        return;
    }

    const cart = getStoredArray("cart");
    const size = selectedSize || getProductSizes()[0] || "One size";
    const existing = cart.find(item => item.id === productId && item.size === size);

    if (existing) {
        existing.qty = (Number(existing.qty) || 1) + 1;
    } else {
        cart.push({
            id: productId,
            img: product.img,
            name: product.name,
            price: product.price,
            size,
            qty: 1
        });
    }

    saveCart(cart);
    window.location.href = "/assets/html/checkout.html";
});

document.getElementById("review-form")?.addEventListener("submit", event => {
    event.preventDefault();

    if (!canPostReview()) {
        document.getElementById("review-login-note").textContent = "Please log in or register before posting a comment.";
        return;
    }

    const ratingInput = document.getElementById("review-rating");
    const commentInput = document.getElementById("review-comment");
    const storedReviews = getStoredArray(storedReviewKey);
    const rating = normalizeRating(ratingInput.value);

    if (!ratingInput.value) {
        document.getElementById("review-rating-hint").textContent = "Please choose a rating.";
        return;
    }

    const newReview = {
        id: `review-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: getReviewUsername(),
        rating,
        text: commentInput.value.trim()
    };

    storedReviews.unshift(newReview);

    localStorage.setItem(storedReviewKey, JSON.stringify(storedReviews));
    const metrics = getDisplayMetrics();
    updateApprovedProductMetrics(metrics);
    notifyMerchantReview(newReview, metrics);
    event.target.reset();
    ratingInput.dispatchEvent(new Event("rating-reset"));
    hydrateProduct();
    renderReviews();
});

hydrateProduct();
renderSizeOptions();
renderReviews();
initZoom();
initStarPicker();
updateReviewAccess();
updateCartCount();
