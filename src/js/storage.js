const STORAGE_KEYS = {
  subjects: "subjects",
};

export function saveSubjects(subjects) {
  localStorage.setItem(
    STORAGE_KEYS.subjects,
    JSON.stringify(subjects)
  );
}

export function loadSubjects() {
  try {
    const savedSubjects = localStorage.getItem(STORAGE_KEYS.subjects);

    if (!savedSubjects) {
      return [];
    }

    const parsedSubjects = JSON.parse(savedSubjects);

    return Array.isArray(parsedSubjects) ? parsedSubjects : [];
  } catch (error) {
    console.error("Unable to load subjects:", error);
    return [];
  }
}