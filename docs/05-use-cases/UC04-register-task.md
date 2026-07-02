# UC04 – Register Task

## Goal

Allow the user to create a new task associated with a subject.

---

## Primary Actor

User

---

## Preconditions

- The subject must already be registered in the system.
- The user is on the Subjects page.

---

## Main Flow

1. The user clicks the **"Add Task"** button for a subject.
2. The system displays the task registration form.
3. The user enters the task name.
4. The user optionally enters a task description.
5. The user optionally enables the deadline option.
6. The user enters a due date, if applicable.
7. The user confirms the task registration.
8. The system verifies that the task name is not empty.
9. The system verifies that no task with the same name already exists within the selected subject.
10. If the deadline option is enabled, the system verifies that a due date was provided.
11. The system creates the new task.
12. The system displays the task in the selected subject with the **Pending** status.

---

## Alternative Flows

### AF01 – Empty Task Name

1. The user submits the form without entering a task name.
2. The system displays an error message informing the user that the task name is required.
3. The user enters a valid task name.
4. The user submits the form again.
5. The system continues the validation process.

---

### AF02 – Duplicate Task Name

1. The user enters the name of an existing task within the selected subject.
2. The system displays an error message informing the user that the task already exists in the selected subject.
3. The user enters a different task name.
4. The user submits the form again.
5. The system continues the validation process.

---

### AF03 – Missing Due Date

1. The user enables the deadline option but does not provide a due date.
2. The system displays an error message informing the user that a due date is required.
3. The user enters a valid due date or disables the deadline option.
4. The user submits the form again.
5. The system continues the validation process.

---

## Postconditions

- The new task is successfully created.
- The task is associated with the selected subject.
- The task is displayed with the **Pending** status.
- The user can mark the task as completed.