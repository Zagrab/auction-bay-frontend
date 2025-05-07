// src/hooks/useSignIn.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, type SignInPayload, } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

export function useSignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignIn(payload: SignInPayload) {
    setLoading(true);
    setError(null);
    try {
      const token = await signIn(payload);
      login(token);              
      navigate('/');      // redirect on success
      console.log('Access Token:', token);  
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { handleSignIn, loading, error };
}
