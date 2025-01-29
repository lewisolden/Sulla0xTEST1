import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Quiz from "@/components/modules/quiz";

export default function Module1Quiz() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Module 1: Knowledge Check
        </h1>

        <div className="mb-8">
          <Progress value={0} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">Progress: 0%</p>
        </div>

        <Quiz moduleId={1} />
      </div>
      <Footer />
    </div>
  );
}
