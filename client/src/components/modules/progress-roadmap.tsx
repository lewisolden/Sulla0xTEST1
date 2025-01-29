import { Link } from "wouter";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  title: string;
  path: string;
  completed?: boolean;
  current?: boolean;
}

interface ModuleRoadmapProps {
  sections: Section[];
  currentSection?: string;
}

export default function ProgressRoadmap({ sections, currentSection }: ModuleRoadmapProps) {
  return (
    <div className="w-full py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 flex-wrap">
        {sections.map((section, index) => (
          <div key={section.id} className="flex items-center gap-2">
            <Link href={section.path}>
              <div
                className={cn(
                  "flex items-center gap-2 p-3 rounded-lg transition-all",
                  section.completed ? "text-green-600" : "text-gray-500",
                  currentSection === section.id ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50",
                  "cursor-pointer"
                )}
              >
                {section.completed ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
                <span className={cn(
                  "font-medium",
                  section.completed ? "text-green-600" : "text-gray-700",
                  currentSection === section.id && "text-blue-600"
                )}>
                  {section.title}
                </span>
              </div>
            </Link>
            {index < sections.length - 1 && (
              <ArrowRight className="w-5 h-5 text-gray-400 hidden md:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
