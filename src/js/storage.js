const STORAGE_KEYS = {
  subjects: "subjects",
  tasks: "tasks",
};

// ---------- Subjects ----------

export function saveSubjects(subjects) {
  localStorage.setItem(
    STORAGE_KEYS.subjects,
    JSON.stringify(subjects)
  );
}

export function loadSubjects() {
  try {
    const savedSubjects = localStorage.getItem(
      STORAGE_KEYS.subjects
    );

    if (!savedSubjects) {
      return [];
    }

    const parsedSubjects = JSON.parse(savedSubjects);

    return Array.isArray(parsedSubjects)
      ? parsedSubjects
      : [];
  } catch (error) {
    console.error("Unable to load subjects:", error);
    return [];
  }
}

// ---------- Tasks ----------

export function saveTasks(tasks) {
  localStorage.setItem(
    STORAGE_KEYS.tasks,
    JSON.stringify(tasks)
  );
}

export function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(
      STORAGE_KEYS.tasks
    );

    if (!savedTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(savedTasks);

    return Array.isArray(parsedTasks)
      ? parsedTasks
      : [];
  } catch (error) {
    console.error("Unable to load tasks:", error);
    return [];
  }
}