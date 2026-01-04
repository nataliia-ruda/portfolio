const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Burger menu 
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const isMobile = () => window.matchMedia("(max-width: 900px)").matches;

function openMenu() {
  if (!navLinks || !menuBtn) return;
  navLinks.classList.add("open");
  menuBtn.setAttribute("aria-expanded", "true");
  menuBtn.setAttribute("aria-label", "Close menu");
  document.body.classList.add("no-scroll");
}


function closeMenu() {
  if (!navLinks || !menuBtn) return;
  navLinks.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Open menu");
  document.body.classList.remove("no-scroll");
}

function toggleMenu() {
  const isOpen = navLinks.classList.contains("open");
  isOpen ? closeMenu() : openMenu();
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", toggleMenu);

  navLinks.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link && isMobile()) closeMenu();
  });

  document.addEventListener("click", (e) => {
    if (!isMobile()) return;
    const clickedInside = navLinks.contains(e.target) || menuBtn.contains(e.target);
    if (!clickedInside) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (!isMobile()) closeMenu();
  });
}



const track = document.getElementById("sliderTrack");
const slides = track ? Array.from(track.children) : [];
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const dotsWrap = document.getElementById("sliderDots");

let index = 0;

function clamp(i) {
  if (i < 0) return slides.length - 1;
  if (i >= slides.length) return 0;
  return i;
}

function goTo(i) {
  if (!track || slides.length === 0) return;
  index = clamp(i);
  track.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

function makeDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dot" + (i === index ? " active" : "");
    btn.setAttribute("aria-label", `Go to slide ${i + 1}`);
    btn.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(btn);
  });
}

function updateDots() {
  if (!dotsWrap) return;
  const dots = Array.from(dotsWrap.querySelectorAll(".dot"));
  dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

prevBtn?.addEventListener("click", () => goTo(index - 1));
nextBtn?.addEventListener("click", () => goTo(index + 1));

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") goTo(index - 1);
  if (e.key === "ArrowRight") goTo(index + 1);
});


let startX = 0;
let isDown = false;

track?.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDown = true;
}, { passive: true });

track?.addEventListener("touchend", (e) => {
  if (!isDown) return;
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) goTo(index - 1);
    else goTo(index + 1);
  }
  isDown = false;
});

makeDots();
goTo(0);
