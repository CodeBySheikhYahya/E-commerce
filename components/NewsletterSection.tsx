"use client";

import EmailForm from "./forms/EmailForm";
import { motion } from "framer-motion";
import { subscribeNewsletter } from "../lib/newsletterApi";
import { useToastStore } from "../lib/toastStore";
import { useState } from "react";

export default function NewsletterSection() {
  const showToast = useToastStore((state) => state.show);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubscribe(email: string) {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const newsletterData = {
        email: email,
        fullName: "", // Optional - can be empty or extracted from email
        isSubscribed: true,
        subscribedDate: new Date().toISOString(),
      };

      const response = await subscribeNewsletter(newsletterData);

      if (response.success && response.statusCode === 200) {
        showToast(response.message || "Successfully subscribed to newsletter!", "success");
      } else {
        showToast(response.message || "Failed to subscribe. Please try again.", "error");
      }
    } catch (error: any) {
      console.error("Newsletter subscription error:", error);
      showToast(
        error.message || "An error occurred. Please try again later.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
          {/* Left: Text */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2
              className=""
              style={{
                fontFamily: "Satoshi, 'Satoshi Fallback', ui-sans-serif, system-ui, sans-serif",
                fontStyle: "normal",
                fontWeight: 650,
                color: "rgb(26, 26, 25)",
                fontSize: "46px",
                lineHeight: "55px",
              }}
            >
              Subscribe to
              <br className="lg:hidden" />
              our newsletter
              <br />
              and Grab 30% OFF
            </h2>
            <p className="mt-4 text-gray-600 max-w-xl text-sm lg:text-base">
              We believe in keeping you at the forefront of innovation information, and inspiration.
              That's why we invite you to.
            </p>
          </motion.div>

          {/* Right: Form */}
          <motion.div 
            className="flex-1 w-full lg:max-w-2xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <EmailForm onSubmit={handleSubscribe} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}


