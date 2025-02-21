import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, X, Send, Loader2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  links?: Array<{ text: string; url: string }>;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Hello! I'm Sensei, your dedicated AI learning assistant for blockchain and DeFi education. I can help you understand cryptocurrency concepts, guide you through course materials, and provide relevant resources from Sulla's learning platform. What would you like to learn about today?",
  timestamp: new Date(),
  links: [
    { text: "Explore AI Module", url: "/ai/module1" },
    { text: "View Course Curriculum", url: "/curriculum" }
  ]
};

export function CourseAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setError(null);

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          context: {
            currentPath: window.location.pathname,
            previousMessages: messages.slice(-3), 
            userProgress: {}, 
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to get response: ${response.statusText}`);
      }

      const data = await response.json();

      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.response.message,
        timestamp: new Date(),
        links: data.response.links
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setError("I apologize, but I'm having trouble accessing my knowledge base at the moment. Please try again in a few moments, or explore our structured course content in the meantime.");
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm currently experiencing some technical difficulties. While I work on resolving this, you can explore our course modules or check out the curriculum overview. Would you like me to point you to some specific resources?",
        timestamp: new Date(),
        links: [
          { text: "Browse Course Modules", url: "/curriculum" },
          { text: "View Learning Resources", url: "/library" }
        ]
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <Card className="w-[350px] h-[500px] flex flex-col">
              <div className="p-4 border-b flex justify-between items-center bg-primary text-primary-foreground rounded-t-lg">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <h3 className="font-semibold">Sensei - Learning Assistant</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 hover:bg-primary/50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea 
                ref={scrollRef} 
                className="flex-1 p-4"
              >
                <div className="space-y-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`space-y-2 max-w-[80%] rounded-lg p-3 ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground ml-4"
                            : "bg-muted"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                        {msg.links && msg.links.length > 0 && (
                          <div className="space-y-1 mt-2 pt-2 border-t border-primary/10">
                            {msg.links.map((link, linkIdx) => (
                              <Link 
                                key={linkIdx} 
                                href={link.url}
                                className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                <ExternalLink className="w-3 h-3" />
                                {link.text}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-3">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="text-sm text-red-500 text-center p-2 bg-red-50 rounded-lg">
                      {error}
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about blockchain, crypto, or DeFi..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
            size="icon"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}