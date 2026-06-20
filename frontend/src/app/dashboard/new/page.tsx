"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plane, Compass, ArrowLeft, Loader2 } from 'lucide-react';

export default function NewTrip() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    destination: '',
    durationDays: 3,
    budgetLevel: 'Medium',
    interests: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/trips`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to generate trip');
      }

      router.push(`/dashboard/trip/${data._id}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white">
      <nav className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/dashboard')}>
            <ArrowLeft className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
            <span className="font-extrabold text-xl tracking-tighter">Back to Dashboard</span>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2">Plan a new trip</h1>
          <p className="text-slate-400 font-medium">Tell our AI where you want to go and what you love doing.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-200 mb-2">Destination</label>
              <input 
                type="text" 
                required
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors text-lg"
                placeholder="e.g. Tokyo, Japan or Paris"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-200 mb-2">Duration (Days)</label>
                <input 
                  type="number" 
                  min="1"
                  max="14"
                  required
                  value={formData.durationDays}
                  onChange={(e) => setFormData({...formData, durationDays: parseInt(e.target.value)})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-200 mb-2">Budget Profile</label>
                <select
                  value={formData.budgetLevel}
                  onChange={(e) => setFormData({...formData, budgetLevel: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none"
                >
                  <option value="Low">Budget / Backpacker</option>
                  <option value="Medium">Moderate / Standard</option>
                  <option value="High">Luxury / Premium</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-200 mb-2">Interests & Preferences</label>
              <textarea 
                required
                rows={4}
                value={formData.interests}
                onChange={(e) => setFormData({...formData, interests: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                placeholder="e.g. I love historic architecture, trying local street food, and avoid crowded tourist traps..."
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl py-4 font-bold text-lg transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Generating Itinerary with AI...
                </>
              ) : (
                <>
                  <Plane className="w-6 h-6" />
                  Generate My Trip
                </>
              )}
            </button>
            {loading && <p className="text-center text-slate-400 text-sm mt-4">This usually takes about 10-15 seconds. Hang tight!</p>}
          </div>
        </form>
      </main>
    </div>
  );
}
