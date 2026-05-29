import { useState } from "react";
import { Link } from "react-router-dom";

function AboutUs() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  // Stats counter data
  const stats = [
    { value: "50K+", label: "Active Learners", icon: "👩‍🎓" },
    { value: "1,200+", label: "Courses Available", icon: "📚" },
    { value: "300+", label: "Expert Instructors", icon: "👨‍🏫" },
    { value: "98%", label: "Satisfaction Rate", icon: "⭐" },
  ];

  // Core values
  const values = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
      ),
      title: "Quality Education",
      desc: "Every course is vetted by experts to ensure world-class learning outcomes.",
      color: "violet",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      ),
      title: "Community Driven",
      desc: "Learn alongside a vibrant community of passionate learners and educators.",
      color: "indigo",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: "Innovation First",
      desc: "We leverage the latest in EdTech to deliver cutting-edge learning experiences.",
      color: "amber",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      title: "Global Access",
      desc: "Learn from anywhere in the world with courses available in multiple formats.",
      color: "emerald",
    },
  ];

  const colorMap = {
    violet: {
      bg: "bg-violet-100",
      text: "text-violet-600",
      border: "border-violet-200",
      gradient: "from-violet-500 to-violet-600",
    },
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-600",
      border: "border-indigo-200",
      gradient: "from-indigo-500 to-indigo-600",
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
      border: "border-amber-200",
      gradient: "from-amber-500 to-amber-600",
    },
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      border: "border-emerald-200",
      gradient: "from-emerald-500 to-emerald-600",
    },
  };

  // Team members
  const team = [
    { name: "Priya Sharma", role: "Founder & CEO", initials: "PS", gradient: "from-violet-500 to-indigo-600", bio: "EdTech visionary with 15+ years in online education." },
    { name: "Arjun Mehta", role: "CTO", initials: "AM", gradient: "from-blue-500 to-cyan-500", bio: "Full-stack architect passionate about scalable learning platforms." },
    { name: "Sarah Chen", role: "Head of Content", initials: "SC", gradient: "from-pink-500 to-rose-500", bio: "Curriculum expert who ensures every course meets gold standards." },
    { name: "David Kim", role: "Lead Designer", initials: "DK", gradient: "from-amber-500 to-orange-500", bio: "UX specialist crafting delightful learning interfaces." },
  ];

  // Testimonials
  const testimonials = [
    { name: "Ananya R.", role: "Student", quote: "CourseHub completely changed my career trajectory. The courses are practical, well-structured, and the community is incredibly supportive.", initials: "AR", color: "violet" },
    { name: "Marcus J.", role: "Instructor", quote: "As an instructor, I love how easy it is to create and manage courses. The analytics dashboard helps me understand my students better.", initials: "MJ", color: "indigo" },
    { name: "Emily W.", role: "Student", quote: "The learning paths feature is a game-changer. It gave me a clear roadmap from beginner to job-ready in just 6 months.", initials: "EW", color: "emerald" },
  ];

  // FAQs
  const faqs = [
    { q: "What is CourseHub?", a: "CourseHub is an online learning platform that connects learners with expert instructors across a wide range of topics — from programming and data science to leadership and communication." },
    { q: "Is CourseHub free to use?", a: "Creating an account is free. We offer both free and premium courses. Each course has its own pricing set by the instructor, and we frequently run promotions and discounts." },
    { q: "How do I become an instructor?", a: "Simply register an account with the 'Instructor' role. Once registered, you can start creating courses immediately through our intuitive course builder." },
    { q: "Are certificates provided?", a: "Yes! Upon completing a course and meeting all requirements, you'll receive a certificate of completion that you can share on your LinkedIn profile or resume." },
    { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, UPI, net banking, and popular digital wallets. All payments are securely processed." },
    { q: "Can I get a refund?", a: "Yes. We offer a 30-day refund policy for courses where less than 20% of the content has been completed. See our Terms & Services for full details." },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fa]">

      {/* ══════════ HERO ══════════ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-violet-200 text-xs font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Trusted by 50,000+ learners worldwide
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Empowering the Future
            <br />
            <span className="bg-gradient-to-r from-violet-200 via-white to-indigo-200 bg-clip-text text-transparent">
              of Learning
            </span>
          </h1>

          <p className="mt-6 text-violet-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            CourseHub is on a mission to make world-class education accessible to everyone,
            everywhere. We connect passionate instructors with eager learners to create
            transformative learning experiences.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {!user ? (
              <>
                <Link to="/register" className="bg-white text-violet-700 font-semibold px-8 py-3.5 rounded-xl text-sm hover:bg-violet-50 transition-all duration-300 shadow-lg shadow-violet-900/30 hover:shadow-xl hover:-translate-y-0.5">
                  Start Learning Free
                </Link>
                <a href="#our-story" className="border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl text-sm hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                  Our Story ↓
                </a>
              </>
            ) : (
              <Link
                to={role === "ADMIN" ? "/admin-dashboard" : role === "INSTRUCTOR" ? "/instructor-dashboard" : "/student-dashboard"}
                className="bg-white text-violet-700 font-semibold px-8 py-3.5 rounded-xl text-sm hover:bg-violet-50 transition-all duration-300 shadow-lg shadow-violet-900/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                Go to Dashboard →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ══════════ STATS BAR ══════════ */}
      <div className="relative -mt-10 z-10 max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
              <div className="text-2xl md:text-3xl font-extrabold text-[#1c1d1f]">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-24">

        {/* ══════════ OUR STORY ══════════ */}
        <section id="our-story" className="scroll-mt-24">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-violet-600 uppercase tracking-widest bg-violet-50 px-4 py-1.5 rounded-full border border-violet-200">Our Story</span>
            <h2 className="mt-6 text-3xl md:text-4xl font-extrabold text-[#1c1d1f]">
              How CourseHub Began
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[#4d5156] leading-relaxed">
                CourseHub was born from a simple belief: <strong className="text-[#1c1d1f]">great education should not be a privilege</strong> — it should be a right. Founded in 2024, we started as a small team of educators and engineers frustrated by the gaps in online learning.
              </p>
              <p className="text-[#4d5156] leading-relaxed mt-4">
                Today, we serve over <strong className="text-[#1c1d1f]">50,000 learners</strong> across 80+ countries, with more than 1,200 courses spanning technology, business, design, and personal development. Our platform empowers instructors to share their expertise and students to unlock their potential.
              </p>
              <p className="text-[#4d5156] leading-relaxed mt-4">
                We're not just a platform — we're a <strong className="text-[#1c1d1f]">community of lifelong learners</strong> committed to growth, innovation, and making the world a more knowledgeable place.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              {[
                { year: "2024", event: "CourseHub founded with a team of 5", icon: "🚀" },
                { year: "2024", event: "First 100 courses published", icon: "📚" },
                { year: "2025", event: "Reached 10,000 active learners", icon: "🎉" },
                { year: "2025", event: "Launched Learning Paths feature", icon: "🗺️" },
                { year: "2026", event: "50,000+ learners, 300+ instructors", icon: "🌍" },
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm shadow-md group-hover:scale-110 transition-transform duration-300">
                      {t.icon}
                    </div>
                    {i < 4 && <div className="w-px h-6 bg-gradient-to-b from-violet-300 to-transparent mt-1" />}
                  </div>
                  <div className="pt-1.5">
                    <div className="text-xs font-bold text-violet-600 uppercase tracking-wider">{t.year}</div>
                    <div className="text-sm text-[#1c1d1f] font-medium mt-0.5">{t.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ MISSION & VISION ══════════ */}
        <section>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-8 md:p-10 text-white relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl mb-5">🎯</div>
                <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-violet-100 leading-relaxed">
                  To democratize education by providing an accessible, affordable, and high-quality learning platform that empowers individuals to achieve their personal and professional goals, regardless of their background or location.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 md:p-10 text-white relative overflow-hidden group">
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl mb-5">🔭</div>
                <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-emerald-100 leading-relaxed">
                  To become the world's most trusted and impactful learning ecosystem — where every person has the tools, mentorship, and community they need to transform their knowledge into meaningful action.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ CORE VALUES ══════════ */}
        <section>
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-violet-600 uppercase tracking-widest bg-violet-50 px-4 py-1.5 rounded-full border border-violet-200">What Drives Us</span>
            <h2 className="mt-6 text-3xl md:text-4xl font-extrabold text-[#1c1d1f]">
              Our Core Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const c = colorMap[v.color];
              return (
                <div
                  key={i}
                  className={`bg-white rounded-2xl border ${c.border} p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}
                >
                  <div className={`w-12 h-12 rounded-xl ${c.bg} ${c.text} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {v.icon}
                  </div>
                  <h3 className="text-[#1c1d1f] font-bold text-base mb-2">{v.title}</h3>
                  <p className="text-sm text-[#4d5156] leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════ TEAM ══════════ */}
        <section>
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-200">The People</span>
            <h2 className="mt-6 text-3xl md:text-4xl font-extrabold text-[#1c1d1f]">
              Meet Our Team
            </h2>
            <p className="mt-3 text-gray-500 max-w-lg mx-auto">
              A passionate group of educators, engineers, and designers building the future of learning.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                  {m.initials}
                </div>
                <h3 className="mt-4 text-[#1c1d1f] font-bold">{m.name}</h3>
                <p className="text-violet-600 text-xs font-semibold uppercase tracking-wider mt-1">{m.role}</p>
                <p className="text-sm text-[#4d5156] mt-3 leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ TESTIMONIALS ══════════ */}
        <section>
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">Testimonials</span>
            <h2 className="mt-6 text-3xl md:text-4xl font-extrabold text-[#1c1d1f]">
              What Our Community Says
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => {
              const c = colorMap[t.color];
              return (
                <div
                  key={i}
                  className={`bg-white rounded-2xl border ${c.border} p-6 hover:shadow-lg transition-all duration-300 relative`}
                >
                  {/* Quote mark */}
                  <div className={`text-5xl ${c.text} opacity-20 font-serif absolute top-4 right-6 leading-none`}>"</div>
                  <p className="text-sm text-[#4d5156] leading-relaxed italic relative z-10">
                    "{t.quote}"
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.text} flex items-center justify-center font-bold text-sm`}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#1c1d1f]">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.role}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════ ROLE-BASED SECTION ══════════ */}
        {user && (
          <section>
            <div className="text-center mb-10">
              <span className={`text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border ${
                role === "STUDENT" ? "text-violet-600 bg-violet-50 border-violet-200" :
                role === "INSTRUCTOR" ? "text-indigo-600 bg-indigo-50 border-indigo-200" :
                "text-emerald-600 bg-emerald-50 border-emerald-200"
              }`}>
                For {role === "STUDENT" ? "Students" : role === "INSTRUCTOR" ? "Instructors" : "Administrators"}
              </span>
              <h2 className="mt-6 text-3xl md:text-4xl font-extrabold text-[#1c1d1f]">
                {role === "STUDENT" && "Your Learning, Your Way"}
                {role === "INSTRUCTOR" && "Empower Through Teaching"}
                {role === "ADMIN" && "Platform at a Glance"}
              </h2>
            </div>

            {role === "STUDENT" && (
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { icon: "📖", title: "Browse Courses", desc: "Explore 1,200+ courses across all categories.", link: "/all-courses" },
                  { icon: "🗺️", title: "Learning Paths", desc: "Follow curated roadmaps to master new skills.", link: "/learning-paths" },
                  { icon: "📊", title: "Track Progress", desc: "Monitor your learning journey from your dashboard.", link: "/student-dashboard" },
                ].map((card, i) => (
                  <Link key={i} to={card.link} className="bg-white rounded-2xl border border-violet-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group block">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
                    <h3 className="font-bold text-[#1c1d1f] mb-2">{card.title}</h3>
                    <p className="text-sm text-[#4d5156]">{card.desc}</p>
                    <span className="mt-3 inline-flex items-center text-violet-600 text-sm font-medium group-hover:gap-2 transition-all duration-300">
                      Explore <span className="ml-1">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {role === "INSTRUCTOR" && (
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { icon: "🎬", title: "Create Courses", desc: "Build rich, interactive courses with our intuitive editor.", link: "/create-course" },
                  { icon: "⭐", title: "Student Reviews", desc: "See what your students think and improve your content.", link: "/instructor-reviews" },
                  { icon: "📈", title: "Analytics", desc: "Track enrollments, revenue, and student engagement.", link: "/instructor-dashboard" },
                ].map((card, i) => (
                  <Link key={i} to={card.link} className="bg-white rounded-2xl border border-indigo-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group block">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
                    <h3 className="font-bold text-[#1c1d1f] mb-2">{card.title}</h3>
                    <p className="text-sm text-[#4d5156]">{card.desc}</p>
                    <span className="mt-3 inline-flex items-center text-indigo-600 text-sm font-medium group-hover:gap-2 transition-all duration-300">
                      Get started <span className="ml-1">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {role === "ADMIN" && (
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { icon: "👥", title: "Manage Users", desc: "View, edit, and moderate all platform users.", link: "/admin/users" },
                  { icon: "📚", title: "Manage Courses", desc: "Oversee course quality and handle content issues.", link: "/admin/courses" },
                  { icon: "📊", title: "Platform Analytics", desc: "Monitor platform health, growth, and key metrics.", link: "/admin/analytics" },
                ].map((card, i) => (
                  <Link key={i} to={card.link} className="bg-white rounded-2xl border border-emerald-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group block">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
                    <h3 className="font-bold text-[#1c1d1f] mb-2">{card.title}</h3>
                    <p className="text-sm text-[#4d5156]">{card.desc}</p>
                    <span className="mt-3 inline-flex items-center text-emerald-600 text-sm font-medium group-hover:gap-2 transition-all duration-300">
                      Open <span className="ml-1">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ══════════ FAQ ══════════ */}
        <section>
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">FAQ</span>
            <h2 className="mt-6 text-3xl md:text-4xl font-extrabold text-[#1c1d1f]">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl border transition-all duration-300 ${
                  openFaq === i ? "border-violet-300 shadow-md shadow-violet-100" : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                >
                  <span className="font-semibold text-[#1c1d1f] text-sm">{faq.q}</span>
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                      openFaq === i
                        ? "bg-violet-100 text-violet-600 rotate-180"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-4 text-sm text-[#4d5156] leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ CTA ══════════ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#1c1d1f] to-[#2d2e33] rounded-3xl p-10 md:p-16 text-center">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Ready to transform your future?
            </h2>
            <p className="mt-4 text-gray-400 max-w-lg mx-auto">
              Join CourseHub today and start building the skills that matter most — at your own pace, on your own terms.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {!user ? (
                <>
                  <Link to="/register" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold px-8 py-3.5 rounded-xl text-sm hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-violet-900/40 hover:shadow-xl hover:-translate-y-0.5">
                    Create Free Account
                  </Link>
                  <Link to="/login" className="border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl text-sm hover:bg-white/5 transition-all duration-300">
                    Sign In
                  </Link>
                </>
              ) : (
                <Link
                  to={role === "ADMIN" ? "/admin-dashboard" : role === "INSTRUCTOR" ? "/instructor-dashboard" : "/student-dashboard"}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold px-8 py-3.5 rounded-xl text-sm hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-violet-900/40 hover:shadow-xl hover:-translate-y-0.5"
                >
                  Go to Dashboard →
                </Link>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default AboutUs;
