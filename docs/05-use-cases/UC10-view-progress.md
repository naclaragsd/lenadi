# UC10 – View Progress

## Goal

Allow the student to view their overall study progress and the individual progress of each registered subject.

---

## Primary Actor

Student

---

## Preconditions

- The student has accessed the Lenadi application.

---

## Main Flow

1. The student selects the **Progress** option in the sidebar.
2. The system loads the registered subjects and tasks.
3. The system calculates the overall progress based on completed tasks.
4. The system displays the overall progress percentage and the number of completed tasks.
5. The system calculates the progress of each registered subject.
6. The system displays the completed and pending task counts for each subject.
7. The system displays the best-performing subject and the subject that requires the most attention.
8. The student views the progress information.

---

## Alternative Flows

### AF01 – No Subjects Registered

1. The student accesses the **Progress** view.
2. The system identifies that no subjects are registered.
3. The system displays the overall progress as 0%.
4. The system displays a message instructing the student to create a subject.

### AF02 – Subjects Without Tasks

1. The student accesses the **Progress** view.
2. The system identifies that subjects exist but no tasks are registered.
3. The system displays the overall progress as 0%.
4. The system displays each subject with 0% progress.
5. The system informs the student that there is not enough data to identify the best-performing subject.

### AF03 – No Pending Tasks

1. The system identifies that there are no pending tasks.
2. The system displays a message indicating that no tasks are pending.

---

## Postconditions

- The current overall and subject progress is displayed.
- The displayed information reflects the subjects and tasks stored in the system.
- No subject or task data is changed.