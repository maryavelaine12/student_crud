# Project Context & Implementation Guide: Student CRUD Application

This document preserves the complete context, architectural specifications, setup guide, and implementation status for the Student CRUD application. Anyone cloning or opening this repository on another computer can resume or run work directly from this file.

---

## 1. Project Status: COMPLETED

All phases requested have been fully implemented and verified:
- [x] Spring Boot REST API aligned at `/buenaventura/students` with `@CrossOrigin(origins = "*")`
- [x] Vite + React (JavaScript) application scaffolded in `/frontend`
- [x] Tailwind CSS v4 configured via `@tailwindcss/vite`
- [x] Reverse Proxy configured in `vite.config.js` forwarding `/buenaventura` to `http://localhost:8080`
- [x] Centralized API service layer implemented in `frontend/src/api/studentApi.js`
- [x] **100% Non-Modal UI Layout:**
  - Dedicated **Student Form Card** for enrollment and editing (with mode switching & cancel)
  - Real-time search and course filtering bar
  - **Inline Delete Confirmation:** Action row switches to an inline `[Yes] [No]` confirmation prompt right in the table cell
  - Toast notifications and connection status notices
- [x] Clean Git repository initialized with root `.gitignore` and committed

---

## 2. System Architecture & Endpoints

### Data Model (`Student.java`)
- `id` (Integer, auto-incremented primary key)
- `firstname` (String)
- `lastname` (String)
- `course` (String)
- `section` (String)

### REST API Endpoints
| HTTP Method | Endpoint | Request Body | Description |
|---|---|---|---|
| `GET` | `/buenaventura/students` | None | Fetch all students |
| `GET` | `/buenaventura/students/{id}` | None | Fetch single student |
| `POST` | `/buenaventura/students` | `{ firstname, lastname, course, section }` | Create student |
| `PUT` | `/buenaventura/students/{id}` | `{ firstname, lastname, course, section }` | Update student |
| `DELETE`| `/buenaventura/students/{id}` | None | Delete student |

---

## 3. Frontend Component Breakdown (`frontend/src`)

- `App.jsx`: Main state coordinator (CRUD operations, filter/search state, error banners).
- `components/Navbar.jsx`: Header with branding and data refresh button.
- `components/StudentForm.jsx`: Sticky Form Card with Add/Edit toggle, validation, and cancel edit.
- `components/SearchFilter.jsx`: Search by keyword (name, ID, course, section) and course dropdown.
- `components/StudentTable.jsx`: Data table with empty states, loading indicators, and row rendering.
- `components/StudentTableRow.jsx`: Individual row with badges and **inline delete confirmation**.
- `components/Toast.jsx`: Unobtrusive floating alert banner.
- `api/studentApi.js`: Centralized fetch client communicating with backend endpoints.

---

## 4. How to Run on Another Computer

To run this application on another computer:

### Step 1: Prerequisites
1. **Node.js**: v18 or higher (includes npm)
2. **Java Development Kit**: JDK 17 or higher
3. **PostgreSQL**: Running locally on port `5432` with database `db_user`, username `postgres`, password `admin` (or update `student/src/main/resources/application.properties`).

### Step 2: Start the Backend (Spring Boot)
Open a terminal in the project directory:
```bash
cd student

# On Windows:
.\mvnw.cmd spring-boot:run

# On macOS / Linux:
./mvnw spring-boot:run
```
The backend server runs on `http://localhost:8080`.

### Step 3: Start the Frontend (Vite React)
Open a second terminal in the project directory:
```bash
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.
All API requests to `/buenaventura/students` are automatically proxied by Vite to the backend on port `8080`.
