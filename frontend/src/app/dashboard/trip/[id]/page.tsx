"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, ArrowLeft, Wallet, CheckCircle, Map, Hotel, Activity, DollarSign } from 'lucide-react';

export default function TripView({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrip = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/trips/${params.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }

        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch trip');
        }

        setTrip(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <MapPin className="w-12 h-12 text-cyan-500 animate-bounce" />
          <p className="font-bold text-xl animate-pulse">Loading your itinerary...</p>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center text-white p-6 text-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Oops!</h2>
          <p className="text-red-400 mb-6">{error || 'Trip not found'}</p>
          <button onClick={() => router.push('/dashboard')} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition-colors">
            Go back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // The AI generated JSON data is stored on the root trip object
  const aiData = trip || {};

  return (
    <div className="min-h-screen bg-[#030014] text-white pb-20 relative overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute top-40 left-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <nav className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/dashboard')}>
            <ArrowLeft className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
            <span className="font-extrabold text-xl tracking-tighter">Back to Dashboard</span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-12 items-start justify-between mb-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-semibold mb-4">
              <Map className="w-4 h-4" /> AI Generated Itinerary
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500">
              {trip.destination}
            </h1>
            <div className="flex flex-wrap gap-6 text-slate-300 font-medium mt-6">
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10"><Calendar className="w-5 h-5 text-blue-400" /> {trip.durationDays} Days</span>
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10"><Wallet className="w-5 h-5 text-emerald-400" /> {trip.budgetType} Budget</span>
            </div>
          </div>
          
          {/* Smart Packing Box */}
          <div className="w-full md:w-96 border border-white/10 bg-white/[0.02] rounded-3xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-fuchsia-500/50 transition-colors">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-[50px] -z-10 group-hover:bg-fuchsia-500/40 transition-colors"></div>
             <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-fuchsia-300">
               <CheckCircle className="w-5 h-5" /> Smart Packing List
             </h3>
             <ul className="space-y-4">
               {aiData.smartPackingList?.map((item: any, i: number) => (
                 <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                   <div className="w-5 h-5 mt-0.5 rounded border border-fuchsia-500/30 bg-fuchsia-500/10 flex-shrink-0 flex items-center justify-center text-fuchsia-400">✓</div>
                   <div>
                     <p className="font-bold text-white text-base">{item.item}</p>
                     <p className="text-slate-400 text-xs mt-1">{item.reason}</p>
                   </div>
                 </li>
               ))}
             </ul>
          </div>
        </div>

        {/* Budget Breakdown & Hotels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          <div className="lg:col-span-1 border border-white/10 bg-white/[0.02] rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Wallet className="w-6 h-6 text-emerald-400" /> Estimated Budget
            </h2>
            <div className="mb-6 pb-6 border-b border-white/10">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-1">Total Estimated</p>
              <p className="text-4xl font-black text-emerald-400">${aiData.budgetBreakdown?.totalEstimated || '0'}</p>
            </div>
            <div className="space-y-4">
              {aiData.budgetBreakdown?.categories?.map((cat: any, i: number) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-500/50" /> {cat.name}
                  </span>
                  <span className="font-bold text-white">${cat.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 border border-white/10 bg-white/[0.02] rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Hotel className="w-6 h-6 text-blue-400" /> Hotel Suggestions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aiData.hotels?.map((hotel: any, i: number) => (
                <div key={i} className="border border-white/10 bg-black/40 p-5 rounded-2xl">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg text-white">{hotel.name}</h4>
                    <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded-full border border-yellow-500/30">
                      {hotel.rating} ★
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">{hotel.description}</p>
                  <p className="font-bold text-emerald-400">~${hotel.pricePerNight} <span className="text-slate-500 text-xs font-medium">/ night</span></p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Itinerary Timeline */}
        <div>
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3 border-b border-white/10 pb-6">
             <Calendar className="w-8 h-8 text-cyan-400" /> Complete Itinerary
          </h2>
          
          <div className="space-y-12">
            {aiData.itinerary?.map((day: any, index: number) => (
              <div key={index} className="relative">
                <div className="flex flex-col md:flex-row gap-6 md:items-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex flex-col items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                    <span className="text-xs font-bold uppercase text-white/80">Day</span>
                    <span className="text-2xl font-black text-white leading-none">{day.day}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{day.theme}</h3>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 pl-0 md:pl-24">
                  {day.activities?.map((act: any, actIndex: number) => (
                    <div key={actIndex} className="border border-white/5 bg-white/[0.02] p-6 rounded-2xl hover:bg-white/[0.05] transition-colors relative group flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-white/10 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full">
                            {act.time}
                          </span>
                          <h4 className="font-bold text-lg text-white">{act.title}</h4>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">{act.description}</p>
                      </div>
                      
                      {act.costEstimate > 0 && (
                        <div className="flex-shrink-0 flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-sm font-bold">
                          <DollarSign className="w-4 h-4" /> {act.costEstimate}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
