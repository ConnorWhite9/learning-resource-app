## Learning Resource App

A full‑stack learning platform built with a **custom authentication system** (access + refresh tokens, CSRF protection) on top of a **PostgreSQL** backend.  

The app itself is intentionally simple in concept (a learning resource/quiz app); the main focus of this project is the **infrastructure and security model**:

- **PostgreSQL** as the primary data store
- **Hand‑rolled auth flow** with access and refresh tokens
- **CSRF protection** and secure cookie usage
- Layered backend architecture (routers → services → CRUD → models)
- Modern React frontend with context‑based auth state

---

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **Auth**: Custom JWT‑style access & refresh tokens, CSRF tokens, HTTP‑only cookies
- **Deployment**: Client prepared for hosting (e.g. Vercel); server ready for containerization via `dockerfile`

---

## High‑Level Architecture

- **client**: React SPA (UI, routing, auth context, API calls)
- **server**: FastAPI backend (auth, business logic, DB access)
- **PostgreSQL**: backing store for users, courses, quizzes, and auth/session metadata

The backend follows a **layered, explicit architecture**:

1. **Routers (`server/routers`)**  
   - Define HTTP endpoints and request/response models  
   - Compose dependencies such as authentication, rate limiting, and DB sessions
2. **Services (`server/services`)**  
   - Contain business logic and orchestrate multiple CRUD operations  
   - Enforce cross‑entity rules (e.g., ownership checks, quiz completion logic)
3. **CRUD Layer (`server/crud`)**  
   - Narrow, testable functions that talk directly to the database  
   - No HTTP or framework concerns
4. **Models & Schemas (`server/models`, `server/schemas`)**  
   - `models`: ORM models mapped to PostgreSQL tables  
   - `schemas`: Pydantic models for request/response validation

---

## Custom Authentication & Security

The standout part of this project is the **hand‑rolled authentication system**.

- **Access tokens**
  - Short‑lived JWT‑style tokens
  - Used for authenticating most API requests
  - Typically sent via Authorization header or secure cookie

- **Refresh tokens**
  - Longer‑lived tokens stored in the database and/or secure cookies
  - Used only on dedicated refresh endpoints to obtain new access tokens
  - Can be invalidated on logout, password change, or manual revocation

- **CSRF Protection**
  - CSRF token issued and validated in addition to cookies
  - Ensures that state‑changing requests from the browser cannot be forged
  - Designed to complement HTTP‑only cookies (which are not readable by JS)

- **Separation of Concerns**
  - Token generation and verification are handled in helper/service layers
  - Routers depend on a small set of auth utilities to keep endpoint code clean
  - Explicit refresh flow (no opaque “magic” from an off‑the‑shelf library)

This setup mirrors what you would expect from a production‑grade system, while still being **fully implemented and controlled within this repository** (no third‑party “auth provider” dependency).

---

## Repository Structure

```text
learning-resource-app/
├── client/                # React frontend (Vite + Tailwind)
│   ├── public/            # Static assets (favicons, hero images, etc.)
│   └── src/
│       ├── assets/        # UI images and icons
│       ├── components/    # Reusable UI components
│       ├── context/       # Global React context (notably auth)
│       ├── hooks/         # Custom React hooks
│       ├── pages/         # Route‑level components
│       ├── App.jsx        # Root app component & route wiring
│       └── main.jsx       # Vite entry; React root setup
│
└── server/                # FastAPI backend
    ├── db/                # Database config and session management
    ├── models/            # ORM models mapped to PostgreSQL tables
    ├── schemas/           # Pydantic schemas for requests/responses
    ├── crud/              # Low‑level DB operations (Create/Read/Update/Delete)
    ├── services/          # Business logic and orchestration
    ├── routers/           # API endpoints (auth, users, courses, quizzes, etc.)
    ├── helpers/           # Auth & user helpers (token utilities, hashing, etc.)
    ├── main.py            # FastAPI initialization and router mounting
    ├── requirements.txt   # Python dependencies
    └── dockerfile         # Containerization setup for the backend
```

### Backend Directories in Detail

- **`server/db`**
  - `config.py`: PostgreSQL connection details (URL, settings)
  - `database.py`: session/engine creation and lifecycle management

- **`server/models`**
  - `user.py`: user table definition (id, email, password hash, etc.)
  - `auth.py`: auth/refresh token related tables (e.g., token store, revocation)
  - `course.py`, `quiz.py`: domain models for learning content and quizzes

- **`server/schemas`**
  - `auth.py`: request/response models for login, registration, token refresh
  - `user.py`: user input and output models (safe representations)
  - `course.py`: API‑facing models for course/lesson data

- **`server/crud`**
  - `auth.py`: DB operations around tokens (create, revoke, lookup)
  - `user.py`: user queries (by id/email, update password, etc.)
  - `course.py`, `quiz.py`: core persistence operations for the learning content

- **`server/services`**
  - `auth.py`: orchestrates login, token issuing, refresh, logout flows
  - `user.py`: higher‑level user operations (profile updates, password changes)
  - `course.py`: business rules around courses (progress, access checks)

- **`server/routers`**
  - `auth.py`: login, registration, token refresh, logout
  - `users.py`: user profile and account operations
  - `courses.py`: endpoints for listing/enrolling in courses and lessons
  - `limiter.py`: rate limiting mechanics (e.g., per‑IP or per‑user)
  - `dependencies.py`: shared FastAPI dependencies (DB session, auth guards, etc.)

---

## Frontend Overview

The `client` is a typical React SPA that consumes the backend API and reflects the authentication state in the UI.

- **`src/context/AuthContext.jsx`**
  - Central place for auth state (logged‑in user info, tokens or token status)
  - Provides login, logout, and token refresh helpers to the rest of the app

- **Key Components (`src/components`)**
  - `LoginForm.jsx`, `RegisterForm.jsx`: auth forms wired to the backend
  - `ChangePassword.jsx`, `UpdatePasswordModal.jsx`, `NewPassword.jsx`: password and account security flows
  - `Lessons.jsx`, `Quizzes.jsx`, `Lesson.jsx`, `Question.jsx`, `Video.jsx`, `NewVideo.jsx`: domain‑specific components for learning content
  - Layout/marketing components such as `Hero.jsx`, `Features.jsx`, `CallToAction.jsx`, `Navbar.jsx`, `Footer.jsx`, `AboutUs.jsx`

- **Pages (`src/pages`)**
  - `LandingPage.jsx`, `GetStarted.jsx`, `AboutUs.jsx`: landing and informational pages
  - `Login.jsx`, `Account.jsx`, `LogOut.jsx`: user account and session management
  - `Courses.jsx`, `Quiz.jsx`, `Credits.jsx`: core app experience views

---

## Running the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/ConnorWhite9/learning-resource-app.git
cd learning-resource-app
```

### 2. Backend (FastAPI + PostgreSQL)

1. **Set up PostgreSQL**  
   - Create a new PostgreSQL database (e.g. `learning_resource_app`)
   - Create a user with appropriate permissions

2. **Configure environment**  
   - Define a `DATABASE_URL` (and other secrets) via environment variables or config files, pointing at your PostgreSQL instance.

3. **Install Python dependencies**  
   From the `server` directory:

   ```bash
   cd server
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. **Run the backend**

   ```bash
   uvicorn main:app --reload
   ```

   The API will usually be available at `http://localhost:8000`.

### 3. Frontend (React)

From the `client` directory:

```bash
cd client
npm install
npm run dev
```

The frontend will usually be available at a Vite dev URL like `http://localhost:5173`.

---

## Development Notes

- **Auth focus**: The main purpose of this project is to demonstrate how to **implement a secure authentication and authorization layer yourself**, including:
  - Token lifetimes and rotation
  - Refresh token revocation
  - CSRF protection with cookie‑based auth
  - Separation between transport (HTTP) and business logic

- **Where to look first**
  - Backend auth logic: `server/helpers/auth.py`, `server/services/auth.py`, `server/crud/auth.py`, `server/routers/auth.py`
  - DB bindings: `server/db/config.py`, `server/db/database.py`, `server/models/*`
  - Frontend auth usage: `client/src/context/AuthContext.jsx`, `client/src/components/LoginForm.jsx`, `client/src/components/RegisterForm.jsx`

---

## Contributing

Contributions, suggestions, and code reviews are welcome.  
Please use feature branches and follow conventional Git practices (see `INFO.md` for branching and Git command tips).
