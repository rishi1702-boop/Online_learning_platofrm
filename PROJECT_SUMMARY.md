# Online Learning Platform - Project Summary & Documentation

Welcome to the comprehensive documentation of the **Online Learning Platform**. This document outlines the overall project architecture, folder structure, features, database models, and backend API endpoints.

---

## 📁 Folder Structure

Below is the directory tree of the project showing the separation of concerns between the frontend and backend:

```text
Online_Learning_platform/
├── backend/
│   ├── APIs/                   # Router controllers defining backend routes
│   │   ├── adminAPI.js         # Admin administration routes
│   │   ├── commonAPI.js        # Public registration and authentication routes
│   │   ├── instructorAPI.js    # Instructor course creation, curriculum, and analytics routes
│   │   └── userAPI.js          # Student profile, enrollment, and progress routes
│   ├── middlewares/            # Express middleware handlers
│   │   ├── multer.js           # Multi-part form handler for local thumbnail staging
│   │   └── verifyToken.js      # JWT authorization and role restriction middleware
│   ├── models/                 # Mongoose schemas for MongoDB
│   │   ├── Appeal.js           # Course reinstatement request model
│   │   ├── Course.js           # Course model (with section, lecture, comment, and review sub-schemas)
│   │   ├── CourseProgress.js   # Student course video progress tracking model
│   │   └── User.js             # User account schema (Students, Instructors, Admins)
│   ├── utils/                  # Backend utilities
│   │   └── cloudinary.js       # Cloudinary media upload integration
│   ├── .env                    # Environment config (Port, MONGO_URL, JWT_SECRET, Cloudinary credentials)
│   ├── patchVideoUrls.js       # Script to patch/reformat video URLs
│   ├── seed.js                 # Database seeding script for mock users/courses
│   └── server.js               # Application entry point & database connector
│
├── frontend/
│   ├── src/
│   │   ├── admin/              # Admin pages & layout
│   │   │   ├── AdminAnalytics.jsx
│   │   │   ├── AdminAppeals.jsx
│   │   │   ├── AdminCourses.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── AdminOverview.jsx
│   │   │   ├── AdminSettings.jsx
│   │   │   └── AdminUsers.jsx
│   │   ├── api/                # Axios instance and base configurations
│   │   │   └── axiosInstance.js
│   │   ├── components/         # Reusable presentation components
│   │   │   ├── CourseCard.jsx
│   │   │   ├── CourseSection.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── HeroSlider.jsx
│   │   ├── data/               # Local static configurations/data
│   │   ├── instructor/         # Instructor pages
│   │   │   ├── CreateCourse.jsx
│   │   │   ├── EditCourse.jsx
│   │   │   ├── InstructorAnalytics.jsx
│   │   │   ├── InstructorCourseDetails.jsx
│   │   │   ├── InstructorDashboard.jsx
│   │   │   ├── InstructorMyCourses.jsx
│   │   │   ├── InstructorProfile.jsx
│   │   │   └── InstructorReviews.jsx
│   │   ├── layouts/            # Global layout wrappers
│   │   │   └── RootLayout.jsx
│   │   ├── pages/              # General pages (Home, Login, Register)
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── courseDetails.jsx
│   │   ├── routes/             # Client-side protected and public route handlers
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── PublicRoute.jsx
│   │   ├── student/            # Student learning portal pages
│   │   │   ├── AllCourses.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── CourseContent.jsx
│   │   │   ├── CourseDetails.jsx
│   │   │   ├── LearningPaths.jsx
│   │   │   ├── MyCourses.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   └── StudentProfile.jsx
│   │   ├── App.css
│   │   ├── App.jsx             # React client routes & main entry point
│   │   ├── index.css           # Global CSS variables and styles
│   │   ├── main.jsx
│   │   └── config.js           # Frontend config pointing to backend base url
│   ├── package.json            # React + Vite dependencies (TailwindCSS, Zustand, Lucide-react/Fi, etc.)
│   └── vite.config.js          # Vite compilation config
└── README.md                   # Setup instructions and documentation
```

---

## ⚡ Tech Stack

- **Frontend**: React 19 (JavaScript), Vite (bundler & development server), React Router Dom v7, Axios.
- **Styling**: Vanilla CSS with modern elements & TailwindCSS configuration.
- **State Management**: Zustand, React Hook Form, and local state.
- **Icons**: React Icons (specifically standard Feather/Fi icons).
- **Charts**: Recharts.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Object data modeling via Mongoose).
- **Authentication**: JWT (JSON Web Tokens) with Cookies & Bcrypt password hashing.
- **Media Upload**: Multer (Local middleware) + Cloudinary API.

---

## 💎 Project Features

### 1. User & Auth Features
* **Role-Based Authorization**: Distinct views and route access filters configured for `STUDENT`, `INSTRUCTOR`, and `ADMIN`.
* **Cookie-Based JWT Auth**: Secure authentication handling using HttpOnly cookies containing JSON Web Tokens.
* **Account Settings**: Dedicated profile page enabling users to update profile names (`firstName`, `lastName`) and change passwords securely (verified using `bcrypt.compare`).

### 2. Student Portal Features
* **Course Catalog**: Dynamic search, filter, and pagination system to explore all active courses on the platform.
* **Checkout/Enrollment System**: Enroll in free courses instantly, or buy premium courses with card or UPI payment verification.
* **Interactive Player & Progression Guide**: Inside the classroom, students can stream video lectures, view descriptions, and toggle progress checkmarks for completed lectures.
* **Course Reviews & Ratings**: Submit single rating scores and comments to share feedback on enrolled courses.
* **Learning Paths**: Structured progression paths showing courses organized from beginner to advanced.

### 3. Instructor Portal Features
* **Interactive Stats Dashboard**: At-a-glance cards showing total revenue, active student enrollment count, active courses, and average rating. Visualized with a 6-month revenue chart.
* **Curriculum Builder**: Build multi-section course curricula. Upload lecture videos (automatically stage via Multer and store on Cloudinary) with details like duration, titles, and descriptions.
* **Smart Course Analytics**: Drop-off rate charts showing the percentage of students who complete each lecture, allowing instructors to pinpoint where students lose engagement. Includes a top-student leaderboard.
* **Aggregated Reviews Interface**: Read and analyze reviews across all courses, accompanied by each reviewer's course completion rate.
* **Course Reinstatement Appeal**: If an admin deactivates a course, the instructor gets a single chance to write a reinstatement request explaining the course's compliance with platform policies.

### 4. Admin Portal Features
* **Platform Operations Dashboard**: Full oversight showing total users, students/instructors/admin counts, active/inactive courses, and total platform enrollments.
* **User Controls**: Search all accounts, modify roles (upgrade/downgrade between roles), or suspend/deactivate accounts immediately.
* **Course Moderation**: Block or deactivate courses that violate safety rules.
* **Reinstatement Verification**: An inbox containing incoming instructor appeals, giving admins the ability to approve (automatically reactivates course) or permanently reject the appeal.

---

## 📊 Database Models & Schema Specifications

The project schema is defined using **Mongoose** models:

### 1. User Model (`User.js`)
* `firstName` (String, required)
* `lastName` (String, required)
* `email` (String, required, unique)
* `password` (String, minLength: 6, hashed)
* `role` (String, enum: `["STUDENT", "INSTRUCTOR", "ADMIN"]`)
* `isActive` (Boolean, default: `true`)
* `profilePic` (String, optional)
* `coursesEnrolled` (Array of ObjectIDs referencing `Course`)

### 2. Course Model (`Course.js`)
* `title` (String, required)
* `description` (String, required)
* `category` (String, required)
* `courseLevel` (String, enum: `["Beginner", "Intermediate", "Advanced"]`)
* `price` (Number, default: `0`)
* `courseOutcomes` (Array of Strings)
* `instructor` (ObjectID referencing `User`)
* `studentsEnrolled` (Number, default: `0`)
* `rating` (Number, default: `0`)
* `ratingCount` (Number, default: `0`)
* `thumbnail` (String, url path)
* `isActive` (Boolean, default: `true`)
* `sections`: Array of **Section Schema**:
  * `sectionTitle` (String, required)
  * `lectures`: Array of **Lecture Schema**:
    * `title` (String, required)
    * `description` (String)
    * `videoUrl` (String, required)
    * `duration` (String)
    * `isPreview` (Boolean, default: `false`)
* `comments`: Array of user-comment subdocuments
* `reviews`: Array of **Review Schema** (user reference, rating 1-5, review text, timestamps)

### 3. CourseProgress Model (`CourseProgress.js`)
* `user` (ObjectID referencing `User`, required)
* `course` (ObjectID referencing `Course`, required)
* `completedLectures` (Array of ObjectIDs logical reference to lectures)
* `lastAccessed` (Date, default: Date.now)
* *Index*: Compound index on `{ user: 1, course: 1 }` (unique)

### 4. Appeal Model (`Appeal.js`)
* `course` (ObjectID referencing `Course`, required)
* `instructor` (ObjectID referencing `User`, required)
* `message` (String, required, minLength: 50)
* `status` (String, enum: `["pending", "approved", "rejected"]`, default: `"pending"`)
* `createdAt` / `updatedAt` (Timestamps)

---

## 📡 API Endpoints Reference

All routes below require appropriate headers (like authentication headers and cookies).

### 🗝️ Authentication & Session Endpoints (`/common-api/*`)
| HTTP Method | Endpoint | Authorization | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/common-api/register` | Public | Register a new User account (`STUDENT` or `INSTRUCTOR`) |
| **POST** | `/common-api/login` | Public | Authenticate credentials, set HTTP cookie and return user info |
| **POST** | `/common-api/logout` | Public | Clear session token cookie and close connection |

### 🎓 Student / User Endpoints (`/user-api/*`)
All `/user-api` endpoints require a valid JWT token.
| HTTP Method | Endpoint | User Role | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/user-api/profile` | Student/Instructor | Fetch detailed profile data for the active user |
| **PATCH** | `/user-api/update-profile` | Student/Instructor | Edit account profile details (`firstName`, `lastName`) |
| **PATCH** | `/user-api/change-password` | Student/Instructor | Verify old password and save a new account password |
| **POST** | `/user-api/enroll-course` | Student | Enroll in a course (performs card/UPI checkout check if paid) |
| **GET** | `/user-api/my-courses` | Student | Fetch list of all courses the student is enrolled in |
| **GET** | `/user-api/courses` | Student | Fetch all active courses available on the platform |
| **GET** | `/user-api/course/:id` | Student | Get comprehensive details of a course by ID, populating reviews |
| **POST** | `/user-api/review/:courseId`| Student | Submit rating (1-5) and comment review for an enrolled course |
| **GET** | `/user-api/progress/:courseId`| Student | Fetch completion details & completed lecture array |
| **POST**| `/user-api/progress/:courseId/:lectureId`| Student | Mark a lecture as complete or incomplete (toggle) |

### 👨‍🏫 Instructor Endpoints (`/instructor-api/*`)
All `/instructor-api` endpoints require verification as `INSTRUCTOR` or `ADMIN`.
| HTTP Method | Endpoint | User Role | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/instructor-api/generate-upload-signature` | Instructor | Retrieve signature params for direct secure video upload to Cloudinary |
| **POST** | `/instructor-api/create-course` | Instructor | Create a new course, upload thumbnail to Cloudinary |
| **GET** | `/instructor-api/my-courses` | Instructor | Get all courses authored by the logged-in instructor |
| **GET** | `/instructor-api/dashboard-stats` | Instructor | Fetch overall stats cards & month-by-month revenue data |
| **GET** | `/instructor-api/course/:courseId` | Instructor | Fetch specific details of a course owned by the instructor |
| **PUT** | `/instructor-api/update-course/:courseId` | Instructor | Modify course details, outcomes, category, etc. |
| **DELETE**| `/instructor-api/delete-course/:courseId` | Instructor | Permanently remove a course from the platform |
| **POST** | `/instructor-api/add-section/:courseId` | Instructor | Append a new section to the course syllabus |
| **PUT** | `/instructor-api/update-section/:courseId/:sectionId` | Instructor | Rename an existing section |
| **DELETE**| `/instructor-api/delete-section/:courseId/:sectionId`| Instructor | Remove a section from the course curriculum |
| **POST** | `/instructor-api/add-lecture/:courseId/:sectionId`| Instructor | Add a video lecture to a section |
| **DELETE**| `/instructor-api/delete-lecture/:courseId/:sectionId/:lectureId`| Instructor | Remove a lecture from a section |
| **GET** | `/instructor-api/analytics/:courseId` | Instructor | Detailed completion drop-off stats per video and top-10 student list |
| **GET** | `/instructor-api/global-reviews-analytics` | Instructor | Fetch all reviews across all courses with each reviewer's completion rate |
| **POST** | `/instructor-api/appeal/:courseId` | Instructor | One-time appeal reinstatement submission for deactivated course (min 50 chars) |
| **GET** | `/instructor-api/my-appeals` | Instructor | Fetch all appeal letters and responses for the active instructor |

### 👑 Administrator Endpoints (`/admin-api/*`)
All `/admin-api` endpoints require token verification with the role of `ADMIN`.
| HTTP Method | Endpoint | User Role | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/admin-api/users` | Admin | Retrieve accounts list for all users on the platform |
| **PATCH** | `/admin-api/users/:userId/status` | Admin | Suspend or reactivate user accounts |
| **PATCH** | `/admin-api/users/:userId/role` | Admin | Update user privileges (`STUDENT`, `INSTRUCTOR`, `ADMIN`) |
| **GET** | `/admin-api/courses` | Admin | Fetch all courses along with respective instructor data |
| **PATCH** | `/admin-api/courses/:courseId/status`| Admin | Deactivate (take down) or activate a course |
| **GET** | `/admin-api/stats` | Admin | Overall signup stats, course distribution, and registration logs |
| **GET** | `/admin-api/appeals` | Admin | Fetch all instructor appeal requests (supports query filtering by status) |
| **PATCH** | `/admin-api/appeals/:appealId/approve`| Admin | Accept appeal, reactivate course atomically, update status to `approved` |
| **PATCH** | `/admin-api/appeals/:appealId/reject` | Admin | Deny appeal, keep course deactivated, update status to `rejected` |
