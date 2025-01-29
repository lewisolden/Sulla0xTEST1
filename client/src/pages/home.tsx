import { Link } from "wouter";
import { BookOpen, GraduationCap, Zap } from "lucide-react";
import ModuleCard from "@/components/modules/module-card";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-blue-900 mb-6">
          Master Cryptocurrency & Blockchain Technology
        </h1>
        <p className="text-xl text-blue-700 mb-8 max-w-2xl mx-auto">
          Sulla is your comprehensive learning platform designed to demystify the complex world of digital currencies and blockchain innovation.
        </p>

        <div className="flex justify-center space-x-4">
          <Link href="/modules/module1">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold">
              Start Learning
            </button>
          </Link>
          <Link href="#curriculum">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition duration-300 font-semibold">
              View Curriculum
            </button>
          </Link>
        </div>
      </div>

      {/* Modules Section */}
      <section className="bg-white py-16" id="curriculum">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
            Your Journey into the Future of Finance
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <ModuleCard
              icon={BookOpen}
              title="Module 1: Fundamentals of Cryptocurrency"
              description="Dive into the world of digital currencies, exploring their history, technology, and potential."
              link="/modules/module1"
            />
            <ModuleCard
              icon={GraduationCap}
              title="Module 2: What is a Blockchain?"
              description="Understand the core technology behind cryptocurrencies and its revolutionary potential."
              link="/modules/module2"
            />
            <ModuleCard
              icon={Zap}
              title="Module 3: Blockchain Technology"
              description="Explore advanced blockchain concepts, platforms, and real-world applications."
              link="/modules/module3"
            />
          </div>
        </div>
      </section>

      {/* Interactive Learning Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Cutting-Edge Interactive Learning
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Experience personalized, AI-driven learning that adapts to your unique learning style and pace.
          </p>
          <Link href="/modules/module1">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition duration-300 font-semibold">
              Start Your Journey
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}