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
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const [location] = useLocation();
  const isRegisterPage = location === "/register";
  const { loginMutation, registerMutation, user } = useAuth();

  // Redirect if already logged in
  if (user) {
    setLocation("/account");
    return null;
  }

  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: InsertUser) => {
    try {
      if (isRegisterPage) {
        await registerMutation.mutateAsync({
          username: data.username,
          email: data.email,
          password: data.password,
        });
      } else {
        const { username, password } = data;
        await loginMutation.mutateAsync({ username, password });
      }
      setLocation("/account");
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const isLoading = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        <Card className="p-8 shadow-lg">
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
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
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
              className="text-blue-600 hover:text-blue-800"
              type="button"
              disabled={isLoading}
            >
              {isRegisterPage
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </button>
          </div>
        </Card>

        <div className="hidden md:block text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Sulla
          </h2>
          <p className="text-lg text-blue-700">
            Master blockchain technology through interactive learning experiences. From fundamentals to advanced smart contracts, your journey to Web3 expertise starts here.
          </p>
        </div>
      </div>
    </div>
  );
}