import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import BlogCard from "@/components/library/BlogCard";

interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

// Sample blog posts - In a real app, this would come from an API
const samplePosts: BlogPost[] = [
  {
    title: "Sulla: Empowering the Future of Technology and Education",
    description: "Discover how Sulla is revolutionizing blockchain and AI education through immersive learning experiences and cutting-edge technology.",
    date: "February 19, 2025",
    readTime: "12",
    category: "Platform Updates",
    slug: "sulla-future-tech-education"
  },
  {
    title: "The Role of Artificial Intelligence in Shaping the Future of Work",
    description: "Explore how AI is transforming industries, creating new opportunities, and reshaping the future of work in our rapidly evolving digital economy.",
    date: "February 19, 2025",
    readTime: "15",
    category: "AI & Technology",
    slug: "ai-future-of-work"
  },
  {
    title: "How Sulla's Personalized Learning and Sensei Tutor Help Learners Succeed",
    description: "Learn about Sulla's innovative approach to personalized learning and how our AI-powered Sensei tutor adapts to each student's unique needs.",
    date: "February 19, 2025",
    readTime: "10",
    category: "Education & Technology",
    slug: "personalized-learning-sensei-tutor"
  }
];

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(samplePosts);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = samplePosts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description.toLowerCase().includes(query.toLowerCase()) ||
      post.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold">Resource Library</h1>
        <p className="text-muted-foreground text-lg">
          Explore our latest articles, tutorials, and updates about blockchain technology and cryptocurrency.
        </p>
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}