import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full bg-blue-600">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center pl-4">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">Sulla</span>
          </Link>
        </div>
        <div className="flex items-center mr-8">
          <Link href="/curriculum">
            <span className="text-white hover:text-blue-200 transition-colors font-bold">Course</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}