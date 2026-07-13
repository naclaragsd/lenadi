import { setupModals } from "./modal.js";

import {
  setupNavigation,
} from "./navigation.js";

import {
  initSubjects,
  resetSubjectForm,
} from "./subjects.js";

import {
  initTasks,
  resetTaskForm,
  resetTaskDetails,
} from "./tasks.js";

function initLenadi() {
  setupModals({
    onClose: (modalId) => {
      if (modalId === "subject-modal") {
        resetSubjectForm();
      }

      if (modalId === "task-modal") {
        resetTaskForm();
      }

      if (modalId === "task-details-modal") {
        resetTaskDetails();
      }
    },
  });

  setupNavigation();
  initSubjects();
  initTasks();
}

document.addEventListener(
  "DOMContentLoaded",
  initLenadi
);