import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const slides = [
  {
    id: 1,
    title: "Sulla - Technology Overview",
    content: (
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-blue-800">
          Advanced Blockchain & AI Educational Platform
        </h2>
        <ul className="list-disc pl-5 space-y-3 text-xl">
          <li>Next.js + TypeScript Architecture</li>
          <li>AI-Powered Adaptive Learning</li>
          <li>Blockchain Integration</li>
          <li>Comprehensive Progress Tracking</li>
          <li>Interactive Content Delivery</li>
        </ul>
      </div>
    )
  },
  {
    id: 2,
    title: "Technical Architecture",
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-blue-700">Core Components</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-bold mb-2">Frontend</h4>
            <ul className="list-disc pl-4">
              <li>Next.js with TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
              <li>Shadcn UI Components</li>
            </ul>
          </Card>
          <Card className="p-4">
            <h4 className="font-bold mb-2">Backend</h4>
            <ul className="list-disc pl-4">
              <li>PostgreSQL Database</li>
              <li>Express.js API</li>
              <li>Drizzle ORM</li>
              <li>WebSocket Support</li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Data Storage & Management",
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-blue-700">Secure & Scalable Data Layer</h3>
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-4">
            <h4 className="font-bold mb-2">Database Schema</h4>
            <ul className="list-disc pl-4">
              <li>User Profiles & Authentication</li>
              <li>Learning Progress Tracking</li>
              <li>Course Content Management</li>
              <li>Assessment Results</li>
              <li>AI Interaction History</li>
            </ul>
          </Card>
          <Card className="p-4">
            <h4 className="font-bold mb-2">Data Security</h4>
            <ul className="list-disc pl-4">
              <li>Encrypted User Data</li>
              <li>Regular Backups</li>
              <li>Access Control</li>
              <li>GDPR Compliance</li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "AI Integration",
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-blue-700">AI-Powered Learning</h3>
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-4">
            <h4 className="font-bold mb-2">AI Capabilities</h4>
            <ul className="list-disc pl-4">
              <li>Content Personalization</li>
              <li>Learning Path Optimization</li>
              <li>Progress Analysis</li>
              <li>Adaptive Difficulty Scaling</li>
            </ul>
          </Card>
          <Card className="p-4">
            <h4 className="font-bold mb-2">Implementation</h4>
            <ul className="list-disc pl-4">
              <li>OpenAI Integration</li>
              <li>Custom ML Models</li>
              <li>Real-time Processing</li>
              <li>Continuous Learning</li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Adaptive Learning System",
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-blue-700">Personalized Learning Experience</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-bold mb-2">Learning Patterns</h4>
            <ul className="list-disc pl-4">
              <li>Performance Analysis</li>
              <li>Learning Style Detection</li>
              <li>Pace Optimization</li>
              <li>Interest Mapping</li>
            </ul>
          </Card>
          <Card className="p-4">
            <h4 className="font-bold mb-2">Content Adaptation</h4>
            <ul className="list-disc pl-4">
              <li>Dynamic Difficulty</li>
              <li>Custom Learning Paths</li>
              <li>Resource Recommendations</li>
              <li>Progress-based Content</li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "User Progress Tracking",
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-blue-700">Comprehensive Analytics</h3>
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-4">
            <h4 className="font-bold mb-2">Metrics Tracked</h4>
            <ul className="list-disc pl-4">
              <li>Course Completion Rates</li>
              <li>Assessment Scores</li>
              <li>Time Spent Learning</li>
              <li>Interaction Patterns</li>
              <li>Learning Milestones</li>
            </ul>
          </Card>
          <Card className="p-4">
            <h4 className="font-bold mb-2">Progress Visualization</h4>
            <ul className="list-disc pl-4">
              <li>Interactive Dashboards</li>
              <li>Progress Maps</li>
              <li>Achievement Badges</li>
              <li>Performance Trends</li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 7,
    title: "LMS Implementation",
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-blue-700">Learning Management System</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-bold mb-2">Core Features</h4>
            <ul className="list-disc pl-4">
              <li>Course Management</li>
              <li>Content Organization</li>
              <li>User Administration</li>
              <li>Progress Tracking</li>
            </ul>
          </Card>
          <Card className="p-4">
            <h4 className="font-bold mb-2">Technology Stack</h4>
            <ul className="list-disc pl-4">
              <li>React Components</li>
              <li>State Management</li>
              <li>API Integration</li>
              <li>Real-time Updates</li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 8,
    title: "Quiz & Assessment Engine",
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-blue-700">Interactive Assessments</h3>
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-4">
            <h4 className="font-bold mb-2">Quiz Features</h4>
            <ul className="list-disc pl-4">
              <li>Multiple Question Types</li>
              <li>Adaptive Difficulty</li>
              <li>Instant Feedback</li>
              <li>Progress Tracking</li>
              <li>Performance Analytics</li>
            </ul>
          </Card>
          <Card className="p-4">
            <h4 className="font-bold mb-2">Technical Implementation</h4>
            <ul className="list-disc pl-4">
              <li>React Components</li>
              <li>State Management</li>
              <li>Score Calculation</li>
              <li>Data Persistence</li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 9,
    title: "Course Creation System",
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-blue-700">Content Management</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-bold mb-2">Content Types</h4>
            <ul className="list-disc pl-4">
              <li>Text & Media</li>
              <li>Interactive Elements</li>
              <li>Assessments</li>
              <li>Practice Exercises</li>
            </ul>
          </Card>
          <Card className="p-4">
            <h4 className="font-bold mb-2">Creation Tools</h4>
            <ul className="list-disc pl-4">
              <li>Rich Text Editor</li>
              <li>Media Upload</li>
              <li>Quiz Builder</li>
              <li>Course Structuring</li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 10,
    title: "Future Capabilities",
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-blue-700">Roadmap & Vision</h3>
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-4">
            <h4 className="font-bold mb-2">Upcoming Features</h4>
            <ul className="list-disc pl-4">
              <li>Advanced AI Tutoring</li>
              <li>VR/AR Integration</li>
              <li>Blockchain Certificates</li>
              <li>Peer Learning Networks</li>
              <li>Real-time Collaboration</li>
            </ul>
          </Card>
          <Card className="p-4">
            <h4 className="font-bold mb-2">Technology Evolution</h4>
            <ul className="list-disc pl-4">
              <li>Enhanced AI Models</li>
              <li>Improved Analytics</li>
              <li>Mobile Applications</li>
              <li>API Ecosystem</li>
            </ul>
          </Card>
        </div>
      </div>
    )
  }
];

const TechnologyDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl p-8 min-h-[600px] relative">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 rounded-t-xl">
            <motion.div 
              className="h-full bg-blue-600 rounded-t-xl"
              initial={{ width: 0 }}
              animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.5, 
                type: "spring",
                stiffness: 100 
              }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="text-sm text-gray-500">
                  Slide {currentSlide + 1} of {slides.length}
                </div>
                <motion.div 
                  className="text-xs text-blue-600 font-medium px-3 py-1 bg-blue-50 rounded-full"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Technical Overview
                </motion.div>
              </div>

              <motion.h2 
                className="text-3xl font-bold text-gray-900 mb-8"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {slides[currentSlide].title}
              </motion.h2>

              {slides[currentSlide].content}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons with hover effects */}
          <div className="absolute bottom-8 right-8 flex space-x-4">
            <Button
              variant="outline"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="group transition-all duration-200 hover:bg-blue-50"
            >
              <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Previous
            </Button>
            <Button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="group transition-all duration-200"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: currentSlide === index ? 1 : 0.8 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyDeck;