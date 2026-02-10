// components/SiteCard.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { serverURL } from '../../constants';
import { Site } from '@/types/site';

interface SiteCardProps {
  site: Site;
  onUpdate: () => void;
}

export default function SiteCard({ site, onUpdate }: SiteCardProps) {
  const [verifying, setVerifying] = useState(false);
  const [showToken, setShowToken] = useState(false);

  const handleVerify = async () => {
    setVerifying(true);
    try {
      await axios.post(
        `${serverURL}/api/sites/verify/${site._id}`,
        {},
        { withCredentials: true }
      );
      onUpdate();
      alert('Site verified successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Verification failed');
    } finally {
      setVerifying(false);
    }
  };

  const copyToken = () => {
    const tag = `<meta name="gulugulu-verification" content="${site.verificationToken}">`;
    navigator.clipboard.writeText(tag);
    alert('Verification tag copied!');
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition">
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          site.verified 
            ? 'bg-green-900/30 text-green-400 border border-green-500' 
            : 'bg-yellow-900/30 text-yellow-400 border border-yellow-500'
        }`}>
          {site.verified ? '✓ Verified' : '⚠ Pending Verification'}
        </span>
      </div>

      {/* URL */}
      <h3 className="text-white font-semibold mb-2 truncate" title={site.url}>
        {new URL(site.url).hostname}
      </h3>
      <a 
        href={site.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 text-sm truncate block mb-4"
      >
        {site.url}
      </a>

      {/* Dates */}
      <div className="text-xs text-gray-400 mb-4 space-y-1">
        <p>Added: {new Date(site.createdAt).toLocaleDateString()}</p>
        {site.verified && (
          <p>Verified: {new Date(site.updatedAt).toLocaleDateString()}</p>
        )}
      </div>

      {/* Actions */}
      {!site.verified && (
        <div className="space-y-2">
          <button
            onClick={() => setShowToken(!showToken)}
            className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition text-sm font-medium"
          >
            {showToken ? 'Hide' : 'Show'} Verification Tag
          </button>

          {showToken && (
            <div className="relative">
              <pre className="bg-gray-900 border border-gray-700 rounded p-2 text-xs text-green-400 overflow-x-auto">
                {`<meta name="gulugulu-verification" content="${site.verificationToken}">`}
              </pre>
              <button
                onClick={copyToken}
                className="absolute top-1 right-1 p-1 bg-gray-700 hover:bg-gray-600 rounded"
                title="Copy"
              >
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          )}

          <button
            onClick={handleVerify}
            disabled={verifying}
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition text-sm font-medium disabled:opacity-50"
          >
            {verifying ? 'Verifying...' : 'Verify Now'}
          </button>
        </div>
      )}
    </div>
  );
}