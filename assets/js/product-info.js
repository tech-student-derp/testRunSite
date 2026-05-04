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

try {
    const approvedProducts = JSON.parse(localStorage.getItem("approvedProducts")) || [];
    if (Array.isArray(approvedProducts)) {
        approvedProducts.forEach(item => {
            products[item.id] = {
                name: item.name,
                category: item.category || "Merchant",
                price: `₱${Number(item.price || 0).toLocaleString("en-PH")}`,
                img: item.img || "/assets/img/bs-shirt.png",
                imageKey: item.imageKey || "",
                rating: item.rating || 4.5,
                reviews: item.reviews || 0,
                sold: item.sold || 0,
                stock: `Stock: ${item.stock ?? "Available"}`,
                delivery: "Merchant pickup or campus delivery",
                material: "Merchant listed material",
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
const product = products[productId] || products["bs-shirt"];
const storedReviewKey = `reviews-${productId}`;
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

function getReviewUsername() {
    const user = getStoredObject("loggedInUser");
    return user?.username || "Student";
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (!cartCount) return;

    const count = getStoredArray("cart").reduce((total, item) => total + (Number(item.qty) || 1), 0);
    cartCount.textContent = count;
}

function getAllReviews() {
    return [...product.comments, ...getStoredArray(storedReviewKey)];
}

function ratingPercent(rating) {
    return `${Math.max(0, Math.min(Number(rating) || 0, 5)) / 5 * 100}%`;
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
    if (!list) return;

    list.innerHTML = "";

    reviews.forEach(review => {
        const card = document.createElement("article");
        card.className = "review-card";

        const header = document.createElement("header");
        const name = document.createElement("strong");
        const stars = document.createElement("span");
        const comment = document.createElement("p");

        name.textContent = review.name || "Student";
        stars.className = "stars";
        stars.style.setProperty("--rating-percent", ratingPercent(review.rating));
        stars.setAttribute("aria-label", `${review.rating} out of 5 stars`);
        comment.textContent = review.text || "";

        header.append(name, stars);
        card.append(header, comment);
        list.appendChild(card);
    });
}

function hydrateProduct() {
    document.title = `${product.name} | WMSU Merch`;
    setText("product-category", product.category);
    setText("product-name", product.name);
    setText("rating-score", product.rating);
    setText("rating-count", `${product.reviews} reviews`);
    setText("sold-count", `${product.sold} sold`);
    setText("product-price", product.price);
    setText("merchant-name", product.merchant);
    setText("product-description", product.description);
    setText("product-sizes", product.sizes);
    setText("product-stock", product.stock);
    setText("product-material", product.material);
    setText("product-delivery", product.delivery);
    setText("review-summary", `Average rating ${product.rating} from ${product.reviews} reviews.`);

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
        stars.style.setProperty("--rating-percent", ratingPercent(product.rating));
        stars.setAttribute("aria-label", `${product.rating} out of 5 stars`);
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

    const ratingInput = document.getElementById("review-rating");
    const commentInput = document.getElementById("review-comment");
    const storedReviews = getStoredArray(storedReviewKey);

    storedReviews.unshift({
        name: getReviewUsername(),
        rating: Number(ratingInput.value) || 5,
        text: commentInput.value.trim()
    });

    localStorage.setItem(storedReviewKey, JSON.stringify(storedReviews));
    event.target.reset();
    renderReviews();
});

hydrateProduct();
renderSizeOptions();
renderReviews();
initZoom();
updateCartCount();
