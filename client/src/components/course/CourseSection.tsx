import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { useProgress } from "@/context/progress-context";
import { useToast } from "@/hooks/use-toast";
import { useScrollTop } from "@/hooks/useScrollTop";

export interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

interface CourseSectionProps {
  moduleId: number;
  sectionId: string;
  title: string;
  description: string;
  backLink: string;
  backLinkText: string;
  nextLink?: string;
  nextLinkText?: string;
  sections: Section[];
  quiz?: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const CourseSection: React.FC<CourseSectionProps> = ({
  moduleId,
  sectionId,
  title,
  description,
  backLink,
  backLinkText,
  nextLink,
  nextLinkText,
  sections,
  quiz,
  gradientFrom = "blue-500",
  gradientTo = "purple-500"
}) => {
  useScrollTop();
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const { updateProgress } = useProgress();
  const { toast } = useToast();

  const handleSectionComplete = (index: number) => {
    updateProgress({
      moduleId,
      sectionId,
      subsectionId: `subsection-${index + 1}`,
      progress: ((index + 1) / sections.length) * 100,
      status: 'completed',
      timestamp: new Date().toISOString(),
      type: 'section',
      courseId: 1,
      data: {
        sectionIndex: index,
        totalSections: sections.length
      }
    });

    toast({
      title: "Progress Updated",
      description: "Section completed successfully!",
    });

    if (index < sections.length - 1) {
      setCurrentSection(index + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href={backLink}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> {backLinkText}
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader className={`bg-gradient-to-r from-${gradientFrom} to-${gradientTo} text-white`}>
              <CardTitle className="text-3xl font-bold">
                {title}
              </CardTitle>
              <p className="text-blue-100 mt-2">
                {description}
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Section Progress</p>
                  <p className="text-sm font-medium text-blue-600">
                    {Math.round((currentSection / sections.length) * 100)}%
                  </p>
                </div>
                <Progress
                  value={(currentSection / sections.length) * 100}
                  className="bg-blue-100"
                />
              </div>
            </CardContent>
          </Card>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${
                  index === currentSection ? 'border-2 border-blue-500' : ''
                } rounded-lg overflow-hidden`}
              >
                <Card>
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center gap-3">
                      <section.icon className="h-6 w-6 text-blue-500" />
                      <CardTitle className="text-xl font-semibold text-blue-800">
                        {section.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {section.content}
                    <div className="mt-6 flex justify-end">
                      <Button
                        onClick={() => handleSectionComplete(index)}
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={index !== currentSection}
                      >
                        {index === sections.length - 1 ? "Complete Topic" : "Next Section"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {quiz && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <Card className="overflow-hidden border-2 border-blue-200 hover:border-blue-300 transition-all">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-purple-500" />
                    <CardTitle className="text-xl font-semibold text-purple-800">
                      Topic Quiz
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {!showQuiz ? (
                    <div className="text-center">
                      <Button
                        onClick={() => setShowQuiz(true)}
                        className="bg-purple-600 hover:bg-purple-700"
                        size="lg"
                      >
                        Start Quiz
                      </Button>
                    </div>
                  ) : (
                    quiz
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {nextLink && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 flex justify-end"
            >
              <Link href={nextLink}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  {nextLinkText} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Helper components
export const KeyConcept: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mt-6 bg-blue-50 p-4 rounded-lg">
    <h4 className="text-blue-800 font-semibold mb-2 flex items-center gap-2">
      <BookOpen className="h-5 w-5" />
      {title}
    </h4>
    <div className="text-blue-700">
      {children}
    </div>
  </div>
);

export const FeatureList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-2">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start gap-2">
        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
        <span className="text-gray-600">{item}</span>
      </li>
    ))}
  </ul>
);
