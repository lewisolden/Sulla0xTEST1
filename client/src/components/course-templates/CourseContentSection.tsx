import { ReactNode } from 'react';
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CourseSectionProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
  children: ReactNode;
}

export const CourseContentSection = ({
  title,
  subtitle,
  icon,
  gradientFrom = "blue-50",
  gradientTo = "indigo-50",
  className,
  children
}: CourseSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("mb-8", className)}
    >
      <Card className={`bg-gradient-to-br from-${gradientFrom} to-${gradientTo} overflow-hidden`}>
        <CardHeader>
          <div className="flex items-center gap-3">
            {icon && <div className="text-blue-600">{icon}</div>}
            <div>
              <CardTitle className="text-2xl font-bold text-blue-800">{title}</CardTitle>
              {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
            </div>
          </div>
        </CardHeader>
        <CardContent className="prose prose-blue max-w-none">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const KeyConceptBox = ({
  title,
  children,
  className
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500", className)}>
      <h3 className="text-xl font-semibold text-blue-800 mb-3">{title}</h3>
      <div className="prose prose-blue max-w-none">
        {children}
      </div>
    </div>
  );
};

export const QuizContainer = ({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Card className={cn("overflow-hidden border-2 border-blue-200 hover:border-blue-300 transition-all max-w-2xl mx-auto", className)}>
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardTitle className="text-2xl font-bold">Knowledge Check</CardTitle>
        <p className="text-blue-100 mt-2">
          Test your understanding with this quick quiz
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
};
