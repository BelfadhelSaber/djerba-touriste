import React from 'react';
import { Bot, Sparkles, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIGuide = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto bg-[#FFFBF7] rounded-[4rem] p-12 lg:p-24 flex flex-col lg:flex-row items-center gap-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-[#FF8C00]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#FF8C00]/5 rounded-full blur-2xl"></div>
        
        <div className="flex-1 text-center lg:text-left relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#FF8C00]/10 text-[#FF8C00] px-5 py-2 rounded-full font-bold text-xs uppercase tracking-[0.2em] mb-8 shadow-sm">
            <Sparkles className="w-4 h-4" />
            AI Personalized
          </div>
          <h2 className="text-5xl lg:text-6xl font-display font-bold text-[#1A1A1A] mb-8 leading-tight">
            Smart Planning with<br /> Our AI Guide
          </h2>
          <p className="text-gray-500 text-xl mb-12 max-w-xl leading-relaxed font-normal">
            Don't know where to start? Let our AI understand your preferences and suggest the perfect itinerary for your Djerba getaway. Based on real-time data and local insights.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link 
              to="/chat" 
              className="w-full sm:w-auto bg-[#FF8C00] hover:bg-[#E67E00] text-white px-10 py-5 rounded-[1.5rem] font-bold shadow-xl shadow-orange-500/20 transition-all active:scale-95 flex items-center justify-center gap-3 text-lg"
            >
              <Bot className="w-6 h-6" />
              Talk to DjerbaBot
            </Link>
            <button className="w-full sm:w-auto bg-white border-2 border-gray-50 hover:border-[#FF8C00]/20 px-10 py-5 rounded-[1.5rem] font-bold text-[#1A1A1A] transition-all text-lg shadow-sm">
              Learn How It Works
            </button>
          </div>
        </div>

        {/* Mock Chat UI - Refined to match image */}
        <div className="flex-1 w-full max-w-md relative z-10">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] border border-gray-50">
            <div className="flex items-center gap-4 mb-10 border-b border-gray-50 pb-6">
              <div className="w-12 h-12 bg-[#FF8C00] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                <Bot className="text-white w-7 h-7" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#1A1A1A] text-lg">DjerbaBot Assistant</h4>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Online & Ready to help</span>
                </div>
              </div>
            </div>

            <div className="space-y-8 mb-10 min-h-[180px]">
              <div className="flex justify-end">
                <div className="bg-gray-50/80 p-5 rounded-3xl rounded-tr-none text-[#555] max-w-[85%] text-sm leading-relaxed shadow-sm italic">
                  "I'm looking for a quiet boutique hotel near Guellala..."
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-[#FFFBF7] p-5 rounded-3xl rounded-tl-none text-[#555] max-w-[85%] text-sm leading-relaxed border border-orange-100/50 shadow-sm relative">
                  <span className="font-bold text-[#FF8C00] block mb-2 text-xs uppercase tracking-widest">DjerbaBot:</span>
                  I found 3 hidden gems! **Hotel Sidi Ali** is famous for its sunset views and traditional architecture.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50/50 px-6 py-4 rounded-2xl border border-gray-100 group transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-100">
              <span className="text-sm text-gray-400 font-medium flex-1">Type your question...</span>
              <Send className="w-5 h-5 text-[#FF8C00] cursor-pointer hover:scale-110 transition-transform" />
            </div>
          </div>
          
          {/* Abstract decoration behind chat */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-100/30 rounded-3xl -z-10 blur-xl"></div>
        </div>
      </div>
    </section>
  );
};

export default AIGuide;
