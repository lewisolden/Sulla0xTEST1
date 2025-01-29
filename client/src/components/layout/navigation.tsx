import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Sulla</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/modules/module1">
              <Button
                variant="ghost"
                className={cn(
                  "hover:bg-muted",
                  location === "/modules/module1" && "bg-muted"
                )}
              >
                Module 1
              </Button>
            </Link>
            <Link href="/modules/module2">
              <Button
                variant="ghost"
                className={cn(
                  "hover:bg-muted",
                  location === "/modules/module2" && "bg-muted"
                )}
              >
                Module 2
              </Button>
            </Link>
            <Link href="/modules/module3">
              <Button
                variant="ghost"
                className={cn(
                  "hover:bg-muted",
                  location === "/modules/module3" && "bg-muted"
                )}
              >
                Module 3
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
