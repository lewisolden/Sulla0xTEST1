import React, { useState } from 'react';
import { Brain, Globe2, Shield, Building2, FileText, Heart } from 'lucide-react';
import { CourseTemplate, CourseSection, ConceptCard } from '@/components/templates/CourseTemplate';
import { QuizTemplate } from '@/components/templates/QuizTemplate';
import { FinancialInclusionDiagram } from '@/components/diagrams/FinancialInclusionDiagram';
import { ApplicationShowcase } from '@/components/diagrams/ApplicationShowcase';
import { motion } from "framer-motion";
import {
  Globe2 as Globe2Icon,
  Building2 as Building2Icon,
  FileText as FileTextIcon,
  Heart as HeartIcon
} from "lucide-react";

type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

const PracticalApplicationsSection = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "Which blockchain application has the potential to revolutionize healthcare data management?",
      options: [
        "Digital asset trading platforms",
        "Secure, interoperable medical records",
        "Cryptocurrency mining operations",
        "Social media networks"
      ],
      correct: 1,
      explanation: "Blockchain technology enables secure, interoperable medical records management, allowing healthcare providers to share patient data securely while maintaining privacy and ensuring data integrity."
    },
    {
      id: 2,
      question: "How does blockchain technology support environmental sustainability efforts?",
      options: [
        "By increasing energy consumption",
        "By replacing traditional currencies",
        "By tracking carbon credits and environmental compliance",
        "By eliminating the need for environmental monitoring"
      ],
      correct: 2,
      explanation: "Blockchain supports environmental sustainability by providing transparent tracking of carbon credits, ensuring environmental compliance, and enabling efficient management of conservation funding and waste management initiatives."
    },
    {
      id: 3,
      question: "What is a key benefit of using blockchain in supply chain management?",
      options: [
        "Increased shipping costs",
        "Real-time tracking and verification of products",
        "Elimination of all intermediaries",
        "Slower delivery times"
      ],
      correct: 1,
      explanation: "Blockchain technology in supply chain management enables real-time tracking and verification of products from origin to consumer, helping prevent counterfeiting, ensure compliance, and optimize inventory management."
    },
    {
      id: 4,
      question: "How does blockchain technology enhance humanitarian aid distribution?",
      options: [
        "By requiring aid recipients to have bank accounts",
        "By increasing administrative costs",
        "By restricting access to specific regions",
        "By enabling transparent, direct beneficiary payments"
      ],
      correct: 3,
      explanation: "Blockchain improves humanitarian aid distribution through transparent, direct beneficiary payments, efficient aid fund tracking, reduced fraud, and faster emergency response capabilities."
    },
    {
      id: 5,
      question: "Which feature of blockchain technology enables community empowerment?",
      options: [
        "Centralized control",
        "Decentralized governance and voting",
        "Restricted access to resources",
        "Limited participation options"
      ],
      correct: 1,
      explanation: "Blockchain enables community empowerment through decentralized governance and voting systems, allowing communities to make collective decisions, share resources, and build local economies in a transparent and equitable way."
    }
  ];

  if (showQuiz) {
    return (
      <QuizTemplate
        moduleId="module1"
        sectionId="practical-applications"
        questions={questions}
        backLink="/modules/module1"
        backLabel="Back to Module 1"
        nextLink="/modules/module1/getting-started"
        nextLabel="Next: Getting Started"
        totalSections={4}
        currentSection={3}
      />
    );
  }

  return (
    <CourseTemplate
      title="Practical Applications of Blockchain"
      subtitle="Explore real-world implementations and use cases"
      icon={<Brain className="h-12 w-12 text-blue-600" />}
      backLink="/modules/module1"
      backLabel="Back to Module 1"
      nextLink="/modules/module1/getting-started"
      nextLabel="Next: Getting Started"
      showQuiz
      onStartQuiz={() => setShowQuiz(true)}
    >
      <CourseSection
        icon={<Globe2Icon className="h-6 w-6" />}
        title="Overview"
        description="Understanding the broad impact of blockchain technology"
        delay={0.2}
      >
        <p className="text-gray-700 mb-4">
          Blockchain technology is revolutionizing various sectors beyond just cryptocurrencies.
          From financial services to supply chain management, its applications are creating new
          possibilities for business and society.
        </p>
        <ApplicationShowcase />
      </CourseSection>

      <CourseSection
        icon={<Building2Icon className="h-6 w-6" />}
        title="Financial Applications"
        description="Transforming financial services and inclusion"
        delay={0.4}
      >
        <p className="text-gray-700 mb-4">
          Financial inclusion is one of the most significant impacts of blockchain technology,
          providing access to financial services for the unbanked and underbanked populations worldwide.
        </p>
        <FinancialInclusionDiagram />
      </CourseSection>

      <CourseSection
        icon={<FileTextIcon className="h-6 w-6" />}
        title="Technical Applications"
        description="Implementation across various industries"
        delay={0.6}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <ConceptCard
            title="Supply Chain Management"
            description="Track products from origin to consumer with immutable records"
            icon="📦"
            delay={0.7}
          />
          <ConceptCard
            title="Healthcare Records"
            description="Secure and interoperable medical data management"
            icon="🏥"
            delay={0.8}
          />
          <ConceptCard
            title="Digital Identity"
            description="Decentralized identity verification and management"
            icon="🔐"
            delay={0.9}
          />
        </div>
      </CourseSection>

      <CourseSection
        icon={<HeartIcon className="h-6 w-6" />}
        title="Social Impact"
        description="Creating positive change through blockchain"
        delay={0.8}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <ConceptCard
            title="Humanitarian Aid"
            description="Transparent and efficient distribution of aid"
            icon="🤝"
            delay={1.0}
          />
          <ConceptCard
            title="Environmental Protection"
            description="Supporting sustainability and conservation efforts"
            icon="🌍"
            delay={1.1}
          />
          <ConceptCard
            title="Community Empowerment"
            description="Enabling local governance and cooperation"
            icon="🤝"
            delay={1.2}
          />
        </div>
      </CourseSection>
    </CourseTemplate>
  );
};

export default PracticalApplicationsSection;