import { Routes, Route } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import RegisterStartup from "./pages/RegisterStartup"
import StudentDashboard from "./student/StudentDashboard"
import MyCourses from "./student/MyCourses"
import InstructorDashboard from "./instructor/InstructorDashboard"
import CreateCourse from "./instructor/CreateCourse"
import InstructorMyCourses from "./instructor/InstructorMyCourses"
import InstructorCourseDetails from "./instructor/InstructorCourseDetails"
import EditCourse from "./instructor/EditCourse"
import InstructorAnalytics from "./instructor/InstructorAnalytics"
import InstructorReviews from "./instructor/InstructorReviews"
import InstructorProfile from "./instructor/InstructorProfile"
import AdminDashboard from "./admin/AdminDashboard"
import AdminOverview from "./admin/AdminOverview"
import AdminUsers from "./admin/AdminUsers"
import AdminCourses from "./admin/AdminCourses"
import AdminAnalytics from "./admin/AdminAnalytics"
import AdminSettings from "./admin/AdminSettings"
import AdminAppeals from "./admin/AdminAppeals"
import StudentProfile from "./student/StudentProfile"
import ProtectedRoute from "./routes/ProtectedRoute"
import PublicRoute from "./routes/PublicRoute"
import AllCourses from "./student/AllCourses"
import CourseDetails from "./student/CourseDetails"
import CourseContent from "./student/CourseContent"
import Checkout from "./student/Checkout"
import JobPortal from "./student/JobPortal"
import JobDetails from "./student/JobDetails"
import StartupDashboard from "./startup/StartupDashboard"
import PostInternship from "./startup/PostInternship"
import LearningPaths from "./student/LearningPaths"
import TermsAndServices from "./pages/TermsAndServices"
import AboutUs from "./pages/AboutUs"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Contact from "./pages/Contact"
import Wishlist from "./student/Wishlist"
import VerifyCertificate from "./pages/VerifyCertificate"

function App() {
  return (

      <Routes>

        <Route path="/" element={<RootLayout />}>

          <Route index element={<Home />} />
          
          <Route path="login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          
          <Route path="register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          <Route path="register-startup" element={
            <PublicRoute>
              <RegisterStartup />
            </PublicRoute>
          } />

          <Route path="terms-and-services" element={<TermsAndServices />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="contact" element={<Contact />} />
          <Route path="verify-certificate" element={<VerifyCertificate />} />

          {/* Protected Student Routes */}
          <Route path="student-dashboard" element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="my-courses" element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <MyCourses />
            </ProtectedRoute>
          } />

          <Route path="wishlist" element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <Wishlist />
            </ProtectedRoute>
          } />

          <Route path="all-courses" element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <AllCourses />
            </ProtectedRoute>
          } />

          <Route path="learning-paths" element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <LearningPaths />
            </ProtectedRoute>
          } />

          <Route path="course/:courseId" element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <CourseDetails />
            </ProtectedRoute>
          } />

          <Route path="checkout/:courseId" element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <Checkout />
            </ProtectedRoute>
          } />

          <Route path="learn/:courseId" element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <CourseContent />
            </ProtectedRoute>
          } />

          <Route path="jobs" element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <JobPortal />
            </ProtectedRoute>
          } />

          <Route path="jobs/:id" element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <JobDetails />
            </ProtectedRoute>
          } />

          <Route path="gigs/:id" element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <JobDetails />
            </ProtectedRoute>
          } />

          {/* Protected Instructor Routes */}
          <Route path="instructor-dashboard" element={
            <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
              <InstructorDashboard />
            </ProtectedRoute>
          } />

          <Route path="create-course" element={
            <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
              <CreateCourse />
            </ProtectedRoute>
          } />

          <Route path="instructor-my-courses" element={
            <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
              <InstructorMyCourses />
            </ProtectedRoute>
          } />

          <Route path="instructor/course/:courseId" element={
            <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
              <InstructorCourseDetails />
            </ProtectedRoute>
          } />

          <Route path="instructor/course/:courseId/edit" element={
            <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
              <EditCourse />
            </ProtectedRoute>
          } />

          <Route path="instructor/course/:courseId/analytics" element={
            <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
              <InstructorAnalytics />
            </ProtectedRoute>
          } />

          <Route path="instructor-reviews" element={
            <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
              <InstructorReviews />
            </ProtectedRoute>
          } />


          <Route path="instructor-profile" element={
            <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
              <InstructorProfile />
            </ProtectedRoute>
          } />

          {/* Protected Admin Routes */}
          <Route path="admin-dashboard" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminOverview />
            </ProtectedRoute>
          } />

          <Route path="admin/users" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminUsers />
            </ProtectedRoute>
          } />

          <Route path="admin/courses" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminCourses />
            </ProtectedRoute>
          } />

          <Route path="admin/analytics" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminAnalytics />
            </ProtectedRoute>
          } />

          <Route path="admin/settings" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminSettings />
            </ProtectedRoute>
          } />

          <Route path="admin/appeals" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminAppeals />
            </ProtectedRoute>
          } />

          {/* Profile - Student Only */}
          <Route path="profile" element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentProfile />
            </ProtectedRoute>
          } />

          {/* Protected Startup Routes */}
          <Route path="startup-dashboard" element={
            <ProtectedRoute allowedRoles={["STARTUP", "EMPLOYER", "ADMIN"]}>
              <StartupDashboard />
            </ProtectedRoute>
          } />

          <Route path="startup/post-internship" element={
            <ProtectedRoute allowedRoles={["STARTUP", "EMPLOYER", "ADMIN"]}>
              <PostInternship />
            </ProtectedRoute>
          } />

        </Route>

      </Routes>

  )
}

export default App