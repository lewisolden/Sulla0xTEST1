import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
}

export default function ModuleCard({ icon: Icon, title, description, link }: ModuleCardProps) {
  return (
    <Card className="bg-blue-50 hover:shadow-xl transition duration-300">
      <CardContent className="p-6">
        <Icon className="h-12 w-12 text-blue-600 mb-4" />
        <h3 className="text-xl font-semibold text-blue-800 mb-4">
          {title}
        </h3>
        <p className="text-blue-700 mb-4">
          {description}
        </p>
        <Link 
          href={link}
          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
        >
          Explore Module <span className="ml-2">→</span>
        </Link>
      </CardContent>
    </Card>
  );
}
