"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Plane, Map, Calendar, Wallet, CheckCircle, Sparkles, MapPin, Compass } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-[#030014] text-white selection:bg-fuchsia-500/30 overflow-hidden relative">
      
      {/* Background Ambient Gradients */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-4000"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full border-b border-white/5 bg-[#030014]/40 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              <Compass className="w-6 h-6 text-white animate-[spin_4s_linear_infinite]" />
            </div>
            <span className="font-extrabold text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              WanderAI
            </span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => router.push('/login')} className="px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors">
              Log in
            </button>
            <button onClick={() => router.push('/register')} className="px-6 py-2.5 text-sm font-bold bg-white text-black rounded-full hover:bg-slate-200 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Sign up free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 z-10">
        
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-300 text-sm font-semibold mb-4 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-fuchsia-400" />
            Powered by Gemini AI
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[1.05]">
            Design your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500">
              dream trip.
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-xl font-medium">
            Stop stressing over spreadsheets. Our AI crafts highly personalized itineraries, budgets, and smart packing lists in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button onClick={() => router.push('/register')} className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full font-bold transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] flex items-center justify-center gap-2 text-lg group transform hover:-translate-y-1">
              Start Planning
              <Plane className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Hero Visual Mockup */}
        <div className="flex-1 relative w-full lg:h-[600px] flex items-center justify-center perspective-1000">
          
          {/* Main Card */}
          <div className="relative w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-2xl rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-500 group">
            
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl tracking-tight text-white">Kyoto, Japan</h3>
                  <p className="text-fuchsia-300 font-medium text-sm">5 Days • Cultural Explorer</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 relative">
              <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-white/10 rounded-full"></div>
              
              <div className="relative pl-12">
                <div className="absolute left-3 top-1.5 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase mb-1 block">Day 1 • Morning</span>
                <h4 className="font-semibold text-lg text-white mb-1">Fushimi Inari Shrine</h4>
                <p className="text-sm text-slate-300">Beat the crowds and hike through thousands of vivid vermilion torii gates.</p>
              </div>
              
              <div className="relative pl-12 pt-4">
                <div className="absolute left-3 top-5.5 w-3 h-3 bg-fuchsia-400 rounded-full shadow-[0_0_10px_rgba(232,121,249,0.8)]"></div>
                <span className="text-xs font-bold text-fuchsia-400 tracking-wider uppercase mb-1 block">Day 1 • Afternoon</span>
                <h4 className="font-semibold text-lg text-white mb-1">Nishiki Market</h4>
                <p className="text-sm text-slate-300">Taste traditional Kyoto street food and matcha delicacies.</p>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -bottom-10 -left-10 border border-white/10 bg-black/60 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex items-center gap-4 animate-bounce-slow">
               <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                 <Wallet className="w-6 h-6 text-emerald-400" />
               </div>
               <div>
                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Budget</p>
                 <p className="font-black text-2xl text-white">$850<span className="text-sm text-slate-500 font-medium">.00</span></p>
               </div>
            </div>

            <div className="absolute -top-10 -right-10 border border-white/10 bg-black/60 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col gap-3 animate-float">
               <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Smart Packing</p>
               <div className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                 </div>
                 <span className="text-sm font-medium text-white">Hiking shoes</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                 </div>
                 <span className="text-sm font-medium text-white">JR Pass</span>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Calendar, color: 'text-blue-400', bg: 'bg-blue-500/10', title: 'Hyper-Personalized', desc: 'AI crafts realistic, geographically logical day-by-day plans based on your specific pace.' },
            { icon: Wallet, color: 'text-emerald-400', bg: 'bg-emerald-500/10', title: 'Smart Budgeting', desc: 'Get a realistic breakdown of costs for food, transport, and activities tailored to your wallet.' },
            { icon: Sparkles, color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', title: 'Contextual Packing', desc: 'Never forget essentials. AI creates a checklist based on your destination\'s weather and activities.' }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
               <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
               </div>
               <h3 className="text-2xl font-bold mb-3 tracking-tight text-white">{feature.title}</h3>
               <p className="text-slate-400 font-medium leading-relaxed">
                 {feature.desc}
               </p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
