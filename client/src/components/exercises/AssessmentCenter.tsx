import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

export default function AssessmentCenter() {
  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-blue-800">Assessment Center</h2>
        <p className="text-gray-600">
          Test your knowledge and understanding of cryptocurrency concepts through interactive assessments.
        </p>
      </div>
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Brain className="h-8 w-8 text-blue-600" />
          <h3 className="text-xl font-semibold">Coming Soon</h3>
        </div>
        <p className="text-gray-600">
          Our interactive assessments are being prepared. Check back soon!
        </p>
      </Card>
    </div>
  );
}