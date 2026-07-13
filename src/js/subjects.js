import { closeAllModals, openModal } from "./modal.js";
import { loadSubjects, saveSubjects } from "./storage.js";

const COLOR_CLASSES = {
  "purple-dot": "purple",
  "blue-dot": "blue",
  "green-dot": "green",
  "coral-dot": "coral",
  "amber-dot": "amber",
  "teal-dot": "teal",
  "stone-dot": "stone",
};

const elements = {
  subjectNameInput: document.querySelector(
    "#subject-modal input[type='text']"
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

function getColorFromButton(button) {
  const colorClass = Object.keys(COLOR_CLASSES).find((className) => {
    return button.classList.contains(className);
  });

  return COLOR_CLASSES[colorClass] || "purple";
}

function setSelectedColor(colorName) {
  selectedColor = colorName;

  elements.subjectColorButtons.forEach((button) => {
    const buttonColor = getColorFromButton(button);

    button.classList.toggle(
      "is-selected",
      buttonColor === selectedColor
    );
  });
}

export function resetSubjectForm() {
  if (elements.subjectNameInput) {
    elements.subjectNameInput.value = "";
  }

  editingSubjectId = null;
  setSelectedColor("purple");
}

function openSubjectEditor(subject) {
  if (!elements.subjectNameInput) {
    return;
  }

  elements.subjectNameInput.value = subject.name;
  editingSubjectId = subject.id;

  setSelectedColor(subject.color);
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

function createSubjectCard(subject) {
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

  card.classList.add("subject-card");

  colorDot.classList.add(
    "subject-color-dot",
    `${subject.color}-dot`
  );

  title.textContent = subject.name;
  details.textContent = "0 tasks - 0 completed";

  progressRow.classList.add("progress-row");
  progressText.textContent = "0%";

  progressTrack.classList.add("progress-track");

  progressFill.classList.add(
    "progress-fill",
    subject.color
  );

  progressFill.style.width = "0%";

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

  subjects.forEach((subject) => {
    const subjectCard = createSubjectCard(subject);

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
    return;
  }

  if (subjectNameExists(subjectName)) {
    alert("This subject already exists.");
    return;
  }

  const newSubject = {
    id: Date.now(),
    name: subjectName,
    color: selectedColor,
  };

  subjects.push(newSubject);

  saveSubjects(subjects);
  renderSubjects();
  closeAllModals();
  resetSubjectForm();
}

function updateSubject() {
  const subjectName = getSubjectNameFromForm();

  if (subjectName === "") {
    return;
  }

  if (subjectNameExists(subjectName)) {
    alert("This subject already exists.");
    return;
  }

  const subject = subjects.find((item) => {
    return item.id === editingSubjectId;
  });

  if (!subject) {
    return;
  }

  subject.name = subjectName;
  subject.color = selectedColor;

  saveSubjects(subjects);
  renderSubjects();
  closeAllModals();
  resetSubjectForm();
}

function deleteSubject(subjectId) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this subject?"
  );

  if (!confirmDelete) {
    return;
  }

  subjects = subjects.filter((subject) => {
    return subject.id !== subjectId;
  });

  saveSubjects(subjects);
  renderSubjects();
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

  elements.subjectColorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedButtonColor =
        getColorFromButton(button);

      setSelectedColor(selectedButtonColor);
    });
  });
}

// ---------- Subject initialization ----------

export function initSubjects() {
  subjects = loadSubjects();

  setupSubjectForm();
  setSelectedColor(selectedColor);
  renderSubjects();
}