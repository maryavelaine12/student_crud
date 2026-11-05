# Project Context & Implementation Plan: Student CRUD Application

This document preserves the project context, architectural decisions, and step-by-step implementation plan for the Student CRUD application. Anyone cloning or opening this repository on another computer can resume work directly from this file.

---

## 1. Project Overview & Existing Architecture

The repository contains a full-stack student management application:
- **Backend:** Spring Boot (Java 17+) located in `/student`
- **Frontend:** Vite + React (JavaScript) + Tailwind CSS located in `/frontend`
- **Database:** PostgreSQL (`db_user`) via Spring Data JPA / Hibernate
- **UI Paradigm:** **Non-modal design** (Dedicated split-screen / side-by-side or inline Form Card and Table; inline delete confirmations; no popup dialogs/modals)

### Backend Specifications
- **Base Controller Route:** `/buenaventura/students`
- **Entity Model (`Student.java`):**
  - `id` (Integer, Auto-generated primary key)
  - `firstname` (String)
  - `lastname` (String)
  - `course` (String)
  - `section` (String)

### REST API Endpoints
| HTTP Method | Endpoint | Request Body | Description |
|---|---|---|---|
| `GET` | `/buenaventura/students` | None | Fetch all students |
| `GET` | `/buenaventura/students/{id}` | None | Fetch student by ID |
| `POST` | `/buenaventura/students` | `{ firstname, lastname, course, section }` | Create a new student |
| `PUT` | `/buenaventura/students/{id}` | `{ firstname, lastname, course, section }` | Update existing student |
| `DELETE`| `/buenaventura/students/{id}` | None | Delete student by ID |

---

## 2. Frontend Tech Stack & Architecture

- **Tooling:** Vite (Fast build tool & dev server with HMR)
- **Framework:** React 18+ (JavaScript - `.jsx`)
- **Styling:** **Tailwind CSS** (configured with `@tailwindcss/vite` or standard PostCSS)
- **Icons:** Lucide React
- **Layout Paradigm (No Modals):**
  - **Split Dashboard Layout:**
    - **Left / Top Panel:** Student Form Card (switches between "Add Student" and "Edit Student" mode with clear Reset / Cancel actions).
    - **Right / Bottom Panel:** Student Directory Table with search, count statistics, and inline action controls.
  - **Inline Delete Action:** Two-step inline confirmation (e.g., clicking "Delete" reveals an inline "Confirm / Cancel" badge or button group directly in the row, avoiding intrusive modal popups).
- **CORS Strategy:** Vite Dev Server reverse proxy configured in `vite.config.js` forwarding `/buenaventura` requests to `http://localhost:8080`.

---

## 3. Component & Folder Structure (Vite React + Tailwind)

```
frontend/
├── index.html
├── package.json
├── vite.config.js                 # Proxy to backend (http://localhost:8080)
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS plugins
├── src/
│   ├── main.jsx                   # React root entry
│   ├── App.jsx                    # Core page layout & state orchestration
│   ├── index.css                  # Tailwind directives (@tailwind base; etc.)
│   ├── api/
│   │   └── studentApi.js          # API calls (getAll, getById, create, update, delete)
│   ├── components/
│   │   ├── Navbar.jsx             # Top bar with branding & system status
│   │   ├── StudentForm.jsx        # Dedicated Add / Edit Card Form (NO modal)
│   │   ├── StudentTable.jsx       # Student list table with inline action controls
│   │   ├── StudentTableRow.jsx    # Table row with inline Delete confirmation
│   │   ├── SearchFilter.jsx       # Search by name, course, section
│   │   └── Toast.jsx              # Lightweight non-blocking alert banner
```

---

## 4. Step-by-Step Implementation Plan

### Step 1: Frontend Project Initialization & Tailwind Setup
- Scaffold project: `npm create vite@latest frontend -- --template react`
- Install dependencies: `tailwindcss`, `postcss`, `autoprefixer`, `lucide-react`
- Initialize and configure Tailwind CSS in `tailwind.config.js` and `src/index.css`.
- Configure `vite.config.js` proxy:
  ```javascript
  server: {
    proxy: {
      '/buenaventura': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
  ```

### Step 2: API Service Layer (`studentApi.js`)
- Standardized fetch client for:
  - `getStudents()`
  - `createStudent(payload)`
  - `updateStudent(id, payload)`
  - `deleteStudent(id)`
- Unified error handling and response parsing.

### Step 3: Non-Modal UI & State Architecture
- **State in `App.jsx`:**
  - `students`: Array of student records.
  - `selectedStudent`: Currently editing student (null when in "Add" mode).
  - `isLoading`: Loading state flag.
  - `notification`: Feedback toast message (success / error).
  - `searchTerm`: Real-time filter input.
- **Form Card (`StudentForm.jsx`):**
  - Sticky side/top card styled with Tailwind.
  - Form fields: First Name, Last Name, Course, Section.
  - Mode toggle: Automatically populates when "Edit" is clicked on any row.
  - "Cancel Edit" button returns form smoothly to "Add New Student" mode.
- **Table & Inline Confirmation (`StudentTable.jsx` & `StudentTableRow.jsx`):**
  - Responsive Tailwind table with badges for Course and Section.
  - Inline delete verification: Clicking "Delete" toggles an inline "Are you sure? [Yes] [No]" button pair right inside the action cell.

### Step 4: Verification & End-to-End Testing
- Start PostgreSQL and verify tables in `db_user`.
- Start Spring Boot backend (`mvnw spring-boot:run`).
- Start Vite frontend (`npm run dev`).
- Test all 5 CRUD operations end-to-end:
  1. Create new student -> Form resets, table updates immediately.
  2. Search student -> Dynamic instant filtering.
  3. Edit student -> Populates form card without any modal popup, submits update, table refreshes.
  4. Delete student -> Inline confirmation triggers, record deleted from DB and UI.
  5. Validation -> Test empty fields, backend error scenarios.

---

## 5. How to Continue on Another Computer

To resume work on a different workstation:

1. **Prerequisites:**
   - Node.js (v18+)
   - Java Development Kit (JDK 17+)
   - PostgreSQL installed and running (default: database `db_user`, user `postgres`, password `admin`).
2. **Setup Backend:**
   ```bash
   cd student
   # On Windows:
   .\mvnw.cmd spring-boot:run
   # On macOS/Linux:
   ./mvnw spring-boot:run
   ```
3. **Setup Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. **Access the Application:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8080/buenaventura/students`
