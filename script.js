const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const copyButton = document.querySelector("[data-email]");
const copyStatus = document.querySelector(".copy-status");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

siteNav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

copyButton.addEventListener("click", async () => {
  const email = copyButton.dataset.email;

  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = `Copied ${email}`;
  } catch {
    copyStatus.textContent = email;
  }
});
