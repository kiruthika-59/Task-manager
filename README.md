#  Task Manager Application

## Project Overview

A modern and responsive Task Manager application built using **SvelteKit and TypeScript**.

This application helps users create, organize, search, update, and manage tasks efficiently with priorities, due dates, status tracking, and local storage persistence.

---

#  Features

##  Task Management

- Create new tasks
- Edit existing tasks
- Delete tasks
- View task details
- Update task status

##  Task Organization

- Set task priority:
  - High
  - Medium
  - Low

- Add due dates
- Track task progress

##  Dashboard

- Total task count
- To-Do count
- In Progress count
- Completed count
- Recently added tasks

## Search & Filtering

- Search tasks by title
- Search tasks by description
- Dynamic filtering

## User Experience

- Form validation
- Error handling
- Toast notifications
- Responsive desktop and mobile layout
- Reusable components
- Modern UI design

## Data Persistence

- Stores tasks using browser `localStorage`
- Data remains available after refreshing the browser

---

# 🛠️ Technology Stack

- **Framework:** SvelteKit
- **UI Library:** Svelte 5
- **Language:** TypeScript
- **Styling:** CSS
- **Icons:** Lucide Svelte
- **Notifications:** Svelte Sonner

---


# Project Structure

```text
task-manager/

├── src/
│
│── lib/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   │
│   │   ├── Button.svelte
│   │   ├── EmptyState.svelte
│   │   ├── Header.svelte
│   │   ├── Pagination.svelte
│   │   ├── PriorityBadge.svelte
│   │   ├── SearchBar.svelte
│   │   ├── Sidebar.svelte
│   │   ├── StatsCards.svelte
│   │   ├── TaskCards.svelte
│   │   └── TaskForm.svelte
│   │
│   ├── constants/
│   │   └── task.ts
│   │
│   ├── stores/
│   │   └── taskStore.ts
│   │
│   ├── types/
│   │   └── task.ts
│   │
│   └── utils/
│       └── taskFilter.ts
│
├── routes/
│   │
│   ├── +layout.svelte
│   ├── +page.svelte
│   │
│   ├── history/
│   │   └── +page.svelte
│   │
│   ├── list/
│   │   └── +page.svelte
│   │
│   └── task/
│       └── [id]/
│           └── +page.svelte
│
├── package.json
└── README.md
```

---

# Components

## Layout

`+layout.svelte`

Handles:

- Application layout
- Sidebar navigation
- Route navigation
- Active page highlighting
- Global toast notifications


## Button

Reusable button component used for:

- Add task
- Update task
- Delete task
- Status changes


## TaskForm

Handles:

- Creating tasks
- Editing tasks
- Task input fields
- Priority selection
- Due date selection


## TaskCards

Displays:

- Task information
- Task status
- Task actions
- View/Delete/Update operations


## StatsCards

Displays:

- Total Tasks
- To-Do Tasks
- In Progress Tasks
- Completed Tasks


## SearchBar

Provides dynamic task searching.


## PriorityBadge

Displays task priority level.

---

# Task Workflow

Task status flow:

```
To-Do
  ↓
In Progress
  ↓
Done
```

---

# State Management

The application uses a custom Svelte writable store.

`taskStore.ts` manages:

- Adding tasks
- Deleting tasks
- Updating tasks
- Updating task status
- Syncing with localStorage

---

# Filtering Logic

The application filters tasks using:

`taskFilter.ts`

Search works with:

- Task title
- Task description

Results update dynamically while typing.

---

# Application Screenshots

## Dashboard

![Dashboard](./screenshots/task-dashboard.png)


---

## Task List

![Task List](./screenshots/task-list.png)


---

## Mobile Responsive View

![Mobile](./screenshots/mobile-view.png)

---

