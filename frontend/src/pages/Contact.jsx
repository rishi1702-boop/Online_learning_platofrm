import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function Contact() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: user ? `${user.firstName} ${user.lastName}` : "",
    email: user?.email || "",
    subject: "",
    category: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Message sent successfully!");
    }, 1500);
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      title: "Email Us",
      value: "support@coursehub.com",
      desc: "We respond within 24 hours",
      color: "violet",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      title: "Call Us",
      value: "+1 (555) 123-4567",
      desc: "Mon-Fri, 9AM - 6PM IST",
      color: "indigo",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      title: "Visit Us",
      value: "Hyderabad, India",
      desc: "Gachibowli, Telangana",
      color: "emerald",
    },
  ];

  const colorMap = {
    violet: { bg: "bg-violet-100", text: "text-violet-600", border: "border-violet-200" },
    indigo: { bg: "bg-indigo-100", text: "text-indigo-600", border: "border-indigo-200" },
    emerald: { bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200" },
  };

  const faqs = [
    { q: "How quickly do you respond?", a: "We aim to respond to all inquiries within 24 hours on business days." },
    { q: "Can I request a demo?", a: "Yes! Select 'Demo Request' as the category in the contact form and we'll schedule a personalized demo for you." },
    { q: "Do you offer phone support?", a: "Phone support is available Monday through Friday, 9AM to 6PM IST. For urgent issues, we recommend calling directly." },
    { q: "Where can I report a bug?", a: "Select 'Bug Report' from the category dropdown in the contact form. Please include as much detail as possible including steps to reproduce." },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-[#f7f9fa]">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />

        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-violet-200 text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            We're here to help
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Get in Touch
          </h1>
          <p className="mt-4 text-violet-200 text-base md:text-lg max-w-2xl mx-auto">
            Have a question, feedback, or need help? We'd love to hear from you. Our team is always ready to assist.
          </p>
        </div>
      </div>

      {/* ── Contact Info Cards ── */}
      <div className="relative -mt-10 z-10 max-w-4xl mx-auto px-6">
        <div className="grid sm:grid-cols-3 gap-4">
          {contactInfo.map((info, i) => {
            const c = colorMap[info.color];
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border ${c.border} p-6 text-center shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
              >
                <div className={`w-12 h-12 mx-auto rounded-xl ${c.bg} ${c.text} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {info.icon}
                </div>
                <h3 className="font-bold text-[#1c1d1f] text-sm">{info.title}</h3>
                <p className={`${c.text} font-semibold text-sm mt-1`}>{info.value}</p>
                <p className="text-xs text-gray-400 mt-1">{info.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-5 gap-8">

          {/* ── Contact Form ── */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h2 className="text-xl font-bold text-[#1c1d1f] mb-1">Send us a message</h2>
              <p className="text-sm text-gray-500 mb-6">Fill out the form below and we'll get back to you shortly.</p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-4xl mb-6 animate-bounce" style={{ animationDuration: "2s" }}>
                    ✅
                  </div>
                  <h3 className="text-xl font-bold text-[#1c1d1f] mb-2">Message Sent!</h3>
                  <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
                    Thank you for reaching out. We've received your message and will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: user ? `${user.firstName} ${user.lastName}` : "",
                        email: user?.email || "",
                        subject: "",
                        category: "general",
                        message: "",
                      });
                    }}
                    className="text-violet-600 font-medium text-sm hover:text-violet-800 transition-colors"
                  >
                    Send another message →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#1c1d1f] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#1c1d1f] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#1c1d1f] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing & Payments</option>
                        <option value="bug">Bug Report</option>
                        <option value="feature">Feature Request</option>
                        <option value="partnership">Partnership</option>
                        <option value="demo">Demo Request</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Brief subject"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#1c1d1f] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      rows="5"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#1c1d1f] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      loading
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-200/50 hover:shadow-xl hover:-translate-y-0.5"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="md:col-span-2 space-y-6">

            {/* Response Time */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-[#1c1d1f] text-sm mb-4">Average Response Time</h3>
              <div className="space-y-3">
                {[
                  { label: "General Inquiries", time: "< 24 hours", bar: "75%", color: "bg-violet-500" },
                  { label: "Technical Support", time: "< 12 hours", bar: "60%", color: "bg-indigo-500" },
                  { label: "Billing Issues", time: "< 6 hours", bar: "40%", color: "bg-emerald-500" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 font-medium">{item.label}</span>
                      <span className="text-gray-400">{item.time}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: item.bar }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-[#1c1d1f] text-sm mb-4">Office Hours</h3>
              <div className="space-y-2">
                {[
                  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM", active: true },
                  { day: "Saturday", hours: "10:00 AM - 2:00 PM", active: true },
                  { day: "Sunday", hours: "Closed", active: false },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{item.day}</span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                      item.active ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"
                    }`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">All times are in IST (UTC+5:30)</p>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="relative">
                <h3 className="font-bold text-sm mb-4">Helpful Resources</h3>
                <ul className="space-y-2.5">
                  {[
                    { label: "Privacy Policy", to: "/privacy-policy" },
                    { label: "Terms & Services", to: "/terms-and-services" },
                    { label: "About Us", to: "/about-us" },
                  ].map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.to}
                        className="flex items-center gap-2 text-sm text-violet-100 hover:text-white transition-all duration-200 hover:translate-x-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>

        {/* ── FAQ Section ── */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">FAQ</span>
            <h2 className="mt-6 text-2xl md:text-3xl font-extrabold text-[#1c1d1f]">
              Common Questions
            </h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl border transition-all duration-300 ${
                  openFaq === i ? "border-violet-300 shadow-md shadow-violet-100" : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                >
                  <span className="font-semibold text-[#1c1d1f] text-sm">{faq.q}</span>
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                      openFaq === i ? "bg-violet-100 text-violet-600 rotate-180" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="px-6 pb-4 text-sm text-[#4d5156] leading-relaxed">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back link */}
        <div className="text-center pt-12">
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

export default Contact;
