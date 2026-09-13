/**
 * projects.js
 * ------------------------------------------------------------------
 * Add a project by adding one object to PROJECTS — no new HTML file
 * needed. It shows up in the home grid, under its category filter
 * pill, and gets its own page at project.html?slug=<slug>.
 *
 *   slug     : id used in the URL — project.html?slug=my-project
 *   title    : project name
 *   category : must match one of the CATEGORIES below (controls filter pill)
 *   glyph    : 2-4 char code shown on the card banner (e.g. "RAG", "C++")
 *   stack    : short tech line
 *   summary  : 1-2 sentences — shown on the home grid card
 *   details  : longer description — array of paragraphs for the project page
 *   tags     : short tag pills
 *   link     : { label, url } — e.g. a live demo. Omit if none.
 *   repo     : { label, url } — e.g. GitHub. Omit if none.
 * ------------------------------------------------------------------
 */

const CATEGORIES = ["Web Development", "Machine Learning", "Systems Programming"];

const PROJECTS = [
  {
    slug: "chat-with-pdf",
    title: "Chat With PDF",
    category: "Machine Learning",
    glyph: "RAG",
    stack: "Python · Streamlit · FAISS",
    summary:
      "Multi-PDF chatbot built on a RAG pipeline with a FAISS vector store and Hugging Face embeddings, with conversational memory over document Q&A.",
    details: [
      "A Streamlit app that lets you upload one or more PDFs and ask questions about them in plain language, instead of scrolling through the document yourself.",
      "Documents are chunked and embedded with Hugging Face embeddings, indexed with FAISS for fast retrieval, and answers are generated over the most relevant chunks with conversational memory so follow-up questions stay in context.",
    ],
    tags: ["RAG", "LangChain", "Hugging Face", "FAISS"],
    link: { label: "Live demo", url: "https://chat-with-pdf-fahimfarhadahmed.streamlit.app/" },
    repo: { label: "GitHub", url: "https://github.com/Fahimahmed123/Chat-With-PDF" },
  },
  {
    slug: "simple-ecommerce-site",
    title: "Simple Ecommerce Site",
    category: "Web Development",
    glyph: "DJ",
    stack: "Django · PostgreSQL",
    summary:
      "Full-stack ecommerce platform listing 200+ products, with secure phone-based authentication and an optimized UI/UX.",
    details: [
      "A full-stack Django ecommerce site covering product listings, cart, and checkout for a catalog of 200+ products.",
      "Authentication is phone-number based rather than the usual email/password flow, and the UI was tuned for clarity and speed on both desktop and mobile.",
    ],
    tags: ["Django", "PostgreSQL", "Auth"],
    repo: { label: "GitHub", url: "https://github.com/Fahimahmed123/ecommerce" },
  },
  {
    slug: "car-model-classification",
    title: "Car Model Classification",
    category: "Machine Learning",
    glyph: "CV",
    stack: "Python · TensorFlow",
    summary:
      "Classified 25 car models across 50k+ images using VGG16 + ConvLSTM2D, with a full pipeline for collecting, preprocessing and evaluating the datasets.",
    details: [
      "An image classification pipeline that identifies a car's model from a photo, across 25 distinct car models and more than 50,000 training images.",
      "Combines a VGG16 backbone with a ConvLSTM2D layer, with a full data pipeline for collection, preprocessing, and fine-tuning, evaluated with standard classification metrics.",
    ],
    tags: ["Computer Vision", "VGG16", "ConvLSTM2D"],
    repo: { label: "GitHub", url: "https://github.com/Fahimahmed123/Car-Prediction-Model" },
  },
  {
    slug: "nebula-fractal-renderer",
    title: "Nebula — Fractal Renderer",
    category: "Systems Programming",
    glyph: "GL",
    stack: "C++ · OpenGL · GLFW",
    summary:
      "Real-time renderer for Mandelbrot, Newton and Julia fractals at 60+ FPS, with smooth zoom/pan and dynamic color mapping.",
    details: [
      "A real-time fractal renderer written in modern C++ with OpenGL, GLFW and Dear ImGui, rendering Mandelbrot, Newton, and Julia sets at 60+ FPS.",
      "Supports smooth zoom and pan with up to 10x magnification, and dynamic color mapping so the fractal's structure stays legible at any depth.",
    ],
    tags: ["C++", "OpenGL", "GLFW", "Dear ImGui"],
    repo: { label: "GitHub", url: "https://github.com/Fahimahmed123/Nebula-A-Fractal-Renderer" },
  },
  {
    slug: "bank-management-system",
    title: "Bank Management System",
    category: "Web Development",
    glyph: "FX",
    stack: "JavaFX · PostgreSQL",
    summary:
      "Desktop banking app with OTP-based password reset, balance transfers/withdrawals, transaction history and PDF statements via iText.",
    details: [
      "A desktop banking application built with JavaFX, covering both user and admin logins, with OTP-based password reset.",
      "Handles balance transfers and withdrawals, keeps full transaction history, and generates PDF account statements with iText, backed by a PostgreSQL database.",
    ],
    tags: ["JavaFX", "PostgreSQL", "iText"],
    repo: { label: "GitHub", url: "https://github.com/Fahimahmed123/Bank-Account-Management-System" },
  },
  {
    slug: "athena-library-system",
    title: "Athena — Library System",
    category: "Systems Programming",
    glyph: "C",
    stack: "C",
    summary:
      "File-based library system managing 100+ books, automating roughly 90% of what was previously a manual inventory process.",
    details: [
      "A file-based library management system written in C, built to manage a catalog of 100+ books without a database engine.",
      "Automates checkouts, returns and inventory tracking that were previously done by hand, cutting manual inventory work by roughly 90%.",
    ],
    tags: ["C", "File I/O"],
    repo: { label: "GitHub", url: "https://github.com/Fahimahmed123/Athena" },
  },
];

const RESEARCH = [
  {
    title: "Multi-Class Classification of Bangla News: Addressing the Spectrum of Misinformation",
    note: "Undergraduate Thesis",
    summary:
      "Curated a 15k+ article Bangla news dataset — the first large-scale misinformation benchmark spanning false, satire, misleading and true categories — and reached 90% accuracy with transformer models, cutting satire-vs-false errors by 12%.",
  },
  {
    title: "A Hybrid Vision Transformer–BiLSTM Pipeline for Robust Bangla Scene-Text Recognition with Weighted BERT Reranking",
    note: "Research",
    summary:
      "Engineered a hybrid Vision Transformer + BiLSTM pipeline with two-stage transfer learning (character → word), reaching 93.72% sequence-level character accuracy (5.80% CER) and 64.81% sequence accuracy on the ICDAR-2019 benchmark, aided by weighted BERT reranking (λ = 0.05) that fuses visual and linguistic confidence.",
  },
];