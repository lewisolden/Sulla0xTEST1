import { useRoute } from "wouter";
import { Card } from "@/components/ui/card";

const blogPosts = {
  "sulla-future-tech-education": {
    title: "Sulla: Empowering the Future of Technology and Education",
    content: `In the rapidly evolving world of technology and education, Sulla stands at the forefront of innovation, delivering an immersive, AI-powered learning experience focused on blockchain, cryptocurrency, and financial technologies.

Our platform combines cutting-edge artificial intelligence with comprehensive educational content to create a uniquely adaptive learning environment. Through interactive modules, real-time simulations, and personalized guidance, we're making complex technological concepts accessible and engaging for learners at all levels.`,
    date: "February 19, 2025",
    readTime: "12 min read",
    category: "Platform Updates"
  }
};

export default function BlogPostPage() {
  const [, params] = useRoute("/library/:slug");
  const post = params ? blogPosts[params.slug] : null;

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground">The requested blog post could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <div className="p-6">
          <div className="mb-4">
            <span className="text-sm text-muted-foreground">
              {post.category} • {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="text-sm text-muted-foreground mb-8">
            {post.date}
          </div>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}