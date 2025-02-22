import React, { ReactNode } from 'react';
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CourseSectionProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
  className?: string;
  children: ReactNode;
}

export const CourseSection = ({
  icon,
  title,
  description,
  delay = 0,
  className = "",
  children
}: CourseSectionProps) => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
    className={`mb-12 ${className}`}
  >
    <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
      {icon}
      {title}
    </h2>
    <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg">
      <p className="text-gray-700 leading-relaxed mb-4">
        {description}
      </p>
      {children}
    </div>
  </motion.section>
);

interface ConceptCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

export const ConceptCard = ({
  title,
  description,
  icon,
  delay = 0
}: ConceptCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white p-6 rounded-lg shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="font-semibold text-blue-800 text-xl mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

interface CourseTemplateProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  backLink: string;
  backLabel: string;
  nextLink?: string;
  nextLabel?: string;
  showQuiz?: boolean;
  onStartQuiz?: () => void;
  children: ReactNode;
}

export const CourseTemplate = ({
  title,
  subtitle,
  icon,
  backLink,
  backLabel,
  nextLink,
  nextLabel,
  showQuiz,
  onStartQuiz,
  children
}: CourseTemplateProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href={backLink}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> {backLabel}
            </Button>
          </Link>
        </div>

        <Card className="border-2 border-blue-100">
          <CardContent className="pt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-8 bg-blue-50 p-6 rounded-lg">
                {icon}
                <div>
                  <h1 className="text-3xl font-bold text-blue-800 mb-2">
                    {title}
                  </h1>
                  <p className="text-gray-600">
                    {subtitle}
                  </p>
                </div>
              </div>

              <div className="prose max-w-none">
                {children}
              </div>

              <div className="mt-12 flex justify-between items-center">
                {showQuiz && (
                  <Button
                    onClick={onStartQuiz}
                    className="gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    Take Topic Quiz
                  </Button>
                )}
                {nextLink && (
                  <Link href={nextLink}>
                    <Button className="gap-2">
                      {nextLabel} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
