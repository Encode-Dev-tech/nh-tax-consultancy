"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Amit Agarwal",
    role: "Business Owner",
    review:
      "NH Tax Consultancy has been extremely helpful with our tax and compliance requirements. Their guidance is clear, professional, and reliable.",
  },
  {
    name: "Priya Mehta",
    role: "Entrepreneur",
    review:
      "The team made our tax filing process simple and stress-free. They explained everything clearly and handled our requirements professionally.",
  },
  {
    name: "Rahul Verma",
    role: "Startup Founder",
    review:
      "Excellent tax consultancy service. NH Tax Consultancy helped us with GST and business compliance while providing practical financial guidance.",
  },
  {
    name: "Neha Sharma",
    role: "Business Owner",
    review:
      "Very professional and responsive team. They helped us understand our tax obligations and made the entire process smooth and convenient.",
  },
  {
    name: "Vikash Kumar",
    role: "Self-Employed Professional",
    review:
      "I had a great experience with NH Tax Consultancy. Their ITR filing service was quick, accurate, and handled with complete professionalism.",
  },
  {
    name: "Anjali Gupta",
    role: "Entrepreneur",
    review:
      "The team provided excellent guidance on taxation and compliance. Their approach is transparent, knowledgeable, and customer-focused.",
  },
  {
    name: "Saurabh Singh",
    role: "Small Business Owner",
    review:
      "NH Tax Consultancy has been a reliable partner for our accounting and tax-related needs. Their support has made managing our finances much easier.",
  },
  {
    name: "Karan Malhotra",
    role: "Company Director",
    review:
      "Professional service with excellent communication. The team understands business requirements and provides practical solutions for tax and compliance matters.",
  },
  {
    name: "Sneha Verma",
    role: "Freelancer",
    review:
      "I was impressed by how patiently the team explained the entire tax filing process. Everything was handled smoothly and without unnecessary complications.",
  },
  {
    name: "Rohit Sharma",
    role: "Business Consultant",
    review:
      "A dependable consultancy for taxation and financial compliance. NH Tax Consultancy provides timely support and genuinely cares about its clients.",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = testimonials.length;

  const goTo = (index: number) => {
    setActiveIndex((index + total) % total);
  };

  const next = () => {
    goTo(activeIndex + 1);
  };

  const previous = () => {
    goTo(activeIndex - 1);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, total]);

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 md:py-28">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl" />

        <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-emerald-300/15 blur-3xl" />

        <div
          className="
            absolute
            left-1/2
            top-0
            h-px
            w-[70%]
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-emerald-200
            to-transparent
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(#0f172a_1px,transparent_1px),linear-gradient(90deg,#0f172a_1px,transparent_1px)]
            [background-size:50px_50px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Label */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 shadow-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 size={15} className="text-emerald-600" />
            </span>

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
              Client Testimonials
            </span>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Trusted by clients.
            <br />
            <span className="text-emerald-600">
              Recommended with confidence.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Hear from businesses, entrepreneurs and professionals who trust NH
            Tax Consultancy for their tax, compliance and financial
            requirements.
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div
          className="relative mx-auto mt-12 max-w-4xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Decorative Quote */}
          <div
            className="
      absolute
      -left-4
      -top-5
      z-10
      hidden
      h-14
      w-14
      items-center
      justify-center
      rounded-xl
      bg-emerald-600
      shadow-lg
      shadow-emerald-900/10
      lg:flex
    "
          >
            <Quote size={25} strokeWidth={2.5} className="text-white" />
          </div>

          {/* Card */}
          <div
            className="
      relative
      overflow-hidden
      rounded-[1.5rem]
      border
      border-slate-200
      bg-white
      shadow-[0_20px_50px_-25px_rgba(15,23,42,0.18)]
    "
          >
            {/* Accent */}
            <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600" />

            {/* Background Quote */}
            <Quote
              size={130}
              strokeWidth={1}
              className="
        pointer-events-none
        absolute
        -right-5
        -top-5
        rotate-6
        text-emerald-50
      "
            />

            <div className="relative px-6 py-7 sm:px-8 sm:py-8 md:px-10 md:py-9">
              {/* Rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      strokeWidth={1.8}
                      className="fill-emerald-500 text-emerald-500"
                    />
                  ))}

                  <span className="ml-1.5 text-xs font-semibold text-slate-500">
                    5.0
                  </span>
                </div>

                <span
                  className="
            hidden
            rounded-full
            bg-emerald-50
            px-3
            py-1
            text-[11px]
            font-semibold
            text-emerald-700
            sm:block
          "
                >
                  Verified Client
                </span>
              </div>

              {/* Slider */}
              <div className="mt-6 overflow-hidden">
                <motion.div
                  className="flex"
                  animate={{
                    x: `-${activeIndex * 100}%`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 0.8,
                  }}
                >
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.name} className="w-full shrink-0">
                      {/* Review */}
                      <p
                        className="
                  max-w-3xl
                  text-lg
                  font-medium
                  leading-8
                  text-slate-700
                  sm:text-xl
                  sm:leading-9
                "
                      >
                        “{testimonial.review}”
                      </p>

                      {/* Client */}
                      <div
                        className="
                  mt-7
                  flex
                  items-center
                  justify-between
                  gap-4
                  border-t
                  border-slate-100
                  pt-5
                "
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-gradient-to-br
                      from-emerald-500
                      to-emerald-700
                      text-base
                      font-black
                      text-white
                      shadow-md
                      shadow-emerald-900/10
                    "
                          >
                            {testimonial.name.charAt(0)}
                          </div>

                          <div>
                            <h3 className="text-sm font-bold text-slate-900">
                              {testimonial.name}
                            </h3>

                            <p className="mt-0.5 text-xs text-slate-500">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>

                        <div className="hidden text-right sm:block">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                            Client Review
                          </p>

                          <p className="mt-0.5 text-xs font-semibold text-emerald-600">
                            Trusted Experience
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Controls */}
              <div
                className="
          mt-6
          flex
          items-center
          justify-between
          border-t
          border-slate-100
          pt-5
        "
              >
                {/* Counter */}
                <div className="text-xs font-medium text-slate-400">
                  <span className="font-bold text-slate-900">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>

                  <span className="mx-1">/</span>

                  {String(total).padStart(2, "0")}
                </div>

                {/* Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={previous}
                    aria-label="Previous testimonial"
                    className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-slate-600
              transition-all
              duration-300
              hover:border-emerald-500
              hover:bg-emerald-600
              hover:text-white
            "
                  >
                    <ArrowLeft size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next testimonial"
                    className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-emerald-600
              text-white
              shadow-md
              shadow-emerald-900/10
              transition-all
              duration-300
              hover:bg-emerald-700
            "
                  >
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {testimonials.map((testimonial, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={testimonial.name}
                type="button"
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => goTo(index)}
                className={`
                  h-2 rounded-full
                  transition-all
                  duration-300
                  ease-out
                  ${
                    isActive
                      ? "w-8 bg-emerald-600 shadow-sm shadow-emerald-600/30"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }
                `}
              />
            );
          })}
        </div>

        {/* Bottom Trust Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-7 flex items-center justify-center gap-2 text-center text-xs text-slate-400"
        >
          <CheckCircle2 size={14} className="text-emerald-500" />
          Professional • Transparent • Client-focused
        </motion.div>
      </div>
    </section>
  );
}
