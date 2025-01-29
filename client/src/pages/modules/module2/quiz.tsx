import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import Quiz from "@/components/modules/quiz";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Module2Quiz() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/modules/module2">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Module 2: Knowledge Check
        </h1>

        <div className="mb-8">
          <Progress value={0} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">Progress: 0%</p>
        </div>

        <Quiz moduleId={2} />

        <div className="mt-8 flex flex-col md:flex-row items-center gap-4 justify-between">
          <Link href="/modules/module2">
            <Button 
              variant="outline"
              size="lg"
              className="w-full md:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module 2
            </Button>
          </Link>

          <Link href="/modules/module3">
            <Button 
              size="lg"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
            >
              Continue to Module 3 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
