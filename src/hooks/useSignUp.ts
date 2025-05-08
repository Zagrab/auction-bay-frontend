// src/hooks/useSignUp.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, type SignUpPayload,  } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

export function useSignUp() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignUp(payload: SignUpPayload) {
    setLoading(true);
    setError(null);
    try {
      const token = await signUp(payload);
      console.log('🛡️ Access Token:', token);
      login(token);
      navigate('/my-auctions');       // or '/auctions'
      return true;
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Sign up failed');
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { handleSignUp, loading, error };
}
