# UC05 – Edit Task

## Goal

Allow the user to edit an existing task associated with a subject.

---

## Primary Actor

User

---

## Preconditions

- The subject must already be registered in the system.
- The task must already be registered within the selected subject.
- The user is on the Subject page.

---

## Main Flow

1. The user clicks the **"Edit Task"** button.
2. The system displays the task editing form.
3. The user updates the task name.
4. The user optionally updates the task description.
5. The user optionally enables or disables the deadline option.
6. The user enters or updates the due date, if applicable.
7. The user confirms the task update.
8. The system verifies that the task name is not empty.
9. The system verifies that no other task with the same name already exists within the selected subject.
10. If the deadline option is enabled, the system verifies that a due date was provided.
11. The system verifies that changes have been made.
12. The system updates the task information.
13. The system displays the updated task in the selected subject.

---

## Alternative Flows

### AF01 – No Changes Detected

1. The user submits the task without making any changes.
2. The system displays a message informing that no changes were detected.
3. The editing process is canceled.
4. The task remains unchanged.

---

### AF02 – Empty Task Name

1. The user submits the form without entering a task name.
2. The system displays an error message informing the user that the task name is required.
3. The user enters a valid task name.
4. The user submits the form again.
5. The system continues the validation process.

---

### AF03 – Duplicate Task Name

1. The user enters the name of an existing task within the selected subject.
2. The system displays an error message informing the user that the task already exists in the selected subject.
3. The user enters a different task name.
4. The user submits the form again.
5. The system continues the validation process.

---

### AF04 – Missing Due Date

1. The user enables the deadline option but does not provide a due date.
2. The system displays an error message informing the user that a due date is required.
3. The user enters a valid due date or disables the deadline option.
4. The user submits the form again.
5. The system continues the validation process.

---

## Postconditions

- The task is successfully updated.
- The task remains associated with the selected subject.
- The updated task is displayed in the selected subject.
- The user can mark the task as completed.