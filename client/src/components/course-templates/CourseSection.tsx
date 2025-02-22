import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { ReactNode } from "react";

interface CourseSectionProps {
  title: string;
  subtitle?: string;
  backLink: string;
  backText: string;
  currentSection: number;
  totalSections: number;
  children: ReactNode;
  nextLink?: string;
  nextText?: string;
}

export const CourseSection: React.FC<CourseSectionProps> = ({
  title,
  subtitle,
  backLink,
  backText,
  currentSection,
  totalSections,
  children,
  nextLink,
  nextText
}) => {
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
              <ArrowLeft className="h-4 w-4" /> {backText}
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardTitle className="text-3xl font-bold">
                {title}
              </CardTitle>
              {subtitle && (
                <p className="text-blue-100 mt-2">
                  {subtitle}
                </p>
              )}
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Section Progress</p>
                  <p className="text-sm font-medium text-blue-600">
                    {Math.round((currentSection / totalSections) * 100)}%
                  </p>
                </div>
                <Progress
                  value={(currentSection / totalSections) * 100}
                  className="bg-blue-100"
                />
              </div>
            </CardContent>
          </Card>

          {children}

          {nextLink && nextText && (
            <div className="mt-8 flex justify-end">
              <Link href={nextLink}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  {nextText} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CourseSection;
