import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, BookOpen, Coins, Shield, GraduationCap, MessageCircle } from "lucide-react";

const FAQs = () => {
  const faqCategories = [
    {
      id: "general",
      label: "General",
      icon: <BookOpen className="h-5 w-5" />,
      faqs: [
        {
          question: "What is Sulla?",
          answer: "Sulla is an advanced AI-powered educational platform focused on blockchain, cryptocurrency, financial technologies, and artificial intelligence. We provide immersive, technology-driven learning experiences that combine theoretical knowledge with practical applications to help you master the complex world of digital finance and AI.",
        },
        {
          question: "How does Sulla's learning approach work?",
          answer: "Sulla uses a multi-faceted learning approach that includes:\n• Interactive modules with practical exercises\n• AI-powered adaptive learning system (Sensei)\n• Real-time trading simulators\n• Hands-on blockchain experiments\n• AI project implementations\n• Gamified learning experiences\n• Progress tracking and achievements\n\nOur platform adapts to your learning pace and style, ensuring an optimized educational experience.",
        },
      ]
    },
    {
      id: "ai-courses",
      label: "AI Courses",
      icon: <Brain className="h-5 w-5" />,
      faqs: [
        {
          question: "What AI courses does Sulla offer?",
          answer: "Our AI curriculum includes:\n• Introduction to Artificial Intelligence\n• Machine Learning Fundamentals\n• Neural Networks and Deep Learning\n• Natural Language Processing\n• Computer Vision\n• Robotics and Automation\n• AI Ethics and Governance\n• Generative AI and Future Trends\n\nEach course combines theory with hands-on projects and real-world applications.",
        },
        {
          question: "Do I need prior programming experience for AI courses?",
          answer: "While basic programming knowledge is helpful, our AI courses are designed for various skill levels:\n• Beginner tracks include Python programming basics\n• Interactive coding environments with real-time guidance\n• Step-by-step tutorials and examples\n• Practical projects with increasing complexity\n• Comprehensive documentation and resources\n\nWe ensure everyone can learn AI regardless of their starting point.",
        },
        {
          question: "How practical are the AI courses?",
          answer: "Our AI courses are highly practical and industry-focused:\n• Real-world project implementations\n• Industry-standard tools and frameworks\n• Hands-on experience with popular AI libraries\n• Portfolio-building opportunities\n• Collaboration with AI-powered tools\n• Regular updates reflecting latest AI trends",
        }
      ]
    },
    {
      id: "crypto",
      label: "Cryptocurrency",
      icon: <Coins className="h-5 w-5" />,
      faqs: [
        {
          question: "What topics does Sulla cover in cryptocurrency?",
          answer: "Our curriculum covers:\n• Blockchain technology fundamentals\n• Cryptocurrency trading and investment\n• Digital financial technologies\n• Smart contracts and DeFi\n• Cryptographic principles\n• Market analysis and trading strategies\n• Regulatory and security considerations\n\nAll content is regularly updated to reflect the latest developments in the field.",
        },
        {
          question: "How do the trading simulators work?",
          answer: "Our trading simulators provide risk-free practice environments where you can:\n• Execute virtual trades with real-time market data\n• Analyze market trends and patterns\n• Test different trading strategies\n• Track portfolio performance\n• Learn from trading history\n• Understand market mechanics\n\nStart with virtual currency and learn without financial risk.",
        }
      ]
    },
    {
      id: "learning",
      label: "Learning Experience",
      icon: <GraduationCap className="h-5 w-5" />,
      faqs: [
        {
          question: "What makes Sulla's AI integration (Sensei) unique?",
          answer: "Sensei, our AI-powered learning assistant, provides:\n• Personalized learning paths based on your progress and goals\n• Real-time assistance and explanations\n• Adaptive content difficulty\n• Custom practice problems\n• Performance analytics and improvement suggestions\n• Integration with both AI and crypto courses\n\nIt's like having a personal tutor available 24/7.",
        },
        {
          question: "How does the platform track my progress?",
          answer: "Sulla provides comprehensive progress tracking through:\n• Achievement badges and milestones\n• Detailed performance analytics\n• Progress visualization\n• Skill assessment scores\n• Learning path completion status\n• Practice exercise results\n\nYou can access your progress dashboard anytime to review your learning journey.",
        }
      ]
    },
    {
      id: "support",
      label: "Support",
      icon: <MessageCircle className="h-5 w-5" />,
      faqs: [
        {
          question: "What kind of support do you offer?",
          answer: "We provide comprehensive support through:\n• 24/7 AI-powered chat assistance\n• Community forums and discussion boards\n• Expert-led study groups\n• Regular webinars and workshops\n• Technical support team\n• Resource library and documentation\n\nOur goal is to ensure you never feel stuck in your learning journey.",
        }
      ]
    },
    {
      id: "security",
      label: "Security",
      icon: <Shield className="h-5 w-5" />,
      faqs: [
        {
          question: "Is my learning data secure?",
          answer: "Yes, Sulla takes data security seriously:\n• End-to-end encryption for all data\n• Secure user authentication\n• Regular security audits\n• GDPR compliance\n• Transparent data usage policies\n• Regular backups\n\nYour learning data and personal information are protected with industry-standard security measures.",
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-bold text-blue-800 mb-6">
            Frequently Asked Questions
          </h1>

          <Card className="p-6 mb-8 bg-gradient-to-br from-blue-50 to-white">
            <p className="text-lg text-gray-700 mb-4">
              Welcome to Sulla's FAQ section. Here you'll find comprehensive information about our platform, 
              learning methodology, and available features. If you can't find the answer you're looking for, 
              feel free to contact our support team.
            </p>
          </Card>
        </motion.div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="flex flex-wrap justify-start gap-2 mb-6">
            {faqCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2 px-4 py-2"
              >
                {category.icon}
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {faqCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {category.faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      custom={index}
                    >
                      <AccordionItem
                        value={`item-${index}`}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <AccordionTrigger className="px-4 py-2 text-lg font-semibold text-blue-800 hover:text-blue-600">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-2 text-gray-700 whitespace-pre-line">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  );
};

export default FAQs;