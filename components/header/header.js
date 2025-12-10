const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.getElementById("menu");
const mobileMenuLinks = mobileMenu.querySelectorAll("a");
const body = document.body;

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("show");
});

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("show");
  });
});

body.addEventListener("click", (e) => {
  if (
    !mobileMenu.contains(e.target) &&
    !hamburger.contains(e.target) &&
    mobileMenu.classList.contains("show")
  ) {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("show");
  }
});
