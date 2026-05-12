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

function saveMailThread(thread) {
    const threads = getStoredArray("mailThreads");
    threads.unshift(thread);
    localStorage.setItem("mailThreads", JSON.stringify(threads));
}

function formatDate(value) {
    if (!value) return "Just now";
    return new Date(value).toLocaleString("en-PH", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function renderSupportThreads() {
    const list = document.getElementById("support-thread-list");
    if (!list) return;

    const user = getStoredObject("loggedInUser");
    const sender = user?.username || "Guest user";
    const threads = getStoredArray("mailThreads")
        .filter(thread => thread.sender === sender || thread.recipient === sender)
        .slice(0, 6);

    list.innerHTML = "";

    if (!threads.length) {
        list.innerHTML = "<p>No messages yet.</p>";
        return;
    }

    threads.forEach(thread => {
        const latestReply = Array.isArray(thread.replies) ? thread.replies.at(-1) : null;
        const article = document.createElement("article");
        article.innerHTML = `
            <strong>${thread.subject || "Support message"}</strong>
            <p>${latestReply ? `Reply from ${latestReply.from}: ${latestReply.message}` : `${thread.sender} to ${thread.recipient}: ${thread.message}`}</p>
            <p>${formatDate(thread.createdAt)} | ${thread.status || "pending"}</p>
        `;
        list.appendChild(article);
    });
}

document.getElementById("support-form")?.addEventListener("submit", event => {
    event.preventDefault();

    const user = getStoredObject("loggedInUser");
    const recipient = document.getElementById("support-recipient").value;
    const topic = document.getElementById("support-topic").value;
    const subject = document.getElementById("support-subject").value.trim();
    const message = document.getElementById("support-message").value.trim();
    const status = document.getElementById("support-status");

    saveMailThread({
        id: `MAIL-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        recipient,
        sender: user?.username || "Guest user",
        subject: `${topic}: ${subject}`,
        message,
        status: "pending",
        productId: "",
        reportId: "",
        replies: [],
        createdAt: new Date().toISOString()
    });

    event.target.reset();
    if (status) status.textContent = `Message sent to ${recipient}.`;
    renderSupportThreads();
});

window.addEventListener("storage", event => {
    if (event.key === "mailThreads") renderSupportThreads();
});

renderSupportThreads();
