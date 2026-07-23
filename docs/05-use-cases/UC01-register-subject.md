# UC01 – Register Subject

## Goal

Allow the student to register a new subject in the system.

---

## Primary Actor

Student

---

## Preconditions

- The system is running.
- The student is on the Subjects page.

---

## Main Flow

1. The student clicks the **"Add Subject"** button.
2. The system displays the subject registration form.
3. The student enters the subject name.
4. The student confirms the registration.
5. The system verifies that the subject name is not empty.
6. The system verifies that no subject with the same name already exists.
7. The system creates the new subject.
8. The system displays the subject in the subject list.

---

## Alternative Flows

### AF01 – Empty Subject Name

1. The student submits the form without entering a subject name.
2. The system displays an error message informing that the subject name is required.
3. The student enters a valid subject name.
4. The main flow resumes from Step 4.

---

### AF02 – Duplicate Subject Name

1. The student enters the name of an existing subject.
2. The system displays an error message informing that the subject already exists.
3. The student enters a different subject name.
4. The main flow resumes from Step 4.

---

## Postconditions

- The new subject is successfully created.
- The subject is available for task management.