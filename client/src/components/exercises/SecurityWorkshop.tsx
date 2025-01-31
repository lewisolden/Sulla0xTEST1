import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function SecurityWorkshop() {
  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-blue-800">Security Workshop</h2>
        <p className="text-gray-600">
          Practice identifying and responding to common security threats in the cryptocurrency space.
        </p>
      </div>
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Shield className="h-8 w-8 text-blue-600" />
          <h3 className="text-xl font-semibold">Coming Soon</h3>
        </div>
        <p className="text-gray-600">
          Our security workshop scenarios are being prepared. Check back soon!
        </p>
      </Card>
    </div>
  );
}