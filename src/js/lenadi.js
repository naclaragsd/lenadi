// Lenadi Version 1 keeps functionality intentionally minimal.
// This script only switches the visible dashboard section and active menu item.

const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".screen-section");
const modalOpenButtons = document.querySelectorAll("[data-modal-target]");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
const modals = document.querySelectorAll(".modal-overlay");

function closeAllModals() {
  modals.forEach((modal) => {
    modal.hidden = true;
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const selectedSectionId = item.dataset.section;

    closeAllModals();

    navItems.forEach((navItem) => {
      navItem.classList.remove("active");
      navItem.removeAttribute("aria-current");
    });

    sections.forEach((section) => {
      const isSelected = section.id === selectedSectionId;

      section.hidden = !isSelected;
      section.classList.toggle("active-section", isSelected);
    });

    item.classList.add("active");
    item.setAttribute("aria-current", "page");
  });
});

modalOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.getElementById(button.dataset.modalTarget);

    if (modal) {
      modal.hidden = false;
    }
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeAllModals);
});

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.hidden = true;
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllModals();
  }
});

// Future versions can add task management, filtering, progress calculations,
// form validation, and save behavior here.
