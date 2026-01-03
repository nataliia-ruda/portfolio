// Footer 

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



// Contact Form
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (form && formMessage) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    formMessage.textContent = "Sending…";

    const formData = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        form.reset();
        formMessage.textContent = "Thanks! Your message has been sent successfully.";
      } else {
        formMessage.textContent =
          "Oops! Something went wrong. Please try again later.";
      }
    } catch (error) {
      formMessage.textContent =
        "Network error. Please check your connection and try again.";
    }
  });
}
