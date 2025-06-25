const toggleBtn = document.getElementById("themeToggle");
const icon = document.getElementById("themeIcon");

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-theme", isDark);

  // Toggle icon
  icon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-fill";

  // Toggle icon color for visibility
  icon.style.color = isDark ? "white" : "black";

  // Save
  localStorage.setItem("theme", theme);
}

toggleBtn.addEventListener("click", () => {
  const currentTheme = document.body.classList.contains("dark-theme") ? "dark" : "light";
  applyTheme(currentTheme === "dark" ? "light" : "dark");
});

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme") || "light";
  applyTheme(saved);
});
