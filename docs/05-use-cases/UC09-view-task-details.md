# UC09 – View Task Details

## Goal

Allow the student to view the complete information of a registered task.

---

## Primary Actor

student

---

## Preconditions

- The task must already be registered in the system.
- The student is on the Tasks page.

---

## Main Flow

1. The student clicks the main information area of a task.
2. The system identifies the selected task.
3. The system displays the task details modal.
4. The modal displays the task title, subject, status, due date when provided, and description when provided.
5. The modal provides options to edit or delete the task.
6. The student views the task information.
7. The student closes the modal.
8. The system returns to the task list.

---

## Alternative Flows

### AF01 – Edit Task

1. The student selects the edit option.
2. The system starts UC05 – Edit Task.

### AF02 – Delete Task

1. The student selects the delete option.
2. The system starts UC06 – Delete Task.

---

## Postconditions

- No task information is modified when the student only views the details.
- The student can return to the task list.
- The student can proceed to edit or delete the selected task.