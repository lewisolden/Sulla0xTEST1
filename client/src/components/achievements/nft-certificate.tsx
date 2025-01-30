import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Medal, Award, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface NFTCertificate {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  earnedAt: Date;
  nftTokenId?: string;
  metadata: {
    type: 'course' | 'quiz' | 'milestone';
    level?: string;
    score?: number;
  };
}

interface NFTCertificateProps {
  certificate: NFTCertificate;
  className?: string;
}

const NFTCertificate = ({ certificate, className }: NFTCertificateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn(
        "p-6 border-2 relative overflow-hidden",
        certificate.metadata.type === 'course' && "border-blue-500",
        certificate.metadata.type === 'quiz' && "border-green-500",
        certificate.metadata.type === 'milestone' && "border-purple-500",
        className
      )}>
        {/* Certificate Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            {certificate.metadata.type === 'course' && <Medal className="h-12 w-12 text-blue-500" />}
            {certificate.metadata.type === 'quiz' && <Award className="h-12 w-12 text-green-500" />}
            {certificate.metadata.type === 'milestone' && <ScrollText className="h-12 w-12 text-purple-500" />}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{certificate.name}</h2>
          <p className="text-gray-600 mt-2">{certificate.description}</p>
        </div>

        {/* Certificate Details */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Earned On</span>
            <span className="text-sm font-medium">
              {format(certificate.earnedAt, 'PPP')}
            </span>
          </div>

          {certificate.metadata.score && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Score</span>
              <span className="text-sm font-medium">
                {certificate.metadata.score}%
              </span>
            </div>
          )}

          {certificate.metadata.level && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Level</span>
              <Badge variant="secondary">
                {certificate.metadata.level}
              </Badge>
            </div>
          )}

          {certificate.nftTokenId && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">NFT Token ID</span>
                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {certificate.nftTokenId}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Verification Seal */}
        <div className="absolute -right-12 -bottom-12 opacity-10">
          <ScrollText className="h-32 w-32 text-current" />
        </div>
      </Card>
    </motion.div>
  );
};

export default NFTCertificate;