# ONLINE LEARNING PLATFORM WITH AI MENTORSHIP AND STARTUP MICRO-INTERNSHIPS (COURSEHUB)

<div align="center">

### A Project Report on
# ONLINE LEARNING PLATFORM WITH AI MENTORSHIP AND STARTUP MICRO-INTERNSHIPS (COURSEHUB)

Submitted in partial fulfillment of the requirements for the award of the degree of  
**BACHELOR OF TECHNOLOGY**  
**IN**  
**INFORMATION TECHNOLOGY**

<br>

*Submitted By*  
**VADDIGALLA RISHIKANTH**  
**(HT No: 24EG512A04)**

<br>

*Under the Esteemed Guidance of*  
**Mr. G. SEKHAR REDDY**  
Assistant Professor, Dept. of Information Technology

<br><br>

<img src="docs_screenshots/anurag_university_logo.png" alt="Anurag University Logo" width="300" />

<br>

**DEPARTMENT OF INFORMATION TECHNOLOGY**  
**ANURAG UNIVERSITY**  
(Formerly Anurag Group of Institutions / CVSR College of Engineering)  
(Approved by AICTE and NBA & NAAC Accredited 'A+' Grade)  
Venkatapur (V), Ghatkesar (M), Medchal-Malkajgiri District, Hyderabad, Telangana – 500088  
**2023 – 2027**

</div>

<div style="page-break-after: always;"></div>

<div align="center">
<img src="docs_screenshots/anurag_university_logo.png" alt="Anurag University Logo" width="240" />

# ANURAG UNIVERSITY
### Department of Information Technology
**Venkatapur (V), Ghatkesar (M), Medchal-Malkajgiri District, Hyderabad – 500088**
</div>

---

## CERTIFICATE

This is to certify that the Project report titled **“ONLINE LEARNING PLATFORM WITH AI MENTORSHIP AND STARTUP MICRO-INTERNSHIPS”** is a bonafide work done and submitted by **VADDIGALLA RISHIKANTH (HT.NO: 24EG512A04)**, in partial fulfillment of the requirements for the award of **B.Tech in Information Technology** to **Anurag University (Formerly Anurag Group of Institutions / CVSR College of Engineering)**, Hyderabad during the academic year 2023–2027 and the bonafide work has not been submitted elsewhere for the award of any other degree.

<br><br><br>

---------------------------------------- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ----------------------------------------
**Internal Guide** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Head of the Department (H.O.D)**
**G. SEKHAR REDDY** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Associate Professor & Head**
Assistant Professor, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dept of Information Technology
Dept of Information Technology &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Anurag University
Anurag University

<br><br>

----------------------------------------
**External Examiner**

---

<div style="page-break-after: always;"></div>

## DECLARATION

I hereby declare that the project work entitled **“ONLINE LEARNING PLATFORM WITH AI MENTORSHIP AND STARTUP MICRO-INTERNSHIPS”**, submitted to **Anurag University** in partial fulfillment of the requirements for the award of the Degree of **Bachelor of Technology in Information Technology**, is an authentic record of original work carried out by me under the guidance of **Mr. G. SEKHAR REDDY**, Assistant Professor, Department of Information Technology.

This matter embodied in this project report has not been submitted by me or anyone else to any other University or Institute for the fulfillment of the requirement of any course of study or degree.

<br><br><br>

**Place:** Hyderabad, Telangana  
**Date:** 11-10-2026  

<br>

----------------------------------------------------  
**VADDIGALLA RISHIKANTH**  
**Hall Ticket No:** 24EG512A04  
Department of Information Technology  
Anurag University  

---

<div style="page-break-after: always;"></div>

## ACKNOWLEDGEMENT

I would like to express my sincere thanks to **Dr. / Mr. / Mrs.**, Associate Professor & Head of the Department of Information Technology, Anurag University, whose continuous motivation in the field of software engineering and web application development has enabled me to overcome technical hurdles during the course of study and successfully complete this project.

I express my profound sense of gratitude to all faculty members who supported me throughout this dissertation. I convey my heartfelt gratitude and sincere thanks to my project guide **Mr. G. SEKHAR REDDY**, Assistant Professor, Department of Information Technology, Anurag University, for his insightful guidance, timely architectural suggestions, and encouraging mentorship throughout the conception, development, and cloud deployment of this platform.

I extend sincere thanks to **Prof. M. Mutha Reddy**, Principal, and the executive leadership of Anurag University, Venkatapur, Ghatkesar, for providing high-speed network infrastructure, modern laboratories, and an environment conducive to innovation.

Finally, I express my deepest love and heartfelt thanks to my parents and friends who have been immensely supportive morally, mentally, and financially throughout my academic endeavors.

<br><br><br>

----------------------------------------------------  
**VADDIGALLA RISHIKANTH**  
**(24EG512A04)**  

---

<div style="page-break-after: always;"></div>

## ABSTRACT

Traditional web-based learning management systems (LMS) provide passive educational materials such as pre-recorded video lectures and downloadable PDFs, but lack economic and career conversion mechanisms for students. After acquiring practical technical skills, learners struggle to break into the industry because multinational corporations (MNCs) enforce high filtration barriers, arbitrary academic percentage thresholds (such as 90%+ criteria), multiple interview rounds, and restrictive employment bonds. Concurrently, early-stage startups and small ventures require cost-effective talent to complete modular software milestones, but lack the capital to hire high-cost senior developers.

To bridge this critical industry gap, the **Online Learning Platform with AI Mentorship and Startup Micro-Internships (CourseHub)** has been designed and implemented using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**. The system provides a unified four-role ecosystem comprising **Students**, **Instructors**, **Startups**, and **Administrators**:

1. **Students:** Access video courses, modular curriculum tracking, interactive chapter quizzes, cryptographic QR-verified certificates, an integrated AI Mentor powered by **Google Gemini**, and a dedicated **"Skill-to-Earn"** marketplace to earn milestone stipends without corporate bonds.
2. **Instructors:** Create and manage rich multimedia courses with cloud-optimized video streaming via **Cloudinary**, author assessments with AI quiz assistance, and monitor enrollment revenue metrics.
3. **Startups:** Register via a dedicated enterprise onboarding portal capturing company name, established year, headquarters location, and employee count. Startups post paid micro-internships and mini-tasks, instantly broadcasting opportunity alerts to verified learners.
4. **Administrators:** Moderate courses, supervise user accounts, resolve platform appeals, and oversee platform analytics.

The application incorporates a secure **dual-channel JWT authentication architecture** (supporting both HTTP-only cookies and Bearer headers) that ensures cross-domain compatibility. The backend is deployed on **Render** with active health probes (`https://online-learning-platofrm.onrender.com`), while the frontend is deployed on **Vercel** with client-side Single Page Application (SPA) rewrites. Comprehensive functional, integration, and security testing demonstrates that the platform delivers high availability, low latency, robust role-based access control, and practical economic empowerment for engineering learners.

---

<div style="page-break-after: always;"></div>

## CONTENTS

| CHAPTERS | TITLE | PAGE NO |
|:---|:---|:---:|
| | **List of Figures** | **i** |
| | **List of Tables** | **ii** |
| | **List of Abbreviations** | **iii** |
| **1.** | **INTRODUCTION** | **1** |
| | 1.1 Overview | 1 |
| | 1.2 Objectives | 2 |
| | 1.3 Problem Formulation | 3 |
| | 1.4 Scope | 4 |
| | 1.5 Feasibility Study | 5 |
| | 1.6 System Requirements | 6 |
| | &nbsp;&nbsp;&nbsp;&nbsp;1.6.1 Software Requirements | 6 |
| | &nbsp;&nbsp;&nbsp;&nbsp;1.6.2 Hardware Requirements | 7 |
| **2.** | **REQUIREMENTS** | **8** |
| | 2.1 Requirements Specification | 8 |
| | 2.2 User Interfaces (Page Layout & Fields) | 12 |
| | 2.3 Constraints & Prerequisites | 17 |
| **3.** | **ANALYSIS** | **19** |
| | 3.1 Use Case Model | 19 |
| | &nbsp;&nbsp;&nbsp;&nbsp;3.1.1 Use Case Diagram | 19 |
| | &nbsp;&nbsp;&nbsp;&nbsp;3.1.1.1 Flow of Events (for each use case) | 21 |
| | &nbsp;&nbsp;&nbsp;&nbsp;3.1.2 Activity Diagram | 26 |
| | &nbsp;&nbsp;&nbsp;&nbsp;3.1.2.1 Activity Diagram (for each use case) | 27 |
| **4.** | **DESIGN** | **31** |
| | 4.1 Database Design | 31 |
| | 4.2 E - R Diagram | 36 |
| | 4.3 Sequence Diagram | 38 |
| | 4.4 Class Diagram | 41 |
| **5.** | **IMPLEMENTATION** | **44** |
| | 5.1 Architecture & Tech Stack Integration | 44 |
| | 5.2 Backend API Implementation | 46 |
| | 5.3 Frontend Component Architecture | 52 |
| | 5.4 Cloud Deployment Pipeline (Render & Vercel) | 55 |
| **6.** | **USER SCREENS** | **58** |
| **7.** | **TESTING METHODOLOGY** | **64** |
| | 7.1 Unit Testing | 64 |
| | 7.2 Integration Testing | 65 |
| | 7.3 Role-Based Security Testing | 66 |
| | 7.4 Test Cases and Execution Results | 67 |
| **8.** | **CONCLUSION AND FUTURE ENHANCEMENTS** | **70** |
| | 8.1 Conclusion | 70 |
| | 8.2 Future Enhancements | 71 |
| **9.** | **REFERENCES** | **73** |

---

<div style="page-break-after: always;"></div>

## LIST OF FIGURES

| Figure No | Description | Page No |
|:---|:---|:---:|
| Figure 3.1 | Platform Overall Use Case Diagram | 20 |
| Figure 3.2 | Activity Diagram for User & Startup Registration | 27 |
| Figure 3.3 | Activity Diagram for Course Enrollment & Learning Progress | 28 |
| Figure 3.4 | Activity Diagram for Startup Gig Posting & Application Flow | 29 |
| Figure 3.5 | Activity Diagram for AI Mentorship & Assessment | 30 |
| Figure 4.1 | Entity-Relationship (E-R) Diagram | 37 |
| Figure 4.2 | Sequence Diagram for Startup Hiring & Application Lifecycle | 39 |
| Figure 4.3 | Sequence Diagram for Course Completion & Certificate Generation | 40 |
| Figure 4.4 | Object-Oriented Class Diagram | 42 |
| Figure 5.1 | Three-Tier Physical Deployment Architecture | 45 |
| Figure 6.1 | User Screen: Home Landing Page Interface | 58 |
| Figure 6.2 | User Screen: User Registration with Startup Portal Callout | 59 |
| Figure 6.3 | User Screen: Dedicated Startup Registration Portal | 60 |
| Figure 6.4 | User Screen: User Authentication & Sign-In Interface | 61 |
| Figure 6.5 | User Screen: Student Dashboard & Progress Center | 62 |
| Figure 6.6 | User Screen: Student Enrolled Courses & Study Portal | 63 |
| Figure 6.7 | User Screen: Comprehensive Course Catalog & Filtering | 64 |
| Figure 6.8 | User Screen: Structured Career & Learning Paths | 65 |
| Figure 6.9 | User Screen: Startup Micro-Internships & Gig Marketplace | 66 |
| Figure 6.10 | User Screen: Startup Founder Portal & Applicant Management Hub | 67 |
| Figure 6.11 | User Screen: Startup Micro-Internship Opportunity Builder | 68 |
| Figure 6.12 | User Screen: Instructor Dashboard & Course Analytics | 69 |
| Figure 6.13 | User Screen: Instructor Curriculum & Course Creation Interface | 70 |
| Figure 6.14 | User Screen: Instructor Course Management & Publishing Center | 71 |
| Figure 6.15 | User Screen: Cryptographic Certificate Verification Portal | 72 |

---

<div style="page-break-after: always;"></div>

## LIST OF TABLES

| Table No | Description | Page No |
|:---|:---|:---:|
| Table 1.1 | Software Specifications | 6 |
| Table 1.2 | Hardware Specifications | 7 |
| Table 2.1 | Functional Requirements Traceability Matrix | 11 |
| Table 4.1 | Schema: User Collection | 32 |
| Table 4.2 | Schema: Course Collection | 33 |
| Table 4.3 | Schema: Gig / Opportunity Collection | 34 |
| Table 4.4 | Schema: Application Collection | 35 |
| Table 4.5 | Schema: Certificate Collection | 35 |
| Table 4.6 | Schema: Notification Collection | 36 |
| Table 5.1 | REST API Endpoints Specification | 51 |
| Table 7.1 | Comprehensive System Test Cases and Results | 68 |

---

<div style="page-break-after: always;"></div>

## LIST OF ABBREVIATIONS

| Notation | Description |
|:---|:---|
| **API** | Application Programming Interface |
| **CDN** | Content Delivery Network |
| **CORS** | Cross-Origin Resource Sharing |
| **CSS** | Cascading Style Sheets |
| **DOM** | Document Object Model |
| **E-R** | Entity - Relationship |
| **HTML** | HyperText Markup Language |
| **HTTP** | HyperText Transfer Protocol |
| **HTTPS** | HyperText Transfer Protocol Secure |
| **IDE** | Integrated Development Environment |
| **JSON** | JavaScript Object Notation |
| **JWT** | JSON Web Token |
| **LMS** | Learning Management System |
| **MERN** | MongoDB, Express.js, React.js, Node.js |
| **MNC** | Multinational Corporation |
| **NoSQL** | Not Only Structured Query Language |
| **ODM** | Object Data Modeling |
| **PDF** | Portable Document Format |
| **QR** | Quick Response Code |
| **RBAC** | Role-Based Access Control |
| **REST** | Representational State Transfer |
| **SPA** | Single Page Application |
| **SSL** | Secure Sockets Layer |
| **TLS** | Transport Layer Security |
| **UI** | User Interface |
| **URI** | Uniform Resource Identifier |
| **UX** | User Experience |

---

<div style="page-break-after: always;"></div>

# CHAPTER 1
# INTRODUCTION

## 1.1 Overview
The digital revolution in tertiary education has reshaped instructional delivery worldwide. As online learning expands beyond emergency remote teaching, modern learners demand flexible, self-paced, and comprehensive education environments that empower them both academically and financially. Traditional higher education formats and static course directories provide lecture videos, but rarely connect students with immediate, practical work opportunities.

The **Online Learning Platform with AI Mentorship and Startup Micro-Internships (CourseHub)** addresses this challenge. Developed as a full-stack web application on the **MERN (MongoDB, Express.js, React.js, Node.js)** architecture, the platform unifies curriculum distribution with an experiential economic framework.

The platform provides dedicated, role-tailored capabilities for four distinct stakeholders:
- **Learners (Students):** Enroll in modular courses, stream high-definition video lectures, track course completion progress, consult a 24/7 AI Mentor powered by **Google Gemini**, earn digitally signed and QR-verified certificates, and apply for paid startup micro-internships without restrictive barriers.
- **Instructors:** Design courses, upload multimedia lectures and study resources to cloud storage, author dynamic assessments with AI-assistance, and review student performance analytics.
- **Startups & Hiring Partners:** Onboard through a dedicated enterprise portal specifying company name, established year, headquarters location, and team size. Startups publish micro-tasks and paid internships, broadcast opportunities to verified learners, and hire motivated talent with zero corporate bond friction.
- **Administrators:** Oversee platform integrity, review published courses, manage user roles, and resolve user appeals through an administrative control panel.

By pairing AI-assisted mentorship with startup project outsourcing, CourseHub establishes a sustainable educational ecosystem that reduces startup production costs while directly funding and upskilling student careers.

---

## 1.2 Objectives
The central objectives of the Online Learning Platform project are as follows:

1. **Architect a Scalable Full-Stack Web Platform:** Build a responsive, cloud-native web application using MongoDB Atlas, Express.js, React 19, and Node.js.
2. **Implement Role-Based Access Control (RBAC):** Provide granular authentication and authorization mechanisms for Students, Instructors, Startups, and Administrators using JSON Web Tokens (JWT) and dual-channel cookie/header transport.
3. **Establish a Dedicated Startup Onboarding Workflow:** Separate corporate registration from general student onboarding to capture critical organizational metadata including Company Name, Established Year, Location, and Employee Count.
4. **Engineer the "Skill-to-Earn" Micro-Internship Gateway:** Eliminate traditional 90% score gates and restrictive corporate bonds, allowing learners with verified competencies to undertake paid mini-tasks for early-stage startups.
5. **Integrate Real-Time Generative AI Mentorship:** Utilize Google Gemini Large Language Model APIs to deliver 24/7 interactive tutoring, programming guidance, and automated assessment generation.
6. **Deploy Cryptographic QR-Code Verifiable Credentials:** Issue tamper-proof course completion certificates verifiable via dynamic QR codes at `/verify-certificate`.
7. **Ensure Production Reliability & Cloud Deployment:** Deploy the backend on **Render** (`https://online-learning-platofrm.onrender.com`) and the frontend on **Vercel** with full CORS and SPA rewrite handling.

---

## 1.3 Problem Formulation
Conventional educational platforms and university management portals suffer from fundamental structural deficiencies:

1. **Disconnection from Immediate Economic Reality:** Students spend hundreds of hours mastering programming, design, and analytics frameworks without gaining hands-on commercial experience or supplemental income.
2. **High Filtration Barriers in Corporate Recruiting:** Top-tier MNCs enforce aggressive academic score filters (requiring 90%+ marks, aptitude clearances, and long multi-stage interviews), discouraging talented learners from practical project work.
3. **High Resource Costs for Early-Stage Startups:** Small businesses and seed-stage startups frequently require small, modular tasks (e.g., landing page development, API integration, UI prototyping, data cleanup) but cannot afford full-time engineering salaries or recruitment commissions.
4. **Credential Integrity Deficits:** Standard certificates distributed as unverified PDFs are easily manipulated. Academic institutions require digital authentication to confirm bonafide completion.
5. **Static Pedagogy without Immediate Support:** When students encounter bugs or theoretical hurdles late at night, they lack responsive teaching assistance, leading to course abandonment.

---

## 1.4 Scope
The scope of this project encompasses the design, implementation, and cloud deployment of the full-stack web application:

- **Authentication Module:** Secure registration, dedicated startup onboarding, credential hashing, and session management.
- **Course Authoring & Management:** Video transcoding and media hosting on Cloudinary, chapter sequencing, curriculum pricing, and preview support.
- **Learning Interface:** Custom HTML5 video player, automatic chapter completion triggers, wishlist management, and enrollment databases.
- **Opportunity Portal:** Posting of paid micro-internships, mini-tasks, and full-time junior positions, application submission, resume review, and status tracking.
- **AI Mentorship Engine:** Gemini-backed conversational assistant contextualized to course curriculum.
- **Verification Engine:** Dynamic PDF generation using `jsPDF` and `html2canvas`, and QR verification routes.
- **Administrative Governance:** User status toggles (active/banned), role elevation, and course auditing.

---

## 1.5 Feasibility Study
Before initiating development, a comprehensive feasibility study was conducted across three key dimensions:

### 1.5.1 Technical Feasibility
The platform utilizes the MERN stack—a battle-tested, highly supported open-source ecosystem. Node.js provides asynchronous non-blocking I/O ideal for concurrent API interactions. React.js utilizes a Virtual DOM to deliver sub-second UI transitions. MongoDB Atlas provides horizontal scalability and flexible document schemas. Multimedia files are offloaded to Cloudinary CDN, removing server disk bottlenecks. Technical feasibility is fully confirmed.

### 1.5.2 Operational Feasibility
The platform features an intuitive, glassmorphic UI styled with Tailwind CSS, requiring minimal technical training for students or startup founders. Automated notifications guide users through course milestones and hiring events. Operational feasibility is satisfied.

### 1.5.3 Economic Feasibility
The software leverages open-source libraries, free-tier cloud credits on MongoDB Atlas, Render, Vercel, and Cloudinary. No specialized hardware is required, rendering development and maintenance economically viable.

---

## 1.6 System Requirements

### 1.6.1 Software Requirements
Table 1.1 delineates the software environment utilized during development and production execution.

**Table 1.1: Software Specifications**

| Component | Specification |
|:---|:---|
| **Operating System** | Windows 10/11, macOS Sequoia, or Ubuntu Linux 22.04 LTS |
| **Frontend Framework** | React.js 19.x, Vite 7.x, React Router DOM 7.x |
| **Styling & Icons** | Tailwind CSS 4.x, React Icons, Lucide Icons |
| **Backend Runtime** | Node.js (v20.x / v22.x LTS), Express.js 5.x |
| **Database System** | MongoDB Atlas (Cloud NoSQL Database), Mongoose ODM 9.x |
| **Security & Auth** | JSON Web Token (jsonwebtoken), bcrypt (Salt Rounds: 10), cookie-parser |
| **Cloud Object Storage** | Cloudinary Multimedia CDN SDK |
| **Artificial Intelligence** | Google Gemini Generative AI SDK (`@google/genai`) |
| **Client HTTP Tool** | Axios with custom Bearer token request/response interceptors |
| **PDF & QR Engines** | jsPDF, html2canvas, qrcode.react, qrcode |
| **Version Control** | Git, GitHub (`https://github.com/rishi1702-boop/Online_learning_platofrm`) |
| **Cloud Hosting** | Render (Backend Web Service), Vercel (Frontend Single Page App) |

### 1.6.2 Hardware Requirements
Table 1.2 specifies the minimum and recommended hardware configurations.

**Table 1.2: Hardware Specifications**

| Component | Minimum Specification | Recommended Specification |
|:---|:---|:---|
| **Central Processor** | Intel Core i3 / AMD Ryzen 3 | Intel Core i5/i7, AMD Ryzen 5/7, Apple Silicon M-Series |
| **System Memory (RAM)** | 4 GB | 8 GB to 16 GB DDR4/DDR5 |
| **Storage Capacity** | 20 GB Free Space | 50 GB Solid State Drive (NVMe SSD) |
| **Network Interface** | Standard Broadband (2 Mbps) | High-Speed Fiber / Wi-Fi (15 Mbps+) |
| **Display Resolution** | 1366 × 768 Pixels | 1920 × 1080 (Full HD) or higher |

---

<div style="page-break-after: always;"></div>

# CHAPTER 2
# REQUIREMENTS

## 2.1 Requirements Specification

The system requirements are categorized into functional requirements (capabilities provided by the application) and non-functional requirements (quality attributes and operational standards).

### 2.1.1 Functional Requirements (FR)

- **FR-01: User Registration & Role Selection:** The system must allow users to register as Students, Instructors, or Admins with first name, last name, email, and password.
- **FR-02: Dedicated Startup Registration:** The system must provide a separate onboarding flow for corporate entities collecting Company Name, Established Year (1950–Present), Headquarters Location, Employee Count range, Founder Name, Work Email, and Password.
- **FR-03: Dual Authentication Mechanism:** The system must verify credentials, issue JSON Web Tokens, and support both HTTP-only cookies and `Authorization: Bearer <token>` headers for cross-domain operation.
- **FR-04: Course Catalog & Category Discovery:** Students must be able to search, filter by category (Development, Design, Business, AI), view ratings, and inspect curriculum details.
- **FR-05: Multimedia Curriculum Delivery:** The platform must stream video lectures from Cloudinary, provide lesson navigation, and record chapter completion milestones.
- **FR-06: Interactive Assessment & Quizzing:** The platform must provide dynamic multiple-choice quizzes with timer controls, auto-grading, and score recording in the student profile.
- **FR-07: AI Mentorship Conversational Agent:** Students must be able to query an embedded Google Gemini AI tutor regarding lesson content, code bugs, and personalized study roadmaps.
- **FR-08: Cryptographic QR-Code Certificate Generation:** Upon 100% course curriculum completion, the platform must dynamically generate a downloadable PDF certificate bearing a unique verification hash and scannable QR code.
- **FR-09: Public Certificate Verification:** Anyone must be able to verify credential authenticity by scanning the certificate QR code or visiting `/verify-certificate?id=<ID>`.
- **FR-10: Startup Opportunity Creation:** Startups must be able to post micro-internships, mini-tasks, and junior jobs specifying title, description, milestone stipend, location, deadline, and zero-bond confirmation.
- **FR-11: Instant Student Broadcast Notifications:** When a startup publishes an opportunity, the system must broadcast real-time notification alerts to active learners.
- **FR-12: Job & Gig Application Engine:** Students must be able to apply directly by submitting cover letters, resume links, GitHub profiles, and portfolio URLs.
- **FR-13: Startup Candidate Reviewer:** Startups must have an evaluation dashboard to review applications, inspect portfolio links, and transition candidate status (`UNDER_REVIEW`, `SHORTLISTED`, `HIRED`, `REJECTED`).
- **FR-14: Instructor Creator Studio:** Instructors must be able to create courses, upload video chapters and PDF attachments, edit course metadata, and inspect student enrollment statistics.
- **FR-15: Administrative Oversight:** Admins must be able to view system-wide metrics, deactivate malicious users, audit courses, and resolve student appeals.

### 2.1.2 Non-Functional Requirements (NFR)

- **NFR-01: Performance & Response Time:** Standard API responses must resolve within 500ms under standard network conditions. Media streaming must leverage Cloudinary CDN caching.
- **NFR-02: Security & Data Privacy:** Passwords must be hashed using bcrypt with salt factor 10. Tokens must expire within 7 days. Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) protections must be active.
- **NFR-03: Availability & Fault Tolerance:** Cloud deployment on Render and Vercel must deliver 99.5% uptime. Render active healthcheck (`/health`) must report service availability.
- **NFR-04: Scalability:** The stateless Node.js architecture must support horizontal scaling, while MongoDB Atlas handles automatic sharding and replication.
- **NFR-05: Usability & Responsiveness:** User interfaces must follow a responsive fluid grid (Tailwind CSS) rendering cleanly across mobile, tablet, laptop, and desktop viewports.

---

## 2.2 User Interfaces (Page Layout & Fields)

The front-end user experience is partitioned into distinct page layouts:

1. **Home Landing Page (`/`):**
   - Header with dynamic navigation (Courses, Learning Paths, Login, Register, "🚀 For Startups").
   - Hero banner with platform value proposition, call-to-action buttons.
   - Featured courses grid with thumbnail, title, instructor name, rating stars, price.
   - "Why Choose Us" showcase detailing Zero-Bond Startup Internships, AI Mentorship, and QR Certificates.
   - Platform statistics counter and footer.

2. **Standard User Registration (`/register`):**
   - Left Panel: First name, last name, email, password, show/hide password toggle, strength indicator.
   - Role selection buttons: Learn (Student), Teach (Instructor), Admin.
   - Prominent Startup Banner: "Registering as a Startup? Startups have a separate registration with company details [Startup Portal &rarr;]".
   - Submit button ("Create free account") and login redirect link.
   - Right Panel: Adaptive branding visual with benefit checkmarks.

3. **Dedicated Startup Registration Page (`/register-startup`):**
   - Left Panel: Value proposition highlighting zero-bond hiring, affordable production cost, and broadcast alerts.
   - Right Panel Form Fields:
     - *Company / Startup Name* (`companyName` - text field)
     - *Founder / Lead First Name* (`firstName` - text field)
     - *Founder Last Name* (`lastName` - text field)
     - *Official Work Email* (`email` - email input with regex validation)
     - *Password* (`password` - password input with eye icon toggle)
     - *Established Year* (`establishedYear` - number input, range 1950 to present)
     - *Number of Employees* (`noOfEmployees` - dropdown: 1-10 Early Stage, 11-50 Seed/Growth, 51-200 Expansion, 200+ Enterprise)
     - *Headquarters / Location* (`location` - text field, e.g., Bengaluru, India or Remote)
     - *Company Website* (`website` - optional URL field)
   - Submit button ("Register Startup Account") and "Sign In to Startup Portal" link.

4. **User Authentication Page (`/login`):**
   - Form Fields: Email Address, Password, Forgot Password link.
   - Submit button ("Sign In" with spinning loader).
   - Helper links: "Don't have an account? Create an account" and "Hiring as a startup? Register your Startup &rarr;".
   - Client routing to `/student-dashboard`, `/instructor-dashboard`, `/startup-dashboard`, or `/admin-dashboard`.

5. **Student Dashboard (`/student-dashboard`):**
   - Welcome banner with learner name and active streak badge.
   - Stat cards: Courses in Progress, Completed Courses, Certificates Earned, Skill Points.
   - Enrolled courses carousel with progress bars ("Continue Learning" button).
   - Recommended micro-internships feed.

6. **Course Content & Video Player (`/learn/:courseId`):**
   - Left/Main Viewport: Custom video player streaming Cloudinary MP4, chapter title, study notes tab, AI mentor tab.
   - Right Sidebar: Modular accordion of curriculum modules and video lessons. Checkmarks indicate completed lessons.
   - "Claim Certificate" button activates upon 100% completion.

7. **Startup Internships & Mini-Tasks Portal (`/jobs`):**
   - Search bar and filter tabs: All Opportunities, Micro-Internships, Mini-Tasks, Full-Time Jobs.
   - Opportunity cards displaying: Title, Startup Name, Location, Stipend/Salary badge, "Zero Corporate Bond" badge, "Open to All Learners" badge.
   - "View Details & Apply" button navigating to `/jobs/:id`.

8. **Opportunity Details & Application Page (`/jobs/:id`):**
   - Header with company profile, founded year, location, employee count.
   - Detailed project description, deliverables, required skills, stipend milestone breakdown.
   - Modal Application Form: Full Name, Email, Resume link (Google Drive / Cloudinary), GitHub URL, Portfolio URL, Cover Letter.
   - Submit button with instant validation and confirmation toast.

9. **Startup Management Dashboard (`/startup-dashboard`):**
   - Top metrics: Active Postings, Total Applicants, Hired Candidates, Open Budget.
   - Quick Action: "+ Post New Internship / Mini-Task" button.
   - Tab 1: "My Active Postings" table with edit, close, and applicant count buttons.
   - Tab 2: "Applicant Reviewer" table displaying applicant name, applied role, resume icon, portfolio link, date, and status selector (`UNDER_REVIEW`, `SHORTLISTED`, `HIRED`, `REJECTED`).

10. **Post Internship / Job Page (`/startup/post-internship`):**
    - Form Fields: Opportunity Title, Type selector (Mini-Task, Internship, Full-Time), Category, Stipend amount & schedule, Project Deliverables, Required Skills tags, Application Deadline.
    - Checkbox: "Zero Bond Confirmation (Guarantee no forced bonds for students)".
    - Broadcast toggle: "Broadcast notification to eligible learners upon posting".
    - Publish button.

11. **Certificate Verification Page (`/verify-certificate`):**
    - Search input: Certificate ID.
    - Verified Certificate Card: Learner Name, Course Title, Issuing Authority ("CourseHub Verified"), Completion Date, Digital Hash, and QR confirmation.

---

## 2.3 Constraints & Prerequisites

### 2.3.1 Security Constraints
- Passwords must be at least 6 characters in length and include uppercase and numerical elements.
- Sensitive endpoints must strictly validate JWT signatures using secret environment variables (`JWT_SECRET`).
- Third-party cookies must be handled gracefully: since modern browsers restrict cross-domain cookies between Vercel and Render, the system must utilize Authorization Bearer headers as a persistent fallback.

### 2.3.2 Operational Constraints
- Media assets must not exceed 100 MB per video upload.
- File uploads are streamed directly to Cloudinary to preserve server memory.

### 2.3.3 Prerequisites
- Node.js environment >= 18.0.0 and <= 22.x LTS.
- Active internet connectivity to establish database handshakes with MongoDB Atlas cloud clusters.
- Valid API credentials for Cloudinary and Google Gemini.

---

<div style="page-break-after: always;"></div>

# CHAPTER 3
# ANALYSIS

## 3.1 Use Case Model

The use case model captures the interactions between external actors and system capabilities.

### 3.1.1 Use Case Diagram

The primary actors interacting with CourseHub are:
1. **Student:** Enrolls in courses, watches videos, queries AI mentor, applies for gigs, downloads certificates.
2. **Instructor:** Creates curriculum, uploads lectures, builds quizzes, views revenue analytics.
3. **Startup Partner:** Registers company, publishes gigs/jobs, reviews student portfolios, updates hiring status.
4. **Administrator:** Manages user accounts, audits courses, resolves platform appeals.

```mermaid
graph LR
    actorStudent((Student))
    actorInstructor((Instructor))
    actorStartup((Startup))
    actorAdmin((Admin))

    subgraph CourseHub Platform Boundary
        UC1[Register & Authenticate]
        UC2[Dedicated Startup Registration]
        UC3[Browse & Enroll in Courses]
        UC4[Stream Video Lessons & Track Progress]
        UC5[Interact with Gemini AI Mentor]
        UC6[Earn & Verify QR Certificates]
        UC7[Apply for Startup Gigs & Jobs]
        UC8[Create & Publish Courses]
        UC9[Manage Video & PDF Uploads]
        UC10[Build & Evaluate Quizzes]
        UC11[Post Micro-Internships & Mini-Tasks]
        UC12[Review Applicants & Update Status]
        UC13[Moderate Users & Roles]
        UC14[Platform Overview & Auditing]
    end

    actorStudent --> UC1
    actorStudent --> UC3
    actorStudent --> UC4
    actorStudent --> UC5
    actorStudent --> UC6
    actorStudent --> UC7

    actorInstructor --> UC1
    actorInstructor --> UC8
    actorInstructor --> UC9
    actorInstructor --> UC10

    actorStartup --> UC2
    actorStartup --> UC1
    actorStartup --> UC11
    actorStartup --> UC12

    actorAdmin --> UC1
    actorAdmin --> UC13
    actorAdmin --> UC14
```
**Figure 3.1: Platform Overall Use Case Diagram**

---

### 3.1.1.1 Flow of Events (for each use case)

#### Use Case UC-01: Dedicated Startup Registration
- **Actor:** Startup Founder / Corporate Recruiter.
- **Preconditions:** The recruiter possesses an official work email and corporate metadata.
- **Main Flow:**
  1. Recruiter navigates to `/register-startup`.
  2. Enters Company Name, Founder Name, Work Email, Password, Established Year, Employee Count, and Location.
  3. Clicks "Register Startup Account".
  4. Backend checks if email is unique, hashes password via bcrypt, initializes `startupProfile`, and stores record with `role: "STARTUP"`.
  5. System presents success toast and routes user to `/login`.
- **Alternative Flow:**
  - *Email already exists:* System displays error "An account with this email already exists" and keeps form data intact.
- **Postconditions:** A new startup profile exists in MongoDB Atlas, ready to post opportunities.

#### Use Case UC-02: Course Enrollment & Progress Tracking
- **Actor:** Student.
- **Preconditions:** Student is logged in with active credentials.
- **Main Flow:**
  1. Student browses `/all-courses` and clicks a desired course card.
  2. Clicks "Enroll Now" on `/course/:courseId`.
  3. Course ID is added to `coursesEnrolled` array in Student's user document.
  4. Student opens course player `/learn/:courseId` and watches video lectures.
  5. As each video completes, frontend dispatches lesson completion request updating progress percentage.
- **Postconditions:** Student progress reaches 100%, unlocking certificate generation.

#### Use Case UC-03: Startup Gig Posting & Instant Broadcast
- **Actor:** Startup Partner.
- **Preconditions:** Authenticated as `STARTUP` role.
- **Main Flow:**
  1. Startup opens `/startup/post-internship`.
  2. Enters Opportunity Title, Type (Mini-Task/Internship), Description, Deliverables, Stipend, and Deadline.
  3. Checks "Zero Bond Guarantee" and clicks "Publish Opportunity".
  4. Backend creates new `Gig` document linked to startup's `_id`.
  5. Backend generates notification records in `Notification` collection for active students.
- **Postconditions:** The micro-internship appears on the student `/jobs` board, and notifications appear in student header dropdowns.

#### Use Case UC-04: Student Gig Application & Startup Review
- **Actor:** Student & Startup Partner.
- **Preconditions:** Opportunity is published; Student is authenticated.
- **Main Flow:**
  1. Student navigates to `/jobs/:id` and reviews deliverables and stipend.
  2. Clicks "Apply Now", attaches Resume URL, GitHub portfolio link, and cover letter, then submits.
  3. Application is created in database with status `APPLIED`.
  4. Startup accesses `/startup-dashboard` and views the applicant in "Applicant Reviewer".
  5. Startup clicks candidate resume and portfolio, assesses suitability, and changes status dropdown to `SHORTLISTED` or `HIRED`.
  6. Backend updates application status and sends notification alert to student.
- **Postconditions:** Candidate is hired without recruitment commissions or employment bonds.

---

### 3.1.2 Activity Diagrams

Activity diagrams model the step-by-step procedural workflow of operations within the platform.

#### Activity 1: User & Startup Registration Workflow

```mermaid
stateDiagram-v2
    [*] --> SelectRegistrationType
    SelectRegistrationType --> StandardRegister : Individual (Student/Instructor)
    SelectRegistrationType --> StartupRegister : Corporate / Startup Partner

    state StandardRegister {
        FillPersonalDetails --> SelectRole
        SelectRole --> SubmitStandard
    }

    state StartupRegister {
        FillCompanyDetails --> EnterFoundedYearAndEmployees
        EnterFoundedYearAndEmployees --> FillFounderCredentials
        FillFounderCredentials --> SubmitStartup
    }

    SubmitStandard --> ValidateCredentials
    SubmitStartup --> ValidateCredentials

    ValidateCredentials --> EmailCheck : Check if Email Exists
    EmailCheck --> ShowError : Duplicate Email
    ShowError --> SelectRegistrationType
    EmailCheck --> HashPassword : Unique Email
    HashPassword --> SaveToMongoDB
    SaveToMongoDB --> RedirectLogin
    RedirectLogin --> [*]
```
**Figure 3.2: Activity Diagram for User & Startup Registration**

---

#### Activity 2: Course Enrollment & Learning Progress Workflow

```mermaid
stateDiagram-v2
    [*] --> BrowseCatalog
    BrowseCatalog --> ViewCourseDetails
    ViewCourseDetails --> CheckEnrollment : Is Student Already Enrolled?
    CheckEnrollment --> OpenCoursePlayer : Yes
    CheckEnrollment --> EnrollStudent : No
    EnrollStudent --> UpdateUserEnrolledCourses
    UpdateUserEnrolledCourses --> OpenCoursePlayer

    state OpenCoursePlayer {
        StreamCloudinaryVideo --> TakeChapterQuiz
        TakeChapterQuiz --> UpdateCompletionStatus
    }

    UpdateCompletionStatus --> Check100Percent : Check Curriculum Progress
    Check100Percent --> OpenCoursePlayer : Progress < 100%
    Check100Percent --> UnlockCertificate : Progress == 100%
    UnlockCertificate --> GenerateQRCertificate
    GenerateQRCertificate --> [*]
```
**Figure 3.3: Activity Diagram for Course Enrollment & Learning Progress**

---

#### Activity 3: Startup Gig Posting & Application Flow

```mermaid
stateDiagram-v2
    [*] --> StartupLogin
    StartupLogin --> OpenPostInternshipForm
    OpenPostInternshipForm --> FillMilestoneAndStipend
    FillMilestoneAndStipend --> ConfirmZeroBond
    ConfirmZeroBond --> PublishToBackend
    PublishToBackend --> BroadcastNotificationsToStudents
    BroadcastNotificationsToStudents --> StudentViewsJobBoard
    StudentViewsJobBoard --> SubmitApplicationWithPortfolio
    SubmitApplicationWithPortfolio --> StartupReviewsApplicant
    StartupReviewsApplicant --> UpdateStatusToHired
    UpdateStatusToHired --> [*]
```
**Figure 3.4: Activity Diagram for Startup Gig Posting & Application Flow**

---

<div style="page-break-after: always;"></div>

#### Activity 4: AI Mentorship & Assessment Workflow

```mermaid
stateDiagram-v2
    [*] --> StudentEncountersDoubt
    StudentEncountersDoubt --> LaunchAITutorModal : Click Floating AI Bubble
    LaunchAITutorModal --> EnterAcademicPrompt
    EnterAcademicPrompt --> StreamToGeminiAPI : Transmit Context & Query
    StreamToGeminiAPI --> GenerateContextualExplanation : Gemini LLM Inference
    GenerateContextualExplanation --> DisplayToStudent
    DisplayToStudent --> TakeChapterQuiz : Reinforce Concept
    TakeChapterQuiz --> EvaluateScore
    EvaluateScore --> UnlockNextLecture : Score >= 80%
    EvaluateScore --> RePromptAITutor : Score < 80%
    RePromptAITutor --> LaunchAITutorModal
    UnlockNextLecture --> [*]
```
**Figure 3.5: Activity Diagram for AI Mentorship & Assessment**

---

<div style="page-break-after: always;"></div>

# CHAPTER 4
# DESIGN

## 4.1 Database Design

The data layer uses **MongoDB Atlas**, an enterprise cloud NoSQL database, managed via the **Mongoose ODM**. Below are the data schemas:

### Table 4.1: User Collection Schema (`users`)
| Field Name | Data Type | Constraints | Description |
|:---|:---|:---|:---|
| `_id` | ObjectId | Primary Key, Auto | Unique document identifier |
| `firstName` | String | Required, Trim | User's first name |
| `lastName` | String | Required, Trim | User's last name |
| `email` | String | Required, Unique, Lowercase | User's registered email |
| `password` | String | Required, Min: 6 | Bcrypt hashed password string |
| `role` | String | Enum: STUDENT, INSTRUCTOR, STARTUP, ADMIN | Role-based permission tier |
| `startupProfile.companyName` | String | Optional (Required if STARTUP) | Registered company name |
| `startupProfile.establishedYear` | String | Optional | Year company was established |
| `startupProfile.location` | String | Default: 'Bengaluru, India' | Corporate headquarters location |
| `startupProfile.noOfEmployees` | String | Default: '1-10' | Team size range (e.g., 1-10, 11-50) |
| `startupProfile.website` | String | Optional | Company homepage URL |
| `coursesEnrolled` | Array of ObjectId | Ref: 'Course' | List of enrolled course IDs |
| `wishlist` | Array of ObjectId | Ref: 'Course' | Saved course wishlist IDs |
| `learningStreak.currentStreak` | Number | Default: 0 | Consecutive days active |
| `isActive` | Boolean | Default: true | Account moderation status |
| `createdAt` / `updatedAt` | Date | Timestamps | Audit timestamps |

### Table 4.2: Course Collection Schema (`courses`)
| Field Name | Data Type | Constraints | Description |
|:---|:---|:---|:---|
| `_id` | ObjectId | Primary Key | Course identifier |
| `title` | String | Required, Trim | Descriptive course title |
| `description` | String | Required | Full curriculum overview |
| `category` | String | Required | Category classification |
| `price` | Number | Required, Min: 0 | Course enrollment fee |
| `thumbnail` | String | Required | Cloudinary image asset URL |
| `instructor` | ObjectId | Required, Ref: 'User' | Creator instructor ID |
| `modules` | Array of Objects | Structured | Sections containing video lectures |
| `isPublished` | Boolean | Default: true | Visibility status |
| `averageRating` | Number | Default: 5.0 | Aggregated student rating |

### Table 4.3: Gig / Opportunity Collection Schema (`gigs`)
| Field Name | Data Type | Constraints | Description |
|:---|:---|:---|:---|
| `_id` | ObjectId | Primary Key | Opportunity identifier |
| `title` | String | Required | Internship / Mini-task title |
| `companyName` | String | Required | Posting startup name |
| `opportunityType` | String | Enum: MINI_TASK, INTERNSHIP, JOB | Classification of work |
| `stipend` | String | Required | Milestone stipend amount |
| `location` | String | Required | Work location / Remote |
| `deadline` | Date | Required | Application cutoff date |
| `hasBond` | Boolean | Default: false | Strict zero-bond declaration |
| `minimumScoreRequired` | Number | Default: 0 | Score threshold (set to 0 for access) |
| `postedBy` | ObjectId | Required, Ref: 'User' | Creator startup user ID |

### Table 4.4: Application Collection Schema (`applications`)
| Field Name | Data Type | Constraints | Description |
|:---|:---|:---|:---|
| `_id` | ObjectId | Primary Key | Application identifier |
| `opportunityId` | ObjectId | Required, Ref: 'Gig' | Associated gig / internship |
| `studentId` | ObjectId | Required, Ref: 'User' | Applicant student ID |
| `resumeUrl` | String | Required | Link to student resume |
| `githubUrl` | String | Optional | Student GitHub portfolio link |
| `portfolioUrl` | String | Optional | Student live project portfolio |
| `status` | String | Enum: APPLIED, UNDER_REVIEW, SHORTLISTED, HIRED, REJECTED | Current candidate hiring status |
| `coverLetter` | String | Optional | Statement of interest |

### Table 4.5: Certificate Collection Schema (`certificates`)
| Field Name | Data Type | Constraints | Description |
|:---|:---|:---|:---|
| `_id` | ObjectId | Primary Key | Certificate identifier |
| `studentId` | ObjectId | Required, Ref: 'User' | Recipient student ID |
| `courseId` | ObjectId | Required, Ref: 'Course' | Completed course ID |
| `certificateNumber` | String | Required, Unique | Cryptographic validation hash |
| `issueDate` | Date | Default: Date.now | Issue date timestamp |
| `verificationUrl` | String | Required | Public verification link |

---

## 4.2 E - R Diagram

```mermaid
erDiagram
    USER ||--o{ COURSE : "authors/teaches"
    USER ||--o{ APPLICATION : "submits"
    USER ||--o{ NOTIFICATION : "receives"
    USER ||--o{ CERTIFICATE : "earns"
    USER ||--o{ GIG : "posts (as Startup)"
    COURSE ||--o{ CERTIFICATE : "generates"
    GIG ||--o{ APPLICATION : "receives"

    USER {
        ObjectId _id PK
        string firstName
        string lastName
        string email UK
        string password
        string role
        object startupProfile
        ObjectId[] coursesEnrolled
    }

    COURSE {
        ObjectId _id PK
        string title
        string description
        number price
        string thumbnail
        ObjectId instructor FK
        boolean isPublished
    }

    GIG {
        ObjectId _id PK
        string title
        string companyName
        string opportunityType
        string stipend
        boolean hasBond
        ObjectId postedBy FK
    }

    APPLICATION {
        ObjectId _id PK
        ObjectId opportunityId FK
        ObjectId studentId FK
        string resumeUrl
        string githubUrl
        string status
    }

    CERTIFICATE {
        ObjectId _id PK
        ObjectId studentId FK
        ObjectId courseId FK
        string certificateNumber UK
        Date issueDate
    }

    NOTIFICATION {
        ObjectId _id PK
        ObjectId recipientId FK
        string message
        string link
        boolean isRead
    }
```
**Figure 4.1: Entity-Relationship (E-R) Diagram**

---

## 4.3 Sequence Diagrams

### 4.3.1 Startup Hiring & Application Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor S as Student
    actor ST as Startup Founder
    participant C as Client (React.js)
    participant B as Server (Express.js on Render)
    participant DB as MongoDB Atlas

    ST->>C: Fill & Submit Job Posting Form
    C->>B: POST /startup-api/post-opportunity
    B->>DB: Insert Gig document
    B->>DB: Insert Notifications for Students
    B-->>C: 201 Created ("Opportunity posted & broadcasted")
    
    S->>C: Open /jobs and Click "Apply"
    C->>B: POST /startup-api/opportunities/:id/apply
    B->>DB: Insert Application (Status: 'APPLIED')
    B-->>C: 201 Created ("Application submitted")
    
    ST->>C: View /startup-dashboard Applications Tab
    C->>B: GET /startup-api/applications
    B->>DB: Fetch applications populated with student details
    B-->>C: 200 OK (List of applicants)
    
    ST->>C: Change Status Dropdown to 'HIRED'
    C->>B: PATCH /startup-api/applications/:id/status
    B->>DB: Update Application.status = 'HIRED'
    B->>DB: Create Notification for Student ("Congratulations! You are hired")
    B-->>C: 200 OK ("Candidate status updated")
```
**Figure 4.2: Sequence Diagram for Startup Hiring & Application Lifecycle**

---

### 4.3.2 Course Completion & Certificate Generation Flow

```mermaid
sequenceDiagram
    autonumber
    actor S as Student
    participant C as Client (React.js)
    participant B as Server (Express.js)
    participant DB as MongoDB Atlas

    S->>C: Complete final lesson on /learn/:courseId
    C->>B: PATCH /user-api/course-progress/:courseId
    B->>DB: Update completedLessons & calculate progress = 100%
    B-->>C: Progress: 100%
    
    C->>C: Trigger Certificate Generator Component
    C->>B: POST /user-api/generate-certificate
    B->>DB: Check completion & generate unique certificateNumber hash
    B->>DB: Save Certificate document
    B-->>C: Return Certificate JSON + verificationUrl
    
    C->>C: Render jsPDF Canvas with QR Code embedding
    C-->>S: Download PDF Certificate
```
**Figure 4.3: Sequence Diagram for Course Completion & Certificate Generation**

---

## 4.4 Class Diagram

```mermaid
classDiagram
    class User {
        +ObjectId _id
        +String firstName
        +String lastName
        +String email
        +String password
        +String role
        +StartupProfile startupProfile
        +register()
        +login()
        +updateProfile()
    }

    class StartupProfile {
        +String companyName
        +String establishedYear
        +String location
        +String noOfEmployees
        +String website
    }

    class Course {
        +ObjectId _id
        +String title
        +String description
        +Number price
        +String thumbnail
        +ObjectId instructor
        +Module[] modules
        +publish()
        +updateCurriculum()
    }

    class Gig {
        +ObjectId _id
        +String title
        +String companyName
        +String opportunityType
        +String stipend
        +Boolean hasBond
        +ObjectId postedBy
        +postOpportunity()
        +closeOpportunity()
    }

    class Application {
        +ObjectId _id
        +ObjectId opportunityId
        +ObjectId studentId
        +String resumeUrl
        +String githubUrl
        +String status
        +submit()
        +updateStatus()
    }

    class Certificate {
        +ObjectId _id
        +ObjectId studentId
        +ObjectId courseId
        +String certificateNumber
        +Date issueDate
        +generate()
        +verify()
    }

    User "1" *-- "1" StartupProfile : contains
    User "1" --> "*" Course : creates
    User "1" --> "*" Application : submits
    User "1" --> "*" Gig : posts
    Course "1" --> "*" Certificate : issues
    Gig "1" --> "*" Application : receives
```
**Figure 4.4: Object-Oriented Class Diagram**

---

<div style="page-break-after: always;"></div>

# CHAPTER 5
# IMPLEMENTATION

## 5.1 Architecture & Tech Stack Integration

CourseHub is deployed using a decoupled, cloud-native three-tier topology comprising Presentation Layer (React.js on Vercel), Application Layer (Node.js & Express on Render), Data Layer (MongoDB Atlas), and External Media/AI Microservices (Cloudinary & Google Gemini).

![Figure 5.1: System Architecture of the Online Learning Platform](docs_screenshots/system_architecture_diagram.png)
<br>
**Figure 5.1: System Architecture of the Online Learning Platform**

---

<div style="page-break-after: always;"></div>

## 5.2 Backend API Implementation

The backend follows an Express router pattern. Key controller implementations are outlined below.

### 5.2.1 Dedicated Startup Registration (`backend/APIs/commonAPI.js`)
```javascript
authRouter.post('/register-startup', async (req, res) => {
    try {
        const {
            firstName, lastName, email, password,
            companyName, establishedYear, location,
            noOfEmployees, website, about
        } = req.body;

        if (!email || !password || !companyName) {
            return res.status(400).json({ message: "Email, password, and company name are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "An account with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newStartup = await User.create({
            firstName: firstName || companyName,
            lastName: lastName || "Team",
            email,
            password: hashedPassword,
            role: "STARTUP",
            startupProfile: {
                companyName,
                startupName: companyName,
                establishedYear: establishedYear || new Date().getFullYear().toString(),
                location: location || "Bengaluru, India",
                noOfEmployees: noOfEmployees || "1-10",
                website: website || "",
                stage: "Early Stage",
                about: about || ""
            }
        });

        const userObj = newStartup.toObject();
        delete userObj.password;

        res.status(201).json({
            message: "Startup registered successfully! You can now log in and post opportunities.",
            payload: userObj
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
```

### 5.2.2 Dual-Channel Token Verification (`backend/middlewares/verifyToken.js`)
```javascript
export const verifyToken = (req, res, next) => {
    // Check if token exists in cookies or Authorization header
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const token = req.cookies?.token || bearerToken;

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const secret = process.env.JWT_SECRET || "fallback_secret_key";
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};
```

---

## 5.3 Frontend Component Architecture

### 5.3.1 Persistent Client Interceptor (`frontend/src/api/axiosInstance.js`)
```javascript
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 15000
});

// Attach JWT token from localStorage if present for reliable cross-domain requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") {
         window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
```

---

## 5.4 Cloud Deployment Pipeline (Render & Vercel)

### 5.4.1 Render Blueprint (`render.yaml`)
```yaml
services:
  - type: web
    name: online-learning-platform-backend
    runtime: node
    plan: free
    rootDir: backend
    buildCommand: npm install
    startCommand: node server.js
    healthCheckPath: /health
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: MONGO_URL
        sync: false
      - key: JWT_SECRET
        sync: false
```

### 5.4.2 Vercel Single Page App Configuration (`frontend/vercel.json`)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

<div style="page-break-after: always;"></div>

# CHAPTER 6
# USER SCREENS

This chapter showcases the actual graphical user interfaces (GUI) of the deployed CourseHub application, captured directly from the live execution environment. Each figure is accompanied by an architectural breakdown of the layout regions, input components, data validation rules, and role-based permissions.

---

### 6.1 Screen 1: Home Landing Page
The primary entry point welcomes prospective learners, instructors, and corporate partners. It incorporates responsive navigation with quick links to Courses, Learning Paths, Login, Register, and a highlighted **"🚀 For Startups"** partner button. The hero section articulates the central platform mission: *"Skills that move your career forward"*, linking theoretical mastery directly to real-world career paths. The bottom section showcases corporate trust badges and a floating AI chatbot button.

![Figure 6.1: Home Landing Page Interface](docs_screenshots/screen_home.png)
<br>
**Figure 6.1: Home Landing Page Interface**

- **Key Fields & Components:**
  - **Dynamic Top Navigation Bar:** Routing links (`/all-courses`, `/learning-paths`, `/login`, `/register`, `/register-startup`).
  - **Hero Call-to-Action Group:** "Explore courses" and "View learning paths" primary buttons.
  - **Social Proof Counter:** Displays "50K+ learners", "1,200+ classes", and "4.8 average rating".
  - **Floating AI Mentor Trigger:** Fixed position bottom-right button providing instant academic tutoring via Google Gemini.

---

### 6.2 Screen 2: User Registration with Startup Portal Callout
The standard registration page (`/register`) caters to students, instructors, and platform administrators. To prevent confusion, it features an eye-catching emerald callout directing corporate founders to the dedicated startup onboarding workflow.

![Figure 6.2: User Registration with Startup Portal Callout](docs_screenshots/screen_register.png)
<br>
**Figure 6.2: User Registration with Startup Portal Callout**

- **Key Fields & Components:**
  - **Startup Gateway Banner:** "Registering as a Startup? Startups have a separate registration with company name, founded year, location & team size." with a direct button leading to `/register-startup`.
  - **Name Inputs:** First Name and Last Name inputs with iconography.
  - **Email & Password Fields:** Interactive password strength meter evaluating uppercase and numeric complexity.
  - **Role Selection Radio Cards:** Learn (Student), Teach (Instructor), Admin.

---

### 6.3 Screen 3: Dedicated Startup Registration Portal
Addressing the specific requirement for segregated corporate onboarding, this dedicated interface (`/register-startup`) collects organizational identity parameters required to vet hiring entities before they post paid opportunities.

![Figure 6.3: Dedicated Startup Registration Portal](docs_screenshots/screen_register_startup.png)
<br>
**Figure 6.3: Dedicated Startup Registration Portal**

- **Key Fields & Components:**
  - **Left Value Proposition Panel:** Highlights core student benefits: *Zero Corporate Bonds*, *Affordable Production Cost*, and *Instant Broadcast Alerts*.
  - **Company / Startup Name Input:** Captures legal business entity name (e.g., *vip, TechSpark Labs*).
  - **Founder / Lead First & Last Name:** Personal identity fields for the account administrator.
  - **Official Work Email:** Corporate email address enforced by regular expression validation.
  - **Password Input:** Secure field with minimum 6-character constraint and show/hide password toggle.
  - **Established Year Input:** Numerical year field restricted between 1950 and the current calendar year.
  - **Number of Employees Dropdown:** Segregates startup stage (`1-10 Early Stage`, `11-50 Seed / Growth`, `51-200 Expansion`, `200+ Scaleup`).
  - **Headquarters / Location Input:** Captures corporate base (e.g., *Bengaluru, India or Remote*).
  - **Submission Action:** "Register Startup Account &rarr;" button dispatching `POST /common-api/register-startup`.

---

### 6.4 Screen 4: User Authentication & Sign-In Interface
The login interface (`/login`) provides secure access across all four platform roles. After verifying credentials against bcrypt hashes, the backend returns a signed JWT and user metadata, redirecting users according to their respective role.

![Figure 6.4: User Authentication & Sign-In Interface](docs_screenshots/screen_login.png)
<br>
**Figure 6.4: User Authentication & Sign-In Interface**

- **Key Fields & Components:**
  - **Email Address & Password Fields:** Auto-focus inputs with validation and error feedback.
  - **Sign In Button:** Features asynchronous progress feedback and prevents duplicate submissions.
  - **Alternative Navigation:** Direct link for startups: *"Hiring as a startup? Register your Startup &rarr;"*.
  - **Testimonial Showcase:** Highlights verified learner community ratings.

---

### 6.5 Screen 5: Student Dashboard & Academic Progress Center
Upon logging in with student credentials (`rk@gmail.com`), learners are greeted with a personalized learning command center displaying current enrolled course metrics, streak indicators, and continue-learning modules.

![Figure 6.5: Student Dashboard & Progress Center](docs_screenshots/screen_student_dashboard.png)
<br>
**Figure 6.5: Student Dashboard & Progress Center**

- **Key Fields & Components:**
  - **Personalized Header Banner:** "Welcome back, rishi kanth 👋" with dynamic day-streak badge and enrolled course summary counters.
  - **Quick Metric Cards:** Enrolled courses count (3), Available catalog courses (16), and Active in-progress modules (3).
  - **Continue Learning Carousel:** Interactive cards for enrolled courses with direct resume playback triggers.
  - **AI Chatbot Bubble:** Bottom-right floating icon launching instant tutoring sessions.

---

### 6.6 Screen 6: Student Enrolled Courses & Study Portal
Accessible via `/my-courses`, this interface displays all curricular modules currently enrolled by the authenticated student.

![Figure 6.6: Student Enrolled Courses & Study Portal](docs_screenshots/screen_my_courses.png)
<br>
**Figure 6.6: Student Enrolled Courses & Study Portal**

- **Key Fields & Components:**
  - **Course Progress Gauges:** Percentage completion bars for individual lecture modules.
  - **Course Action Buttons:** "Continue Learning", "Course Details", and "Take Assessment".
  - **Search & Filter Controls:** Allows students to filter courses by subject, completion status, or instructor.

---

### 6.7 Screen 7: Comprehensive Course Catalog & Filtering
The course catalog (`/all-courses`) displays all published educational programs across cloud computing, machine learning, web engineering, and data science.

![Figure 6.7: Comprehensive Course Catalog & Filtering](docs_screenshots/screen_all_courses.png)
<br>
**Figure 6.7: Comprehensive Course Catalog & Filtering**

- **Key Fields & Components:**
  - **Search Bar:** Real-time query matching against titles, tags, and instructor names.
  - **Category Pills:** Rapid selection across technical domains (Full-Stack, Cloud, AI/ML, DevOps).
  - **Pricing & Rating Badges:** Transparent pricing, duration hours, and star review scores.

---

### 6.8 Screen 8: Structured Career & Learning Paths
The `/learning-paths` screen guides students through curated multi-course career roadmaps designed to take learners from beginner fundamentals to industry-ready engineering proficiency.

![Figure 6.8: Structured Career & Learning Paths](docs_screenshots/screen_learning_paths.png)
<br>
**Figure 6.8: Structured Career & Learning Paths**

- **Key Fields & Components:**
  - **Track Roadmap Visualizer:** Step-by-step milestones (e.g., Frontend Specialist, Cloud Architect, AI Engineer).
  - **Target Roles & Salary Ranges:** Estimated industry compensation and prerequisites.
  - **Enroll in Path Trigger:** One-click enrollment into grouped curricular bundles.

---

### 6.9 Screen 9: Startup Micro-Internships & Gig Marketplace
The `/jobs` portal represents the platform's core economic innovation: a "Skill-to-Earn" marketplace connecting verified learners directly to emerging startups for paid mini-tasks and micro-internships without corporate MNC filtration or bonds.

![Figure 6.9: Startup Micro-Internships & Gig Marketplace](docs_screenshots/screen_jobs.png)
<br>
**Figure 6.9: Startup Micro-Internships & Gig Marketplace**

- **Key Fields & Components:**
  - **Category Tabs:** Filter between *Startup Internships & Mini-Tasks*, *Full-Time Jobs*, and *My Applications*.
  - **Opportunity Cards:** Displays company badge, job title, location mode (Remote/Hybrid), stipend/compensation, and required tech stack tags.
  - **Application Status Indicator:** Live status badges (e.g., `Applied (PENDING)` or `ACCEPTED`).
  - **View Details & Apply Button:** Opens detailed scope description and direct submission modal.

---

### 6.10 Screen 10: Startup Founder Portal & Applicant Management Hub
Authenticated startup founders (`vip@gmail.com`) manage their recruitment pipeline through `/startup-dashboard`. Founders can post new opportunities, review applicants, evaluate notes, and accept candidates.

![Figure 6.10: Startup Founder Portal & Applicant Management Hub](docs_screenshots/screen_startup_dashboard.png)
<br>
**Figure 6.10: Startup Founder Portal & Applicant Management Hub**

- **Key Fields & Components:**
  - **KPI Metric Dashboard:** Real-time counters for Active Roles, Total Applicants, Hired / Accepted candidates, and Under Review.
  - **Candidate Applications List:** Candidate cards showing student name, contact info, applied role, and current hiring status (e.g., student `rishi kanth` marked `ACCEPTED`).
  - **Hiring Action Buttons:** Quick action triggers: "Accept & Hire", "Shortlist", and "Note".
  - **Primary CTA:** "+ Post New Internship / Mini-Task" button in header and banner.

---

### 6.11 Screen 11: Startup Micro-Internship Opportunity Builder
Located at `/startup/post-internship`, this form allows founders to author and broadcast paid opportunities to learners within minutes.

![Figure 6.11: Startup Micro-Internship Opportunity Builder](docs_screenshots/screen_post_internship.png)
<br>
**Figure 6.11: Startup Micro-Internship Opportunity Builder**

- **Key Fields & Components:**
  - **Role Title & Domain:** Text input capturing specific role title (e.g., React Developer, AI Integrator).
  - **Compensation / Stipend Range:** Stipend fields specifying monthly or milestone payout.
  - **Work Mode & Duration:** Select dropdowns for Remote, On-Site, Hybrid, and duration weeks.
  - **Required Skills & Scope Description:** Rich text area detailing project deliverables.

---

### 6.12 Screen 12: Instructor Dashboard & Course Analytics
Educators logging in via instructor credentials (`pr@gmail.com`) access `/instructor-dashboard`, providing revenue analytics, student enrollment tallies, and course performance reviews.

![Figure 6.12: Instructor Dashboard & Course Analytics](docs_screenshots/screen_instructor_dashboard.png)
<br>
**Figure 6.12: Instructor Dashboard & Course Analytics**

- **Key Fields & Components:**
  - **KPI Metric Strip:** Total Students, Total Revenue (₹), Active Courses, and Average Rating.
  - **Top Performing Course Spotlight:** Featured card showing enrolled metrics and analytics link.
  - **Quick Action Bar:** Fast shortcuts to "+ Create New Course", "Manage My Courses", and "Edit Profile".

---

### 6.13 Screen 13: Instructor Curriculum & Course Creation Interface
At `/create-course`, instructors construct multimedia learning programs, upload video lectures to Cloudinary, design curricula, and set assessment parameters.

![Figure 6.13: Instructor Curriculum & Course Creation Interface](docs_screenshots/screen_create_course.png)
<br>
**Figure 6.13: Instructor Curriculum & Course Creation Interface**

- **Key Fields & Components:**
  - **Course Metadata Editor:** Course title, category, target difficulty level, and description.
  - **Pricing & Publishing Controls:** Free vs Paid toggle and course fee inputs.
  - **Section & Lesson Builder:** Drag-and-drop modular syllabus organization.

---

### 6.14 Screen 14: Instructor Course Management & Publishing Center
The `/instructor-my-courses` page allows educators to manage their published educational catalog, inspect individual student completion rates, and trigger content updates.

![Figure 6.14: Instructor Course Management & Publishing Center](docs_screenshots/screen_instructor_courses.png)
<br>
**Figure 6.14: Instructor Course Management & Publishing Center**

- **Key Fields & Components:**
  - **Course Inventory Table:** Tabular listing of active, draft, and archived courses.
  - **Status Pills:** Live status indicators reflecting moderation and availability state.
  - **Management Actions:** Edit syllabus, view analytics, and update pricing.

---

### 6.15 Screen 15: Cryptographic Certificate Verification Portal
CourseHub provides a tamper-proof verification portal (`/verify-certificate`) enabling recruiters, academic institutions, and employers to confirm credential legitimacy using certificate hash IDs or QR codes.

![Figure 6.15: Cryptographic Certificate Verification Portal](docs_screenshots/screen_verify_certificate.png)
<br>
**Figure 6.15: Cryptographic Certificate Verification Portal**

- **Key Fields & Components:**
  - **Certificate ID Search Field:** Allows manual entry of alphanumeric verification hash.
  - **Verify Certificate Button:** Dispatches validation request to `/common-api/verify-certificate/:id`.
  - **Verification Card:** Displays student name, course title, issuance date, and official seal upon successful validation.

---

<div style="page-break-after: always;"></div>

# CHAPTER 7
# TESTING METHODOLOGY

## 7.1 Unit Testing
Unit tests were executed on discrete backend controller functions and utility routines.
- **Password Encryption:** Verified that `bcrypt.hash()` reliably hashes plain-text inputs with salt factor 10.
- **JWT Verification:** Validated that expired or tampered tokens return HTTP 401 Unauthorized.
- **Input Sanitization:** Ensured malformed email patterns return HTTP 400 Bad Request.

## 7.2 Integration Testing
Integration testing verified communication between decoupled services.
- **Authentication to Database Handshake:** Tested `POST /common-api/register-startup` saving to MongoDB Atlas.
- **Client to Cloud Storage Pipeline:** Validated file uploads reaching Cloudinary and returning secure HTTPS asset URLs.
- **AI Tutoring Pipeline:** Tested student prompts reaching Google Gemini API and streaming responses back within 1.5 seconds.

## 7.3 Role-Based Security Testing
Evaluated access boundaries to ensure unauthorized users cannot reach restricted operations:
- Non-authenticated requests to `/user-api/profile` correctly return 401.
- Students attempting to call `/instructor-api/create-course` receive 403 Forbidden.
- Standard students attempting to access `/startup-dashboard` are redirected to `/student-dashboard`.

---

## 7.4 Test Cases and Execution Results

**Table 7.1: Comprehensive System Test Cases and Results**

| Test Case ID | Test Scenario | Input Data | Expected Result | Actual Result | Status |
|:---|:---|:---|:---|:---|:---:|
| **TC-01** | Student Registration | Valid name, email, password | User created, status 201 | User created in DB | **PASS** |
| **TC-02** | Duplicate Email Registration | Existing registered email | Error 400, "Account already exists" | Error 400 returned | **PASS** |
| **TC-03** | Startup Dedicated Registration | Company name, year, employees, location | User role 'STARTUP', startupProfile created | Role 'STARTUP' created | **PASS** |
| **TC-04** | Valid User Login | Correct email & password | Token issued, HTTP 200 | Token returned, logged in | **PASS** |
| **TC-05** | Invalid Password Login | Correct email, wrong password | Error 401, "Invalid email or password" | Error 401 returned | **PASS** |
| **TC-06** | Course Enrollment | Valid `courseId` | Course ID appended to user enrollments | Enrollment saved in DB | **PASS** |
| **TC-07** | Video Progress Tracking | Chapter completion event | Progress updated to 100% | Progress updated in DB | **PASS** |
| **TC-08** | Post Startup Gig | Title, stipend, deliverables | Gig saved, student notifications broadcast | Gig created & broadcast | **PASS** |
| **TC-09** | Apply for Gig | Resume URL, GitHub link | Application saved as 'APPLIED' | Application record created | **PASS** |
| **TC-10** | Update Candidate Status | Status set to 'HIRED' | Application status updated, student notified | Status updated in DB | **PASS** |
| **TC-11** | QR Certificate Verification | Valid Certificate ID | Status 200, returns student & course metadata | Verified successfully | **PASS** |
| **TC-12** | Cloud Healthcheck | `GET /health` | Status 200, `{"status": "healthy"}` | 200 OK returned | **PASS** |

---

<div style="page-break-after: always;"></div>

# CHAPTER 8
# CONCLUSION AND FUTURE ENHANCEMENTS

## 8.1 Conclusion
The **Online Learning Platform with AI Mentorship and Startup Micro-Internships (CourseHub)** successfully resolves the disconnect between theoretical academic learning and commercial engineering practice. Built upon the modern **MERN Stack**, the platform demonstrates that web architectures can incorporate interactive video delivery, artificial intelligence tutoring, and freelance marketplace mechanics within a unified, high-performance ecosystem.

Key achievements realized in this project include:
1. **Practical "Skill-to-Earn" Pipeline:** Allowed students to undertake paid micro-internships for real startups, eliminating restrictive corporate bonds and 90% academic score gates.
2. **Dedicated Corporate Onboarding:** Engineered a dedicated startup registration workflow capturing critical business parameters (Company Name, Founded Year, Location, Team Size).
3. **AI-Powered Pedagogy:** Integrated Google Gemini to provide 24/7 personalized code tutoring and automated assessment generation.
4. **Verifiable Academic Integrity:** Introduced cryptographic QR-code certificates verifiable via public endpoints.
5. **Production Cloud Resilience:** Deployed the backend on **Render** and the frontend on **Vercel** with full cross-domain JWT security and high availability.

---

## 8.2 Future Enhancements
While the current implementation fulfills all core technical and academic objectives, future development will expand the platform's capabilities:

1. **Cross-Platform Mobile Application:** Develop native iOS and Android clients using React Native with background video caching for offline learning.
2. **Smart Contract Escrow Payments:** Implement automated milestone escrow releases using blockchain smart contracts or Razorpay/Stripe Route to instantly disburse student stipends upon verified GitHub pull request merges.
3. **WebRTC Live Classrooms:** Integrate peer-to-peer WebRTC video streaming and shared collaborative whiteboard tools for live instructor office hours.
4. **Browser-Based Cloud Coding Sandbox:** Embed a Monaco-powered online code execution sandbox (utilizing WebContainers) enabling students to solve code challenges directly in the browser without local software configuration.

---

<div style="page-break-after: always;"></div>

# CHAPTER 9
# REFERENCES

1. S. Dhawan, “Online Learning: A Panacea in the Time of COVID-19 Crisis,” *Journal of Educational Technology Systems*, vol. 49, no. 1, pp. 5–22, 2020.
2. T. Anderson, *The Theory and Practice of Online Learning*, 2nd ed. Athabasca, AB, Canada: Athabasca University Press, 2008.
3. W. Horton, *E-Learning by Design*, 2nd ed. San Francisco, CA, USA: Pfeiffer, 2012.
4. M. Ally, “Foundations of Educational Theory for Online Learning,” in *Theory and Practice of Online Learning*, Athabasca University Press, 2008.
5. A. Al-Fraihat, M. Joy, R. Masa’deh, and J. Sinclair, “Evaluating E-learning Systems Success: An Empirical Investigation,” *Computers in Human Behavior*, vol. 102, pp. 67–86, 2020.
6. S. Aljawarneh et al., “An Integrated E-Learning Management System for Higher Education,” *International Journal of Web-Based Learning*, vol. 16, no. 2, pp. 14–31, 2020.
7. J. Ellis, *Learning Management Systems: Architecture, Functionality, and Standards*, New York: Academic Press, 2019.
8. P. Ramkumar et al., “Cloud-Based Online Learning Platform Architecture,” *Journal of Cloud Computing & Education*, vol. 8, no. 3, pp. 112–129, 2021.
9. M. Ali et al., “Secure Authentication and Authorization Protocols in Web-Based E-Learning,” *IEEE Transactions on Learning Technologies*, vol. 15, no. 4, pp. 450–462, 2022.
10. R. Kumar and S. Singh, “Design and Implementation of Web-Based Educational Portals,” *Journal of Software Engineering and Applications*, vol. 11, no. 5, pp. 201–215, 2023.
11. A. Sharma et al., “Performance Evaluation of MERN Stack for Enterprise Scale Web Applications,” *Software: Practice and Experience*, vol. 54, no. 1, pp. 88–104, 2024.
12. React.js Official Documentation. Available: https://react.dev
13. Node.js Official Runtime Documentation. Available: https://nodejs.org
14. Express.js Web Framework Documentation. Available: https://expressjs.com
15. MongoDB Atlas Developer Documentation. Available: https://www.mongodb.com/docs
16. Cloudinary Cloud Media Services Documentation. Available: https://cloudinary.com/documentation
17. Google Gemini Generative AI SDK Reference. Available: https://ai.google.dev
18. Render Cloud Web Services Documentation. Available: https://render.com/docs
19. Vercel Frontend Deployment Platform Documentation. Available: https://vercel.com/docs
