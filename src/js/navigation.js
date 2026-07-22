import { closeAllModals } from "./modal.js";

const mobileMenuButton = document.querySelector(".mobile-menu-button");
const sidebarBackdrop = document.querySelector(".sidebar-backdrop");
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

function setMobileSidebarOpen(isOpen) {
  document.body.classList.toggle("sidebar-open", isOpen);

  if (mobileMenuButton) {
    mobileMenuButton.setAttribute("aria-expanded", String(isOpen));

    mobileMenuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.hidden = !isOpen;
  }
}

function closeMobileSidebar() {
  setMobileSidebarOpen(false);
}

function toggleMobileSidebar() {
  const isOpen = document.body.classList.contains("sidebar-open");

  setMobileSidebarOpen(!isOpen);
}

export function setupNavigation() {
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      closeAllModals();
      activateSection(item.dataset.section);
      activateNavItem(item);
      closeMobileSidebar();
    });
  });
}

export function setupMobileSidebar() {
  mobileMenuButton?.addEventListener("click", toggleMobileSidebar);
  sidebarBackdrop?.addEventListener("click", closeMobileSidebar);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileSidebar();
    }
  });

  const desktopSidebarQuery = window.matchMedia("(min-width: 721px)");

  const closeSidebarOnDesktop = (event) => {
    if (event.matches) {
      closeMobileSidebar();
    }
  };

  if (desktopSidebarQuery.addEventListener) {
    desktopSidebarQuery.addEventListener("change", closeSidebarOnDesktop);
  } else {
    desktopSidebarQuery.addListener(closeSidebarOnDesktop);
  }
}