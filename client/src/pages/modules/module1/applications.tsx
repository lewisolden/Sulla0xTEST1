import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import { Database, ShoppingCart, Building2, Vote, Hospital, Plane, ChevronRight } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const PracticalApplicationsSection = () => {
  useScrollTop();
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { updateProgress } = useProgress();
  const { toast } = useToast();
  const [isFullyRead, setIsFullyRead] = useState(false);

  const sections = [
    {
      id: "overview",
      title: "Understanding Blockchain Applications",
      icon: Database,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 text-lg">
            While blockchain technology gained prominence through cryptocurrencies, its potential applications extend far beyond digital currencies. This section explores how blockchain is transforming various industries and creating new possibilities for business and society.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[
              {
                icon: Database,
                title: "Supply Chain",
                description: "Track and verify products throughout their journey",
                color: "blue"
              },
              {
                icon: Building2,
                title: "Real Estate",
                description: "Tokenize and trade property assets",
                color: "green"
              },
              {
                icon: Vote,
                title: "Voting Systems",
                description: "Secure and transparent election processes",
                color: "purple"
              },
              {
                icon: Hospital,
                title: "Healthcare",
                description: "Manage and share medical records securely",
                color: "pink"
              },
              {
                icon: ShoppingCart,
                title: "Retail",
                description: "Verify product authenticity and ownership",
                color: "orange"
              },
              {
                icon: Plane,
                title: "Travel",
                description: "Streamline booking and loyalty programs",
                color: "cyan"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`bg-gradient-to-br from-${item.color}-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-${item.color}-100`}
              >
                <div className={`p-3 bg-${item.color}-100 rounded-full w-fit mb-4`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                </div>
                <h3 className={`text-lg font-semibold text-${item.color}-800 mb-2`}>
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "applications",
      title: "Real-World Applications",
      icon: ShoppingCart,
      content: (
        <ApplicationShowcase />
      )
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress({
          moduleId: 1,
          sectionId: 'practical-applications',
          status: 'completed',
          score: 100,
          timestamp: new Date().toISOString(),
          userId: 'current',
          metadata: {
            timeSpent: 0,
            attemptsCount: 1
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const handleSectionComplete = (index: number) => {
    updateProgress({
      moduleId: 1,
      sectionId: 'practical-applications',
      subsectionId: `subsection-${index + 1}`,
      progress: ((index + 1) / sections.length) * 100,
      status: 'completed',
      timestamp: new Date().toISOString(),
      type: 'section',
      courseId: 1,
      data: {
        sectionIndex: index,
        totalSections: sections.length
      }
    });

    toast({
      title: "Progress Updated",
      description: "Section completed successfully!",
    });

    if (index < sections.length - 1) {
      setCurrentSection(index + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/modules/module1">
            <Button variant="ghost" className="gap-2">
              <ChevronRight className="h-4 w-4" /> Back to Module 1
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardTitle className="text-3xl font-bold">
                Practical Applications in Blockchain
              </CardTitle>
              <p className="text-blue-100 mt-2">
                Discover how blockchain technology is transforming industries and creating new possibilities
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Section Progress</p>
                  <p className="text-sm font-medium text-blue-600">
                    {Math.round((currentSection / sections.length) * 100)}%
                  </p>
                </div>
                <Progress
                  value={(currentSection / sections.length) * 100}
                  className="bg-blue-100"
                />
              </div>
            </CardContent>
          </Card>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${
                  index === currentSection ? 'border-2 border-blue-500' : ''
                } rounded-lg overflow-hidden`}
              >
                <Card>
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center gap-3">
                      <section.icon className="h-6 w-6 text-blue-500" />
                      <CardTitle className="text-xl font-semibold text-blue-800">
                        {section.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {section.content}
                    <div className="mt-6 flex justify-end">
                      <Button
                        onClick={() => handleSectionComplete(index)}
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={index !== currentSection}
                      >
                        {index === sections.length - 1 ? "Complete Topic" : "Next Section"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <ModuleNavigation
            prev={{
              path: "/modules/module1/security",
              label: "Security Considerations"
            }}
            next={{
              path: "/modules/module1/getting-started",
              label: "Getting Started"
            }}
          />

          {isFullyRead && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <Card className="bg-green-100 border-l-4 border-green-500 p-4">
                <p className="text-green-700">
                  🎉 Congratulations! You've completed the Practical Applications section!
                </p>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const ApplicationShowcase = () => {
  const applications = [
    {
      icon: Banknote,
      title: "Digital Payments",
      description: "Fast, secure, and borderless transactions for everyday purchases",
      examples: ["Cross-border remittances", "Online shopping", "Bill payments"],
      color: "emerald"
    },
    {
      icon: Landmark,
      title: "Decentralized Finance",
      description: "Access to financial services without traditional banking infrastructure",
      examples: ["Lending platforms", "Yield farming", "Decentralized exchanges"],
      color: "violet"
    },
    {
      icon: FileText,
      title: "Smart Contracts",
      description: "Automated agreements and transactions without intermediaries",
      examples: ["Insurance policies", "Real estate deals", "Supply chain tracking"],
      color: "blue"
    },
    {
      icon: LineChart,
      title: "Investment Opportunities",
      description: "New ways to grow and manage wealth",
      examples: ["Token investments", "Crypto index funds", "NFT marketplaces"],
      color: "indigo"
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Learning and certification on the blockchain",
      examples: ["Digital credentials", "Online courses", "Skill verification"],
      color: "cyan"
    },
    {
      icon: Heart,
      title: "Social Impact",
      description: "Using blockchain for positive change",
      examples: ["Charity transparency", "Sustainable projects", "Community initiatives"],
      color: "rose"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {applications.map((app, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className={`bg-gradient-to-br from-${app.color}-50 to-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-${app.color}-100`}
        >
          <div className={`p-3 bg-${app.color}-100 rounded-full w-fit mb-4`}>
            <app.icon className={`w-6 h-6 text-${app.color}-600`} />
          </div>
          <h3 className={`text-xl font-bold text-${app.color}-800 mb-2`}>{app.title}</h3>
          <p className="text-gray-600 mb-4">{app.description}</p>
          <div className="space-y-2">
            {app.examples.map((example, i) => (
              <div key={i} className="flex items-center gap-2">
                <ChevronRight className={`w-4 h-4 text-${app.color}-400`} />
                <span className="text-sm text-gray-600">{example}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PracticalApplicationsSection;