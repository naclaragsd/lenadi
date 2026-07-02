# UC02 – Edit Subject

## Goal

Allow the user to edit an existing subject.

---

## Primary Actor

User

---

## Preconditions

- The subject must already be registered in the system.

---

## Main Flow

1. The user clicks the **"Edit Subject"** button.
2. The system displays the subject editing form.
3. The user updates the subject information.
4. The user confirms the changes.
5. The system verifies that the subject name is not empty.
6. The system verifies that no other subject with the same name already exists.
7. The system verifies that changes have been made.
8. The system updates the subject information.
9. The system saves the updated subject.
10. The system displays the updated subject in the subject list.

---

## Alternative Flows

### AF01 – Empty Subject Name

1. The user submits the form without entering a subject name.
2. The system displays an error message informing that the subject name is required.
3. The user enters a valid subject name.
4. The main flow resumes from Step 4.

---

### AF02 – Duplicate Subject Name

1. The user enters the name of an existing subject.
2. The system displays an error message informing that the subject already exists.
3. The user enters a different subject name.
4. The main flow resumes from Step 4.

---

### AF03 – No Changes Detected

1. The user submits the form without making any changes.
2. The system displays a message informing that no changes were detected.
3. The user may:
   - make a valid change and continue the editing process; or
   - cancel the operation.

---

## Postconditions

- The subject information is successfully updated.
- The updated subject is available for task management.