# 🗺️ Lenadi Roadmap

This roadmap presents the planned evolution of **Lenadi**, a study management platform designed to help students organize their academic routine and progressively introduce full-stack and AI-powered features.

Features and priorities may evolve as the project grows.

---

# ✅ Version 1 — Study Management (Completed)

**Goal:** Build the initial foundation of Lenadi with subject organization, task management, progress tracking, and local data persistence.

## 📋 Planning and Documentation

- [x] Project description
- [x] Objectives and scope
- [x] Requirements specification
- [x] Business rules
- [x] Use case documentation
- [x] Use case diagram
- [x] Test case documentation
- [x] GitHub repository organization
- [x] Project README

## 🎨 User Interface

- [x] Dashboard
- [x] Subject cards
- [x] Task list
- [x] Task details modal
- [x] Progress visualization
- [x] Responsive layout
- [x] Mobile sidebar
- [x] Page transitions
- [x] Empty states
- [x] Validation and confirmation messages

## 📚 Subjects

- [x] Register subjects
- [x] Edit subjects
- [x] Delete subjects
- [x] Customize subject colors
- [x] Calculate progress by subject

## ✅ Tasks

- [x] Register tasks
- [x] Edit tasks
- [x] Delete tasks
- [x] Associate tasks with subjects
- [x] Mark tasks as completed
- [x] Filter tasks by subject and status
- [x] View task details

## 💾 Data Persistence

- [x] LocalStorage integration
- [x] Automatic data loading
- [x] Automatic data saving

## 📊 Progress

- [x] Overall progress calculation
- [x] Progress calculation by subject
- [x] Dynamic task and subject counters
- [x] Completed and pending task tracking

---

# 🗄️ Version 2 — Full-Stack Foundation

**Goal:** Transform Lenadi into a full-stack application with user accounts, a backend API, and relational data persistence.

## Backend

- [ ] Define the backend architecture
- [ ] Create a REST API
- [ ] Connect the front-end to the API
- [ ] Implement server-side validation
- [ ] Implement centralized error handling
- [ ] Add backend tests

## Relational Database

- [ ] Design the relational database schema
- [ ] Create tables for users, subjects, and tasks
- [ ] Define primary and foreign keys
- [ ] Implement database constraints
- [ ] Create SQL queries for application operations
- [ ] Migrate data persistence from LocalStorage to the database

## Authentication

- [ ] Register user accounts
- [ ] Log in and log out
- [ ] Protect user credentials
- [ ] Keep data separated by user
- [ ] Implement authenticated sessions

## Data Synchronization

- [ ] Persist user data in the database
- [ ] Access data from different devices
- [ ] Synchronize subjects, tasks, and progress
- [ ] Handle loading and connection states

## Personalization

- [ ] Dark mode
- [ ] Custom subject icons
- [ ] User preferences
- [ ] Additional subject customization options

---

# 🤖 Version 3 — AI Learning Assistant

**Goal:** Introduce academic content management and AI-powered study assistance.

## Study Resources

- [ ] Upload PDF files
- [ ] View PDF files
- [ ] Organize study materials by subject
- [ ] Create and manage study summaries
- [ ] Associate materials with subjects

## Lenadi Chat

- [ ] Create the Lenadi Chat interface
- [ ] Integrate an AI model
- [ ] Ask questions about study materials
- [ ] Generate study summaries
- [ ] Maintain conversation context
- [ ] Store conversation history

## Intelligent Features

- [ ] RAG-powered knowledge retrieval
- [ ] Personalized study recommendations
- [ ] Smart task suggestions
- [ ] Context-aware academic assistance
- [ ] Responsible handling of user content

---

# 🔮 Future Versions

Potential long-term features include:

## Learning Tools

- [ ] Flashcards
- [ ] AI-generated flashcards
- [ ] Smart study planner
- [ ] Personalized study plans
- [ ] Revision reminders
- [ ] Calendar integration
- [ ] Focus mode
- [ ] Pomodoro timer

## Statistics

- [ ] Study history
- [ ] Weekly reports
- [ ] Performance dashboard
- [ ] Productivity insights
- [ ] Subject evolution tracking
- [ ] AI learning analytics

## Platform Expansion

- [ ] Desktop application
- [ ] Mobile application
- [ ] Notifications
- [ ] Import and export data
- [ ] Public API

## Collaboration and Engagement

- [ ] Collaborative study
- [ ] Shared notes
- [ ] Gamification
- [ ] Achievement system

---

# 📌 Project Philosophy

Lenadi follows an incremental development approach based on Software Engineering practices.

Each version aims to deliver a complete and stable set of features before introducing new capabilities. This allows the project to evolve progressively while maintaining code quality, documentation, and a clear separation of scope between versions.