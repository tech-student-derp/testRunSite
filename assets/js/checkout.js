const cartItemsContainer = document.getElementById("cart-items");
const totalPriceEl = document.querySelector(".total-price");
const payBtn = document.getElementById("pay-btn");
const backBtn = document.getElementById("back-btn");

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

/* 💸 calculate total */
function calcTotal(cart) {
    return cart.reduce((sum, item) => {
        const price = parseInt(item.price.replace("₱", ""));
        return sum + price * (item.qty || 1);
    }, 0);
}

/* 🔥 pay button state */
function updatePayButton(cart) {
    const empty = cart.length === 0;

    payBtn.disabled = empty;
    payBtn.style.opacity = empty ? "0.5" : "1";
    payBtn.style.cursor = empty ? "not-allowed" : "pointer";
}

/* 🧾 render cart */
function renderCart() {
    const cart = getCart();
    cartItemsContainer.innerHTML = "";

    updatePayButton(cart);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<h3><b>Cart is empty.</b></h3>";
        totalPriceEl.innerText = "₱0";
        return;
    }

    cart.forEach((item, index) => {

        const div = document.createElement("div");
        div.classList.add("cart-item");

        const qty = item.qty || 1;

        div.innerHTML = `
            <img src="${item.img}">

            <div class="item-info">
                <h3>${item.name}</h3>
                <p>${item.size}</p>
                <p>${item.price}</p>

                <div class="qty-box">
                    <button class="minus">-</button>
                    <span>${qty}</span>
                    <button class="plus">+</button>
                </div>
            </div>

            <button class="remove-btn">Remove</button>
        `;

        /* ❌ remove */
        div.querySelector(".remove-btn").addEventListener("click", () => {
            const cart = getCart();
            cart.splice(index, 1);
            saveCart(cart);
        });

        /* ➖ decrease qty */
        div.querySelector(".minus").addEventListener("click", () => {
            const cart = getCart();

            cart[index].qty = (cart[index].qty || 1);

            if (cart[index].qty > 1) {
                cart[index].qty -= 1;
            } else {
                cart.splice(index, 1);
            }

            saveCart(cart);
        });

        /* ➕ increase qty */
        div.querySelector(".plus").addEventListener("click", () => {
            const cart = getCart();

            cart[index].qty = (cart[index].qty || 1) + 1;

            saveCart(cart);
        });

        cartItemsContainer.appendChild(div);
    });

    const total = calcTotal(cart);
    totalPriceEl.innerText = `₱${total}`;
}

/* 🔙 back button */
backBtn.addEventListener("click", () => {
    window.location.href = "../../index.html";
});

/* 💳 pay button */
payBtn.addEventListener("click", () => {
    const cart = getCart();
    if (!cart.length) return;

    window.location.href = "/assets/html/payment-method.html";
});

/* 🔄 live sync */
window.addEventListener("storage", renderCart);

/* 🚀 init */
renderCart();