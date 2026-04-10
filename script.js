const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const favList = document.getElementById("favList");
const toast = document.getElementById("toast");

let favorites = JSON.parse(localStorage.getItem("quotes")) || [];

// 🌍 API Quote
async function getQuote() {
  quoteText.innerText = "Loading... ⏳";

  const res = await fetch("https://api.quotable.io/random");
  const data = await res.json();

  quoteText.innerText = data.content;
  authorText.innerText = "- " + data.author;
}

// 📋 Copy
function copyQuote() {
  navigator.clipboard.writeText(quoteText.innerText);
  showToast("Copied ✅");
}

// 🔗 Share
function shareQuote() {
  window.open(`https://wa.me/?text=${encodeURIComponent(quoteText.innerText)}`);
}

// ⭐️ Save
function saveQuote() {
  favorites.push(quoteText.innerText);
  localStorage.setItem("quotes", JSON.stringify(favorites));
  displayFavorites();
  showToast("Saved ⭐️");
}

// 🗑️ Clear
function clearFavorites() {
  favorites = [];
  localStorage.removeItem("quotes");
  displayFavorites();
  showToast("Cleared 🗑️");
}

// 📜 Show favorites
function displayFavorites() {
  favList.innerHTML = "";

  favorites.forEach(q => {
    const li = document.createElement("li");
    li.innerText = q;
    favList.appendChild(li);
  });
}

// 🌙 Dark mode
function toggleMode() {
  document.body.classList.toggle("dark");
}

// 🔔 Toast
function showToast(msg) {
  toast.innerText = msg;
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";
  }, 1500);
}

// 🚀 init
displayFavorites();
getQuote();
