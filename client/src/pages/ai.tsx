import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Brain, ChartBar, Lock, BookOpen, Lightbulb } from "lucide-react";

export default function AIOverview() {
  const features = [
    {
      icon: Brain,
      title: "Adaptive Learning Paths",
      description: "Our AI analyzes your learning patterns, quiz performance, and engagement to create personalized learning paths that adapt in real-time to your progress and understanding."
    },
    {
      icon: ChartBar,
      title: "Performance Analytics",
      description: "Advanced analytics track your progress across modules, identifying strengths and areas for improvement to optimize your learning journey."
    },
    {
      icon: Sparkles,
      title: "Smart Content Generation",
      description: "AI-powered systems generate tailored examples, practice questions, and explanations based on your specific learning style and needs."
    },
    {
      icon: BookOpen,
      title: "Intelligent Course Recommendations",
      description: "Our recommendation engine suggests relevant modules and resources based on your interests, goals, and learning history."
    },
    {
      icon: Lock,
      title: "Privacy-First Data Collection",
      description: "We securely collect learning patterns and interactions to improve our platform while maintaining strict user privacy and data protection standards."
    },
    {
      icon: Lightbulb,
      title: "Continuous Platform Evolution",
      description: "Machine learning algorithms analyze platform-wide data to enhance course content, identify learning trends, and improve the overall educational experience."
    }
  ];

  const upcomingFeatures = [
    {
      title: "AI Course Assistant",
      description: "An intelligent assistant trained specifically on our course content, providing instant, contextually relevant support and explanations to enhance your learning experience."
    },
    {
      title: "Dynamic Learning Path Optimization",
      description: "Real-time adjustments to your learning journey based on performance metrics, engagement patterns, and learning speed to ensure optimal knowledge retention."
    },
    {
      title: "Smart Content Recommendations",
      description: "Advanced AI algorithms that analyze your learning style and progress to suggest the most relevant content, exercises, and resources for your specific needs."
    },
    {
      title: "Adaptive Difficulty System",
      description: "Intelligent adjustment of content difficulty based on your performance and comfort level, ensuring you're always challenged but never overwhelmed."
    },
    {
      title: "Natural Language Query System",
      description: "Advanced NLP capabilities allowing you to ask questions in plain language and receive accurate, context-aware responses about blockchain and cryptocurrency concepts."
    },
    {
      title: "Learning Outcome Prediction",
      description: "Predictive analytics that forecast your learning trajectory and potential outcomes, helping you stay on track to achieve your educational goals."
    },
    {
      title: "AI Assessment Generation",
      description: "Dynamically generated assessments that adapt to your knowledge level and learning progress, ensuring comprehensive understanding of key concepts."
    },
    {
      title: "Adaptive Content Generation",
      description: "AI-powered system that creates personalized learning materials, examples, and exercises tailored to your unique learning style and preferences."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-6">
            AI-Powered Learning Experience
          </h1>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <p className="text-lg text-gray-700">
                At Sulla, we harness the power of artificial intelligence to create a dynamic, 
                personalized learning environment that adapts to each user's unique needs. Our 
                AI systems work continuously behind the scenes to optimize your educational 
                journey and help you master blockchain and cryptocurrency concepts effectively.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-blue-100">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Data Collection & Platform Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="mb-4">
                  Our AI systems collect and analyze various types of data to continuously improve 
                  the learning experience:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Learning patterns and progression rates through course materials</li>
                  <li>Quiz performance and common misconception patterns</li>
                  <li>Engagement levels with different types of content</li>
                  <li>Interactive simulation usage patterns</li>
                  <li>Time spent on different learning activities</li>
                </ul>
                <p className="mt-4">
                  This data helps us:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Refine course content and presentation</li>
                  <li>Identify and address common learning challenges</li>
                  <li>Develop new features and learning tools</li>
                  <li>Optimize the difficulty progression of content</li>
                  <li>Create more effective learning paths for future users</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Features In Development</span>
                <Sparkles className="w-5 h-5 text-blue-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingFeatures.map((feature, index) => (
                  <Card key={index} className="transition-all hover:shadow-md border border-blue-100">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}