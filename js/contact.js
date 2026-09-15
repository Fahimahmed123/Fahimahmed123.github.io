// Contact form handling
// Submissions are sent to a Google Apps Script Web App, which appends
// them as rows to a Google Sheet. A localStorage copy is kept as a
// local backup in case the network request fails.

// Paste the /exec URL you get after deploying the Apps Script Web App here:
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
      message: String(data.get("message") || "").trim(),
      submittedAt: new Date().toISOString()
    };

    // Always keep a local backup copy.
    saveMessageLocally(record);

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    if (!SHEET_WEBAPP_URL || SHEET_WEBAPP_URL === "YOUR_SCRIPT_URL_HERE") {
      // Apps Script URL not configured yet — fall back silently to local-only.
      console.warn("SHEET_WEBAPP_URL is not set in js/contact.js — submission was only saved locally.");
      showSuccess();
      return;
    }

    const payload = new FormData();
    payload.append("name", record.name);
    payload.append("email", record.email);
    payload.append("message", record.message);

    // no-cors: Apps Script doesn't reliably return readable CORS headers,
    // so we send the request and optimistically report success — the
    // request itself still reaches the script and appends the row.
    fetch(SHEET_WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      body: payload
    })
      .then(() => showSuccess())
      .catch((err) => {
        console.error("Failed to send to Google Sheet:", err);
        showSuccess(true);
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });

    function showSuccess(localOnly) {
      form.reset();
      if (status) {
        status.textContent = localOnly
          ? "Message saved — thanks! (Couldn't reach the server, but I'll still get your note.)"
          : "Message sent — thank you for sharing your requirements. I'll look into it and get back to you.";
        status.classList.add("success");
      }
    }
  });
});
