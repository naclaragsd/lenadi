import { closeAllModals, openModal } from "./modal.js";
import {
  notifyDataUpdated,
  onDataUpdated,
} from "./events.js";
import {
  loadSubjects,
  loadTasks,
  saveSubjects,
  saveTasks,
} from "./storage.js";
import { getSubjectStats } from "./stats.js";

const elements = {
  subjectNameInput: document.querySelector(
    "#subject-name-input"
  ),
  subjectModalTitle: document.querySelector(
    "#subject-modal-title"
  ),
  subjectFormError: document.querySelector(
    "#subject-form-error"
  ),
  subjectColorButtons: document.querySelectorAll(
    "#subject-modal .color-choice"
  ),
  saveSubjectButton: document.querySelector(
    "#save-subject-button"
  ),
  subjectsGrid: document.querySelector(".subject-card-grid"),
};

let subjects = [];
let selectedColor = "purple";
let editingSubjectId = null;

// ---------- Subject form state ----------

function setSubjectFormError(message) {
  if (elements.subjectFormError) {
    elements.subjectFormError.textContent = message;
  }
}

function clearSubjectFormError() {
  setSubjectFormError("");
}

function getColorFromButton(button) {
  return button.dataset.color || "purple";
}

function setSelectedColor(colorName) {
  selectedColor = colorName;

  elements.subjectColorButtons.forEach((button) => {
    const buttonColor = getColorFromButton(button);

    button.classList.toggle(
      "is-selected",
      buttonColor === selectedColor
    );

    button.setAttribute(
      "aria-pressed",
      String(buttonColor === selectedColor)
    );
  });
}

export function resetSubjectForm() {
  if (elements.subjectNameInput) {
    elements.subjectNameInput.value = "";
  }

  if (elements.subjectModalTitle) {
    elements.subjectModalTitle.textContent =
      "Add Subject";
  }

  editingSubjectId = null;
  setSelectedColor("purple");
  clearSubjectFormError();
}

function openSubjectEditor(subject) {
  if (!elements.subjectNameInput) {
    return;
  }

  elements.subjectNameInput.value = subject.name;
  editingSubjectId = subject.id;

  if (elements.subjectModalTitle) {
    elements.subjectModalTitle.textContent =
      "Edit Subject";
  }

  setSelectedColor(subject.color);
  clearSubjectFormError();
  openModal("subject-modal");
}

// ---------- Subject rendering ----------

function createEmptySubjectsMessage() {
  const emptyMessage = document.createElement("p");

  emptyMessage.textContent =
    "No subjects yet. Create your first subject and start organizing your studies.";

  emptyMessage.classList.add("empty-message");

  return emptyMessage;
}

function createSubjectCard(subject, tasks) {
  const card = document.createElement("article");
  const colorDot = document.createElement("span");
  const title = document.createElement("h3");
  const details = document.createElement("p");

  const progressRow = document.createElement("div");
  const progressText = document.createElement("span");
  const progressTrack = document.createElement("div");
  const progressFill = document.createElement("span");

  const actions = document.createElement("div");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  const stats = getSubjectStats(
    subject.id,
    tasks
  );

  card.classList.add("subject-card");

  colorDot.classList.add(
    "subject-color-dot",
    `${subject.color}-dot`
  );

  title.textContent = subject.name;
  details.textContent =
    `${stats.total} tasks - ${stats.completed} completed`;

  progressRow.classList.add("progress-row");
  progressText.textContent =
    `${stats.progress}%`;

  progressTrack.classList.add("progress-track");

  progressFill.classList.add(
    "progress-fill",
    subject.color
  );

  progressFill.style.width =
    `${stats.progress}%`;

  progressTrack.appendChild(progressFill);
  progressRow.append(progressText, progressTrack);

  actions.classList.add("card-actions");

  editButton.type = "button";
  editButton.textContent = "Edit";

  editButton.addEventListener("click", () => {
    editSubject(subject.id);
  });

  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("danger-button");

  deleteButton.addEventListener("click", () => {
    deleteSubject(subject.id);
  });

  actions.append(editButton, deleteButton);

  card.append(
    colorDot,
    title,
    details,
    progressRow,
    actions
  );

  return card;
}

function renderSubjects() {
  if (!elements.subjectsGrid) {
    return;
  }

  elements.subjectsGrid.innerHTML = "";

  if (subjects.length === 0) {
    elements.subjectsGrid.appendChild(
      createEmptySubjectsMessage()
    );

    return;
  }

  const tasks = loadTasks();

  subjects.forEach((subject) => {
    const subjectCard = createSubjectCard(
      subject,
      tasks
    );

    elements.subjectsGrid.appendChild(subjectCard);
  });
}

// ---------- Subject validation ----------

function getSubjectNameFromForm() {
  if (!elements.subjectNameInput) {
    return "";
  }

  return elements.subjectNameInput.value.trim();
}

function subjectNameExists(subjectName) {
  return subjects.some((subject) => {
    const isSameName =
      subject.name.toLowerCase() === subjectName.toLowerCase();

    const isDifferentSubject =
      subject.id !== editingSubjectId;

    return isSameName && isDifferentSubject;
  });
}

// ---------- Subject actions ----------

function addSubject() {
  const subjectName = getSubjectNameFromForm();

  if (subjectName === "") {
    setSubjectFormError("Enter a subject name.");
    elements.subjectNameInput?.focus();
    return;
  }

  if (subjectNameExists(subjectName)) {
    setSubjectFormError("This subject already exists.");
    elements.subjectNameInput?.focus();
    return;
  }

  clearSubjectFormError();

  const newSubject = {
    id: Date.now(),
    name: subjectName,
    color: selectedColor,
  };

  subjects.push(newSubject);

  saveSubjects(subjects);
  notifyDataUpdated();
  closeAllModals();
  resetSubjectForm();
}

function updateSubject() {
  const subjectName = getSubjectNameFromForm();

  if (subjectName === "") {
    setSubjectFormError("Enter a subject name.");
    elements.subjectNameInput?.focus();
    return;
  }

  if (subjectNameExists(subjectName)) {
    setSubjectFormError("This subject already exists.");
    elements.subjectNameInput?.focus();
    return;
  }

  const subject = subjects.find((item) => {
    return item.id === editingSubjectId;
  });

  if (!subject) {
    return;
  }

  clearSubjectFormError();

  subject.name = subjectName;
  subject.color = selectedColor;

  saveSubjects(subjects);
  notifyDataUpdated();
  closeAllModals();
  resetSubjectForm();
}

function deleteSubject(subjectId) {
  const tasks = loadTasks();

  const associatedTasks = tasks.filter((task) => {
    return task.subjectId === subjectId;
  });

  const confirmationMessage =
    associatedTasks.length > 0
      ? `This subject has ${associatedTasks.length} task(s). Deleting it will also delete all associated tasks. Continue?`
      : "Are you sure you want to delete this subject?";

  const confirmDelete = confirm(
    confirmationMessage
  );

  if (!confirmDelete) {
    return;
  }

  subjects = subjects.filter((subject) => {
    return subject.id !== subjectId;
  });

  const remainingTasks = tasks.filter((task) => {
    return task.subjectId !== subjectId;
  });

  saveSubjects(subjects);
  saveTasks(remainingTasks);
  notifyDataUpdated();
}

function editSubject(subjectId) {
  const subject = subjects.find((item) => {
    return item.id === subjectId;
  });

  if (subject) {
    openSubjectEditor(subject);
  }
}

function saveSubjectFromForm() {
  if (editingSubjectId === null) {
    addSubject();
    return;
  }

  updateSubject();
}

// ---------- Subject event listeners ----------

function setupSubjectForm() {
  if (elements.saveSubjectButton) {
    elements.saveSubjectButton.addEventListener(
      "click",
      saveSubjectFromForm
    );
  }

  elements.subjectNameInput?.addEventListener(
    "input",
    clearSubjectFormError
  );

  elements.subjectColorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedButtonColor =
        getColorFromButton(button);

      setSelectedColor(selectedButtonColor);
      clearSubjectFormError();
    });
  });
}

// ---------- Subject initialization ----------

export function initSubjects() {
  subjects = loadSubjects();

  setupSubjectForm();
  setSelectedColor(selectedColor);
  renderSubjects();

  onDataUpdated(() => {
    subjects = loadSubjects();
    renderSubjects();
  });
}