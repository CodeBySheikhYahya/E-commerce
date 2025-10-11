"use client";

import NewsletterSection from "../../components/NewsletterSection";
import Image from "next/image";
import { motion } from "framer-motion";
import ContactHero from "../../components/ContactHero";
import { useState } from "react";
import { ChevronDown, ChevronUp, Shield, Users, Award, Heart, Lock } from "lucide-react";

export default function AboutUs() {
  const [expandedAdvantage, setExpandedAdvantage] = useState<string | null>(null);

  const advantages = [
    {
      id: "quality",
      title: "Quality Assurance",
      content: "We prioritize quality above all else, ensuring that every product meets our stringent standards.",
      icon: Award
    },
    {
      id: "variety",
      title: "Variety",
      content: "With a wide array of products, we cater to diverse tastes and preferences.",
      icon: Users
    },
    {
      id: "customer",
      title: "Customer-Centric Approach",
      content: "At Buywithus, you are not just a customer; you are a part of our community. We prioritize your needs and preferences, ensuring a personalized shopping experience that caters to you.",
      icon: Heart
    },
    {
      id: "security",
      title: "Security",
      content: "Your online safety is our priority. Shop with confidence, knowing that your transactions are secure.",
      icon: Lock
    },
    {
      id: "community",
      title: "Community Engagement",
      content: "Buywithus believes in giving back to the community. Through various initiatives and partnerships, we actively contribute to charitable causes and support local communities. When you shop with us, you're not just investing in quality products – you're also contributing to positive social impact.",
      icon: Shield
    }
  ];

  return (
   <>
        {/* Hero Section (reused with orbiting icons) */}
        <ContactHero variant="about" />

        {/* Our Story Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 lg:py-24 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="section-heading mb-6" 
                  style={{fontFamily: 'var(--header-font-family)'}}
                >
                  Our Story
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="space-y-4 text-gray-600 leading-relaxed"
                >
                  <p>
                    BuyWithUs is dedicated to delivering premium security vests, jackets, and tools that seamlessly blend functionality, durability, and reliability. Whether outfitting your team with protective gear for high-risk tasks or sourcing reliable tools for demanding jobs, we provide solutions designed to ensure safety and efficiency.
                  </p>
                  <p>
                    At BuyWithUsPk.co.uk, we take pride in offering top-tier industrial safety solutions, including robust security vests, tactical jackets, and essential tools. Built to meet the strictest safety standards, our gear guarantees maximum protection in even the toughest environments.
                  </p>
                  <p>
                    Safety is at the heart of what we do. Our security vests and jackets are crafted for unmatched comfort, visibility, and protection. Made with durable, breathable materials, they stand up to the most rigorous work conditions.
                  </p>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Image
                  src="/constructionworker.jpg"
                  alt="Construction Worker in Safety Gear"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Vision, Mission, Commitment Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 lg:py-24 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="section-heading mb-4" style={{fontFamily: 'var(--header-font-family)'}}>
                Our Foundation
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{fontFamily: 'var(--header-font-family)'}}>
                  Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  BuyWithUs envisions becoming your trusted destination for top-quality safety gear, with a particular focus on security vests designed to meet the needs of professionals across various industries. We strive to continuously expand our product range, offering the latest advancements in protective apparel.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{fontFamily: 'var(--header-font-family)'}}>
                  Mission
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our mission is to provide security vests that combine innovative designs with durable, high-performance materials, catering to the unique demands of security personnel, construction workers, and industrial teams. From high-visibility reflective vests to tactical vests equipped with practical features.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{fontFamily: 'var(--header-font-family)'}}>
                  Commitment
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  At BuyWithUs, we are committed to staying ahead of the curve by introducing cutting-edge safety solutions that prioritize your protection and productivity. Whether you're safeguarding worksites, patrolling events, or managing high-stakes operations, our security vests are designed to empower you with confidence, reliability, and style.
                </p>
              </motion.div>
            </div>
      </div>
        </motion.section>

        {/* BUYWITHUS Advantage Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 lg:py-24 bg-white"
        >
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="section-heading mb-4" style={{fontFamily: 'var(--header-font-family)'}}>
                BUYWITHUS Advantage
              </h2>
            </motion.div>

            <div className="space-y-4">
              {advantages.map((advantage, index) => {
                const Icon = advantage.icon;
                const isExpanded = expandedAdvantage === advantage.id;
                
                return (
                  <motion.div
                    key={advantage.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedAdvantage(isExpanded ? null : advantage.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <Icon className="h-6 w-6 text-gray-600" />
                        <span className="text-lg font-semibold text-gray-900" style={{fontFamily: 'var(--header-font-family)'}}>
                          {advantage.title}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                    
                    <motion.div
                      initial={false}
                      animate={{ height: isExpanded ? "auto" : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed">
                          {advantage.content}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Policies Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 lg:py-24 bg-gray-50"
        >
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="section-heading mb-4" style={{fontFamily: 'var(--header-font-family)'}}>
                Our Policies
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{fontFamily: 'var(--header-font-family)'}}>
                  Refund Policy
                </h3>
                <p className="text-gray-600 mb-4">
                  We offer an exchange policy under the following conditions:
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• The product was damaged during shipping.</li>
                  <li>• The size of the item does not fit properly.</li>
                </ul>
                <p className="text-gray-600 mt-4 font-medium">
                  Please note: Direct returns are not accepted.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{fontFamily: 'var(--header-font-family)'}}>
                  Shipment Policy
                </h3>
                <div className="text-gray-600 space-y-3">
                  <p>
                    Exchange is allowed within 7 days of purchase, provided the original packaging is intact.
                  </p>
                  <p>
                    We offer free delivery within 2–5 days, but for urgent next-day delivery, additional charges of approximately £8 may apply.
                  </p>
                  <p>
                    We can also cater to any type of customization, with a delivery time of 3–4 weeks. Please note that some items will only be available on pre-order.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* FAQs Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 lg:py-24 bg-white"
        >
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="section-heading mb-4" style={{fontFamily: 'var(--header-font-family)'}}>
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{fontFamily: 'var(--header-font-family)'}}>
                  DO I NEED TO SET UP AN ACCOUNT TO PLACE AN ORDER?
                </h3>
                <p className="text-gray-600 mb-3">
                  You can shop at BUYWITHUS without creating an account. However, register with us and you'll be able to enjoy the following benefits:
                </p>
                <ul className="text-gray-600 space-y-1">
                  <li>• Track your orders and review past purchases</li>
                  <li>• Preview our new collections and register your interest for your favourite pieces through our seasonal Look book.</li>
                  <li>• Save your address and card details so you can shop even quicker next time.</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{fontFamily: 'var(--header-font-family)'}}>
                  IS MY PERSONAL INFORMATION KEPT PRIVATE?
                </h3>
                <p className="text-gray-600">
                  Please be assured that your personal information is kept private and confidential, and at no point will we share it with a third party. For more information, please read our privacy policy.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

      <NewsletterSection />
   </>
  );
}


