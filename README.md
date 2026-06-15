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
<img width="1862" height="999" alt="Dashboard" src="https://github.com/user-attachments/assets/78397470-136e-457e-9bf8-b6848d7fc8c6" />

---

## Search | Recent tasks

<img width="1849" height="965" alt="Recent-added" src="https://github.com/user-attachments/assets/38cc82e5-3941-4902-bf6f-f7d436a421cc" />

---

## Task List
<img width="1874" height="987" alt="List-View" src="https://github.com/user-attachments/assets/74eba119-6652-4dbc-a00f-0720d5db4bb1" />

---

## History View

<img width="1823" height="999" alt="History" src="https://github.com/user-attachments/assets/187cbe7d-b741-4c4e-964e-50ea5d19abb1" />

---

## Task Edit

<img width="1849" height="966" alt="Task-Edit" src="https://github.com/user-attachments/assets/dc20bc30-51eb-425a-9fef-84aa089fa260" />


---

