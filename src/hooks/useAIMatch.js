import { useState, useCallback } from 'react';
import { aiMatchUsers } from '@/lib/aiMatcher';
import { generateUsers } from '@/lib/mockData';

export const useAIMatch = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const matchUsers = useCallback(async (currentUser, targetUsers = null, context = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const usersToMatch = targetUsers || generateUsers(20);
      const result = await aiMatchUsers(currentUser, usersToMatch, context);
      
      const enrichedMatches = result.matches.map(match => {
        const user = usersToMatch.find(u => u.id === match.userId) || usersToMatch[0];
        return {
          ...user,
          ...match
        };
      });
      
      setMatches(enrichedMatches);
      return enrichedMatches;
    } catch (err) {
      setError(err.message);
      setMatches([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMatches = useCallback(() => {
    setMatches([]);
    setError(null);
  }, []);

  return {
    matches,
    loading,
    error,
    matchUsers,
    clearMatches
  };
};
