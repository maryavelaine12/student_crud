# Project Context & Implementation Guide: Student CRUD Application

This document preserves the complete context, architectural specifications, setup guide, and implementation status for the Student CRUD application. Anyone cloning or opening this repository on another computer can resume or run work directly from this file.

---

## 1. Project Status: COMPLETED & RENDER-READY

All phases requested have been fully implemented and prepared for Render deployment:
- [x] Spring Boot REST API aligned at `/buenaventura/students` with `@CrossOrigin(origins = "*")`
- [x] Multi-stage `Dockerfile` (`eclipse-temurin:21`) created in `student/Dockerfile`
- [x] Production database environment variables configured in `student/src/main/resources/application.properties`
- [x] Vite + React (JavaScript) application scaffolded in `/frontend`
- [x] Tailwind CSS v4 configured via `@tailwindcss/vite`
- [x] Dynamic API URL resolution (`VITE_API_BASE_URL` on Render; proxy on local dev) in `frontend/src/api/studentApi.js`
- [x] Reverse Proxy configured in `vite.config.js` forwarding `/buenaventura` to `http://localhost:8080`
- [x] **100% Non-Modal UI Layout:**
  - Dedicated **Student Form Card** for enrollment and editing (with mode switching & cancel)
  - Real-time search and course filtering bar
  - **Inline Delete Confirmation:** Action row switches to an inline `[Yes] [No]` confirmation prompt right in the table cell
  - Toast notifications and connection status notices
- [x] Blueprint configuration created in `render.yaml` (Backend Docker web service, Frontend static site, PostgreSQL database)

---

## 2. Render.com Deployment Architecture

Following the blueprint in `render.yaml`:

```
┌────────────────────────────────────────────────────────┐
│                   Render.com Blueprint                 │
├───────────────────────┬────────────────────────────────┤
│ student-db            │ Free PostgreSQL Database       │
│                       │ (db_student)                   │
├───────────────────────┼────────────────────────────────┤
│ student-backend       │ Docker Web Service             │
│                       │ Base path: /buenaventura/students│
│                       │ Port: 8080                     │
├───────────────────────┼────────────────────────────────┤
│ student-frontend      │ Static Web Site                │
│                       │ Build: npm run build           │
│                       │ Publish: frontend/dist         │
│                       │ Env: VITE_API_BASE_URL         │
└───────────────────────┴────────────────────────────────┘
```

### Steps to Deploy on Render.com:
1. Push all code to GitHub (`https://github.com/maryavelaine12/student_crud.git`).
2. Log in to your [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** and select **Blueprint**.
4. Connect the repository `maryavelaine12/student_crud`.
5. Render reads `render.yaml` and will automatically spin up:
   - **PostgreSQL Database** (`student-db`)
   - **Backend Web Service** (`student-backend`)
   - **Frontend Static Site** (`student-frontend`)
6. Click **Apply** to deploy!

---

## 3. REST API Endpoints

- **Entity Model:** `id`, `firstname`, `lastname`, `course`, `section`

| HTTP Method | Endpoint | Request Body | Description |
|---|---|---|---|
| `GET` | `/buenaventura/students` | None | Fetch all students |
| `GET` | `/buenaventura/students/{id}` | None | Fetch single student |
| `POST` | `/buenaventura/students` | `{ firstname, lastname, course, section }` | Create student |
| `PUT` | `/buenaventura/students/{id}` | `{ firstname, lastname, course, section }` | Update student |
| `DELETE`| `/buenaventura/students/{id}` | None | Delete student |

---

## 4. How to Run Locally

### Step 1: Prerequisites
1. **Node.js**: v18 or higher (includes npm)
2. **Java Development Kit**: JDK 17 or 21
3. **PostgreSQL**: Running locally on port `5432` with database `db_user`, user `postgres`, password `admin`.

### Step 2: Start the Backend (Spring Boot)
```bash
cd student
# On Windows:
.\mvnw.cmd spring-boot:run
# On macOS / Linux:
./mvnw spring-boot:run
```

### Step 3: Start the Frontend (Vite React)
```bash
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.
