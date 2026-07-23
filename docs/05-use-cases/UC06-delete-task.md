# UC06 – Delete Task

## Goal

Allow the student to permanently delete an existing task.

---

## Primary Actor

student

---

## Preconditions

- The subject must already be registered in the system.
- The task must already be registered within the selected subject.
- The student is on the Subject page.

---

## Main Flow

1. The student clicks the **"Delete Task"** button.
2. The system displays a task deletion confirmation dialog.
3. The student confirms the deletion.
4. The system deletes the task.
5. The system updates the task list.
6. The system displays the updated task list.

---

## Alternative Flows

### AF01 – Deletion Canceled

1. The student cancels the deletion.
2. The system closes the confirmation dialog.
3. The deletion is canceled.
4. The task remains associated with the selected subject.

---

## Postconditions

- The task is permanently deleted.
- The task is removed from the selected subject.