import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Sparkles, UserCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function Navigation() {
  const [location] = useLocation();
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-blue-600">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center pl-4">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">Sulla</span>
          </Link>
        </div>
        <div className="flex items-center gap-6 mr-8">
          <Link href="/curriculum">
            <span className="text-white hover:text-blue-200 transition-colors font-bold">
              Courses
            </span>
          </Link>
          <Link href="/ai" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white hover:text-blue-200 transition-colors font-bold">
              AI Features
            </span>
          </Link>
          {user ? (
            <Link href="/account" className="flex items-center gap-2">
              <UserCircle className="w-5 h-5 text-white" />
              <span className="bg-white text-blue-600 hover:bg-blue-50 transition-colors font-bold px-4 py-2 rounded-md">
                My Account
              </span>
            </Link>
          ) : (
            <Link href="/login">
              <span className="bg-white text-blue-600 hover:bg-blue-50 transition-colors font-bold px-4 py-2 rounded-md">
                Login
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}