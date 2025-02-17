import { useState } from "react";
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
import { Input } from "@/components/ui/input";

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
        {
          question: "What makes Sulla different from other learning platforms?",
          answer: "Sulla stands out through:\n• Integration of AI and blockchain education\n• Hands-on practical learning with real-world applications\n• Personalized AI-driven learning paths\n• Interactive simulations and tools\n• Community-driven learning environment\n• Regular content updates reflecting industry trends",
        },
        {
          question: "Can I learn at my own pace?",
          answer: "Yes! Sulla is designed for flexible learning:\n• Self-paced modules\n• 24/7 access to all content\n• No deadlines or time restrictions\n• Save progress and resume anytime\n• Customizable learning schedules\n• Mobile-friendly platform for learning on-the-go",
        }
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
          answer: "While basic programming knowledge is helpful, our AI courses are designed for various skill levels:\n• Beginner tracks include Python programming basics\n• Interactive coding environments with real-time guidance\n• Step-by-step tutorials and examples\n• Practical projects with increasing complexity\n• Comprehensive documentation and resources\n\nIf you have questions about your readiness, feel free to ask Sensei, our AI assistant, who can assess your current level and recommend the best starting point.",
        },
        {
          question: "How practical are the AI courses?",
          answer: "Our AI courses are highly practical and industry-focused:\n• Real-world project implementations\n• Industry-standard tools and frameworks\n• Hands-on experience with popular AI libraries\n• Portfolio-building opportunities\n• Collaboration with AI-powered tools\n• Regular updates reflecting latest AI trends",
        },
        {
          question: "What tools and technologies are covered in the AI curriculum?",
          answer: "Our AI courses cover a wide range of tools:\n• Python and its AI/ML libraries\n• TensorFlow and PyTorch\n• Natural Language Processing tools\n• Computer Vision frameworks\n• Cloud AI services\n• MLOps tools and practices\n• Deployment platforms and strategies",
        },
        {
          question: "How do you keep AI course content up-to-date?",
          answer: "We maintain current content through:\n• Regular reviews by industry experts\n• Integration of new AI developments\n• Updates based on industry trends\n• Feedback from AI practitioners\n• Partnership with tech companies\n• Community contributions",
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
          answer: "Our trading simulators provide risk-free practice environments where you can:\n• Execute virtual trades with real-time market data\n• Analyze market trends and patterns\n• Test different trading strategies\n• Track portfolio performance\n• Learn from trading history\n• Understand market mechanics\n\nStart with virtual currency and learn without financial risk. For personalized trading strategies and advice, consult with Sensei through the chat interface.",
        },
        {
          question: "What blockchain networks do you cover?",
          answer: "We provide comprehensive coverage of:\n• Bitcoin and its ecosystem\n• Ethereum and smart contracts\n• Popular altcoin networks\n• Layer 2 solutions\n• Cross-chain technologies\n• Emerging blockchain platforms",
        },
        {
          question: "How do you teach DeFi concepts?",
          answer: "Our DeFi education includes:\n• Interactive DeFi simulations\n• Real protocol examples\n• Yield farming strategies\n• Liquidity provision mechanics\n• Risk management in DeFi\n• Smart contract security",
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
          answer: "Sensei, our AI-powered learning assistant, provides:\n• Personalized learning paths based on your progress and goals\n• Real-time assistance and explanations\n• Adaptive content difficulty\n• Custom practice problems\n• Performance analytics and improvement suggestions\n• Integration with both AI and crypto courses\n\nSensei is available 24/7 through the chat interface to answer questions, provide guidance, and help you overcome any learning challenges.",
        },
        {
          question: "How does the platform track my progress?",
          answer: "Sulla provides comprehensive progress tracking through:\n• Achievement badges and milestones\n• Detailed performance analytics\n• Progress visualization\n• Skill assessment scores\n• Learning path completion status\n• Practice exercise results\n\nYou can access your progress dashboard anytime to review your learning journey.",
        },
        {
          question: "Can I get certifications for completed courses?",
          answer: "Yes, we offer certificates:\n• Course completion certificates\n• Skill-specific certifications\n• Project completion badges\n• Industry-recognized credentials\n• Shareable achievements\n• Blockchain-verified certificates",
        },
        {
          question: "How do you assess learning outcomes?",
          answer: "We use multiple assessment methods:\n• Interactive quizzes\n• Practical project evaluations\n• Peer reviews\n• AI-powered skill assessments\n• Portfolio development\n• Continuous feedback loops",
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
          answer: "Your primary support resource is Sensei, our AI-powered learning assistant, available 24/7 through the chat interface. Sensei provides:\n• Instant answers to course-related questions\n• Real-time problem-solving assistance\n• Personalized learning guidance\n• Technical support for exercises\n• Resource recommendations\n• Progress tracking and feedback\n\nFor matters requiring human assistance, our support team is also available through the platform.",
        },
        {
          question: "How can I get help if I'm stuck?",
          answer: "Your first stop should be Sensei, our AI assistant, who can help with:\n• Course content clarification\n• Exercise guidance and hints\n• Code debugging and explanations\n• Learning path recommendations\n• Resource suggestions\n• Practice problem solutions\n\nSimply open the chat interface and ask Sensei your questions for immediate assistance.",
        },
        {
          question: "Are there networking opportunities?",
          answer: "Yes, we offer various networking options:\n• Student communities\n• Industry meetups\n• Expert Q&A sessions\n• Project collaboration spaces\n• Career networking events\n• Alumni network access",
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
        },
        {
          question: "How do you protect user privacy?",
          answer: "We maintain privacy through:\n• Strict data protection policies\n• Limited data collection\n• User control over sharing\n• Regular privacy audits\n• Secure data storage\n• Transparent privacy policies",
        },
        {
          question: "What about financial transaction security?",
          answer: "We ensure secure transactions via:\n• Industry-standard encryption\n• Secure payment gateways\n• Regular security updates\n• PCI DSS compliance\n• Transaction monitoring\n• Fraud prevention systems",
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

  // Filter FAQs based on search query
  const getFilteredFAQs = (category) => {
    if (!searchQuery) return category.faqs;

    return category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
              learning methodology, and available features. 
            </p>
            <p className="text-lg text-gray-700">
              Don't see what you're looking for? Ask Sensei, our AI learning assistant! Sensei is available 24/7 
              through the chat interface and can provide personalized help with course content, technical questions, 
              and learning guidance. Simply click the chat icon to get started.
            </p>
          </Card>

          {/* Search Input */}
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
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
                  {getFilteredFAQs(category).map((faq, index) => (
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