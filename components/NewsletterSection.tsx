"use client";

import EmailForm from "./forms/EmailForm";

export default function NewsletterSection() {
  async function handleSubscribe(email: string) {
    // Replace with API call later
    console.log("newsletter: ", email);
  }

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
          {/* Left: Text */}
          <div className="flex-1">
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
              That’s why we invite you to.
            </p>
          </div>

          {/* Right: Form */}
          <div className="flex-1 w-full lg:max-w-2xl">
            <EmailForm onSubmit={handleSubscribe} />
          </div>
        </div>
      </div>
    </section>
  );
}


