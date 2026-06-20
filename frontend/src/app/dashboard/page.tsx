"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, MapPin, Calendar, Compass, LogOut } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/trips', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }

        const data = await res.json();
        setTrips(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <Compass className="w-10 h-10 text-cyan-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] text-white">
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tighter">WanderAI</span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Your Trips</h1>
            <p className="text-slate-400 font-medium">Manage and view your AI-generated itineraries.</p>
          </div>
          <button 
            onClick={() => router.push('/dashboard/new')}
            className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <Plus className="w-5 h-5" /> Create New Trip
          </button>
        </div>

        {trips.length === 0 ? (
          <div className="border border-white/10 border-dashed rounded-3xl p-16 text-center bg-white/[0.02]">
            <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No trips yet</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">You haven't generated any itineraries yet. Let AI plan your next adventure!</p>
            <button onClick={() => router.push('/dashboard/new')} className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-white hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20">
              Generate First Trip
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip: any) => (
              <div 
                key={trip._id} 
                onClick={() => router.push(`/dashboard/trip/${trip._id}`)}
                className="group border border-white/10 bg-white/[0.03] p-6 rounded-3xl cursor-pointer hover:bg-white/[0.06] hover:border-white/20 transition-all hover:-translate-y-1 shadow-lg"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-white/10 rounded-full text-slate-300">
                    {trip.durationDays} Days
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">{trip.destination}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{trip.interests}</p>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <Calendar className="w-4 h-4" /> Created {new Date(trip.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
