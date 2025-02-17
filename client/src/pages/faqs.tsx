import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  const faqs = [
    {
      question: "What is Sulla?",
      answer: "Sulla is an advanced AI-powered educational platform focused on blockchain, cryptocurrency, and financial technologies. We provide immersive, technology-driven learning experiences that combine theoretical knowledge with practical applications to help you master the complex world of digital finance.",
    },
    {
      question: "How does Sulla's learning approach work?",
      answer: "Sulla uses a multi-faceted learning approach that includes:\n• Interactive modules with practical exercises\n• AI-powered adaptive learning system (Sensei)\n• Real-time trading simulators\n• Hands-on blockchain experiments\n• Gamified learning experiences\n• Progress tracking and achievements\n\nOur platform adapts to your learning pace and style, ensuring an optimized educational experience.",
    },
    {
      question: "What makes Sulla's AI integration (Sensei) unique?",
      answer: "Sensei, our AI-powered learning assistant, provides:\n• Personalized learning paths based on your progress and goals\n• Real-time assistance and explanations\n• Adaptive content difficulty\n• Custom practice problems\n• Performance analytics and improvement suggestions\n\nIt's like having a personal tutor available 24/7.",
    },
    {
      question: "What topics does Sulla cover?",
      answer: "Our curriculum covers:\n• Blockchain technology fundamentals\n• Cryptocurrency trading and investment\n• Digital financial technologies\n• Smart contracts and DeFi\n• Cryptographic principles\n• Market analysis and trading strategies\n• Regulatory and security considerations\n\nAll content is regularly updated to reflect the latest developments in the field.",
    },
    {
      question: "How does the platform track my progress?",
      answer: "Sulla provides comprehensive progress tracking through:\n• Achievement badges and milestones\n• Detailed performance analytics\n• Progress visualization\n• Skill assessment scores\n• Learning path completion status\n• Practice exercise results\n\nYou can access your progress dashboard anytime to review your learning journey.",
    },
    {
      question: "What are the technical requirements to use Sulla?",
      answer: "Sulla is a web-based platform that requires:\n• Modern web browser (Chrome, Firefox, Safari, or Edge)\n• Stable internet connection\n• Device with minimum 4GB RAM\n• Screen resolution of 1280x720 or higher\n\nNo additional software installation is needed.",
    },
    {
      question: "How do the trading simulators work?",
      answer: "Our trading simulators provide risk-free practice environments where you can:\n• Execute virtual trades with real-time market data\n• Analyze market trends and patterns\n• Test different trading strategies\n• Track portfolio performance\n• Learn from trading history\n• Understand market mechanics\n\nStart with virtual currency and learn without financial risk.",
    },
    {
      question: "Is my learning data secure?",
      answer: "Yes, Sulla takes data security seriously:\n• End-to-end encryption for all data\n• Secure user authentication\n• Regular security audits\n• GDPR compliance\n• Transparent data usage policies\n• Regular backups\n\nYour learning data and personal information are protected with industry-standard security measures.",
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Frequently Asked Questions
        </h1>

        <Card className="p-6 mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Welcome to Sulla's FAQ section. Here you'll find comprehensive information about our platform, 
            learning methodology, and available features. If you can't find the answer you're looking for, 
            feel free to contact our support team.
          </p>
        </Card>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg">
              <AccordionTrigger className="px-4 py-2 text-lg font-semibold text-blue-800 hover:text-blue-600">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2 text-gray-700 whitespace-pre-line">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
};

export default FAQs;