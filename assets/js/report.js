const reportProducts = {
    "bs-shirt": {
        name: "BSCS Shirt",
        img: "/assets/img/bs-shirt.png",
        merchant: "College Department Head - BSCS"
    },
    "bs-shirt-2": {
        name: "BSIT Shirt",
        img: "/assets/img/bs-shirt-2.png",
        merchant: "College Department Head - BSIT"
    },
    "bs-shirt-3": {
        name: "ACT AD Shirt",
        img: "/assets/img/bs-shirt-3.png",
        merchant: "College Department Head - ACT AD"
    },
    "bs-it-3": {
        name: "BSIT Classic Shirt",
        img: "/assets/img/bs-it-3.jpg",
        merchant: "College Department Head - BSIT"
    },
    "act-ad-2": {
        name: "ACT AD Premium Shirt",
        img: "/assets/img/act-ad-2.jpg",
        merchant: "College Department Head - ACT AD"
    },
    "act-ad": {
        name: "BSCS Classic Shirt",
        img: "/assets/img/act-ad.jpg",
        merchant: "College Department Head - BSCS"
    }
};

const params = new URLSearchParams(window.location.search);
const productId = params.get("product") || "bs-shirt";
const product = reportProducts[productId] || reportProducts["bs-shirt"];

function getStoredArray(key) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

document.title = `Report ${product.name} | WMSU Merch`;

const image = document.getElementById("report-product-image");
const backLink = document.getElementById("back-product");

if (image) {
    image.src = product.img;
    image.alt = product.name;
}

if (backLink) {
    backLink.href = `/assets/html/product-info.html?product=${encodeURIComponent(productId)}`;
}

const nameEl = document.getElementById("report-product-name");
const merchantEl = document.getElementById("report-merchant");
if (nameEl) nameEl.textContent = product.name;
if (merchantEl) merchantEl.textContent = `Merchant: ${product.merchant}`;

document.getElementById("report-form")?.addEventListener("submit", event => {
    event.preventDefault();

    const selectedIssues = Array.from(document.querySelectorAll('input[name="issue"]:checked')).map(input => input.value);
    const details = document.getElementById("report-details")?.value.trim() || "";
    const status = document.getElementById("report-status");

    if (!selectedIssues.length && !details) {
        if (status) status.textContent = "Please select at least one issue or add details before submitting.";
        return;
    }

    const reports = getStoredArray("productReports");
    reports.unshift({
        productId,
        productName: product.name,
        merchant: product.merchant,
        issues: selectedIssues,
        details,
        createdAt: new Date().toISOString()
    });

    localStorage.setItem("productReports", JSON.stringify(reports));
    event.target.reset();

    if (status) {
        status.textContent = "Report submitted. The admin review queue now has this product report.";
    }
});
