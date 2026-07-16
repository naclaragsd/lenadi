const modalOpenButtons = document.querySelectorAll("[data-modal-target]");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
const modals = document.querySelectorAll(".modal-overlay");

let handleModalClose = () => {};
let lastFocusedElement = null;

function focusModalContent(modal) {
  const formControl = modal.querySelector(
    "input:not([disabled]), select:not([disabled]), textarea:not([disabled])"
  );

  const fallbackButton = modal.querySelector(
    "button:not([disabled])"
  );

  const elementToFocus =
    formControl || fallbackButton;

  elementToFocus?.focus();
}

export function openModal(modalId) {
  const modal = document.getElementById(modalId);

  if (modal) {
    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    focusModalContent(modal);
  }
}

function closeModal(modal) {
  if (!modal || modal.hidden) {
    return;
  }

  modal.hidden = true;
  handleModalClose(modal.id);

  if (
    lastFocusedElement instanceof HTMLElement
  ) {
    lastFocusedElement.focus();
  }
}

export function closeAllModals() {
  modals.forEach((modal) => {
    closeModal(modal);
  });
}

export function setupModals({ onClose } = {}) {
  handleModalClose = onClose || (() => {});

  modalOpenButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openModal(button.dataset.modalTarget);
    });
  });

  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal-overlay");
      closeModal(modal);
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });
}