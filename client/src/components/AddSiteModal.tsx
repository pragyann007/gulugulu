// components/AddSiteModal.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { serverURL } from '../../constants';
import useGetCurrentUser from '../hooks/useGetCurrentuser';

interface AddSiteModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddSiteModal({ onClose, onSuccess }: AddSiteModalProps) {
  const { user, loading: userLoading } = useGetCurrentUser();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationTag, setVerificationTag] = useState('');
  const [siteId, setSiteId] = useState('');
  const [step, setStep] = useState<'input' | 'verify'>('input');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('You must be logged in to add a site');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${serverURL}/api/sites/index`,
        { url, ownerId: user.id },
        { withCredentials: true }
      );

      setVerificationTag(response.data.verifyTag);
      setSiteId(response.data.site._id);
      setStep('verify');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add site');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setError('');

    try {
      await axios.post(
        `${serverURL}/api/sites/verify/${siteId}`,
        {},
        { withCredentials: true }
      );
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(verificationTag);
    alert('Verification tag copied to clipboard!');
  };

  // Show loading state while fetching user
  if (userLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg max-w-2xl w-full p-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {step === 'input' ? 'Add New Site' : 'Verify Your Site'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {step === 'input' ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2 font-medium">Website URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                required
              />
              <p className="text-gray-400 text-sm mt-2">
                Enter the full URL of your website including https://
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-400">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding...' : 'Continue'}
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-900/30 border border-blue-500 rounded-lg mb-4">
                <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-300">
                  <p className="font-medium mb-1">Verification Required</p>
                  <p>Add the following meta tag to the {`<head>`} section of your website's HTML</p>
                </div>
              </div>

              <label className="block text-gray-300 mb-2 font-medium">Verification Tag</label>
              <div className="relative">
                <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-green-400 text-sm overflow-x-auto">
                  {verificationTag}
                </pre>
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                  title="Copy to clipboard"
                >
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mb-6 p-4 bg-gray-700/50 rounded-lg">
              <h3 className="text-white font-medium mb-2">How to add the verification tag:</h3>
              <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
                <li>Copy the verification tag above</li>
                <li>Open your website's header.php or index.html file</li>
                <li>Paste it inside the {`<head>`} section</li>
                <li>Save and upload the file to your server</li>
                <li>Click "Verify Site" below</li>
              </ol>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-400">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition font-medium"
              >
                I'll Do This Later
              </button>
              <button
                onClick={handleVerify}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify Site'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}