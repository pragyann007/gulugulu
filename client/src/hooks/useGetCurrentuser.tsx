"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { serverURL } from '../../constants';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UseGetCurrentUserReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const useGetCurrentUser = (): UseGetCurrentUserReturn => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCurrentUser = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const res = await axios.get(`${serverURL}/api/auth/me`, { 
                withCredentials: true 
            });
            
            setUser(res.data.user);
            console.log('User from backend:', res.data.user);
            
        } catch (err: any) {
            console.error('Failed to fetch user:', err);
            setError(err.response?.data?.message || 'Failed to fetch user');
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCurrentUser();
    }, [])

    useEffect(() => {
        console.log('User state updated:', user);
    }, [user]);

    return { user, loading, error, refetch: fetchCurrentUser };
}

export default useGetCurrentUser;