import { FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: FC<BlogCardProps> = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="text-sm text-muted-foreground mb-2">
            {post.category} • {post.readTime} min read
          </div>
          <CardTitle className="text-xl">{post.title}</CardTitle>
          <CardDescription>{post.date}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{post.description}</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Read More
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
