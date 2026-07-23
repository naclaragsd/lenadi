# UC08 – Filter Tasks

## Goal

Allow the student to filter registered tasks by subject or status.

---

## Primary Actor

student

---

## Preconditions

- At least one task must be registered in the system.
- The student is on the All Tasks view.

---

## Main Flow

1. The student accesses the **All Tasks** view.
2. The system displays all registered tasks.
3. The student selects a filter option.
4. The system applies the selected filter.
5. The system displays the filtered task list.

---

## Alternative Flows

### AF01 – No Tasks Registered

1. The student accesses the **All Tasks** view.
2. The system identifies that there are no registered tasks.
3. The system displays a message informing the student that no tasks are available.

---

### AF02 – No Results Found

1. The student selects a filter option.
2. The system identifies that no tasks match the selected filter.
3. The system displays a message informing the student that no tasks were found for the selected filter.

---

## Postconditions

- The task list is displayed according to the selected filter.
- No task data is changed.