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
        </div>
      </div>
    </div>
  );
}
