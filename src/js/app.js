import { setupModals } from "./modal.js";
import { setupNavigation } from "./navigation.js";
import {
  initSubjects,
  resetSubjectForm,
} from "./subjects.js";

function initLenadi() {
  setupModals({
    onClose: (modalId) => {
      if (modalId === "subject-modal") {
        resetSubjectForm();
      }
    },
  });

  setupNavigation();
  initSubjects();
}

document.addEventListener("DOMContentLoaded", initLenadi);