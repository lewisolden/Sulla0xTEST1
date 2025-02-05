import React from 'react';
import { BookOpen, Brain, Trophy, Zap, Globe, Shield, Users, Terminal, Rocket, ChartLine } from 'lucide-react';

const AboutFeature = ({ icon: Icon, title, description }) => (
  <div className="flex items-start space-x-4 mb-6">
    <div className="bg-blue-100 p-2 rounded-lg">
      <Icon className="w-6 h-6 text-blue-700" />
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-blue-700">About Sulla</h1>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700 mb-6">
            Sulla is revolutionizing blockchain and cryptocurrency education through an 
            innovative, AI-powered learning platform. We're building the future of 
            educational technology, where personalized learning paths meet cutting-edge 
            interactive experiences.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">What Sets Us Apart</h2>

          <AboutFeature
            icon={Brain}
            title="AI-Powered Adaptive Learning"
            description="Our platform uses advanced AI algorithms to personalize your learning journey, 
            adjusting content difficulty and pace based on your progress and learning style."
          />

          <AboutFeature
            icon={Terminal}
            title="Interactive Learning Modules"
            description="Engage with hands-on simulations, practical exercises, and real-world scenarios 
            that bring blockchain concepts to life."
          />

          <AboutFeature
            icon={Trophy}
            title="Gamified Learning Experience"
            description="Earn badges, track progress, and compete with peers through our 
            achievement-based learning system that makes education engaging and rewarding."
          />

          <AboutFeature
            icon={Globe}
            title="Comprehensive Curriculum"
            description="From blockchain basics to advanced cryptocurrency trading strategies, our 
            curriculum covers everything you need to become proficient in the digital asset space."
          />

          <AboutFeature
            icon={Shield}
            title="Verified Knowledge"
            description="Each module is carefully crafted and verified by industry experts, 
            ensuring you receive accurate, up-to-date information about the rapidly evolving 
            blockchain ecosystem."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Built for the Future</h2>

          <AboutFeature
            icon={Rocket}
            title="Future-Ready Education"
            description="Our platform evolves with the blockchain industry, continuously updating 
            content to reflect the latest developments and emerging technologies."
          />

          <AboutFeature
            icon={Users}
            title="Community-Driven Learning"
            description="Join a vibrant community of learners, share insights, and collaborate 
            on projects while building your network in the blockchain space."
          />

          <AboutFeature
            icon={ChartLine}
            title="Progress Tracking"
            description="Monitor your learning journey with detailed analytics, performance metrics, 
            and personalized recommendations for improvement."
          />

          <AboutFeature
            icon={Zap}
            title="Cutting-Edge Technology"
            description="Experience learning through state-of-the-art web technologies, ensuring 
            a smooth, responsive, and engaging educational experience."
          />
        </section>

        <section className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-3xl font-semibold mb-4">Join the Revolution</h2>
          <p className="text-lg text-gray-700">
            Whether you're a complete beginner or an experienced professional, Sulla 
            provides the tools, knowledge, and community you need to master blockchain 
            technology and cryptocurrency. Start your journey today and be part of the 
            future of finance and technology.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;