import React, { useState } from 'react';
import { Brain, Lightbulb, Code } from 'lucide-react';
import { CourseTemplate, CourseSection, ConceptCard } from './CourseTemplate';
import { QuizTemplate } from './QuizTemplate';

const ExampleCoursePage = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  
  const questions = [
    {
      id: 1,
      question: "What is a stablecoin?",
      options: [
        "A cryptocurrency that fluctuates wildly",
        "A digital asset designed to maintain a stable value",
        "A type of NFT",
        "A blockchain platform"
      ],
      correct: 1,
      explanation: "Stablecoins are cryptocurrencies designed to maintain a stable value by pegging to another asset like USD."
    },
    // Add more questions...
  ];

  if (showQuiz) {
    return (
      <QuizTemplate
        moduleId="defi-module2"
        sectionId="stablecoins"
        questions={questions}
        backLink="/defi/module2"
        backLabel="Back to Module 2"
        nextLink="/defi/module2/lending"
        nextLabel="Next: DeFi Lending"
        totalSections={5}
        currentSection={2}
      />
    );
  }

  return (
    <CourseTemplate
      title="Understanding Stablecoins"
      subtitle="Learn about price-stable cryptocurrencies and their role in DeFi"
      icon={<Brain className="h-12 w-12 text-blue-600" />}
      backLink="/defi/module2"
      backLabel="Back to Module 2"
      nextLink="/defi/module2/lending"
      nextLabel="Next Topic"
      showQuiz
      onStartQuiz={() => setShowQuiz(true)}
    >
      <CourseSection
        icon={<Lightbulb className="h-6 w-6" />}
        title="What are Stablecoins?"
        description="Explore the fundamentals of price-stable cryptocurrencies"
        delay={0.2}
      >
        <p className="text-gray-700 mb-4">
          Stablecoins are cryptocurrencies designed to maintain a stable value...
        </p>
      </CourseSection>

      <CourseSection
        icon={<Code className="h-6 w-6" />}
        title="Types of Stablecoins"
        description="Understanding different stablecoin mechanisms"
        delay={0.4}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <ConceptCard
            title="Fiat-Backed"
            description="Stablecoins backed by traditional currencies"
            icon="💵"
            delay={0.6}
          />
          <ConceptCard
            title="Crypto-Backed"
            description="Stablecoins collateralized by other cryptocurrencies"
            icon="🔗"
            delay={0.8}
          />
        </div>
      </CourseSection>
    </CourseTemplate>
  );
};

export default ExampleCoursePage;
