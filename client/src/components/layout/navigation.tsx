import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { UserCircle, Menu } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navigation() {
  const [location] = useLocation();
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-blue-600">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-4 pl-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">Sulla</span>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white bg-transparent hover:bg-blue-500">
                  <Menu className="h-5 w-5" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[220px] p-2">
                    {[
                      { path: "/about", label: "About" },
                      { path: "/ai", label: "AI" },
                      { path: "/curriculum", label: "Curriculum" },
                      { path: "/games", label: "Games" },
                      { path: "/glossary", label: "Glossary" },
                      { path: "/modules/module1", label: "Start Learning" },
                      { path: "/sensei", label: "Sensei" },
                    ].map(({ path, label }) => (
                      <Link key={path} href={path}>
                        <NavigationMenuLink
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            location === path && "bg-accent"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">{label}</div>
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/curriculum">
            <span className="text-white hover:text-blue-200 transition-colors font-bold">
              Courses
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-6 mr-8">
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