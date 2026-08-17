"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-5 py-20">
      <div className="relative mx-auto w-full max-w-3xl text-center">

        {/* Background decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-200/30 blur-3xl"
        />

        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <h1 className="text-[120px] font-black leading-none tracking-tight text-emerald-500 sm:text-[160px]">
            404
          </h1>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Search size={26} />
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Page not found
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
            Sorry, the page you are looking for doesn't exist or may have
            been moved to another location.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/25"
            >
              <Home size={18} />

              Back to Home

              <ArrowLeft
                size={16}
                className="rotate-180 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:text-emerald-600 hover:shadow-md"
            >
              <ArrowLeft size={17} />
              Go Back
            </button>

          </div>
        </motion.div>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mt-12 text-sm text-slate-400"
        >
          <span className="font-bold text-slate-700">
            Encode<span className="text-emerald-500">.dev</span>
          </span>

          <span className="mx-2">•</span>

          Digital solutions that move businesses forward.
        </motion.div>

      </div>
    </main>
  );
}