# UC03 – Delete Subject

## Goal

Allow the student to permanently delete an existing subject.

---

## Primary Actor

student

---

## Preconditions

- The subject must already be registered in the system.

---

## Main Flow

1. The student clicks the **"Delete Subject"** button.
2. The system displays a confirmation dialog.
3. The system informs the student that all tasks associated with the selected subject will also be permanently deleted.
4. The student confirms the deletion.
5. The system deletes the subject.
6. The system deletes all tasks associated with the subject.
7. The system updates the subject list.
8. The system displays the updated subject list.

---

## Alternative Flows

### AF01 – Deletion Canceled

1. The student cancels the deletion.
2. The system closes the confirmation dialog.
3. The deletion is canceled.
4. The subject and its tasks remain unchanged.

---

## Postconditions

- The subject is permanently deleted.
- All tasks associated with the deleted subject are permanently removed.