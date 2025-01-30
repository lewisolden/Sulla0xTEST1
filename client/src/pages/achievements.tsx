import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Trophy, ScrollText } from "lucide-react"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BadgeDisplay from "@/components/badges/badge";
import NFTCertificate from "@/components/achievements/nft-certificate";
import { Card } from "@/components/ui/card";

interface Achievement {
  id: number;
  name: string;
  description: string;
  type: string;
  criteria: {
    icon?: string;
    level?: string;
  };
}

interface EarnedAchievement {
  id: string;
  achievementId: number;
  achievement: Achievement;
  earnedAt: string;
  nftTokenId?: string;
  metadata: {
    type: 'course' | 'quiz' | 'milestone';
    level?: string;
    score?: number;
  };
}

const AchievementsPage = () => {
  const { data: achievements, isLoading: loadingAchievements } = useQuery<Achievement[]>({
    queryKey: ["achievements"],
    queryFn: async () => {
      const response = await fetch("/api/achievements");
      if (!response.ok) throw new Error("Failed to fetch achievements");
      return response.json();
    },
  });

  const { data: earnedAchievements, isLoading: loadingEarned } = useQuery<EarnedAchievement[]>({
    queryKey: ["achievements", "earned"],
    queryFn: async () => {
      const response = await fetch("/api/achievements/earned");
      if (!response.ok) throw new Error("Failed to fetch earned achievements");
      return response.json();
    },
  });

  if (loadingAchievements || loadingEarned) {
    return (
      <div className="container mx-auto p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-500" />
          Your Achievements
        </h1>
        <p className="text-gray-600 mt-2">
          Track your learning progress and showcase your crypto education certificates
        </p>
      </motion.div>

      <Tabs defaultValue="certificates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="certificates">
            <ScrollText className="h-4 w-4 mr-2" />
            NFT Certificates
          </TabsTrigger>
          <TabsTrigger value="badges">
            <Trophy className="h-4 w-4 mr-2" />
            Badges
          </TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {earnedAchievements?.filter(a => a.achievement.type === 'certificate').map((earned) => (
              <NFTCertificate
                key={earned.id}
                certificate={{
                  id: earned.id,
                  name: earned.achievement.name,
                  description: earned.achievement.description,
                  earnedAt: new Date(earned.earnedAt),
                  nftTokenId: earned.nftTokenId,
                  metadata: earned.metadata
                }}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {achievements?.filter(a => a.type === 'badge').map((badge) => (
              <BadgeDisplay
                key={badge.id}
                badge={{
                  id: badge.id.toString(),
                  name: badge.name,
                  description: badge.description,
                  icon: badge.criteria.icon || "Medal",
                  type: badge.criteria.level || "bronze",
                  earned: earnedAchievements?.some(ea => ea.achievementId === badge.id) || false,
                  earnedAt: earnedAchievements?.find(ea => ea.achievementId === badge.id)?.earnedAt,
                }}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AchievementsPage;