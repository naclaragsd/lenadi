import { onDataUpdated } from "./events.js";
import {
  loadSubjects,
  loadTasks,
} from "./storage.js";
import {
  getSubjectStats,
  getTaskStats,
} from "./stats.js";

const elements = {
  progressText: document.querySelector(
    "#dashboard-progress-text"
  ),
  progressStatus: document.querySelector(
    "#dashboard-progress-status"
  ),
  progressTrack: document.querySelector(
    "#dashboard-progress-track"
  ),
  progressFill: document.querySelector(
    "#dashboard-progress-fill"
  ),
  totalSubjects: document.querySelector(
    "#dashboard-total-subjects"
  ),
  totalTasks: document.querySelector(
    "#dashboard-total-tasks"
  ),
  completedTasks: document.querySelector(
    "#dashboard-completed-tasks"
  ),
  pendingTasks: document.querySelector(
    "#dashboard-pending-tasks"
  ),
  todayCount: document.querySelector(
    "#dashboard-today-count"
  ),
  todayTasks: document.querySelector(
    "#dashboard-today-tasks"
  ),
  subjects: document.querySelector(
    "#dashboard-subjects"
  ),
};

function getTodayValue() {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getProgressStatus(stats) {
  if (stats.total === 0) {
    return {
      text: "No tasks yet",
      className: "pending",
    };
  }

  if (stats.progress === 100) {
    return {
      text: "Completed",
      className: "positive",
    };
  }

  return {
    text: "In progress",
    className: "pending",
  };
}

function renderSummary(
  subjects,
  tasks
) {
  const stats = getTaskStats(tasks);
  const status = getProgressStatus(stats);

  if (elements.progressText) {
    elements.progressText.textContent =
      `${stats.progress}% completed`;
  }

  if (elements.progressStatus) {
    elements.progressStatus.textContent =
      status.text;

    elements.progressStatus.classList.remove(
      "positive",
      "pending"
    );

    elements.progressStatus.classList.add(
      status.className
    );
  }

  if (elements.progressTrack) {
    elements.progressTrack.setAttribute(
      "aria-label",
      `Overall progress ${stats.progress} percent`
    );
  }

  if (elements.progressFill) {
    elements.progressFill.style.width =
      `${stats.progress}%`;
  }

  if (elements.totalSubjects) {
    elements.totalSubjects.textContent =
      subjects.length;
  }

  if (elements.totalTasks) {
    elements.totalTasks.textContent =
      stats.total;
  }

  if (elements.completedTasks) {
    elements.completedTasks.textContent =
      stats.completed;
  }

  if (elements.pendingTasks) {
    elements.pendingTasks.textContent =
      stats.pending;
  }
}

function createTodayTaskItem(
  task,
  subjectsById
) {
  const item = document.createElement("li");
  const checkbox = document.createElement("span");
  const content = document.createElement("div");
  const title = document.createElement("strong");
  const details = document.createElement("p");

  const subject = subjectsById.get(
    task.subjectId
  );

  checkbox.classList.add("checkbox-visual");
  checkbox.setAttribute("aria-hidden", "true");

  if (task.completed) {
    checkbox.classList.add("checked");
  }

  title.textContent = task.title;

  details.textContent =
    `${subject?.name || "Deleted subject"} - Today`;

  content.append(title, details);
  item.append(checkbox, content);

  return item;
}

function renderTodayTasks(
  subjects,
  tasks
) {
  if (!elements.todayTasks) {
    return;
  }

  const today = getTodayValue();

  const todayTasks = tasks
    .filter((task) => {
      return task.dueDate === today;
    })
    .sort((firstTask, secondTask) => {
      return Number(firstTask.completed) -
        Number(secondTask.completed);
    });

  elements.todayTasks.innerHTML = "";

  if (elements.todayCount) {
    const countLabel =
      todayTasks.length === 1
        ? "1 item"
        : `${todayTasks.length} items`;

    elements.todayCount.textContent =
      countLabel;
  }

  if (todayTasks.length === 0) {
    const emptyMessage =
      document.createElement("li");

    emptyMessage.classList.add(
      "dashboard-empty-message"
    );

    emptyMessage.textContent =
      "No tasks are due today.";

    elements.todayTasks.appendChild(
      emptyMessage
    );

    return;
  }

  const subjectsById = new Map(
    subjects.map((subject) => {
      return [subject.id, subject];
    })
  );

  todayTasks.slice(0, 4).forEach((task) => {
    elements.todayTasks.appendChild(
      createTodayTaskItem(
        task,
        subjectsById
      )
    );
  });
}

function createSubjectOverviewCard(
  subject,
  tasks
) {
  const card = document.createElement("article");
  const name = document.createElement("span");
  const progress = document.createElement("strong");

  const stats = getSubjectStats(
    subject.id,
    tasks
  );

  card.classList.add(
    "mini-subject-card",
    `${subject.color}-soft`
  );

  name.textContent = subject.name;
  progress.textContent = `${stats.progress}%`;

  card.append(name, progress);

  return card;
}

function renderSubjectOverview(
  subjects,
  tasks
) {
  if (!elements.subjects) {
    return;
  }

  elements.subjects.innerHTML = "";

  if (subjects.length === 0) {
    const emptyMessage =
      document.createElement("p");

    emptyMessage.classList.add("empty-message");

    emptyMessage.textContent =
      "Create a subject to start tracking your progress.";

    elements.subjects.appendChild(emptyMessage);
    return;
  }

  subjects.slice(0, 4).forEach((subject) => {
    elements.subjects.appendChild(
      createSubjectOverviewCard(
        subject,
        tasks
      )
    );
  });
}

export function renderDashboard() {
  const subjects = loadSubjects();
  const tasks = loadTasks();

  renderSummary(subjects, tasks);
  renderTodayTasks(subjects, tasks);
  renderSubjectOverview(subjects, tasks);
}

export function initDashboard() {
  renderDashboard();
  onDataUpdated(renderDashboard);
}