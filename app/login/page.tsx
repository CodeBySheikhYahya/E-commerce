import NewsletterSection from "../../components/NewsletterSection";
// import LoginForm from "../../components/LoginForm";
// import Image from "next/image";

export default function LoginPage() {
  return (
    <>
        {/* Coming Soon Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Coming Soon</h1>
              <p className="text-xl text-gray-600 mb-8">Account features are under development</p>
              <div className="bg-gray-100 rounded-lg p-8 max-w-md mx-auto">
                <p className="text-gray-700">We're working hard to bring you the best account experience. Stay tuned!</p>
              </div>
            </div>
          </div>
        </div>
        <NewsletterSection />
    </>
  );
}

/* 
COMMENTED OUT - LOGIN FORM CODE (Uncomment when client wants login page back)

import LoginForm from "../../components/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
        Login Content
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[60vh]">
            Left Column - Login Form
            <div className="w-full max-w-md mx-auto lg:mx-0 px-4 lg:px-0">
              <LoginForm />
            </div>
            
            Right Column - Lifestyle Image
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
*/
