// Contact form handling
const MESSAGE_STORAGE_KEY = "MESSAGE_DATA";

function getMessages() {
  try {
    return JSON.parse(localStorage.getItem(MESSAGE_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveMessage(message) {
  const messages = getMessages();
  messages.push(message);
  localStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify(messages, null, 2));
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    saveMessage({
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      message: String(data.get("message") || "").trim(),
      submittedAt: new Date().toISOString()
    });

    form.reset();

    if (status) {
      status.textContent = "Message sent — thank you for sharing your requirements. I’ll look into it and get back to you.";
      status.classList.add("success");
    }
  });
});
