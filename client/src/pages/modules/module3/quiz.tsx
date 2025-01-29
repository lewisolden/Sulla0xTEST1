import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";

const Module3Quiz = () => {
  const { progress } = useProgress();
  const moduleProgress = progress.filter(p => p.moduleId === 3);
  const isAllTopicsCompleted = moduleProgress.length === 3 && moduleProgress.every(p => p.completed);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Module 3 Quiz
        </h1>

        <Card>
          <CardContent className="pt-6">
            {!isAllTopicsCompleted ? (
              <div className="text-center py-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Complete All Topics First
                </h2>
                <p className="text-gray-600 mb-6">
                  Please complete all topics in Module 3 before taking the quiz.
                </p>
                <Link href="/modules/module3">
                  <Button>Return to Module 3</Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Quiz Coming Soon
                </h2>
                <p className="text-gray-600 mb-6">
                  The quiz for Module 3 is being prepared. Check back soon!
                </p>
                <Link href="/modules/module3">
                  <Button>Return to Module 3</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Module3Quiz;
