import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Check, 
  Settings, 
  Calendar, 
  Tag, 
  MessageCircle, 
  CreditCard, 
  ShieldAlert, 
  ChevronRight,
  MoreHorizontal,
  LayoutGrid,
  Filter
} from 'lucide-react';

const UserNotifications = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All', count: 12 },
    { id: 'bookings', label: 'Bookings', count: 2 },
    { id: 'promotions', label: 'Promotions', count: 5 },
    { id: 'messages', label: 'Messages', count: 3 }
  ];

  const notifications = [
    {
      id: 1,
      type: 'booking',
      title: 'Reservation Confirmed!',
      content: 'Your stay at Hasdrubal Prestige is confirmed for Oct 12. View your digital key in the app.',
      time: '2m ago',
      status: 'unread',
      icon: <Calendar className="w-5 h-5 text-orange-500" />,
      tag: 'BOOKING'
    },
    {
      id: 2,
      type: 'promo',
      title: 'Exclusive: 20% Off Quad Tours',
      content: 'Flash sale for today only! Book a desert sunset tour and get a free traditional dinner included.',
      time: '1h ago',
      status: 'unread',
      icon: <Tag className="w-5 h-5 text-yellow-500" />,
      tag: 'PROMO'
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message from Guide: Amine',
      content: '"Hello! I\'ll be picking you up at the hotel lobby at 9:00 AM instead of 8:30..."',
      time: '3h ago',
      status: 'read',
      icon: <MessageCircle className="w-5 h-5 text-blue-500" />,
      tag: 'MESSAGE'
    },
    {
      id: 4,
      type: 'booking',
      title: 'Payment Successful',
      content: 'Your payment for "Djerba Hood Street Art Tour" has been processed successfully.',
      time: 'Yesterday',
      status: 'read',
      icon: <CreditCard className="w-5 h-5 text-green-500" />,
      tag: 'BOOKING'
    },
    {
      id: 5,
      type: 'security',
      title: 'Security Alert: New Login',
      content: 'We noticed a new login to your Djerba account from a Safari browser on macOS.',
      time: 'Yesterday',
      status: 'unread',
      icon: <ShieldAlert className="w-5 h-5 text-orange-600" />,
      tag: 'SECURITY'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between mb-2">
         <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#FF8C00]">Notifications</span>
         </div>
         <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors shadow-sm">
                <Check className="w-4 h-4" />
                Mark all as read
             </button>
             <button className="p-2 bg-white border border-gray-100 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors shadow-sm">
                <Settings className="w-4 h-4" />
             </button>
         </div>
      </div>

      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Notifications</h1>

      {/* Tabs & Notifications Container */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex items-center gap-8 px-10 py-6 border-b border-gray-50">
           {tabs.map((tab) => (
             <button 
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`flex items-center gap-2 pb-1 relative transition-all ${
                 activeTab === tab.id ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
               }`}
             >
               <span className="text-sm font-bold">{tab.label}</span>
               <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                 activeTab === tab.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'
               }`}>
                 {tab.count}
               </span>
               {activeTab === tab.id && (
                 <div className="absolute -bottom-[25px] left-0 right-0 h-1 bg-[#FF8C00] rounded-full shadow-[0_4px_10px_rgba(255,140,0,0.3)]"></div>
               )}
             </button>
           ))}
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-50">
          {notifications.map((notif) => (
            <div key={notif.id} className={`p-10 hover:bg-[#F8FAFC] transition-all relative group flex gap-8 ${notif.status === 'unread' ? 'before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-[#FF8C00]' : ''}`}>
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-gray-50 ${
                  notif.status === 'unread' ? 'bg-white' : 'bg-gray-50/50'
               }`}>
                  {notif.icon}
               </div>

               <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-gray-900">{notif.title}</h3>
                        {notif.status === 'unread' && <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>}
                     </div>
                     <span className="text-xs font-bold text-gray-400">{notif.time}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-2xl">{notif.content}</p>
                  
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <button className="text-xs font-bold text-[#FF8C00] hover:underline">View Details</button>
                        <button className="text-xs font-bold text-gray-400 hover:text-gray-600">Archive</button>
                     </div>
                     <div className="bg-orange-50 text-[10px] font-bold text-[#FF8C00] px-2 py-0.5 rounded uppercase tracking-wider">
                        {notif.tag}
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>

        <button className="w-full py-5 text-sm font-bold text-gray-500 hover:text-[#FF8C00] transition-colors border-t border-gray-50 flex items-center justify-center gap-2 bg-gray-50/20">
           View older notifications <ChevronRight className="w-4 h-4 translate-y-0.5" />
        </button>
      </div>

      {/* Action Banner */}
      <div className="mt-10 bg-[#FF8C00] rounded-[32px] p-12 text-white shadow-2xl shadow-orange-500/30 overflow-hidden relative group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/15 transition-all"></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
               <h2 className="text-3xl font-extrabold mb-4 leading-tight">Planning your next move?</h2>
               <p className="text-orange-100 font-medium text-lg opacity-80 max-w-lg">Discover the hidden gems of Midoun. Book a guided walking tour and save 15% with your premium tourist pass.</p>
            </div>
            <button className="bg-white text-[#FF8C00] px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-orange-700/20 hover:scale-105 transition-all whitespace-nowrap active:scale-95">
               Explore Activities
            </button>
         </div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 opacity-60">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-lg lowercase">dt</div>
            <span className="font-bold text-gray-900">Djerba Touriste</span>
         </div>
         <div className="flex items-center gap-8 text-[11px] font-bold text-gray-600 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-[#FF8C00] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#FF8C00] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#FF8C00] transition-colors">Support</a>
            <a href="#" className="hover:text-[#FF8C00] transition-colors">Feedback</a>
         </div>
         <p className="text-[11px] font-medium text-gray-400">© 2024 Djerba Tourist Authority</p>
      </div>
    </div>
  );
};

export default UserNotifications;
