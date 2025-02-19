import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, User } from "lucide-react";
import { format } from "date-fns";

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: Date;
  readTime: number;
  tags: string[];
}

interface BlogPostProps {
  post: BlogPost;
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="mr-1 h-4 w-4" />
              <span>{format(post.publishedAt, 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{post.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        <Button variant="outline">Read More</Button>
      </CardFooter>
    </Card>
  );
}
