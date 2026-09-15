// Contact form handling
// Submissions are sent to a Google Apps Script Web App, which appends
// them as rows to a Google Sheet AND emails you instantly. A
// localStorage copy is kept as a local backup in case the network
// request fails.

const SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzokBNZMehJvvbFdZ0xIONf99ZzxK8IHOioGhzZdtczN4YL6N0VFZYWK4QdA8KFfXzxsg/exec";

const MESSAGE_STORAGE_KEY = "MESSAGE_DATA";

function getMessages() {
  try {
    return JSON.parse(localStorage.getItem(MESSAGE_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveMessageLocally(message) {
  const messages = getMessages();
  messages.push(message);
  localStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify(messages, null, 2));
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm");
  const status = document.querySelector("#contactStatus");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const record = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      message: String(data.get("message") || "").trim(),
      submittedAt: new Date().toISOString()
    };

    // Always keep a local backup copy.
    saveMessageLocally(record);

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    const showSuccess = (localOnly) => {
      form.reset();
      if (status) {
        status.textContent = localOnly
          ? "Message saved — thank you for sharing your requirements. I'll look into it and get back to you."
          : "Message sent — thank you for sharing your requirements. I'll look into it and get back to you.";
        status.classList.add("success");
      }
      if (submitBtn) submitBtn.disabled = false;
    };

    if (!SHEET_WEBAPP_URL || SHEET_WEBAPP_URL === "YOUR_SCRIPT_URL_HERE") {
      console.warn("SHEET_WEBAPP_URL is not set in js/contact.js — submission was only saved locally.");
      showSuccess(true);
      return;
    }

    const payload = new FormData();
    payload.append("name", record.name);
    payload.append("email", record.email);
    payload.append("phone", record.phone);
    payload.append("message", record.message);

    // no-cors: Apps Script doesn't reliably return readable CORS headers,
    // so we send the request and optimistically report success — the
    // request itself still reaches the script, appends the row, and
    // triggers the email notification to you.
    fetch(SHEET_WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      body: payload
    })
      .then(() => showSuccess(false))
      .catch((err) => {
        console.error("Failed to send to Google Sheet:", err);
        showSuccess(true);
      });
  });
});
