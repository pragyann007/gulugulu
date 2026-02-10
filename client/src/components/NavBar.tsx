'use client';

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import SettingsDropdown from './SettingsDropdown';
import FeatureComingSoon from './FeatureComingSoon';
import useGetCurrentUser from '../hooks/useGetCurrentuser';
import { serverURL } from '../../constants';

export default function Navbar() {
  const [showAppsMenu, setShowAppsMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, loading, refetch } = useGetCurrentUser();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await axios.post(`${serverURL}/api/auth/logout`, {}, { 
        withCredentials: true 
      });
      
      await refetch();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-xl font-bold text-white hover:text-gray-300 transition">
          gulugulu
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <FeatureComingSoon feature="Gmail">
          <button className="text-gray-300 hover:text-white transition text-sm">
            Gmail
          </button>
        </FeatureComingSoon>

        <FeatureComingSoon feature="Images">
          <button className="text-gray-300 hover:text-white transition text-sm">
            Images
          </button>
        </FeatureComingSoon>

        <div className="relative">
          <FeatureComingSoon feature="Apps">
            <button
              onClick={() => setShowAppsMenu(!showAppsMenu)}
              className="p-2 hover:bg-gray-800 rounded-full transition"
            >
              <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm12 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </FeatureComingSoon>
        </div>

        <SettingsDropdown />

        {loading ? (
          <div className="w-24 h-10 bg-gray-800 rounded-full animate-pulse"></div>
        ) : user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition font-medium"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden sm:inline">{user.name}</span>
              <svg
                className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
                
                {/* My Sites Link */}
                <Link
                  href="/dashboard/sites"
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition flex items-center gap-2"
                  onClick={() => setShowUserMenu(false)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  My Sites
                </Link>

                {/* Sign Out Button */}
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition font-medium"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}