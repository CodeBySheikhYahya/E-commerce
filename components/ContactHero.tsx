"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, MapPin, Clock, Headset, Users, Award, Shield, Heart } from "lucide-react";

type ContactHeroVariant = "contact" | "about";

export default function ContactHero({ variant = "contact" }: { variant?: ContactHeroVariant }) {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, #f6f7f9 0%, #eceff3 28%, #dee2e8 55%, #e9ecf1 75%, #f6f7f9 100%),
          repeating-linear-gradient(135deg, rgba(255,255,255,0.45) 0px, rgba(255,255,255,0.45) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 6px)
        `
      }}
    >
      {/* Decorative layered diagonal background overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.25)),
            linear-gradient(135deg, #f3f4f6 0%, #e7eaee 40%, #d8dce2 70%, #e7eaee 100%)`,
          maskImage: `
            linear-gradient(135deg,
              rgba(0,0,0,0) 0%, rgba(0,0,0,0) 7%, rgba(0,0,0,0.12) 7%, rgba(0,0,0,0.12) 18%,
              rgba(0,0,0,0) 18%, rgba(0,0,0,0) 28%, rgba(0,0,0,0.12) 28%, rgba(0,0,0,0.12) 40%,
              rgba(0,0,0,0) 40%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.12) 52%, rgba(0,0,0,0.12) 66%,
              rgba(0,0,0,0) 66%, rgba(0,0,0,0) 78%, rgba(0,0,0,0.12) 78%, rgba(0,0,0,0.12) 92%,
              rgba(0,0,0,0) 92%, rgba(0,0,0,0) 100%
            )`,
          WebkitMaskImage: `
            linear-gradient(135deg,
              rgba(0,0,0,0) 0%, rgba(0,0,0,0) 7%, rgba(0,0,0,0.12) 7%, rgba(0,0,0,0.12) 18%,
              rgba(0,0,0,0) 18%, rgba(0,0,0,0) 28%, rgba(0,0,0,0.12) 28%, rgba(0,0,0,0.12) 40%,
              rgba(0,0,0,0) 40%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.12) 52%, rgba(0,0,0,0.12) 66%,
              rgba(0,0,0,0) 66%, rgba(0,0,0,0) 78%, rgba(0,0,0,0.12) 78%, rgba(0,0,0,0.12) 92%,
              rgba(0,0,0,0) 92%, rgba(0,0,0,0) 100%
            )`,
          boxShadow: 'inset 0 40px 80px rgba(0,0,0,0.03)'
        }}
      />

      {/* Sparkle highlights */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(12px 2px at 62% 46%, rgba(255,255,255,0.95), rgba(255,255,255,0) 70%),
            radial-gradient(10px 2px at 32% 72%, rgba(255,255,255,0.95), rgba(255,255,255,0) 70%),
            linear-gradient(135deg, rgba(255,255,255,0) 48%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 52%),
            linear-gradient(135deg, rgba(255,255,255,0) 68%, rgba(255,255,255,0.85) 70%, rgba(255,255,255,0) 72%)
          `
        }}
      />

      {/* Halftone dot fade (top-left) */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.7) 1px, rgba(255,255,255,0) 1px)`,
          backgroundSize: '8px 8px',
          backgroundPosition: '0 0',
          maskImage: 'linear-gradient(135deg, black 0%, black 30%, transparent 55%)',
          WebkitMaskImage: 'linear-gradient(135deg, black 0%, black 30%, transparent 55%)'
        }}
      />
      {/* Edge fade overlay to blend with white page background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0) 20%),
            linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0) 20%),
            linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0) 25%),
            linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0) 25%)
          `
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex min-h-[60vh] lg:min-h-[70vh] flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-between text-center lg:text-left gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
            className="max-w-2xl"
          >
            <h1 className="section-heading">
              {variant === "about" ? "About Us" : "Contact Us"}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              {variant === "about"
                ? "Learn about our mission, vision, and what makes us different."
                : "We are here to help. Reach out via phone, email, or chat and our team will get back to you as soon as possible."}
            </p>
          </motion.div>

          {/* Orbiting icons */}
          <div className="relative mt-10 lg:mt-0 h-64 w-64 lg:h-80 lg:w-80">
            {/* Rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-gray-300/70 shadow-2xl shadow-gray-400/40 bg-white/20 backdrop-blur-sm"
              style={{ boxShadow: '0 12px 32px rgba(0,0,0,0.10), 0 4px 10px rgba(0,0,0,0.06), inset 0 0 80px rgba(255,255,255,0.35)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            >
              {/* Icons positioned around the circle */}
              {variant === "about" ? (
                <>
                  <motion.div
                    className="absolute left-1/2 top-0 -translate-x-1/2"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                      <Award className="h-6 w-6 text-indigo-600" />
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                      <Users className="h-6 w-6 text-purple-600" />
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute left-1/2 bottom-0 -translate-x-1/2"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                      <Heart className="h-6 w-6 text-emerald-600" />
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                      <Shield className="h-6 w-6 text-rose-600" />
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute left-[12%] top-[20%]"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                      <Award className="h-5 w-5 text-amber-600" />
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute right-[12%] bottom-[20%]"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                      <Users className="h-5 w-5 text-sky-600" />
                    </span>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    className="absolute left-1/2 top-0 -translate-x-1/2"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                      <Phone className="h-6 w-6 text-indigo-600" />
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute left-1/2 bottom-0 -translate-x-1/2"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                      <MessageCircle className="h-6 w-6 text-emerald-600" />
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                      <MapPin className="h-6 w-6 text-rose-600" />
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute left-[12%] top-[20%]"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute right-[12%] bottom-[20%]"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                      <Headset className="h-5 w-5 text-sky-600" />
                    </span>
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Center node */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-white shadow-lg ring-1 ring-gray-100/70 flex items-center justify-center"
                  style={{ boxShadow: '0 10px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)' }}>
                  <span className="text-sm font-medium text-gray-700">{variant === "about" ? "Our Story" : "Support"}</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
