'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setAuthFromStorage, fetchUserData } from '@/lib/AdminAuthSlice';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, token } = useAppSelector((state) => state.adminAuth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // If already authenticated, we're good
      if (isAuthenticated && token) {
        setIsChecking(false);
        return;
      }

      // Try to restore from localStorage
      if (typeof window !== 'undefined') {
        const storedAuth = localStorage.getItem('admin_session');
        if (storedAuth) {
          try {
            const { token } = JSON.parse(storedAuth);
            if (token) {
              // Set token in Redux
              dispatch(setAuthFromStorage({ token }));
              
              // Fetch user data from backend
              await dispatch(fetchUserData(token));
              
              setIsChecking(false);
              return;
            }
          } catch (error) {
            console.error('Failed to restore auth:', error);
            localStorage.removeItem('admin_session');
          }
        }
      }
      
      // No valid auth found, redirect to login
      router.push('/admin');
    };

    checkAuth();
  }, [dispatch, router]);

  // Show loading spinner while checking auth
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
        <div className="text-center">
          <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-spin">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p className="mt-4 text-purple-200 font-medium">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated
  return isAuthenticated ? <>{children}</> : null;
}
