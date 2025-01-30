import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

export function useCertificateAward() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const checkModuleCompletion = async (moduleId: number) => {
    const response = await fetch('/api/achievements/check-module-completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ moduleId }),
    });

    if (!response.ok) {
      throw new Error('Failed to check module completion');
    }

    return response.json();
  };

  const { mutate: checkCompletion } = useMutation({
    mutationFn: checkModuleCompletion,
    onSuccess: (data) => {
      if (data.awarded) {
        toast({
          title: "Congratulations! 🎉",
          description: "You've earned a new certificate for completing this module!",
        });
        // Invalidate achievements queries to refresh the list
        queryClient.invalidateQueries({ queryKey: ['achievements'] });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to check module completion.",
        variant: "destructive",
      });
    },
  });

  return {
    checkModuleCompletion: checkCompletion,
  };
}
