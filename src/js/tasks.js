import { closeAllModals, openModal } from "./modal.js";
import {
  loadSubjects,
  loadTasks,
  saveTasks,
} from "./storage.js";

// ---------- DOM elements ----------

const elements = {
  taskModalTitle: document.querySelector(
    "#task-modal-title"
  ),

  taskTitleInput: document.querySelector(
    "#task-title-input"
  ),

  taskSubjectSelect: document.querySelector(
    "#task-subject-select"
  ),

  taskDueDateInput: document.querySelector(
    "#task-due-date-input"
  ),

  taskDescriptionInput: document.querySelector(
    "#task-description-input"
  ),

  saveTaskButton: document.querySelector(
    "#save-task-button"
  ),

  addTaskButton: document.querySelector(
    '[data-modal-target="task-modal"]'
  ),

  tasksNavButton: document.querySelector(
    '[data-section="tasks"]'
  ),

  taskList: document.querySelector(
    ".task-list"
  ),

  subjectFilter: document.querySelector(
    "#task-subject-filter"
  ),

  statusFilter: document.querySelector(
    "#task-status-filter"
  ),

  taskDetailsTitle: document.querySelector(
    "#task-details-title"
  ),

  taskDetailsSubject: document.querySelector(
    "#task-details-subject"
  ),

  taskDetailsDueDate: document.querySelector(
    "#task-details-due-date"
  ),

  taskDetailsStatus: document.querySelector(
    "#task-details-status"
  ),

  taskDetailsDescription: document.querySelector(
    "#task-details-description"
  ),

  editTaskDetailsButton: document.querySelector(
    "#edit-task-details-button"
  ),

  deleteTaskDetailsButton: document.querySelector(
    "#delete-task-details-button"
  ),
};

// ---------- State ----------

let tasks = [];
let editingTaskId = null;
let selectedTaskId = null;

// ---------- Subject options ----------

function createOption(value, text) {
  const option = document.createElement("option");

  option.value = value;
  option.textContent = text;

  return option;
}

function populateTaskSubjectSelect(
  selectedSubjectId = ""
) {
  if (!elements.taskSubjectSelect) {
    return;
  }

  const subjects = loadSubjects();

  elements.taskSubjectSelect.innerHTML = "";

  if (subjects.length === 0) {
    elements.taskSubjectSelect.appendChild(
      createOption(
        "",
        "Create a subject first"
      )
    );

    elements.taskSubjectSelect.disabled = true;

    if (elements.saveTaskButton) {
      elements.saveTaskButton.disabled = true;
    }

    return;
  }

  const placeholderOption = createOption(
    "",
    "Select a subject"
  );

  placeholderOption.disabled = true;
  placeholderOption.selected =
    selectedSubjectId === "";

  elements.taskSubjectSelect.appendChild(
    placeholderOption
  );

  subjects.forEach((subject) => {
    elements.taskSubjectSelect.appendChild(
      createOption(
        String(subject.id),
        subject.name
      )
    );
  });

  elements.taskSubjectSelect.disabled = false;

  if (elements.saveTaskButton) {
    elements.saveTaskButton.disabled = false;
  }

  if (selectedSubjectId !== "") {
    elements.taskSubjectSelect.value =
      String(selectedSubjectId);
  }
}

function populateSubjectFilter() {
  if (!elements.subjectFilter) {
    return;
  }

  const previousValue =
    elements.subjectFilter.value || "all";

  const subjects = loadSubjects();

  elements.subjectFilter.innerHTML = "";

  elements.subjectFilter.appendChild(
    createOption(
      "all",
      "All subjects"
    )
  );

  subjects.forEach((subject) => {
    elements.subjectFilter.appendChild(
      createOption(
        String(subject.id),
        subject.name
      )
    );
  });

  const previousOptionStillExists = Array.from(
    elements.subjectFilter.options
  ).some((option) => {
    return option.value === previousValue;
  });

  elements.subjectFilter.value =
    previousOptionStillExists
      ? previousValue
      : "all";
}

// ---------- Task form ----------

export function resetTaskForm() {
  if (elements.taskTitleInput) {
    elements.taskTitleInput.value = "";
  }

  if (elements.taskDueDateInput) {
    elements.taskDueDateInput.value = "";
  }

  if (elements.taskDescriptionInput) {
    elements.taskDescriptionInput.value = "";
  }

  if (elements.taskModalTitle) {
    elements.taskModalTitle.textContent =
      "Add Task";
  }

  editingTaskId = null;

  populateTaskSubjectSelect();
}

export function resetTaskDetails() {
  selectedTaskId = null;

  if (elements.taskDetailsTitle) {
    elements.taskDetailsTitle.textContent = "";
  }

  if (elements.taskDetailsSubject) {
    elements.taskDetailsSubject.textContent = "";
  }

  if (elements.taskDetailsDueDate) {
    elements.taskDetailsDueDate.textContent = "";
  }

  if (elements.taskDetailsDescription) {
    elements.taskDetailsDescription.textContent = "";
  }

  if (elements.taskDetailsStatus) {
    elements.taskDetailsStatus.textContent = "";

    elements.taskDetailsStatus.classList.remove(
      "positive",
      "pending"
    );
  }
}

function getTaskFormData() {
  return {
    title: elements.taskTitleInput
      ? elements.taskTitleInput.value.trim()
      : "",

    subjectId: elements.taskSubjectSelect
      ? Number(
          elements.taskSubjectSelect.value
        )
      : 0,

    dueDate: elements.taskDueDateInput
      ? elements.taskDueDateInput.value
      : "",

    description: elements.taskDescriptionInput
      ? elements.taskDescriptionInput.value.trim()
      : "",
  };
}

function taskNameExists(taskData) {
  return tasks.some((task) => {
    const hasSameTitle =
      task.title.toLowerCase() ===
      taskData.title.toLowerCase();

    const hasSameSubject =
      task.subjectId === taskData.subjectId;

    const isDifferentTask =
      task.id !== editingTaskId;

    return (
      hasSameTitle &&
      hasSameSubject &&
      isDifferentTask
    );
  });
}

function validateTask(taskData) {
  if (taskData.title === "") {
    alert("Enter a title for the task.");
    return false;
  }

  if (!taskData.subjectId) {
    alert("Select a subject.");
    return false;
  }

  if (taskNameExists(taskData)) {
    alert(
      "A task with this title already exists in the selected subject."
    );

    return false;
  }

  return true;
}

// ---------- Task actions ----------

function addTask(taskData) {
  const newTask = {
    id: Date.now(),
    title: taskData.title,
    subjectId: taskData.subjectId,
    dueDate: taskData.dueDate,
    description: taskData.description,
    completed: false,
  };

  tasks.push(newTask);

  saveTasks(tasks);
  renderTasks();
  closeAllModals();
}

function updateTask(taskData) {
  const task = tasks.find((item) => {
    return item.id === editingTaskId;
  });

  if (!task) {
    return;
  }

  const hasChanges =
    task.title !== taskData.title ||
    task.subjectId !== taskData.subjectId ||
    task.dueDate !== taskData.dueDate ||
    task.description !== taskData.description;

  if (!hasChanges) {
    alert("No changes were detected.");
    return;
  }

  task.title = taskData.title;
  task.subjectId = taskData.subjectId;
  task.dueDate = taskData.dueDate;
  task.description = taskData.description;

  saveTasks(tasks);
  renderTasks();
  closeAllModals();
}

function saveTaskFromForm() {
  const taskData = getTaskFormData();

  if (!validateTask(taskData)) {
    return;
  }

  if (editingTaskId === null) {
    addTask(taskData);
    return;
  }

  updateTask(taskData);
}

function editTask(taskId) {
  const task = tasks.find((item) => {
    return item.id === taskId;
  });

  if (!task) {
    return;
  }

  editingTaskId = task.id;

  if (elements.taskModalTitle) {
    elements.taskModalTitle.textContent =
      "Edit Task";
  }

  if (elements.taskTitleInput) {
    elements.taskTitleInput.value =
      task.title;
  }

  if (elements.taskDueDateInput) {
    elements.taskDueDateInput.value =
      task.dueDate || "";
  }

  if (elements.taskDescriptionInput) {
    elements.taskDescriptionInput.value =
      task.description || "";
  }

  populateTaskSubjectSelect(
    task.subjectId
  );

  openModal("task-modal");
}

function deleteTask(taskId) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmDelete) {
    return false;
  }

  tasks = tasks.filter((task) => {
    return task.id !== taskId;
  });

  saveTasks(tasks);
  renderTasks();

  return true;
}

function toggleTaskCompleted(taskId) {
  const task = tasks.find((item) => {
    return item.id === taskId;
  });

  if (!task) {
    return;
  }

  task.completed = !task.completed;

  saveTasks(tasks);
  renderTasks();
}

// ---------- Date formatting ----------

function createDateFromValue(dateValue) {
  const [year, month, day] = dateValue
    .split("-")
    .map(Number);

  return new Date(
    year,
    month - 1,
    day
  );
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "No due date";
  }

  const date =
    createDateFromValue(dateValue);

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "2-digit",
    }
  ).format(date);
}

function formatFullDate(dateValue) {
  if (!dateValue) {
    return "No due date";
  }

  const date =
    createDateFromValue(dateValue);

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }
  ).format(date);
}

// ---------- Task details ----------

function openTaskDetails(taskId) {
  const task = tasks.find((item) => {
    return item.id === taskId;
  });

  if (!task) {
    return;
  }

  const subjects = loadSubjects();

  const subject = subjects.find((item) => {
    return item.id === task.subjectId;
  });

  selectedTaskId = task.id;

  if (elements.taskDetailsTitle) {
    elements.taskDetailsTitle.textContent =
      task.title;
  }

  if (elements.taskDetailsSubject) {
    elements.taskDetailsSubject.textContent =
      subject
        ? subject.name
        : "Deleted subject";
  }

  if (elements.taskDetailsDueDate) {
    elements.taskDetailsDueDate.textContent =
      formatFullDate(task.dueDate);
  }

  if (elements.taskDetailsDescription) {
    elements.taskDetailsDescription.textContent =
      task.description ||
      "No description provided.";
  }

  if (elements.taskDetailsStatus) {
    elements.taskDetailsStatus.textContent =
      task.completed
        ? "Completed"
        : "Pending";

    elements.taskDetailsStatus.classList.remove(
      "positive",
      "pending"
    );

    elements.taskDetailsStatus.classList.add(
      task.completed
        ? "positive"
        : "pending"
    );
  }

  openModal("task-details-modal");
}

// ---------- Task rendering ----------

function createEmptyTasksMessage(message) {
  const emptyMessage =
    document.createElement("p");

  emptyMessage.textContent = message;

  emptyMessage.classList.add(
    "empty-message"
  );

  return emptyMessage;
}

function addToggleKeyboardBehavior(
  checkbox,
  taskId
) {
  checkbox.addEventListener(
    "keydown",
    (event) => {
      const isActivationKey =
        event.key === "Enter" ||
        event.key === " ";

      if (!isActivationKey) {
        return;
      }

      event.preventDefault();

      toggleTaskCompleted(taskId);
    }
  );
}

function addDetailsKeyboardBehavior(
  taskMain,
  taskId
) {
  taskMain.addEventListener(
    "keydown",
    (event) => {
      const isActivationKey =
        event.key === "Enter" ||
        event.key === " ";

      if (!isActivationKey) {
        return;
      }

      event.preventDefault();

      openTaskDetails(taskId);
    }
  );
}

function createTaskItem(
  task,
  subjectsById
) {
  const taskItem =
    document.createElement("article");

  const checkbox =
    document.createElement("span");

  const taskMain =
    document.createElement("div");

  const title =
    document.createElement("h3");

  const subjectLabel =
    document.createElement("span");

  const dueDate =
    document.createElement("span");

  const status =
    document.createElement("span");

  const subject =
    subjectsById.get(task.subjectId) || {
      name: "Deleted subject",
      color: "stone",
    };

  taskItem.classList.add("task-item");

  // Completion checkbox

  checkbox.classList.add(
    "checkbox-visual"
  );

  if (task.completed) {
    checkbox.classList.add("checked");
  }

  checkbox.setAttribute(
    "role",
    "checkbox"
  );

  checkbox.setAttribute(
    "aria-checked",
    String(task.completed)
  );

  checkbox.setAttribute(
    "aria-label",
    task.completed
      ? `Mark ${task.title} as pending`
      : `Mark ${task.title} as completed`
  );

  checkbox.tabIndex = 0;

  checkbox.addEventListener(
    "click",
    () => {
      toggleTaskCompleted(task.id);
    }
  );

  addToggleKeyboardBehavior(
    checkbox,
    task.id
  );

  // Clickable task information

  taskMain.classList.add("task-main");

  taskMain.setAttribute(
    "role",
    "button"
  );

  taskMain.setAttribute(
    "tabindex",
    "0"
  );

  taskMain.setAttribute(
    "aria-label",
    `View details for ${task.title}`
  );

  taskMain.addEventListener(
    "click",
    () => {
      openTaskDetails(task.id);
    }
  );

  addDetailsKeyboardBehavior(
    taskMain,
    task.id
  );

  title.textContent = task.title;

  subjectLabel.textContent =
    subject.name;

  subjectLabel.classList.add(
    "subject-label",
    `${subject.color}-label`
  );

  taskMain.append(
    title,
    subjectLabel
  );

  // Due date

  dueDate.classList.add(
    "due-date"
  );

  dueDate.textContent =
    formatDate(task.dueDate);

  // Status

  status.classList.add(
    "status-pill",
    task.completed
      ? "positive"
      : "pending"
  );

  status.textContent =
    task.completed
      ? "Completed"
      : "Pending";

  // Edit and Delete are available
  // only inside the details modal.

  taskItem.append(
    checkbox,
    taskMain,
    dueDate,
    status
  );

  return taskItem;
}

function getFilteredTasks() {
  const selectedSubject =
    elements.subjectFilter?.value ||
    "all";

  const selectedStatus =
    elements.statusFilter?.value ||
    "all";

  return tasks.filter((task) => {
    const matchesSubject =
      selectedSubject === "all" ||
      String(task.subjectId) ===
        selectedSubject;

    const matchesStatus =
      selectedStatus === "all" ||
      (
        selectedStatus === "completed" &&
        task.completed
      ) ||
      (
        selectedStatus === "pending" &&
        !task.completed
      );

    return (
      matchesSubject &&
      matchesStatus
    );
  });
}

function renderTasks() {
  if (!elements.taskList) {
    return;
  }

  elements.taskList.innerHTML = "";

  if (tasks.length === 0) {
    elements.taskList.appendChild(
      createEmptyTasksMessage(
        "No tasks yet. Create your first task and start planning your studies."
      )
    );

    return;
  }

  const filteredTasks =
    getFilteredTasks();

  if (filteredTasks.length === 0) {
    elements.taskList.appendChild(
      createEmptyTasksMessage(
        "No tasks match the selected filters."
      )
    );

    return;
  }

  const subjectsById = new Map(
    loadSubjects().map((subject) => {
      return [
        subject.id,
        subject,
      ];
    })
  );

  filteredTasks.forEach((task) => {
    const taskItem = createTaskItem(
      task,
      subjectsById
    );

    elements.taskList.appendChild(
      taskItem
    );
  });
}

// ---------- Event listeners ----------

function setupTaskEvents() {
  if (elements.saveTaskButton) {
    elements.saveTaskButton.addEventListener(
      "click",
      saveTaskFromForm
    );
  }

  if (elements.addTaskButton) {
    elements.addTaskButton.addEventListener(
      "click",
      resetTaskForm
    );
  }

  if (elements.subjectFilter) {
    elements.subjectFilter.addEventListener(
      "change",
      renderTasks
    );
  }

  if (elements.statusFilter) {
    elements.statusFilter.addEventListener(
      "change",
      renderTasks
    );
  }

  if (elements.tasksNavButton) {
    elements.tasksNavButton.addEventListener(
      "click",
      () => {
        populateSubjectFilter();
        renderTasks();
      }
    );
  }

  if (elements.editTaskDetailsButton) {
    elements.editTaskDetailsButton.addEventListener(
      "click",
      () => {
        if (selectedTaskId === null) {
          return;
        }

        const taskId =
          selectedTaskId;

        closeAllModals();
        editTask(taskId);
      }
    );
  }

  if (elements.deleteTaskDetailsButton) {
    elements.deleteTaskDetailsButton.addEventListener(
      "click",
      () => {
        if (selectedTaskId === null) {
          return;
        }

        const taskWasDeleted =
          deleteTask(selectedTaskId);

        if (taskWasDeleted) {
          closeAllModals();
        }
      }
    );
  }
}

// ---------- Initialization ----------

export function initTasks() {
  tasks = loadTasks();

  setupTaskEvents();
  populateTaskSubjectSelect();
  populateSubjectFilter();
  renderTasks();
}