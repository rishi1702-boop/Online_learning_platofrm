import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { toast } from "react-hot-toast";
import {
  FiCode,
  FiTrendingUp,
  FiCompass,
  FiCpu,
  FiClock,
  FiBookOpen,
  FiCheckCircle,
  FiChevronRight,
  FiAward,
  FiArrowRight,
  FiPlay,
  FiCheck
} from "react-icons/fi";

const PATHS_DATA = [
  {
    title: "Full-Stack Web Developer",
    subtitle: "Build modern, responsive, and secure web applications end-to-end.",
    courseTitle: "Full Stack Web Development Bootcamp",
    icon: FiCode,
    color: "from-violet-500 to-indigo-600",
    hoverColor: "hover:border-violet-300",
    bgLight: "bg-violet-50/50",
    textColor: "text-violet-700",
    textLight: "text-violet-500",
    borderColor: "border-violet-100",
    accentBg: "bg-violet-100",
    accentText: "text-violet-800",
    duration: "12 Weeks",
    level: "Beginner",
    skills: ["HTML5 & CSS3", "Modern JS (ES6+)", "React SPAs", "Node.js & Express", "MongoDB & Databases", "REST APIs & JWT Auth"],
    milestones: [
      {
        title: "HTML & CSS Fundamentals",
        desc: "Learn to build semantic, structured, and fully responsive layouts using Flexbox and Grid.",
        topics: ["HTML5 semantic elements", "CSS box model & layout strategies", "Flexbox & Grid layout engines", "Media queries & responsive layouts"]
      },
      {
        title: "JavaScript Essentials",
        desc: "Master core programming concepts, DOM manipulation, asynchronous patterns, and the Fetch API.",
        topics: ["Variables, functions & lexical scope", "Asynchronous JavaScript & Promises", "DOM manipulation & event listening", "Modern ES6+ syntax & modular files"]
      },
      {
        title: "React Frontend Engineering",
        desc: "Build complex, high-performance single-page applications with reusable components and state management.",
        topics: ["JSX and declarative component structures", "Component State & Props patterns", "React Hooks (useState, useEffect, custom Hooks)", "React Router SPAs & HTTP clients (Axios)"]
      },
      {
        title: "Backend API & Database Development",
        desc: "Develop robust server-side logic, create secure REST APIs, design database schemas, and implement JWT authentication.",
        topics: ["Node.js & npm package management", "Express router, middleware, and controllers", "Mongoose ODM & MongoDB CRUD operations", "JSON Web Token (JWT) cookie-based authentication"]
      }
    ]
  },
  {
    title: "Data Scientist & ML Engineer",
    subtitle: "Extract insights from raw datasets and train powerful machine learning models.",
    courseTitle: "Python for Data Science & Machine Learning",
    icon: FiTrendingUp,
    color: "from-emerald-500 to-teal-600",
    hoverColor: "hover:border-emerald-300",
    bgLight: "bg-emerald-50/50",
    textColor: "text-emerald-700",
    textLight: "text-emerald-500",
    borderColor: "border-emerald-100",
    accentBg: "bg-emerald-100",
    accentText: "text-emerald-800",
    duration: "10 Weeks",
    level: "Intermediate",
    skills: ["Python Programming", "NumPy & Pandas", "Data Visualization", "Exploratory Data Analysis", "Scikit-Learn ML", "Model Evaluation"],
    milestones: [
      {
        title: "Python Programming Fundamentals",
        desc: "Write clean, logical, and Pythonic code utilizing native data structures and Jupyter Notebooks.",
        topics: ["Jupyter setup & package environments", "Control flow, loops, and conditional logic", "Functions, lambdas & list comprehensions", "File operations, error handling & custom modules"]
      },
      {
        title: "Data Manipulation with NumPy & Pandas",
        desc: "Clean, filter, aggregate, and reshape structured datasets with high performance.",
        topics: ["NumPy vectors & multi-dimensional matrices", "Pandas DataFrames, Series, and indexes", "Handling missing values, nulls & data type casting", "Merging, grouping, joining, and pivot tables"]
      },
      {
        title: "Data Visualization & Storytelling",
        desc: "Build beautiful static and interactive charts to communicate key data insights.",
        topics: ["Matplotlib plotting & customization basics", "Seaborn statistical plots & heatmaps", "Interactive charts with Plotly", "Exploratory Data Analysis (EDA) projects"]
      },
      {
        title: "Supervised & Unsupervised Machine Learning",
        desc: "Deploy, train, evaluate, and tune popular machine learning algorithms for predictions.",
        topics: ["ML workspace pipelines & feature scaling", "Regression & Classification algorithms", "Decision trees & Random Forest models", "Cross-validation & hyperparameter tuning"]
      }
    ]
  },
  {
    title: "UI/UX Designer",
    subtitle: "Design pixel-perfect, user-centered products from initial wireframe to final interactive prototype.",
    courseTitle: "UI/UX Design Masterclass: From Wireframes to Prototypes",
    icon: FiCompass,
    color: "from-rose-500 to-pink-600",
    hoverColor: "hover:border-rose-300",
    bgLight: "bg-rose-50/50",
    textColor: "text-rose-700",
    textLight: "text-rose-500",
    borderColor: "border-rose-100",
    accentBg: "bg-rose-100",
    accentText: "text-rose-800",
    duration: "8 Weeks",
    level: "Beginner",
    skills: ["User Research", "Wireframing", "Figma Design", "Typography & Color", "Figma Prototyping", "Design Handoff"],
    milestones: [
      {
        title: "UX Design & Research Foundations",
        desc: "Conduct thorough user interviews, construct personas, and structure clear user flows and info architectures.",
        topics: ["Design thinking lifecycle", "User research & contextual interviews", "Personas & user journey mapping", "Information architecture & card sorting tests"]
      },
      {
        title: "Sketching & Low-Fidelity Wireframes",
        desc: "Translate concepts into rapid paper sketches and build clickable low-fidelity mockups for early testing.",
        topics: ["Paper UI sketching techniques", "Low-fi wireframing in Figma", "Usability testing wireframes", "Iterative screen redesign workshop"]
      },
      {
        title: "High-Fidelity Interface Design in Figma",
        desc: "Master layout grids, custom components, typography scales, color palettes, and scalable design systems.",
        topics: ["Figma frames, vector objects, and layouts", "Typography hierarchy & color harmonies", "Figma components, variants & Auto Layout", "Advanced mobile & web UI styling"]
      },
      {
        title: "High-Fidelity Prototyping & Developer Handoff",
        desc: "Animate interactions, apply micro-transitions, run final usability tests, and package assets for engineering handoff.",
        topics: ["Interactive Figma prototyping & smart animate", "Accessibility principles & inclusive designs", "Figma Dev Mode & asset packaging", "Building a case study portfolio"]
      }
    ]
  },
  {
    title: "Cloud & DevOps Engineer",
    subtitle: "Deploy, scale, and automate cloud infrastructure using modern container and pipeline technologies.",
    courseTitle: "AWS & DevOps: Cloud Engineering for Beginners",
    icon: FiCpu,
    color: "from-sky-500 to-blue-600",
    hoverColor: "hover:border-sky-300",
    bgLight: "bg-sky-50/50",
    textColor: "text-sky-700",
    textLight: "text-sky-500",
    borderColor: "border-sky-100",
    accentBg: "bg-sky-100",
    accentText: "text-sky-800",
    duration: "14 Weeks",
    level: "Advanced",
    skills: ["AWS Cloud Services", "Infrastructure as Code", "Terraform Automation", "Docker Containers", "Kubernetes Basics", "GitHub Actions CI/CD"],
    milestones: [
      {
        title: "Cloud Computing & AWS Core Services",
        desc: "Provision virtual servers, configure object storage, build secure networks, and deploy cloud apps.",
        topics: ["IaaS vs PaaS vs SaaS architectural patterns", "AWS EC2, S3, IAM, and RDS setup", "Deploying Node.js servers via PM2/Nginx", "Static hosting with S3 + CloudFront CDN"]
      },
      {
        title: "Infrastructure as Code (IaC) with Terraform",
        desc: "Automate and script AWS architecture securely using declarative configuration files.",
        topics: ["Terraform providers, configurations & state files", "Deploying VPCs & networks programmatically", "Terraform modules & remote backends", "Secure credentials & variables management"]
      },
      {
        title: "Docker & Containerization Tools",
        desc: "Containerize multi-service applications for dev and prod parity, and share images globally.",
        topics: ["Docker engine, containers & images", "Writing optimized Dockerfiles", "Docker Compose multi-container workflows", "Pushing images to AWS ECR / Docker Hub"]
      },
      {
        title: "Automated Testing & CI/CD Pipelines",
        desc: "Create GitHub Action workflows that run automated tests, build code, and deploy directly to AWS on every merge.",
        topics: ["CI/CD pipeline concepts & workflow runners", "GitHub Actions workflows & YAML configurations", "Running automated tests in workflow jobs", "Auto-deploying to cloud servers on git push"]
      }
    ]
  }
];

function LearningPaths() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePathIndex, setActivePathIndex] = useState(0);
  const [enrollingId, setEnrollingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allRes, enrolledRes] = await Promise.all([
          axiosInstance.get("/user-api/courses"),
          axiosInstance.get("/user-api/my-courses"),
        ]);
        setCourses(allRes.data.payload || []);
        setEnrolled((enrolledRes.data.payload || []).map(c => c._id));
      } catch (err) {
        console.error("Error fetching courses for paths:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const activePath = PATHS_DATA[activePathIndex];

  // Match pathway with database course
  const matchedCourse = courses.find(
    (c) => c.title.toLowerCase().trim() === activePath.courseTitle.toLowerCase().trim()
  );
  
  const isEnrolled = matchedCourse ? enrolled.includes(matchedCourse._id) : false;

  const handleEnroll = async (courseId) => {
    setEnrollingId(courseId);
    try {
      await axiosInstance.post("/user-api/enroll-course", { courseId });
      toast.success("Enrolled in the learning path successfully!");
      setEnrolled((prev) => [...prev, courseId]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Enrollment failed.");
    } finally {
      setEnrollingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading learning paths...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-violet-700 to-indigo-600 px-8 py-14 text-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-violet-200 text-sm font-medium mb-2">Structured Roadmaps</p>
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight">Career Learning Paths</h1>
          <p className="text-violet-100 text-base max-w-2xl leading-relaxed">
            Step-by-step guides curated to help you master modern engineering disciplines. Follow these roadmaps, complete projects, and unlock professional-grade skills.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* PATH SELECTION GRID */}
        <h2 className="text-xl font-extrabold text-slate-800 mb-6">Choose a Career Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PATHS_DATA.map((path, idx) => {
            const Icon = path.icon;
            const isActive = activePathIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActivePathIndex(idx)}
                className={`text-left bg-white border rounded-3xl p-6 transition-all duration-300 relative overflow-hidden group cursor-pointer focus:outline-none ${
                  isActive
                    ? "border-violet-600 ring-2 ring-violet-200 shadow-md shadow-violet-50"
                    : `border-slate-100 shadow-sm hover:shadow-lg ${path.hoverColor}`
                }`}
              >
                {/* Visual Accent Banner */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${path.color}`} />

                {/* Path Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center text-white mb-5 transition-transform duration-300 group-hover:scale-110 shadow-md`}>
                  <Icon size={20} />
                </div>

                <h3 className="font-extrabold text-slate-800 text-lg mb-2 leading-tight">
                  {path.title}
                </h3>
                <p className="text-slate-500 text-xs mb-4 leading-relaxed line-clamp-2">
                  {path.subtitle}
                </p>

                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mt-auto pt-2 border-t border-slate-50">
                  <span className="flex items-center gap-1 font-medium"><FiClock size={11} /> {path.duration}</span>
                  <span className="flex items-center gap-1 font-medium"><FiBookOpen size={11} /> {path.level}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* SELECTED ROADMAP DETAIL */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-500">
          <div className={`p-8 lg:p-10 border-b border-slate-100 bg-gradient-to-r ${activePath.bgLight} relative`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-white border ${activePath.borderColor} ${activePath.textColor} mb-3`}>
                  Active Path Roadmap
                </span>
                <h2 className="text-2xl lg:text-3xl font-black text-slate-800 tracking-tight">
                  {activePath.title}
                </h2>
                <p className="text-slate-600 mt-2 max-w-3xl leading-relaxed text-sm">
                  {activePath.subtitle}
                </p>
              </div>

              {/* Path Overview stats */}
              <div className="flex gap-4 shrink-0 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Duration</p>
                  <p className="font-extrabold text-slate-700 text-sm">{activePath.duration}</p>
                </div>
                <div className="border-l border-slate-100" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Level</p>
                  <p className="font-extrabold text-slate-700 text-sm">{activePath.level}</p>
                </div>
                <div className="border-l border-slate-100" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Steps</p>
                  <p className="font-extrabold text-slate-700 text-sm">{activePath.milestones.length}</p>
                </div>
              </div>
            </div>

            {/* SKILLS CHIPS */}
            <div className="mt-6 flex flex-wrap gap-2">
              {activePath.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className={`text-xs px-3 py-1 rounded-full font-bold ${activePath.accentBg} ${activePath.accentText}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8 lg:p-12">
            <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-2">
              <FiAward className={activePath.textColor} size={20} />
              Path Curriculum & Milestones
            </h3>

            {/* TIMELINE */}
            <div className="relative border-l-2 border-slate-100 pl-8 ml-4 space-y-12">
              {activePath.milestones.map((milestone, mIdx) => {
                const number = mIdx + 1;
                return (
                  <div key={mIdx} className="relative group">
                    {/* TIMELINE CIRCLE */}
                    <div className={`absolute -left-[45px] top-0.5 w-8 h-8 rounded-full border-2 bg-white flex items-center justify-center font-bold text-sm transition-all duration-300 group-hover:scale-110 shadow-sm ${
                      activePath.textColor === "text-violet-700" ? "border-violet-500 text-violet-700 hover:bg-violet-50" :
                      activePath.textColor === "text-emerald-700" ? "border-emerald-500 text-emerald-700 hover:bg-emerald-50" :
                      activePath.textColor === "text-rose-700" ? "border-rose-500 text-rose-700 hover:bg-rose-50" :
                      "border-sky-500 text-sky-700 hover:bg-sky-50"
                    }`}>
                      {number}
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-slate-900 transition-colors">
                        {milestone.title}
                      </h4>
                      <p className="text-slate-500 text-sm max-w-3xl leading-relaxed mb-4">
                        {milestone.desc}
                      </p>

                      {/* TOPICS BULLETS */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl bg-slate-50/50 border border-slate-100/50 rounded-2xl p-4">
                        {milestone.topics.map((topic, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-2.5 text-xs text-slate-600">
                            <div className={`p-0.5 rounded-full mt-0.5 ${activePath.accentBg} ${activePath.textColor}`}>
                              <FiCheck size={10} />
                            </div>
                            <span className="font-medium leading-tight">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CALL TO ACTION BOTTOM BOX */}
            <div className="mt-14 rounded-3xl border border-slate-100 bg-[#f8fafc] p-6 lg:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <p className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-1">
                  Target Course
                </p>
                <h4 className="text-xl font-extrabold text-slate-800 mb-2">
                  {activePath.courseTitle}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
                  {matchedCourse
                    ? matchedCourse.description
                    : "Access full lecture notes, quizzes, HD coding screencasts, and interactive practice environments."}
                </p>
                {matchedCourse && (
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-4">
                    <span className="bg-white border border-slate-100 px-2.5 py-1 rounded-full font-medium">
                      {matchedCourse.courseLevel}
                    </span>
                    <span>•</span>
                    <span className="font-medium">
                      ⭐ {matchedCourse.rating?.toFixed(1) || "4.8"} ({matchedCourse.ratingCount || "100+"} ratings)
                    </span>
                  </div>
                )}
              </div>

              <div className="shrink-0 flex flex-col justify-center items-stretch md:items-end gap-3 min-w-[200px]">
                {matchedCourse ? (
                  isEnrolled ? (
                    <>
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 justify-center md:justify-end">
                        <FiCheckCircle size={15} /> You are on this path
                      </span>
                      <Link
                        to={`/course/${matchedCourse._id}`}
                        className="py-3.5 px-6 rounded-xl bg-violet-600 text-white text-sm font-bold text-center flex items-center justify-center gap-2 hover:bg-violet-700 transition shadow-lg shadow-violet-100"
                      >
                        <FiPlay size={14} /> Resume Learning
                      </Link>
                    </>
                  ) : matchedCourse.price > 0 ? (
                    <>
                      <div className="flex flex-col items-stretch md:items-end justify-center">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Path Price</span>
                        <div className="flex items-baseline gap-1.5 justify-center md:justify-end font-bold">
                          <span className="text-slate-800 text-2xl font-black">₹{matchedCourse.price}</span>
                          <span className="text-slate-400 line-through text-xs">₹{Math.round(matchedCourse.price * 1.25)}</span>
                        </div>
                      </div>
                      <Link
                        to={`/course/${matchedCourse._id}`}
                        className="py-3.5 px-6 rounded-xl bg-violet-600 text-white text-sm font-bold text-center flex items-center justify-center gap-2 hover:bg-violet-700 transition shadow-lg shadow-violet-100"
                      >
                        Start Path (Buy Course) <FiArrowRight size={14} />
                      </Link>
                    </>
                  ) : (
                    <>
                      <span className="text-xs font-bold text-emerald-600 text-center md:text-right">
                        Free Career Path
                      </span>
                      <button
                        onClick={() => handleEnroll(matchedCourse._id)}
                        disabled={enrollingId === matchedCourse._id}
                        className="py-3.5 px-6 rounded-xl bg-violet-600 text-white text-sm font-bold text-center flex items-center justify-center gap-2 hover:bg-violet-700 transition shadow-lg shadow-violet-100 disabled:opacity-50 cursor-pointer"
                      >
                        {enrollingId === matchedCourse._id ? "Enrolling..." : "Enroll in Path (Free)"}
                        <FiChevronRight size={14} />
                      </button>
                    </>
                  )
                ) : (
                  <Link
                    to="/all-courses"
                    className="py-3.5 px-6 rounded-xl bg-violet-600 text-white text-sm font-bold text-center flex items-center justify-center gap-2 hover:bg-violet-700 transition shadow-lg shadow-violet-100"
                  >
                    Browse Catalog <FiArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningPaths;
