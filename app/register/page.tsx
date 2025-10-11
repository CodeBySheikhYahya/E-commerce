import NewsletterSection from "../../components/NewsletterSection";
import SignupForm from "../../components/SignupForm";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <>
        {/* Register Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[60vh]">
            {/* Left Column - Signup Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0 px-4 lg:px-0">
              <SignupForm />
            </div>
            
            {/* Right Column - Lifestyle Image */}
            <div className="hidden lg:block">
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="/helmet.jpg"
                  alt="Industrial Safety Equipment"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        <NewsletterSection />
    </>
  );
}
