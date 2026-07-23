# Version 1 Test Cases

## 1. Document Information

- **Project:** Lenadi
- **Version:** 1.0.0
- **Test type:** Functional, usability, persistence, responsive, and regression testing
- **Environment:** Local development server and Google Chrome
- **Execution date:** July 23, 2026
- **Overall result:** Approved

---

## 2. Purpose

This document records the test cases executed for Version 1 of Lenadi.

The tests verify whether the implemented features comply with the functional requirements, non-functional requirements, business rules, and documented use cases.

---

## 3. Test Summary

| Result | Quantity |
|---|---:|
| Passed | 29 |
| Failed | 0 |
| Blocked | 0 |
| **Total** | **29** |

---

## 4. Subject Management

| ID | Reference | Test Scenario | Steps | Expected Result | Status |
|---|---|---|---|---|---|
| TC01 | RF01, UC01 | Register a valid subject | Open Subjects, select Add Subject, enter a name and choose a color | The subject is created and displayed in the subject list | Passed |
| TC02 | BR01 | Register a subject without a name | Open Add Subject and save without entering a name | The system displays a validation message and does not create the subject | Passed |
| TC03 | BR02 | Register a duplicate subject | Create a subject and attempt to create another with the same name | The system displays a duplicate-subject validation message | Passed |
| TC04 | RF02, UC02 | Edit an existing subject | Open the subject editing form, change its name or color and save | The subject is updated and the new information is displayed | Passed |
| TC05 | RF03, UC03 | Cancel subject deletion | Select Delete and cancel the confirmation | The subject and its tasks remain unchanged | Passed |
| TC06 | BR18 | Delete a subject with associated tasks | Create a subject and task, select Delete and confirm | The system warns the user and deletes the subject and its associated tasks | Passed |

---

## 5. Task Management

| ID | Reference | Test Scenario | Steps | Expected Result | Status |
|---|---|---|---|---|---|
| TC07 | RF04, UC04 | Register a valid task | Open Add Task, enter a title, select a subject and save | The task is created and displayed in the task list | Passed |
| TC08 | RF04 | Register a task with optional information | Create a task with a due date and description | The task is saved with all the provided information | Passed |
| TC09 | RF04 | Register a task without optional information | Create a task without a due date or description | The task is created and displays the appropriate empty values | Passed |
| TC10 | RF04 | Register a task without a title | Attempt to save a task with an empty title | The system displays a validation message and does not create the task | Passed |
| TC11 | BR05 | Register a task without a subject | Attempt to save a task without selecting a subject | The system displays a validation message and does not create the task | Passed |
| TC12 | RF10 | View task details | Select an existing task | The details modal displays the correct task, subject, date, status and description | Passed |
| TC13 | RF05, UC05 | Edit an existing task | Open Task Details, select Edit, change the information and save | The task is updated and the new information is displayed | Passed |
| TC14 | RF06, UC06 | Delete an existing task | Open Task Details, select Delete and confirm | The task is removed from the list and progress values are updated | Passed |

---

## 6. Task Status and Filtering

| ID | Reference | Test Scenario | Steps | Expected Result | Status |
|---|---|---|---|---|---|
| TC15 | RF07, UC07 | Mark a task as completed | Select the completion control of a pending task | The task status changes to Completed and progress is updated | Passed |
| TC16 | RF07 | Return a completed task to pending | Select the completion control of a completed task | The task status changes to Pending and progress is recalculated | Passed |
| TC17 | BR10 | Subject filter with fewer than two subjects | Keep only one registered subject and open Tasks | The subject filter remains disabled because filtering is unnecessary | Passed |
| TC18 | RF08, UC08 | Filter tasks by subject | Create tasks for two subjects and select one subject in the filter | Only tasks associated with the selected subject are displayed | Passed |
| TC19 | RF08, UC08 | Filter tasks by status | Select Pending and then Completed | Only tasks matching the selected status are displayed | Passed |
| TC20 | RF08 | Combine subject and status filters | Select a subject and a task status | Only tasks matching both filters are displayed | Passed |
| TC21 | RF08 | Filter with no matching results | Select filters that do not match any task | The system displays an appropriate empty-state message | Passed |

---

## 7. Dashboard and Progress

| ID | Reference | Test Scenario | Steps | Expected Result | Status |
|---|---|---|---|---|---|
| TC22 | BR14 | Display progress without tasks | Open Dashboard and Progress without registered tasks | The system displays 0% progress without errors | Passed |
| TC23 | RF09 | Calculate overall progress | Create pending and completed tasks | The percentage is calculated from the number of completed tasks | Passed |
| TC24 | RF09 | Calculate progress by subject | Create tasks in different subjects and complete some of them | Each subject displays its correct completion percentage | Passed |
| TC25 | RF09 | Update dashboard counters | Create, complete and delete tasks | Total, completed and pending counters update automatically | Passed |
| TC26 | RF09 | Display tasks due today | Create a task using the current date | The task appears in the Today’s Tasks section | Passed |

---

## 8. Data Persistence

| ID | Reference | Test Scenario | Steps | Expected Result | Status |
|---|---|---|---|---|---|
| TC27 | RNF01, BR15–BR17 | Preserve data after page reload | Create subjects and tasks, update their status and reload the page | All stored information remains available | Passed |
| TC28 | RNF01 | Preserve edits and deletions | Edit or delete stored information and reload the page | The latest application state remains saved | Passed |

---

## 9. Responsiveness and Accessibility

| ID | Reference | Test Scenario | Steps | Expected Result | Status |
|---|---|---|---|---|---|
| TC29 | RNF02, RNF04 | Validate responsive layout and mobile navigation | Test the interface at 320px, 375px, 425px, 768px and desktop widths | Content remains readable, no horizontal scrolling occurs, the sidebar works correctly and modals remain accessible | Passed |

---

## 10. Requirements Traceability

| Requirement | Related Test Cases |
|---|---|
| RF01 | TC01–TC03 |
| RF02 | TC04 |
| RF03 | TC05–TC06 |
| RF04 | TC07–TC11 |
| RF05 | TC13 |
| RF06 | TC14 |
| RF07 | TC15–TC16 |
| RF08 | TC17–TC21 |
| RF09 | TC22–TC26 |
| RF10 | TC12 |
| RNF01 | TC27–TC28 |
| RNF02 | TC29 |
| RNF03 | TC01–TC29 |
| RNF04 | TC02, TC10, TC11, TC21, TC29 |

---

## 11. Final Result

All planned test cases for Lenadi Version 1 were successfully executed.

No critical or blocking issues were identified during the test cycle. Subject management, task management, filtering, progress calculation, Local Storage persistence, responsive layout, and mobile navigation behaved according to the documented requirements and business rules.

Based on the results recorded in this document, **Lenadi Version 1 is approved for release**.