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

import { initDashboard } from "./dashboard.js";
import { initProgress } from "./progress.js";

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
  initDashboard();
  initProgress();
}

document.addEventListener(
  "DOMContentLoaded",
  initLenadi
);