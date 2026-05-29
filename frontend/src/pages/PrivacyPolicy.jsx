import { useState } from "react";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("collection");

  const sections = [
    {
      id: "collection",
      icon: "📋",
      color: "violet",
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "When you create an account, we collect your name, email address, and role preference (Student, Instructor, or Admin). If you enroll in paid courses, we collect billing details through our secure payment processor.",
        },
        {
          subtitle: "Usage Data",
          text: "We automatically collect information about how you interact with our platform, including pages visited, courses viewed, time spent on lessons, quiz results, and features used.",
        },
        {
          subtitle: "Device Information",
          text: "We collect device type, browser type, operating system, IP address, and general location data to optimize your experience and ensure platform security.",
        },
      ],
    },
    {
      id: "usage",
      icon: "⚙️",
      color: "indigo",
      title: "How We Use Your Data",
      content: [
        {
          subtitle: "Platform Operations",
          text: "Your data is used to provide and maintain CourseHub services, process transactions, manage your account, and deliver the courses and features you request.",
        },
        {
          subtitle: "Personalization",
          text: "We use your learning history and preferences to recommend courses, customize your dashboard, and provide a tailored learning experience.",
        },
        {
          subtitle: "Communication",
          text: "We may send you service-related emails, course updates, progress reminders, and promotional content. You can opt out of marketing emails at any time.",
        },
        {
          subtitle: "Analytics & Improvement",
          text: "Aggregated and anonymized data helps us understand usage patterns, improve our platform, and develop new features.",
        },
      ],
    },
    {
      id: "sharing",
      icon: "🤝",
      color: "amber",
      title: "Data Sharing & Third Parties",
      content: [
        {
          subtitle: "We Do NOT Sell Your Data",
          text: "CourseHub does not sell, rent, or trade your personal information to third parties for marketing purposes. Your data is yours.",
        },
        {
          subtitle: "Service Providers",
          text: "We share data with trusted third-party service providers who help us operate our platform (e.g., payment processors, email services, cloud hosting). These providers are bound by strict confidentiality agreements.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law, court order, or government regulation, or if necessary to protect the rights, safety, or property of CourseHub or its users.",
        },
      ],
    },
    {
      id: "security",
      icon: "🔐",
      color: "emerald",
      title: "Data Security",
      content: [
        {
          subtitle: "Encryption",
          text: "All data transmitted between your browser and our servers is encrypted using TLS 1.3. Sensitive data at rest is encrypted using AES-256 encryption.",
        },
        {
          subtitle: "Access Controls",
          text: "We implement strict role-based access controls. Only authorized personnel can access user data, and all access is logged and audited regularly.",
        },
        {
          subtitle: "Incident Response",
          text: "We have a dedicated security team and an incident response plan. In the unlikely event of a data breach, affected users will be notified within 72 hours as required by applicable regulations.",
        },
      ],
    },
    {
      id: "rights",
      icon: "✋",
      color: "rose",
      title: "Your Rights",
      content: [
        {
          subtitle: "Access & Portability",
          text: "You have the right to access all personal data we hold about you and request a copy in a portable format.",
        },
        {
          subtitle: "Correction & Deletion",
          text: "You can update your personal information through your profile settings. You may also request the deletion of your account and associated data at any time.",
        },
        {
          subtitle: "Opt-Out",
          text: "You can opt out of marketing communications, disable cookies through your browser settings, and manage notification preferences in your account settings.",
        },
        {
          subtitle: "Data Retention",
          text: "We retain your data for as long as your account is active. After account deletion, data is purged within 30 days, except where retention is required by law.",
        },
      ],
    },
    {
      id: "cookies",
      icon: "🍪",
      color: "orange",
      title: "Cookies & Tracking",
      content: [
        {
          subtitle: "Essential Cookies",
          text: "These cookies are necessary for the platform to function properly, including authentication, security, and session management. They cannot be disabled.",
        },
        {
          subtitle: "Analytics Cookies",
          text: "We use analytics cookies to understand how users interact with our platform. This data is aggregated and anonymized. You can opt out of analytics cookies in your settings.",
        },
        {
          subtitle: "Preference Cookies",
          text: "These cookies remember your preferences such as language, theme, and display settings to provide a personalized experience.",
        },
      ],
    },
  ];

  const colorMap = {
    violet: { bg: "bg-violet-100", text: "text-violet-600", border: "border-violet-200", activeBg: "bg-violet-50", dot: "bg-violet-500" },
    indigo: { bg: "bg-indigo-100", text: "text-indigo-600", border: "border-indigo-200", activeBg: "bg-indigo-50", dot: "bg-indigo-500" },
    amber: { bg: "bg-amber-100", text: "text-amber-600", border: "border-amber-200", activeBg: "bg-amber-50", dot: "bg-amber-500" },
    emerald: { bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200", activeBg: "bg-emerald-50", dot: "bg-emerald-500" },
    rose: { bg: "bg-rose-100", text: "text-rose-600", border: "border-rose-200", activeBg: "bg-rose-50", dot: "bg-rose-500" },
    orange: { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-200", activeBg: "bg-orange-50", dot: "bg-orange-500" },
  };

  const activeData = sections.find((s) => s.id === activeSection);
  const activeColor = colorMap[activeData.color];

  return (
    <div className="min-h-screen bg-[#f7f9fa]">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-violet-200 text-xs font-medium mb-6">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Your privacy matters to us
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-violet-200 text-base md:text-lg max-w-2xl mx-auto">
            We believe in full transparency about how we collect, use, and protect your personal information. This policy explains it all.
          </p>
          <p className="mt-3 text-violet-300 text-sm">
            Effective Date: January 1, 2026 · Last Updated: May 29, 2026
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Interactive Tab Navigation */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 mb-8 flex flex-wrap gap-1">
          {sections.map((s) => {
            const c = colorMap[s.color];
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? `${c.activeBg} ${c.text} shadow-sm`
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-base">{s.icon}</span>
                <span className="hidden md:inline">{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Section Content */}
        <div className={`bg-white rounded-2xl border ${activeColor.border} shadow-sm p-8 md:p-10 transition-all duration-300`}>
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-12 h-12 rounded-xl ${activeColor.bg} ${activeColor.text} flex items-center justify-center text-2xl`}>
              {activeData.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1c1d1f]">{activeData.title}</h2>
              <p className="text-xs text-gray-400 mt-0.5">Section {sections.findIndex((s) => s.id === activeSection) + 1} of {sections.length}</p>
            </div>
          </div>

          <div className="space-y-6">
            {activeData.content.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center pt-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${activeColor.dot} shrink-0`} />
                  {i < activeData.content.length - 1 && (
                    <div className={`w-px flex-1 mt-1 ${activeColor.bg}`} />
                  )}
                </div>
                <div className="pb-6">
                  <h3 className="font-semibold text-[#1c1d1f] text-sm mb-2">{item.subtitle}</h3>
                  <p className="text-sm text-[#4d5156] leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Section navigation */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
            <button
              onClick={() => {
                const idx = sections.findIndex((s) => s.id === activeSection);
                if (idx > 0) setActiveSection(sections[idx - 1].id);
              }}
              disabled={sections.findIndex((s) => s.id === activeSection) === 0}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-violet-600 transition-colors disabled:opacity-30 disabled:hover:text-gray-500"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            <div className="flex gap-1.5">
              {sections.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeSection === s.id ? `${colorMap[s.color].dot} w-6` : "bg-gray-200 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => {
                const idx = sections.findIndex((s) => s.id === activeSection);
                if (idx < sections.length - 1) setActiveSection(sections[idx + 1].id);
              }}
              disabled={sections.findIndex((s) => s.id === activeSection) === sections.length - 1}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-violet-600 transition-colors disabled:opacity-30 disabled:hover:text-gray-500"
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {[
            { icon: "🚫", title: "We Never Sell Data", desc: "Your personal information is never sold to third parties.", color: "rose" },
            { icon: "🔒", title: "AES-256 Encryption", desc: "All sensitive data is encrypted with industry-leading standards.", color: "emerald" },
            { icon: "🗑️", title: "Right to Delete", desc: "Request complete data deletion at any time.", color: "violet" },
          ].map((card, i) => {
            const c = colorMap[card.color];
            return (
              <div key={i} className={`bg-white rounded-2xl border ${c.border} p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}>
                <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-[#1c1d1f] mb-2">{card.title}</h3>
                <p className="text-sm text-[#4d5156]">{card.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-br from-[#1c1d1f] to-[#2d2e33] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="relative">
            <h3 className="text-xl font-bold text-white">Have questions about your privacy?</h3>
            <p className="mt-2 text-gray-400 text-sm max-w-md mx-auto">
              Our team is here to help. Reach out to us and we'll respond within 24 hours.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-violet-900/40 hover:shadow-xl hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
              <Link
                to="/terms-and-services"
                className="border border-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-white/5 transition-all duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center pt-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-800 transition-colors duration-200">
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

export default PrivacyPolicy;
