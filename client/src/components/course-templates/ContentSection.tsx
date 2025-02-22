import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface ContentSectionProps {
  icon: LucideIcon;
  title: string;
  colorClass?: string;
  children: ReactNode;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  icon: Icon,
  title,
  colorClass = "blue",
  children
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`border-${colorClass}-200 hover:border-${colorClass}-300 transition-all mb-6`}>
        <CardHeader className={`bg-gradient-to-r from-${colorClass}-50 to-${colorClass}-100`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 bg-${colorClass}-500 rounded-lg`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl font-semibold text-gray-800">
              {title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const KeyConceptBox: React.FC<{ title: string; children: ReactNode }> = ({ title, children }) => {
  return (
    <div className="mt-6 bg-blue-50 p-4 rounded-lg">
      <h4 className="text-blue-800 font-semibold mb-2 flex items-center gap-2">
        {title}
      </h4>
      <div className="text-blue-700">
        {children}
      </div>
    </div>
  );
};

export default ContentSection;
