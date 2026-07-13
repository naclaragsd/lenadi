import { closeAllModals } from "./modal.js";

const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".screen-section");

function activateSection(selectedSectionId) {
  sections.forEach((section) => {
    const isSelected = section.id === selectedSectionId;

    section.hidden = !isSelected;
    section.classList.toggle("active-section", isSelected);
  });
}

function activateNavItem(selectedItem) {
  navItems.forEach((navItem) => {
    navItem.classList.remove("active");
    navItem.removeAttribute("aria-current");
  });

  selectedItem.classList.add("active");
  selectedItem.setAttribute("aria-current", "page");
}

export function setupNavigation() {
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      closeAllModals();
      activateSection(item.dataset.section);
      activateNavItem(item);
    });
  });
}