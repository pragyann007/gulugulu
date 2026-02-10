// hooks/useSites.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { serverURL } from '../../constants';
import { Site } from '@/types/site';

export default function useSites(ownerId: string | undefined) {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSites = async () => {
    if (!ownerId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('Fetching sites for ownerId:', ownerId); // Debug log
      
      const response = await axios.get(`${serverURL}/api/sites/${ownerId}`, {
        withCredentials: true,
      });
      
      console.log('Sites response:', response.data); // Debug log
      setSites(response.data.sites);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch sites');
      console.error('Error fetching sites:', err);
      console.error('Error details:', err.response?.data); // More detailed error log
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites();
  }, [ownerId]);

  return { sites, loading, error, refetch: fetchSites };
}