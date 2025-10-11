import NewsletterSection from "../../components/NewsletterSection";
import LoginForm from "../../components/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
        {/* Login Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[60vh]">
            {/* Left Column - Login Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0 px-4 lg:px-0">
              <LoginForm />
            </div>
            
            {/* Right Column - Lifestyle Image */}
            <div className="hidden lg:block">
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="/constructionworker.jpg"
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
