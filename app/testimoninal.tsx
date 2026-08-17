"use client";

import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Founder, Tech Startup",
    review:
      "Encode.dev delivered an excellent website for our business. The design was modern, fast, and exactly what we needed.",
  },
  {
    name: "Aman Verma",
    role: "Business Owner",
    review:
      "The team at Encode.dev understood our requirements perfectly and delivered a clean and professional website.",
  },
  {
    name: "Priya Singh",
    role: "Entrepreneur",
    review:
      "Working with Encode.dev was a great experience. They transformed our idea into a beautiful digital experience.",
  },
  {
    name: "Arjun Mehta",
    role: "Startup Founder",
    review:
      "Very professional team with great attention to detail. Our new website looks modern and performs extremely well.",
  },
  {
    name: "Neha Gupta",
    role: "Marketing Manager",
    review:
      "The UI/UX design exceeded our expectations. Encode.dev created a simple, elegant, and user-friendly experience.",
  },
  {
    name: "Rohit Kumar",
    role: "Business Consultant",
    review:
      "Excellent communication and timely delivery. The team made the entire development process smooth and easy.",
  },
  {
    name: "Sneha Verma",
    role: "Founder, Online Business",
    review:
      "Encode.dev helped us build a strong online presence with a professional website that represents our brand perfectly.",
  },
  {
    name: "Vikash Singh",
    role: "CEO, Digital Business",
    review:
      "From design to development, everything was handled professionally. I would definitely recommend Encode.dev.",
  },
  {
    name: "Anjali Sharma",
    role: "Entrepreneur",
    review:
      "The website is fast, responsive, and visually impressive. The team was very helpful throughout the project.",
  },
  {
    name: "Karan Malhotra",
    role: "Founder, Small Business",
    review:
      "Great service and excellent technical knowledge. Encode.dev turned our concept into a polished digital product.",
  },
];

export default function Testimonials() {
  // Duplicate list for seamless infinite scrolling
  const reviews = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">
            Testimonials
          </span>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            What our clients say
          </h2>

          <p className="mt-4 text-slate-500">
            Trusted by businesses and entrepreneurs for reliable digital
            solutions.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="testimonial-wrapper mt-12 overflow-hidden">
          <div className="testimonial-track flex w-max gap-6">

            {reviews.map((testimonial, index) => (
              <article
                key={`${testimonial.name}-${index}`}
                className="
                  relative
                  w-[320px]
                  shrink-0
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-emerald-200
                  hover:shadow-xl
                  hover:shadow-emerald-900/5
                  md:w-[380px]
                "
              >
                {/* Quote */}
                <Quote
                  size={32}
                  className="absolute right-6 top-6 text-emerald-100"
                />

                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={17}
                      className="fill-emerald-500 text-emerald-500"
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="mt-5 min-h-[120px] text-sm leading-7 text-slate-600">
                  “{testimonial.review}”
                </p>

                {/* Client */}
                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 font-bold text-emerald-600">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {testimonial.name}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}