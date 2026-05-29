import { Link } from "react-router-dom";

function TermsAndServices() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const sectionCard =
    "bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 md:p-8";
  const sectionTitle =
    "text-xl font-bold text-[#1c1d1f] mb-4 flex items-center gap-3";
  const sectionText = "text-[#4d5156] text-sm leading-relaxed";
  const listStyle = "list-disc list-inside space-y-2 text-[#4d5156] text-sm mt-3";

  return (
    <div className="min-h-screen bg-[#f7f9fa]">

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-violet-200 text-xs font-medium mb-6">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Last updated: May 2026
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Terms & Services
          </h1>
          <p className="mt-4 text-violet-200 text-base md:text-lg max-w-2xl mx-auto">
            Please read these terms carefully before using CourseHub. By accessing or using our platform, you agree to be bound by these terms.
          </p>
          {user && (
            <div className="mt-6 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-2.5 text-white text-sm font-medium">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-400 to-indigo-400 flex items-center justify-center text-xs font-bold">
                {user.firstName?.[0]}
              </div>
              Viewing as: <span className="font-semibold">{role?.charAt(0) + role?.slice(1).toLowerCase()}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">

        {/* Table of Contents */}
        <div className={sectionCard}>
          <h2 className={sectionTitle}>
            <span className="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center text-sm">📋</span>
            Table of Contents
          </h2>
          <nav>
            <ul className="space-y-2 text-sm">
              <li><a href="#general" className="text-violet-600 hover:text-violet-800 hover:underline transition-colors">1. General Terms of Use</a></li>
              <li><a href="#accounts" className="text-violet-600 hover:text-violet-800 hover:underline transition-colors">2. Account Responsibilities</a></li>
              <li><a href="#privacy" className="text-violet-600 hover:text-violet-800 hover:underline transition-colors">3. Privacy & Data</a></li>
              <li><a href="#intellectual" className="text-violet-600 hover:text-violet-800 hover:underline transition-colors">4. Intellectual Property</a></li>
              {role === "STUDENT" && (
                <>
                  <li><a href="#student-enrollment" className="text-violet-600 hover:text-violet-800 hover:underline transition-colors">5. Student Enrollment & Refunds</a></li>
                  <li><a href="#student-conduct" className="text-violet-600 hover:text-violet-800 hover:underline transition-colors">6. Student Code of Conduct</a></li>
                </>
              )}
              {role === "INSTRUCTOR" && (
                <>
                  <li><a href="#instructor-agreement" className="text-violet-600 hover:text-violet-800 hover:underline transition-colors">5. Instructor Agreement</a></li>
                  <li><a href="#instructor-content" className="text-violet-600 hover:text-violet-800 hover:underline transition-colors">6. Content Guidelines</a></li>
                  <li><a href="#instructor-revenue" className="text-violet-600 hover:text-violet-800 hover:underline transition-colors">7. Revenue & Payments</a></li>
                </>
              )}
              {role === "ADMIN" && (
                <>
                  <li><a href="#admin-governance" className="text-violet-600 hover:text-violet-800 hover:underline transition-colors">5. Admin Governance</a></li>
                  <li><a href="#admin-moderation" className="text-violet-600 hover:text-violet-800 hover:underline transition-colors">6. Moderation Policies</a></li>
                  <li><a href="#admin-data" className="text-violet-600 hover:text-violet-800 hover:underline transition-colors">7. Data Access & Compliance</a></li>
                </>
              )}
            </ul>
          </nav>
        </div>

        {/* ── General Terms (always visible) ── */}
        <div id="general" className={sectionCard}>
          <h2 className={sectionTitle}>
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm">📜</span>
            1. General Terms of Use
          </h2>
          <p className={sectionText}>
            Welcome to CourseHub. These Terms of Service ("Terms") govern your access to and use of CourseHub's website, services, and applications. By creating an account or using our platform, you agree to comply with these Terms.
          </p>
          <ul className={listStyle}>
            <li>You must be at least 16 years old to create an account.</li>
            <li>CourseHub reserves the right to modify these Terms at any time with prior notice.</li>
            <li>Continued use of the platform after changes constitutes acceptance of the new Terms.</li>
            <li>Any violation of these Terms may result in account suspension or termination.</li>
          </ul>
        </div>

        <div id="accounts" className={sectionCard}>
          <h2 className={sectionTitle}>
            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">👤</span>
            2. Account Responsibilities
          </h2>
          <p className={sectionText}>
            You are responsible for maintaining the security and confidentiality of your account credentials. You agree not to share your login information with others.
          </p>
          <ul className={listStyle}>
            <li>You must provide accurate and complete information during registration.</li>
            <li>You are solely responsible for all activities that occur under your account.</li>
            <li>Notify CourseHub immediately if you suspect unauthorized access to your account.</li>
            <li>CourseHub is not liable for any loss arising from unauthorized use of your account.</li>
          </ul>
        </div>

        <div id="privacy" className={sectionCard}>
          <h2 className={sectionTitle}>
            <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-sm">🔒</span>
            3. Privacy & Data
          </h2>
          <p className={sectionText}>
            We are committed to protecting your privacy. Your personal data is collected and processed in accordance with our Privacy Policy.
          </p>
          <ul className={listStyle}>
            <li>We collect only the data necessary to provide and improve our services.</li>
            <li>Your data is encrypted and stored securely using industry-standard protocols.</li>
            <li>We do not sell your personal information to third parties.</li>
            <li>You may request deletion of your data at any time by contacting support.</li>
          </ul>
        </div>

        <div id="intellectual" className={sectionCard}>
          <h2 className={sectionTitle}>
            <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center text-sm">©️</span>
            4. Intellectual Property
          </h2>
          <p className={sectionText}>
            All content on CourseHub — including text, graphics, logos, and course materials — is the property of CourseHub or its content creators and is protected by intellectual property laws.
          </p>
          <ul className={listStyle}>
            <li>You may not reproduce, distribute, or modify any content without permission.</li>
            <li>Course materials are licensed for personal, non-commercial use only.</li>
            <li>Instructors retain ownership of their original course content.</li>
          </ul>
        </div>

        {/* ── Student-specific Terms ── */}
        {role === "STUDENT" && (
          <>
            <div className="flex items-center gap-3 mt-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-300 to-transparent" />
              <span className="text-xs font-semibold text-violet-600 uppercase tracking-widest bg-violet-50 px-4 py-1.5 rounded-full border border-violet-200">Student Terms</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-300 to-transparent" />
            </div>

            <div id="student-enrollment" className={`${sectionCard} border-l-4 border-l-violet-500`}>
              <h2 className={sectionTitle}>
                <span className="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center text-sm">🎓</span>
                5. Student Enrollment & Refunds
              </h2>
              <p className={sectionText}>
                As a student, you may enroll in any available course on the platform. Upon enrollment, you gain access to the course materials for the duration specified.
              </p>
              <ul className={listStyle}>
                <li>Course access is granted immediately upon successful payment.</li>
                <li>Refund requests must be made within 30 days of purchase if less than 20% of the course has been completed.</li>
                <li>Free courses may be removed or modified without prior notice.</li>
                <li>Certificates of completion are issued only after fulfilling all course requirements.</li>
                <li>Sharing purchased course access with others is strictly prohibited.</li>
              </ul>
            </div>

            <div id="student-conduct" className={`${sectionCard} border-l-4 border-l-violet-500`}>
              <h2 className={sectionTitle}>
                <span className="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center text-sm">📝</span>
                6. Student Code of Conduct
              </h2>
              <p className={sectionText}>
                Students are expected to maintain a respectful and professional learning environment.
              </p>
              <ul className={listStyle}>
                <li>Plagiarism, cheating, or submitting others' work as your own is prohibited.</li>
                <li>Respectful communication with instructors and fellow students is required at all times.</li>
                <li>Spamming reviews or providing fake ratings will result in account action.</li>
                <li>Any form of harassment or discrimination is grounds for immediate suspension.</li>
              </ul>
            </div>
          </>
        )}

        {/* ── Instructor-specific Terms ── */}
        {role === "INSTRUCTOR" && (
          <>
            <div className="flex items-center gap-3 mt-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-200">Instructor Terms</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />
            </div>

            <div id="instructor-agreement" className={`${sectionCard} border-l-4 border-l-indigo-500`}>
              <h2 className={sectionTitle}>
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">🤝</span>
                5. Instructor Agreement
              </h2>
              <p className={sectionText}>
                By becoming an instructor on CourseHub, you agree to the following terms governing course creation, publishing, and your relationship with the platform.
              </p>
              <ul className={listStyle}>
                <li>You must own or have the rights to all content you publish on CourseHub.</li>
                <li>Courses must meet CourseHub's quality standards before being published.</li>
                <li>You grant CourseHub a non-exclusive license to host and distribute your course content.</li>
                <li>CourseHub may remove courses that violate these Terms or receive consistent negative feedback.</li>
                <li>You must respond to student inquiries within a reasonable timeframe.</li>
              </ul>
            </div>

            <div id="instructor-content" className={`${sectionCard} border-l-4 border-l-indigo-500`}>
              <h2 className={sectionTitle}>
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">📚</span>
                6. Content Guidelines
              </h2>
              <p className={sectionText}>
                All course content must adhere to CourseHub's community and content guidelines.
              </p>
              <ul className={listStyle}>
                <li>Content must be original, accurate, and up-to-date.</li>
                <li>No hate speech, harmful content, or misleading information.</li>
                <li>Videos must have acceptable audio and visual quality.</li>
                <li>All third-party resources must be properly attributed and licensed.</li>
              </ul>
            </div>

            <div id="instructor-revenue" className={`${sectionCard} border-l-4 border-l-indigo-500`}>
              <h2 className={sectionTitle}>
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">💰</span>
                7. Revenue & Payments
              </h2>
              <p className={sectionText}>
                Instructors earn revenue based on course enrollments. Payment terms are as follows:
              </p>
              <ul className={listStyle}>
                <li>Instructors receive 70% of the net revenue from course sales.</li>
                <li>Payments are processed monthly, with a minimum payout threshold of $50.</li>
                <li>Revenue from refunded purchases will be deducted from future payouts.</li>
                <li>Tax responsibilities for earned income rest solely with the instructor.</li>
                <li>Detailed earnings reports are available in your Instructor Dashboard.</li>
              </ul>
            </div>
          </>
        )}

        {/* ── Admin-specific Terms ── */}
        {role === "ADMIN" && (
          <>
            <div className="flex items-center gap-3 mt-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">Admin Terms</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
            </div>

            <div id="admin-governance" className={`${sectionCard} border-l-4 border-l-emerald-500`}>
              <h2 className={sectionTitle}>
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">🏛️</span>
                5. Admin Governance
              </h2>
              <p className={sectionText}>
                As a platform administrator, you are entrusted with elevated privileges. These come with additional responsibilities and accountability.
              </p>
              <ul className={listStyle}>
                <li>Admin actions must be performed in good faith and in the best interest of the platform.</li>
                <li>All moderation decisions must be fair, consistent, and well-documented.</li>
                <li>Abuse of admin privileges will result in immediate removal and potential legal action.</li>
                <li>Admin accounts must use strong passwords and two-factor authentication.</li>
              </ul>
            </div>

            <div id="admin-moderation" className={`${sectionCard} border-l-4 border-l-emerald-500`}>
              <h2 className={sectionTitle}>
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">⚖️</span>
                6. Moderation Policies
              </h2>
              <p className={sectionText}>
                Admins are responsible for enforcing community standards and ensuring platform integrity.
              </p>
              <ul className={listStyle}>
                <li>Review and resolve user reports and appeals in a timely manner.</li>
                <li>Provide clear explanations when suspending or banning accounts.</li>
                <li>Escalate complex cases to the legal or compliance team as needed.</li>
                <li>Maintain logs of all moderation actions for audit purposes.</li>
              </ul>
            </div>

            <div id="admin-data" className={`${sectionCard} border-l-4 border-l-emerald-500`}>
              <h2 className={sectionTitle}>
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">🔐</span>
                7. Data Access & Compliance
              </h2>
              <p className={sectionText}>
                Admins have access to sensitive user data. This access must comply with privacy regulations and internal policies.
              </p>
              <ul className={listStyle}>
                <li>Access user data only when necessary for legitimate administrative purposes.</li>
                <li>Never export, share, or store user data outside of authorized systems.</li>
                <li>Comply with GDPR, CCPA, and other applicable data protection regulations.</li>
                <li>Report any data breaches or security incidents immediately.</li>
                <li>Complete mandatory data privacy training on an annual basis.</li>
              </ul>
            </div>
          </>
        )}

        {/* ── Back to Home ── */}
        <div className="text-center pt-8 pb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-800 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default TermsAndServices;
