'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
      <div className="relative group">
        {/* Glow effect on focus */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-2xl blur-xl transition-opacity duration-500 ${isFocused ? 'opacity-30' : 'opacity-0'}`}></div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <svg
              className={`w-6 h-6 transition-colors duration-300 ${isFocused ? 'text-cyan-400' : 'text-gray-500'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What are you looking for?"
            className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl py-5 pl-16 pr-36 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300"
          />

          <div className="absolute inset-y-0 right-3 flex items-center gap-2">
            <button
              type="button"
              className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-300 group/btn"
              title="Voice search"
            >
              <svg
                className="w-5 h-5 text-gray-500 group-hover/btn:text-cyan-400 transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            </button>

            <button
              type="button"
              className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-300 group/btn"
              title="Search by image"
            >
              <svg
                className="w-5 h-5 text-gray-500 group-hover/btn:text-blue-400 transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-10 justify-center">
        <button
          type="submit"
          className="group relative px-8 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10 text-gray-200 font-medium group-hover:text-cyan-400 transition-colors">
            gulugulu Search
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </button>
        
        <button
          type="button"
          className="group relative px-8 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10 text-gray-200 font-medium group-hover:text-blue-400 transition-colors">
            I'm Feeling Lucky
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </button>
      </div>
    </form>
  );
}