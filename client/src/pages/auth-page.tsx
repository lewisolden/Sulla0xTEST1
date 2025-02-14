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
import { Loader2, Blocks, GraduationCap, Brain, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useScrollTop } from "@/hooks/useScrollTop";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        <Card className="p-8 shadow-xl backdrop-blur-sm bg-white/90">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
            {isRegisterPage ? "Create Account" : "Welcome Back!"}
          </h1>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input
                {...form.register("username")}
                placeholder="Enter your username"
                disabled={isLoading}
                className="border-blue-200 focus:border-blue-400"
              />
              {form.formState.errors.username && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.username.message}
                </p>
              )}
            </div>

            {isRegisterPage && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  {...form.register("email")}
                  type="email"
                  placeholder="Enter your email"
                  disabled={isLoading}
                  className="border-blue-200 focus:border-blue-400"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                {...form.register("password")}
                type="password"
                placeholder="Enter your password"
                disabled={isLoading}
                className="border-blue-200 focus:border-blue-400"
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
              disabled={isLoading}
            >
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
              className="text-blue-600 hover:text-blue-800 transition-colors"
              type="button"
              disabled={isLoading}
            >
              {isRegisterPage
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </button>
          </div>
        </Card>

        <div className="hidden md:block text-center space-y-8">
          <div className="flex justify-center mb-6">
            <Blocks className="h-20 w-20 text-blue-600 animate-pulse" />
          </div>
          <h2 className="text-5xl font-bold text-blue-900 mb-6">
            Sulla
          </h2>
          <p className="text-xl text-blue-700 leading-relaxed max-w-lg mx-auto">
            Discover blockchain technology, artificial intelligence, and emerging technologies through our interactive learning platform. From fundamentals to advanced concepts, we'll guide you through the future of technology and innovation.
          </p>

          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-blue-100 rounded-full">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm text-blue-700">Interactive Learning</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-blue-100 rounded-full">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm text-blue-700">Structured Curriculum</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-blue-100 rounded-full">
                <Lightbulb className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm text-blue-700">Practical Projects</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}