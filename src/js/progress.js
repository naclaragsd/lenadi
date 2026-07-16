import { onDataUpdated } from "./events.js";
import {
  loadSubjects,
  loadTasks,
} from "./storage.js";
import {
  getSubjectSummaries,
  getTaskStats,
} from "./stats.js";

const elements = {
  overallText: document.querySelector(
    "#progress-overall-text"
  ),
  fraction: document.querySelector(
    "#progress-fraction"
  ),
  track: document.querySelector(
    "#progress-overall-track"
  ),
  fill: document.querySelector(
    "#progress-overall-fill"
  ),
  subjectList: document.querySelector(
    "#subject-progress-list"
  ),
  bestSubject: document.querySelector(
    "#best-subject"
  ),
  completedTasks: document.querySelector(
    "#progress-completed-tasks"
  ),
  pendingFocus: document.querySelector(
    "#pending-focus"
  ),
};

function createSubjectProgressItem(summary) {
  const item = document.createElement("div");
  const information = document.createElement("div");
  const name = document.createElement("strong");
  const details = document.createElement("span");
  const percentage = document.createElement("b");
  const track = document.createElement("div");
  const fill = document.createElement("span");

  item.classList.add("subject-progress-item");

  name.textContent = summary.name;

  details.textContent =
    `${summary.completed} completed - ${summary.pending} pending`;

  percentage.textContent =
    `${summary.progress}%`;

  track.classList.add("progress-track");
  track.setAttribute(
    "aria-label",
    `${summary.name} progress ${summary.progress} percent`
  );

  fill.classList.add(
    "progress-fill",
    summary.color
  );

  fill.style.width =
    `${summary.progress}%`;

  information.append(name, details);
  track.appendChild(fill);
  item.append(information, percentage, track);

  return item;
}

function renderSubjectProgress(summaries) {
  if (!elements.subjectList) {
    return;
  }

  elements.subjectList.innerHTML = "";

  if (summaries.length === 0) {
    const emptyMessage =
      document.createElement("p");

    emptyMessage.classList.add("empty-message");

    emptyMessage.textContent =
      "No subjects yet. Create a subject to start tracking progress.";

    elements.subjectList.appendChild(
      emptyMessage
    );

    return;
  }

  summaries.forEach((summary) => {
    elements.subjectList.appendChild(
      createSubjectProgressItem(summary)
    );
  });
}

function getBestSubject(summaries) {
  const subjectsWithTasks = summaries.filter(
    (summary) => {
      return summary.total > 0;
    }
  );

  if (subjectsWithTasks.length === 0) {
    return "No data yet";
  }

  return subjectsWithTasks.reduce(
    (bestSubject, currentSubject) => {
      if (
        currentSubject.progress >
        bestSubject.progress
      ) {
        return currentSubject;
      }

      if (
        currentSubject.progress ===
          bestSubject.progress &&
        currentSubject.completed >
          bestSubject.completed
      ) {
        return currentSubject;
      }

      return bestSubject;
    }
  ).name;
}

function getPendingFocus(summaries) {
  const subjectsWithPendingTasks =
    summaries.filter((summary) => {
      return summary.pending > 0;
    });

  if (subjectsWithPendingTasks.length === 0) {
    return "No pending tasks";
  }

  return subjectsWithPendingTasks.reduce(
    (currentFocus, currentSubject) => {
      return currentSubject.pending >
        currentFocus.pending
        ? currentSubject
        : currentFocus;
    }
  ).name;
}

export function renderProgress() {
  const subjects = loadSubjects();
  const tasks = loadTasks();
  const stats = getTaskStats(tasks);

  const summaries = getSubjectSummaries(
    subjects,
    tasks
  );

  if (elements.overallText) {
    elements.overallText.textContent =
      `${stats.progress}% overall`;
  }

  if (elements.fraction) {
    elements.fraction.textContent =
      `${stats.completed}/${stats.total}`;
  }

  if (elements.track) {
    elements.track.setAttribute(
      "aria-label",
      `Overall progress ${stats.progress} percent`
    );
  }

  if (elements.fill) {
    elements.fill.style.width =
      `${stats.progress}%`;
  }

  if (elements.bestSubject) {
    elements.bestSubject.textContent =
      getBestSubject(summaries);
  }

  if (elements.completedTasks) {
    elements.completedTasks.textContent =
      stats.completed;
  }

  if (elements.pendingFocus) {
    elements.pendingFocus.textContent =
      getPendingFocus(summaries);
  }

  renderSubjectProgress(summaries);
}

export function initProgress() {
  renderProgress();
  onDataUpdated(renderProgress);
}