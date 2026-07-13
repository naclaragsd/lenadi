const modalOpenButtons = document.querySelectorAll("[data-modal-target]");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
const modals = document.querySelectorAll(".modal-overlay");

let handleModalClose = () => {};

export function openModal(modalId) {
  const modal = document.getElementById(modalId);

  if (modal) {
    modal.hidden = false;
  }
}

function closeModal(modal) {
  if (!modal || modal.hidden) {
    return;
  }

  modal.hidden = true;
  handleModalClose(modal.id);
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