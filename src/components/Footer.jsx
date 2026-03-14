import React from 'react';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="pt-24 pb-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* CTA Banner - Matched to image */}
        <div className="relative rounded-[4rem] overflow-hidden mb-24 min-h-[400px] flex items-center justify-center p-12">
          {/* Grayscale Map/Beach Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center grayscale opacity-90 scale-110"
            style={{ backgroundImage: "url('/images/hero-bg.png')" }}
          ></div>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          
          <div className="relative z-10 text-center max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-8 leading-tight drop-shadow-lg">
              Ready to Start Your <br /> Adventure?
            </h2>
            <p className="text-white/70 mb-12 text-lg font-light leading-relaxed">
              Join thousands of travelers exploring the "Island of Dreams" every day. Find your perfect escape with Djerba Touriste.
            </p>
            <Link 
              to="/chat" 
              className="bg-[#FF8C00] hover:bg-[#E67E00] text-white px-12 py-5 rounded-[1.5rem] font-bold shadow-[0_20px_40px_-10px_rgba(255,140,0,0.5)] transition-all active:scale-95 text-xl inline-block"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-8 cursor-pointer group">
            <div className="w-10 h-10 bg-[#FF8C00] rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:rotate-12 transition-transform">
               <Globe className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-[#1A1A1A]">
              Djerba <span className="text-[#FF8C00]">Touriste</span>
            </span>
          </Link>
          
          <p className="text-gray-400 text-sm mb-12 max-w-sm text-center font-medium leading-relaxed">
            Crafting unforgettable island memories since 2024. Your premier guide to the beauty of Djerba.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-12 font-bold text-sm uppercase tracking-[0.15em] text-gray-400 mb-16">
            <Link to="/privacy" className="hover:text-[#FF8C00] transition-colors border-b-2 border-transparent hover:border-orange-100 pb-1">Privacy</Link>
            <Link to="/terms" className="hover:text-[#FF8C00] transition-colors border-b-2 border-transparent hover:border-orange-100 pb-1">Terms</Link>
            <Link to="/contact" className="hover:text-[#FF8C00] transition-colors border-b-2 border-transparent hover:border-orange-100 pb-1">Contact</Link>
            <Link to="/about" className="hover:text-[#FF8C00] transition-colors border-b-2 border-transparent hover:border-orange-100 pb-1">About</Link>
          </div>

          <div className="w-full pt-12 border-t border-gray-50 flex flex-col items-center">
            <p className="text-[11px] text-gray-300 font-bold uppercase tracking-[0.3em]">
              © 2024 Djerba Touriste. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
