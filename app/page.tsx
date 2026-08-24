"use client";

import { motion, AnimatePresence } from "motion/react";
import { siInstagram } from "simple-icons/icons";

import { FormEvent, useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Building2,
  Calculator,
  CheckCircle2,
  ArrowUpRight,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Globe2,
  IndianRupee,
  Landmark,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ReceiptIndianRupee,
  ShieldCheck,
  Sparkles,
  X,
  Upload,
} from "lucide-react";
import Testimonials from "./testimoninal";

const services = [
  {
    icon: ReceiptIndianRupee,
    title: "GST Services",
    description:
      "Complete GST registration, return filing, reconciliation, notices and compliance support.",
    items: [
      "GST Registration – Regular / Composition",
      "GST Return Filing",
      "GST Refund Applications",
      "LUT Filing",
      "GST Annual Return & Audit Support",
      "GST Cancellation & Revocation",
      "GST Notice & SCN Replies",
    ],
  },
  {
    icon: IndianRupee,
    title: "Income Tax Services",
    description:
      "Professional income tax filing and compliance solutions for individuals and businesses.",
    items: [
      "ITR Filing – Salary / Business / Capital Gains",
      "Advance Tax Calculation",
      "Previous Year ITR Filing",
      "Income Tax Notice Replies",
      "Income Tax Refund Assistance",
      "Form 15CA / 15CB",
    ],
  },
  {
    icon: FileCheck2,
    title: "TDS Compliance",
    description:
      "Accurate TDS return filing, corrections and certificate-related services.",
    items: [
      "TDS Returns – 24Q / 26Q / 27Q / 27EQ",
      "TDS Return Corrections",
      "TDS Certificates",
      "Form 26QB",
      "Form 26QC",
      "Form 26QD",
      "Form 26QE",
    ],
  },
  {
    icon: BookOpenCheck,
    title: "Accounting & Bookkeeping",
    description:
      "Reliable bookkeeping and financial reporting for businesses of every size.",
    items: [
      "Daily Bookkeeping",
      "Monthly Bookkeeping",
      "Quarterly Bookkeeping",
      "Annual Bookkeeping",
      "Financial Statement Preparation",
      "Projected Financial Statements",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Audit Services",
    description:
      "Professional audit support to improve accuracy, compliance and financial control.",
    items: [
      "Internal Audit",
      "Tax Audit Support",
      "Stock Audit",
      "Hotel & Trader Stock Audits",
      "Compliance Review",
    ],
  },
  {
    icon: Building2,
    title: "Business Registration",
    description:
      "End-to-end registration and certification support for new and existing businesses.",
    items: [
      "Company / OPC / LLP Registration",
      "Proprietorship Registration",
      "Partnership Registration",
      "Section 8 Company",
      "NGO Registration",
      "MSME / Udyam Registration",
    ],
  },
  {
    icon: Globe2,
    title: "Other Services",
    description:
      "A wide range of business registrations, certificates and compliance services.",
    items: [
      "PAN / TAN Application",
      "Digital Signature Certificate",
      "Import Export Code (IEC)",
      "RCMC Registration",
      "Startup India Registration",
      "FSSAI License",
      "NPO Darpan ID",
      "80G & 12A Registration",
      "GeM Registration",
      "ISO Registration",
      "EPFO & ESIC Registration",
      "Net Worth & Turnover Certificate",
    ],
  },
];

const faqs = [
  {
    question: "How can I share my documents?",
    answer:
      "You can submit your basic details through the consultation form. Our team will contact you and guide you regarding the secure method for sharing required documents.",
  },
  {
    question: "What are your professional fees?",
    answer:
      "Fees depend on the service, transaction volume and complexity of the work. Contact us to receive a transparent quotation based on your requirements.",
  },
  {
    question: "Do you provide services to startups and small businesses?",
    answer:
      "Yes. We provide compliance, accounting, tax and registration support for startups, freelancers, entrepreneurs and small & medium businesses.",
  },
  {
    question: "Can I get help with an Income Tax or GST notice?",
    answer:
      "Yes. We provide professional assistance for understanding and responding to various GST and Income Tax notices, subject to the nature of the notice.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const [form, setForm] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

  const whatsappNumber = "919555836691";

  const emailAddress = "info@nhtaxconsultancy.com";

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  
  const handleServiceSelect = (serviceTitle: string) => {
    setForm((previous) => ({
      ...previous,
      service: serviceTitle,
    }));

    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("");
    setIsSuccess(false);

    if (!form.name || !form.phone || !form.email || !form.service) {
      setStatus("Please fill all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone)) {
      setStatus("Please enter a valid phone / WhatsApp number.");
      return;
    }

    if (file && file.size > 5 * 1024 * 1024) {
      setStatus("File size must be less than 5 MB.");
      return;
    }

    // --------------------------------
    // Prepare data BEFORE resetting form
    // --------------------------------
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("business", form.business);
    formData.append("phone", form.phone);
    formData.append("email", form.email);
    formData.append("service", form.service);
    formData.append("message", form.message);

    if (file) {
      formData.append("file", file);
    }

    // --------------------------------
    // Immediately show success
    // --------------------------------
    setIsSuccess(true);
    setStatus(
      "Your enquiry has been received successfully. We will contact you shortly.",
    );

    // --------------------------------
    // Immediately reset form
    // --------------------------------
    setForm({
      name: "",
      business: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    });

    setFile(null);

    // --------------------------------
    // Send email in background
    // --------------------------------
    fetch("/api/sendEmail", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        const result = await response.json().catch(() => null);

        if (!response.ok || !result?.success) {
          throw new Error(
            result?.message || "Background email delivery failed.",
          );
        }

        console.log("Enquiry email sent successfully.");
      })
      .catch((error) => {
        // User already received success UI.
        // Keep failure handling silent for UX.
        console.error("Background email sending failed:", error);
      });
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (!status) return;

    const timer = setTimeout(() => {
      setStatus("");
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [status]);
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl animate-nav-intro">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <button
            onClick={() => scrollTo("home")}
            className="group flex items-center gap-3 text-left"
          >
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-emerald-500 font-black text-white shadow-lg shadow-emerald-500/20 transition duration-300 group-hover:rotate-3 group-hover:scale-105">
              <span className="absolute inset-0 animate-pulse rounded-2xl bg-emerald-400/30" />
              <span className="relative text-lg">NH</span>
            </span>

            <span>
              <span className="block text-base font-bold tracking-tight">
                NH Tax Consultancy
              </span>
              <span className="hidden text-xs text-slate-500 sm:block">
                Tax • Accounting • Compliance
              </span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => scrollTo("services")}
              className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
            >
              Services
            </button>

            <button
              onClick={() => scrollTo("about")}
              className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
            >
              About
            </button>

            <button
              onClick={() => scrollTo("faq")}
              className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
            >
              FAQ
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-600"
            >
              Get Started
            </button>
          </nav>

          {/* Mobile Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-slate-200 p-2 md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {[
                ["services", "Services"],
                ["about", "About"],
                ["faq", "FAQ"],
                ["contact", "Contact"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="rounded-xl px-4 py-3 text-left font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden bg-white">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-teal-100/50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <Sparkles size={16} />
              Professional Tax & Business Solutions
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl ">
              Reliable tax & accounting services for{" "}
              <span className="text-emerald-500 ">growing businesses.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg animate-hero-title ">
              NH Tax Consultancy provides GST, Income Tax, TDS, accounting,
              audit, registrations and compliance solutions for entrepreneurs,
              freelancers and small & medium businesses.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-bold text-white shadow-xl shadow-emerald-500/20 transition hover:-translate-y-1 hover:bg-emerald-600"
              >
                Free Consultation
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => scrollTo("services")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              >
                Explore Services
              </button>
            </div>

            <div className="mt-9 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                "Timely Compliance",
                "Transparent Pricing",
                "Secure Handling",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600"
                >
                  <CheckCircle2 size={17} className="text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* CONSULTATION CARD */}
          <div
            id="contact"
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-7"
          >
            <div className="mb-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <MessageCircle size={24} />
              </div>

              <h2 className="text-2xl font-bold">Request a Consultation</h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Share your requirements and we will contact you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  placeholder="Full name *"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />

                <input
                  value={form.business}
                  onChange={(e) => updateForm("business", e.target.value)}
                  placeholder="Business / Company"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                  placeholder="Phone / WhatsApp *"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  placeholder="Email address *"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              <select
                value={form.service}
                onChange={(e) => updateForm("service", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-600 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              >
                <option value="">Select service *</option>

                {services.map((service) => (
                  <option key={service.title} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>

              <textarea
                value={form.message}
                onChange={(e) => updateForm("message", e.target.value)}
                rows={4}
                placeholder="Tell us briefly about your requirement..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 transition hover:border-emerald-400 hover:bg-emerald-50">
                <Upload size={19} className="text-emerald-600" />

                <span className="flex-1 text-sm text-slate-500">
                  {file ? file.name : "Attach document (JPG, PNG or PDF)"}
                </span>

                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    const selected = e.target.files?.[0];

                    if (!selected) return;

                    if (selected.size > 5 * 1024 * 1024) {
                      setStatus("File size must be less than 5 MB.");
                      return;
                    }

                    setFile(selected);
                    setStatus("");
                  }}
                />
              </label>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
              >
                <Mail size={18} />
                Send via Email
              </button>

              <AnimatePresence>
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`overflow-hidden rounded-xl px-4 py-3 ${
                      isSuccess
                        ? "border border-emerald-200 bg-emerald-50"
                        : "border border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className={
                          isSuccess
                            ? "mt-0.5 shrink-0 text-emerald-600"
                            : "mt-0.5 shrink-0 text-red-500"
                        }
                      />

                      <p
                        className={`text-sm font-medium ${
                          isSuccess ? "text-emerald-700" : "text-red-600"
                        }`}
                      >
                        {status}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-center text-xs text-slate-400">
                By submitting this form, you agree to be contacted regarding
                your enquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-sm font-semibold text-slate-700">
            <ShieldCheck size={20} className="text-emerald-500" />
            Secure Document Handling
          </div>

          <div className="flex items-center justify-center gap-3 text-sm font-semibold text-slate-700">
            <Calculator size={20} className="text-emerald-500" />
            Accurate Calculations
          </div>

          <div className="flex items-center justify-center gap-3 text-sm font-semibold text-slate-700">
            <FileText size={20} className="text-emerald-500" />
            Compliance Support
          </div>

          <div className="flex items-center justify-center gap-3 text-sm font-semibold text-slate-700">
            <BarChart3 size={20} className="text-emerald-500" />
            Business-Focused Advice
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">
            What We Do
          </span>

          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Complete business & tax solutions
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            From everyday bookkeeping to complex tax compliance, we help you
            stay organised, compliant and focused on growth.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ y: -6 }}
                onClick={() => handleServiceSelect(service.title)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleServiceSelect(service.title);
                  }
                }}
                className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5"
              >
                <div className="flex items-start justify-between">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-500 group-hover:text-white"
                  >
                    <Icon size={23} />
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight
                      size={18}
                      className="text-slate-300 transition group-hover:text-emerald-500"
                    />
                  </motion.div>
                </div>

                <h3 className="mt-5 text-xl font-bold">{service.title}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {service.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {service.items.slice(0, 6).map((item) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.4 }}
                      className="flex gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-emerald-500"
                      />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-400">
              Why NH Tax Consultancy
            </span>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Practical expertise. Transparent service.
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-slate-300">
              We help businesses manage their tax, accounting and regulatory
              responsibilities with a practical and organised approach.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Timely compliance assistance",
                "Transparent pricing",
                "Digital-first workflow",
                "Personalised support",
                "Proactive reminders",
                "Business-focused solutions",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <CheckCircle2 size={19} className="text-emerald-400" />
                  <span className="text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <Landmark size={30} className="text-emerald-400" />
              <h3 className="mt-5 text-lg font-bold">Compliance First</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Stay organised with timely filings and compliance support.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <ShieldCheck size={30} className="text-emerald-400" />
              <h3 className="mt-5 text-lg font-bold">Secure Workflow</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Responsible handling of your business information and documents.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:col-span-2">
              <Building2 size={30} className="text-emerald-400" />
              <h3 className="mt-5 text-lg font-bold">Built for Businesses</h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Support for startups, freelancers, entrepreneurs, traders and
                small & medium businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-5 py-20">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">
            FAQ
          </span>

          <h2 className="mt-3 text-3xl font-black">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const open = faqOpen === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                  open
                    ? "border-emerald-200 shadow-md shadow-emerald-900/5"
                    : "border-slate-200"
                }`}
              >
                <button
                  onClick={() => setFaqOpen(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold transition-colors duration-300 hover:text-emerald-600"
                >
                  {faq.question}

                  <motion.div
                    animate={{
                      rotate: open ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      size={20}
                      className={open ? "text-emerald-500" : "text-slate-400"}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        height: {
                          duration: 0.35,
                          ease: [0.4, 0, 0.2, 1],
                        },
                        opacity: {
                          duration: 0.25,
                        },
                      }}
                    >
                      <div className="px-5 pb-5 text-sm leading-7 text-slate-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-emerald-50">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-8 rounded-3xl bg-white p-7 shadow-xl shadow-emerald-900/5 md:grid-cols-3 md:p-10">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Phone size={22} />
              </div>
              <h3 className="mt-4 font-bold">Call Us</h3>
              <a
                href="tel:+919555836691"
                className="mt-1 block text-sm text-slate-500 hover:text-emerald-600"
              >
                +91 95558 36691
              </a>
            </div>

            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Mail size={22} />
              </div>
              <h3 className="mt-4 font-bold">Email Us</h3>
              <a
                href="mailto:info@nhtaxconsultancy.com"
                className="mt-1 block break-all text-sm text-slate-500 hover:text-emerald-600"
              >
                info@nhtaxconsultancy.com
              </a>
              <a
                href="mailto:contact@nhtaxconsultancy.com"
                className="mt-1 block break-all text-sm text-slate-500 hover:text-emerald-600"
              >
                contact@nhtaxconsultancy.com
              </a>
            </div>

            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <MapPin size={22} />
              </div>
              <h3 className="mt-4 font-bold">Visit Us</h3>
              <a
                href="https://www.google.com/maps/place/NH+Tax+Consultancy/@28.5750546,77.3243155,17z"
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-sm leading-6 text-slate-500 hover:text-emerald-600"
              >
                A-12 Dharmapali Palace, Noida Sector-27, Atta Bhoja Market, U.P.
                201301
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3 md:items-start">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 font-black text-white shadow-lg shadow-emerald-500/20">
                  NH
                </div>

                <div>
                  <div className="font-bold text-white">NH Tax Consultancy</div>

                  <p className="mt-1 text-sm">
                    GST • Income Tax • TDS • Accounting • Audit
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:justify-self-center"
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
                Connect With Us
              </p>

              <div className="flex gap-3">
                {/* Instagram */}
                <motion.a
                  href="https://www.instagram.com/nhtaxconsultancy"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-emerald-500/40 hover:bg-emerald-500 hover:text-white"
                  aria-label="Instagram"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d={siInstagram.path} />
                  </svg>
                </motion.a>

                {/* Email */}
                <motion.a
                  href="mailto:info@nhtaxconsultancy.com"
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-emerald-500/40 hover:bg-emerald-500 hover:text-white"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </motion.a>

                {/* WhatsApp */}
                <motion.a
                  href="https://wa.me/919555836691"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-emerald-500/40 hover:bg-emerald-500 hover:text-white"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={20} />
                </motion.a>
              </div>
            </motion.div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:justify-self-end md:text-right"
            >
              <p className="text-sm text-slate-400">
                © {new Date().getFullYear()} NH Tax Consultancy
              </p>

              <p className="mt-2 text-xs text-slate-500">
                All rights reserved.
              </p>
            </motion.div>
          </div>

          {/* Bottom */}
          <div className="mt-10 border-t border-white/10 pt-5">
            <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row">
              <p className="text-xs text-slate-500">
                Crafted with care by{" "}
                <span className="font-semibold text-slate-300">
                  Tabish Quamar
                </span>
              </p>

              <motion.a
                href="#"
                whileHover={{ y: -2 }}
                className="flex items-center gap-1 text-xs text-slate-500 transition hover:text-emerald-400"
              >
                Back to top
                <ArrowUpRight size={14} />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/919555836691"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-900/30 transition hover:scale-110 hover:bg-emerald-600"
      >
        <MessageCircle size={27} />
      </a>
    </main>
  );
}
