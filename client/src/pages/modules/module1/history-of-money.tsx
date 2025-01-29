import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import HistoryOfMoneyQuiz from "@/components/modules/quizzes/HistoryOfMoneyQuiz";

export default function HistoryOfMoneySection() {
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const { updateProgress } = useProgress();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(1, 'history-of-money', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50">
        <div 
          className="h-full bg-blue-600" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/modules/module1/digital-currencies">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Digital Currencies
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          History of Money
        </h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <p>
            The history of money is a fascinating journey that spans thousands of years, 
            from the earliest forms of barter to modern digital currencies. This evolution 
            reflects humanity's constant search for more efficient ways to store value 
            and conduct transactions.
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Early Forms of Money</h2>

          <ul className="list-disc pl-5 space-y-3">
            <li>Barter system and its limitations</li>
            <li>Commodity money (shells, salt, metals)</li>
            <li>First coined money (Lydian staters)</li>
            <li>Development of precious metal currencies</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Evolution of Currency</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Paper Money</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Chinese invention of paper currency</li>
            <li>European banknotes development</li>
            <li>Gold standard era</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Modern Banking</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Rise of fractional reserve banking</li>
            <li>Central banking systems</li>
            <li>Fiat currency adoption</li>
          </ul>
        </div>

        {isFullyRead && (
          <div className="mt-8 space-y-6">
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 You've completed the History of Money section! You now understand how 
                currency has evolved from physical to digital forms throughout history.
              </p>
            </Card>

            <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
              <Link href="/modules/module1/digital-currencies">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full md:w-auto"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous Topic
                </Button>
              </Link>

              <Link href="/modules/module1/bitcoin">
                <Button 
                  size="lg"
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                >
                  Next Topic: Bitcoin <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {showQuiz && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Topic Quiz</h2>
                <HistoryOfMoneyQuiz />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}