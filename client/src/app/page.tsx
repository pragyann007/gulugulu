"use client";
import Navbar from '@/components/NavBar';
import SearchBar from '@/components/SearchBar';
import useGetCurrentuser from '@/hooks/useGetCurrentuser';

export default function Home() {
  useGetCurrentuser();
  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-black/95 to-slate-900/90"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]"></div>

      <div className="relative z-10">
        <Navbar />
        
        <main className="flex flex-col items-center px-4 pt-32 pb-20">
          {/* Logo and tagline with animation */}
          <div className="text-center mb-14 animate-fade-in">
            <div className="relative inline-block">
              <h1 className="text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-transparent bg-clip-text tracking-tight hover:scale-105 transition-transform duration-300 cursor-default">
                gulugulu 
              </h1>
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-lg blur-2xl opacity-20 -z-10"></div>
            </div>
            <p className="text-gray-400 text-xl font-light tracking-wide">
              search <span className="text-cyan-400">smarter</span>, discover <span className="text-blue-400">faster</span>
            </p>
          </div>

          {/* Search bar */}
          <SearchBar />

          {/* Feature badges with hover effects */}
          <div className="mt-20 flex flex-wrap justify-center gap-4 max-w-2xl">
            <div className="group px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 cursor-default">
              <span className="text-gray-400 text-sm group-hover:text-cyan-400 transition-colors">⚡ Lightning Fast</span>
            </div>
            <div className="group px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 cursor-default">
              <span className="text-gray-400 text-sm group-hover:text-blue-400 transition-colors">🔒 Private & Secure</span>
            </div>
            <div className="group px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 hover:border-indigo-400/50 transition-all duration-300 cursor-default">
              <span className="text-gray-400 text-sm group-hover:text-indigo-400 transition-colors">🎯 Accurate Results</span>
            </div>
          </div>

          {/* Stats section */}
          <div className="mt-16 flex gap-12 text-center">
            <div className="group cursor-default">
              <div className="text-3xl font-bold text-cyan-400 group-hover:scale-110 transition-transform">1M+</div>
              <div className="text-gray-500 text-sm mt-1">Searches</div>
            </div>
            <div className="group cursor-default">
              <div className="text-3xl font-bold text-blue-400 group-hover:scale-110 transition-transform">50ms</div>
              <div className="text-gray-500 text-sm mt-1">Avg Speed</div>
            </div>
            <div className="group cursor-default">
              <div className="text-3xl font-bold text-indigo-400 group-hover:scale-110 transition-transform">99.9%</div>
              <div className="text-gray-500 text-sm mt-1">Uptime</div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/5">
          <div className="px-6 py-4 flex justify-between items-center text-sm text-gray-400">
            <div className="flex gap-6">
              <button className="hover:text-cyan-400 transition-colors">About</button>
              <button className="hover:text-cyan-400 transition-colors">Advertising</button>
              <button className="hover:text-cyan-400 transition-colors">Business</button>
            </div>
            <div className="flex gap-6">
              <button className="hover:text-cyan-400 transition-colors">Privacy</button>
              <button className="hover:text-cyan-400 transition-colors">Terms</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}