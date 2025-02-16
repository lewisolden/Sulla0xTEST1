import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { insertUserSchema } from "@db/schema";
import type { InsertUser } from "@db/schema";
import { useLocation } from "wouter";
import { Loader2, Blocks, GraduationCap, Brain, Lightbulb, Shield, Lock, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useScrollTop } from "@/hooks/useScrollTop";
import { motion } from "framer-motion";

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function AuthPage() {
  useScrollTop();
  const [, setLocation] = useLocation();
  const [location] = useLocation();
  const isRegisterPage = location === "/register";
  const { loginMutation, registerMutation, user } = useAuth();
  const { toast } = useToast();

  // Immediately show a visible notification when the component mounts
  useState(() => {
    console.log("AuthPage mounted, showing initial toast");
    toast({
      title: isRegisterPage ? "Registration Page" : "Login Page",
      description: "Welcome to Sulla Learning Platform!",
    });
  });

  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  if (user) {
    setTimeout(() => setLocation("/account"), 0);
    return null;
  }

  const onSubmit = async (data: InsertUser) => {
    try {
      console.log("Form submitted, attempting to show toast");
      toast({
        title: "Processing",
        description: isRegisterPage ? "Creating your account..." : "Logging you in...",
      });

      if (isRegisterPage) {
        const response = await registerMutation.mutateAsync({
          username: data.username,
          email: data.email,
          password: data.password,
        });

        console.log("Registration completed, showing success toast");
        toast({
          title: "Registration Status",
          description: response.emailStatus?.note || "Welcome to Sulla! Email notifications are enabled.",
          variant: response.emailStatus?.sent ? "default" : "destructive",
          duration: 5000,
        });
      } else {
        const { username, password } = data;
        await loginMutation.mutateAsync({ username, password });
        console.log("Login completed, showing success toast");
        toast({
          title: "Login Successful",
          description: "Welcome back to Sulla!",
          duration: 5000,
        });
      }
      setLocation("/account");
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const isLoading = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400 via-blue-600 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-48 -left-48 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <motion.div 
        className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center relative z-10"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <Card className="p-8 shadow-2xl backdrop-blur-sm bg-white/90 border-0 relative overflow-hidden">
          {/* Decorative gradient line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600"></div>

          <motion.h1 
            className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            variants={iconVariants}
          >
            {isRegisterPage ? "Create Account" : "Welcome Back!"}
          </motion.h1>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                {isRegisterPage ? "Username" : "Username or Email"}
              </label>
              <Input
                {...form.register("username")}
                placeholder={isRegisterPage ? "Enter your username" : "Enter your username or email"}
                disabled={isLoading}
                className="border-blue-200 focus:border-blue-400 transition-colors duration-200"
              />
              {form.formState.errors.username && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.username.message}
                </p>
              )}
            </div>

            {isRegisterPage && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  Email
                </label>
                <Input
                  {...form.register("email")}
                  type="email"
                  placeholder="Enter your email"
                  disabled={isLoading}
                  className="border-blue-200 focus:border-blue-400 transition-colors duration-200"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-500" />
                Password
              </label>
              <Input
                {...form.register("password")}
                type="password"
                placeholder="Enter your password"
                disabled={isLoading}
                className="border-blue-200 focus:border-blue-400 transition-colors duration-200"
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 mt-6 relative overflow-hidden group"
              disabled={isLoading}
            >
              <span className="absolute inset-0 bg-white/10 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></span>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Please wait...</span>
                </div>
              ) : (
                isRegisterPage ? "Register" : "Login"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setLocation(isRegisterPage ? "/login" : "/register")}
              className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-2"
              type="button"
              disabled={isLoading}
            >
              <Shield className="w-4 h-4" />
              {isRegisterPage
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </button>
          </div>
        </Card>

        <motion.div 
          className="hidden md:block text-center space-y-8"
          variants={formVariants}
        >
          <motion.div 
            className="flex justify-center mb-6"
            variants={iconVariants}
          >
            <Blocks className="h-20 w-20 text-white animate-pulse" />
          </motion.div>

          <motion.h2 
            className="text-5xl font-bold text-white mb-6"
            variants={iconVariants}
          >
            Sulla
          </motion.h2>

          <motion.p 
            className="text-xl text-blue-100 leading-relaxed max-w-lg mx-auto"
            variants={iconVariants}
          >
            Discover blockchain technology, artificial intelligence, and emerging technologies through our interactive learning platform. From fundamentals to advanced concepts, we'll guide you through the future of technology and innovation.
          </motion.p>

          <motion.div 
            className="grid grid-cols-3 gap-6 mt-12"
            variants={iconVariants}
          >
            <div className="flex flex-col items-center space-y-2 group">
              <div className="p-3 bg-white/10 rounded-full transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm text-blue-100">Interactive Learning</span>
            </div>
            <div className="flex flex-col items-center space-y-2 group">
              <div className="p-3 bg-white/10 rounded-full transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm text-blue-100">Structured Curriculum</span>
            </div>
            <div className="flex flex-col items-center space-y-2 group">
              <div className="p-3 bg-white/10 rounded-full transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm text-blue-100">Practical Projects</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}