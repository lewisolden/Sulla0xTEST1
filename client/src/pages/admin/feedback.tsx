import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Feedback {
  id: number;
  userId: number;
  courseId?: number;
  type: 'course' | 'website' | 'feature';
  rating?: number;
  feedback: string;
  status: 'pending' | 'reviewed' | 'addressed';
  createdAt: string;
  metadata?: any;
  user: {
    username: string;
    email: string;
  };
  course?: {
    title: string;
  };
}

export default function AdminFeedbackPage() {
  const { data: feedbackList, isLoading } = useQuery<Feedback[]>({
    queryKey: ['admin', 'feedback'],
    queryFn: async () => {
      const response = await fetch('/api/admin/feedback');
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to fetch feedback: ${error}`);
      }
      return response.json();
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'addressed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = async (feedbackId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/feedback/${feedbackId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update feedback status');
      }
    } catch (error) {
      console.error('Error updating feedback status:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Feedback</h1>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Feedback</TabsTrigger>
          <TabsTrigger value="course">Course Feedback</TabsTrigger>
          <TabsTrigger value="website">Website Feedback</TabsTrigger>
          <TabsTrigger value="feature">Feature Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {isLoading ? (
            <div className="text-center p-6">Loading feedback...</div>
          ) : feedbackList && feedbackList.length > 0 ? (
            feedbackList.map((feedback) => (
              <Card key={feedback.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {feedback.type === 'course' ? feedback.course?.title :
                       feedback.type === 'website' ? 'Website Feedback' :
                       'Feature Request'}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      From {feedback.user.username} ({feedback.user.email})
                    </p>
                  </div>
                  <Badge className={getStatusColor(feedback.status)}>
                    {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent>
                  {feedback.type === 'course' && feedback.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < feedback.rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  <p className="text-gray-700 whitespace-pre-wrap">{feedback.feedback}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Submitted on {new Date(feedback.createdAt).toLocaleDateString()}
                    </span>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(feedback.id, 'reviewed')}
                      >
                        Mark as Reviewed
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(feedback.id, 'addressed')}
                      >
                        Mark as Addressed
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center p-6">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No feedback received yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {['course', 'website', 'feature'].map((type) => (
          <TabsContent key={type} value={type} className="space-y-6">
            {isLoading ? (
              <div className="text-center p-6">Loading feedback...</div>
            ) : feedbackList?.filter(f => f.type === type).map((feedback) => (
              <Card key={feedback.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {feedback.type === 'course' ? feedback.course?.title :
                       feedback.type === 'website' ? 'Website Feedback' :
                       'Feature Request'}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      From {feedback.user.username} ({feedback.user.email})
                    </p>
                  </div>
                  <Badge className={getStatusColor(feedback.status)}>
                    {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent>
                  {feedback.type === 'course' && feedback.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < feedback.rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  <p className="text-gray-700 whitespace-pre-wrap">{feedback.feedback}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Submitted on {new Date(feedback.createdAt).toLocaleDateString()}
                    </span>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(feedback.id, 'reviewed')}
                      >
                        Mark as Reviewed
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(feedback.id, 'addressed')}
                      >
                        Mark as Addressed
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
            }
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}