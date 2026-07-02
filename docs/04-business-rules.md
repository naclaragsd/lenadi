# Business Rules

## Overview

This document defines the business rules for Version 1 of Lenadi. These rules establish the conditions and restrictions that the system must follow to ensure consistent and valid behavior.

---

# Subject Rules

**BR01** – A subject name cannot be empty.

**BR02** – Two subjects cannot have the same name.

**BR03** – Only existing subjects can be edited.

**BR04** – Only existing subjects can be deleted.

---

# Task Rules

**BR05** – Every task must be associated with a subject.

**BR06** – Only existing tasks can be edited.

**BR07** – Only existing tasks can be deleted.

**BR08** – Only existing tasks can be marked as completed.

**BR09** – If a task has a deadline, the due date must be provided.

---

# Filtering Rules

**BR10** – Task filtering by subject is available only when two or more subjects are registered.

---

# Study Progress Rules

**BR11** – Study progress shall be updated automatically whenever a task is marked as completed.

**BR12** – Study progress shall be calculated based on the number of completed tasks.

**BR13** – Study progress shall be displayed as a percentage between 0% and 100%.

**BR14** – If no tasks are registered, the study progress shall be 0%.

---

# Data Storage Rules

**BR15** – User data shall be stored using Local Storage.

**BR16** – Stored data shall remain available after the page is reloaded.

**BR17** – Data stored in Local Storage belongs only to the current browser.

**BR18** – Before deleting a subject, the system shall inform the user that all tasks associated with the subject will also be permanently deleted.