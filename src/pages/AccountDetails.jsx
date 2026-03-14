import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  ChevronRight, 
  Camera, 
  Calendar, 
  MapPin, 
  Heart, 
  Shield, 
  Bell, 
  Settings,
  ArrowRight,
  Globe,
  Compass,
  Zap,
  CheckCircle2
} from 'lucide-react';

const AccountDetails = () => {
  const tabs = [
    { label: "Personal Info", icon: User, active: true },
    { label: "My Bookings", icon: Calendar, active: false },
    { label: "Saved Places", icon: Heart, active: false },
    { label: "Security", icon: Shield, active: false },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Header with Hero Profile */}
      <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm relative overflow-hidden mb-12">
         <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50/50 rounded-full -mr-32 -mt-32 blur-3xl"></div>
         <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
               <div className="relative group">
                  <div className="w-32 h-32 rounded-full border-[6px] border-white shadow-xl overflow-hidden ring-4 ring-orange-50 transition-transform group-hover:scale-105">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed" className="w-full h-full object-cover" alt="Profile" />
                  </div>
                  <button className="absolute bottom-1 right-1 bg-[#FF8C00] p-2.5 rounded-full border-4 border-white shadow-lg text-white hover:bg-[#E67E00] transition-all">
                     <Camera className="w-4 h-4" />
                  </button>
               </div>
               
               <div>
                  <h1 className="text-4xl font-black text-gray-900 mb-2">Ahmed Ben Salem</h1>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest">
                     <MapPin className="w-4 h-4 text-orange-500" />
                     Djerba, Tunisia
                  </div>
               </div>
            </div>

            <button className="bg-[#FF8C00] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-orange-500/20 hover:bg-[#E67E00] transition-all active:scale-95 group">
               <IconEdit className="w-5 h-5 group-hover:rotate-12 transition-transform" />
               Edit Profile
            </button>
         </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-4 mb-12 border-b border-gray-100 pb-2 overflow-x-auto no-scrollbar">
         {tabs.map((tab) => (
            <button key={tab.label} className={`flex items-center gap-3 px-6 py-4 rounded-t-2xl font-bold text-sm transition-all whitespace-nowrap relative ${
               tab.active ? 'text-[#FF8C00] bg-white' : 'text-gray-400 hover:text-gray-600'
            }`}>
               <tab.icon className={`w-4 h-4 ${tab.active ? 'text-[#FF8C00]' : 'text-gray-400'}`} />
               {tab.label}
               {tab.active && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF8C00] rounded-t-full"></div>}
            </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Left Column: Forms */}
         <div className="lg:col-span-8 space-y-12">
            <section>
               <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight flex items-center gap-3">
                  Account Details
                  <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
               </h2>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                     <input type="text" defaultValue="Ahmed Ben Salem" className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-orange-100 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                     <input type="email" defaultValue="ahmed.salem@example.com" className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-orange-100 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                     <input type="text" defaultValue="+216 22 456 789" className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-orange-100 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Preferred Language</label>
                     <select className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-orange-100 outline-none transition-all appearance-none cursor-pointer">
                        <option>French</option>
                        <option>Arabic</option>
                        <option>English</option>
                        <option>German</option>
                     </select>
                  </div>
               </div>
               
               <div className="mt-8 flex justify-end">
                  <button className="bg-[#FF8C00] text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:bg-[#E67E00] active:scale-95 transition-all">
                     Save Changes
                  </button>
               </div>
            </section>

            <section>
               <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight flex items-center gap-3">
                  Experience Preferences
                  <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
               </h2>
               
               <div className="space-y-4">
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center justify-between group hover:border-orange-100 transition-all">
                     <div className="flex gap-5">
                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF8C00] shadow-sm">
                           <Zap className="w-6 h-6" />
                        </div>
                        <div>
                           <h4 className="font-bold text-gray-900">AI-Powered Recommendations</h4>
                           <p className="text-xs text-gray-400 font-medium">Personalize your trips based on your history and interests.</p>
                        </div>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-14 h-7 bg-gray-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-6 after:transition-all peer-checked:bg-[#FF8C00]"></div>
                     </label>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center justify-between group hover:border-orange-100 transition-all opacity-80">
                     <div className="flex gap-5">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 shadow-sm">
                           <Compass className="w-6 h-6" />
                        </div>
                        <div>
                           <h4 className="font-bold text-gray-400">Travel Newsletter</h4>
                           <p className="text-xs text-gray-400 font-medium">Receive weekly updates about events and deals in Djerba.</p>
                        </div>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-14 h-7 bg-gray-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-6 after:transition-all peer-checked:bg-[#FF8C00]"></div>
                     </label>
                  </div>
               </div>
            </section>
         </div>

         {/* Right Column: Special Cards */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden group">
               <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-base font-black text-gray-900 uppercase tracking-tight">Next Trip</h3>
                     <span className="bg-green-50 text-green-500 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest border border-green-100">Confirmed</span>
                  </div>
                  <div className="relative h-48 rounded-[24px] overflow-hidden mb-6 shadow-xl">
                     <img src="https://images.unsplash.com/photo-1549412656-9905bbfa069a?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Resort" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                     <div className="absolute bottom-4 left-4">
                        <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">Aug 14 - Aug 21</p>
                        <h4 className="text-lg font-black text-white leading-tight">Hasdrubal Prestige</h4>
                     </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                     <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                        Junior Suite, Garden View
                     </div>
                     <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                        2 Adults, 1 Child
                     </div>
                  </div>
                  
                  <button className="w-full py-4 border-2 border-orange-100 rounded-2xl text-xs font-black text-[#FF8C00] hover:bg-orange-50 transition-all uppercase tracking-[0.2em]">
                     View Full Details
                  </button>
               </div>
            </div>

            <div className="bg-orange-500/5 p-8 rounded-[40px] border border-orange-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF8C00]/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
               <h3 className="text-base font-black text-[#FF8C00] uppercase tracking-tight mb-8">Your Footprint</h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-3xl shadow-sm border border-orange-50">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Visits</p>
                     <p className="text-3xl font-black text-gray-900">12</p>
                  </div>
                  <div className="bg-white p-5 rounded-3xl shadow-sm border border-orange-50">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Points</p>
                     <p className="text-3xl font-black text-gray-900">450</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Mini Footer */}
      <footer className="mt-24 pt-8 border-t border-gray-100 flex flex-col items-center">
         <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] mb-4">Plateforme Touristique Intelligente – Djerba</p>
         <p className="text-[10px] text-gray-400 font-medium">© 2024 Explore Djerba. All rights reserved.</p>
      </footer>
    </div>
  );
};

const IconEdit = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
);

export default AccountDetails;
