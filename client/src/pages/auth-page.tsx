import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { insertUserSchema } from "@db/schema";
import type { InsertUser } from "@db/schema";
import { useLocation } from "wouter";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const [location] = useLocation();
  const isRegisterPage = location === "/register";
  const { loginMutation, registerMutation, user } = useAuth();

  // Redirect if already logged in
  if (user) {
    setLocation("/");
    return null;
  }

  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: InsertUser) => {
    try {
      if (isRegisterPage) {
        await registerMutation.mutateAsync(data);
      } else {
        await loginMutation.mutateAsync(data);
      }
      setLocation("/");
    } catch (error) {
      // Error handling is done in the mutations
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
            {isRegisterPage ? "Create Account" : "Welcome Back!"}
          </h1>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input
                {...form.register("username")}
                placeholder="Enter your username"
              />
              {form.formState.errors.username && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                {...form.register("password")}
                type="password"
                placeholder="Enter your password"
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={loginMutation.isPending || registerMutation.isPending}
            >
              {isRegisterPage ? "Register" : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setLocation(isRegisterPage ? "/auth" : "/register")}
              className="text-blue-600 hover:text-blue-800"
            >
              {isRegisterPage
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </button>
          </div>
        </Card>

        <div className="hidden md:block text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Learning Platform
          </h2>
          <p className="text-lg text-blue-700">
            Explore and master complex subjects through innovative, interactive educational experiences.
          </p>
        </div>
      </div>
    </div>
  );
}