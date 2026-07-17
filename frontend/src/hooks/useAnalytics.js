import { useEffect } from 'react';
import { getVisitInfo, recordVisit } from '../services/analytics';

export const useAnalytics = () => {
  useEffect(() => {
    const trackVisit = async () => {
      const visitInfo = await getVisitInfo();
      if (visitInfo) {
        await recordVisit(visitInfo);
      }
    };
    
    trackVisit();
  }, []);
};
