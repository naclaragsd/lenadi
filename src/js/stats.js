export function calculateProgress(tasks) {
  if (tasks.length === 0) {
    return 0;
  }

  const completed = tasks.filter((task) => {
    return task.completed;
  }).length;

  return Math.round(
    (completed / tasks.length) * 100
  );
}

export function getTaskStats(tasks) {
  const completed = tasks.filter((task) => {
    return task.completed;
  }).length;

  return {
    total: tasks.length,
    completed,
    pending: tasks.length - completed,
    progress: calculateProgress(tasks),
  };
}

export function getSubjectStats(
  subjectId,
  tasks
) {
  const subjectTasks = tasks.filter((task) => {
    return task.subjectId === subjectId;
  });

  return getTaskStats(subjectTasks);
}

export function getSubjectSummaries(
  subjects,
  tasks
) {
  return subjects.map((subject) => {
    return {
      ...subject,
      ...getSubjectStats(subject.id, tasks),
    };
  });
}