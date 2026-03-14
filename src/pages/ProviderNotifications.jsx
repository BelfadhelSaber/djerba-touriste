import React from 'react';
import { 
  Bell, 
  Search, 
  Settings, 
  Calendar, 
  Star, 
  CheckCircle, 
  AlertTriangle,
  Info,
  CreditCard,
  UserCheck,
  ChevronRight,
  TrendingUp,
  Circle
} from 'lucide-react';

const ProviderNotifications = () => {
  const stats = [
    { label: "Unread", value: "12", change: "+20%", trend: "up", secondary: "New since your last login", tag: "UPDATES" },
    { label: "Priority Alerts", value: "03", change: "Critical", trend: "warning", secondary: "Action required immediately", icon: <AlertTriangle className="w-4 h-4 text-orange-500" /> },
    { label: "New Reviews", value: "08", change: "Awaiting your response", trend: "stable", secondary: "80% response rate", icon: <Star className="w-4 h-4 text-yellow-500" /> },
    { label: "Verification", value: "95%", change: "Profile completion status", trend: "success", secondary: "Almost verified", icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
  ];

  const notifications = [
    {
      id: 1,
      type: "booking",
      title: "New Booking Received",
      content: "A new reservation has been made for your 'Sunset Djerba Desert Tour' on Oct 24, 2023. Total 4 adults.",
      time: "2 mins ago",
      status: "unread",
      icon: <Calendar className="w-5 h-5 text-orange-500" />,
      actions: ["View Booking", "Dismiss"]
    },
    {
      id: 2,
      type: "review",
      title: "Review Received",
      content: "\"The experience was magical! Our guide was very knowledgeable about Djerbian culture. Highly recommended.\" - ⭐⭐⭐⭐⭐",
      time: "1 hour ago",
      status: "unread",
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      actions: ["Reply to Review"]
    },
    {
      id: 3,
      type: "verification",
      title: "Identity Document Validated",
      content: "Your professional license has been verified by the Djerba Tourism Authority. Your profile now carries the 'Verified' badge.",
      time: "5 hours ago",
      status: "read",
      icon: <UserCheck className="w-5 h-5 text-green-500" />,
      actions: ["View Badge"]
    },
    {
      id: 4,
      type: "system",
      title: "System Update",
      content: "Platform Version 2.4.0 is live. Improved booking calendar and new analytics dashboard for seasonal trends.",
      time: "Yesterday",
      status: "read",
      icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
      actions: ["Release Notes"]
    },
    {
      id: 5,
      type: "payment",
      title: "Payment Failed",
      content: "The withdrawal of 1,200 € could not be processed due to incorrect billing information. Please update your details.",
      time: "2 days ago",
      status: "read",
      icon: <CreditCard className="w-5 h-5 text-red-500" />,
      actions: ["Update Billing"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-4 sm:px-0">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <input 
               type="text" 
               placeholder="Search alerts..." 
               className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all shadow-sm"
             />
          </div>
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
               <p className="text-[12px] font-bold text-gray-900">Mahmoud Ben Ali</p>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Premium Provider</p>
             </div>
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mahmoud" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Profile" />
          </div>
        </div>
      </div>

      {/* Stats Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 px-4 sm:px-0">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-3">
               <span className="text-sm font-medium text-gray-400">{stat.label}</span>
               {stat.tag ? (
                 <span className="bg-orange-50 text-[10px] font-bold text-orange-500 px-2 py-0.5 rounded uppercase tracking-wider">{stat.tag}</span>
               ) : (
                  stat.icon
               )}
            </div>
            <div className="flex items-center gap-2 mb-1">
               <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
               {stat.change.includes('%') && (
                 <span className="text-xs font-bold text-green-500 flex items-center">
                   <TrendingUp className="w-3 h-3 mr-0.5" /> {stat.change}
                 </span>
               )}
            </div>
            <p className="text-[11px] text-gray-400 font-medium">{stat.secondary}</p>
          </div>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden m-4 sm:m-0">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-10">
          <h2 className="text-lg font-bold text-gray-900">Recent Notifications</h2>
          <button className="text-[12px] font-bold text-orange-500 hover:text-orange-600 transition-colors uppercase tracking-wider">Mark all as read</button>
        </div>

        <div className="divide-y divide-gray-50">
          {notifications.map((notif) => (
            <div key={notif.id} className={`p-8 hover:bg-gray-50/50 transition-colors relative group ${notif.status === 'unread' ? 'bg-orange-50/10' : ''}`}>
              <div className="flex gap-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110 ${
                   notif.type === 'booking' ? 'bg-orange-50' : 
                   notif.type === 'review' ? 'bg-yellow-50' : 
                   notif.type === 'verification' ? 'bg-green-50' : 
                   notif.type === 'system' ? 'bg-blue-50' : 'bg-red-50'
                }`}>
                  {notif.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-bold text-gray-900">{notif.title}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] text-gray-400 font-medium">{notif.time}</span>
                      {notif.status === 'unread' && <Circle className="w-2 h-2 fill-orange-500 text-orange-500" />}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-3xl">{notif.content}</p>
                  
                  <div className="flex items-center gap-3">
                    {notif.actions.map((action, idx) => (
                      <button 
                        key={idx} 
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                          idx === 0 
                            ? 'bg-[#FF8C00] text-white shadow-lg shadow-orange-500/10 hover:bg-[#E67E00]' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 bg-gray-50/50 text-center border-t border-gray-50">
           <button className="text-sm font-bold text-gray-500 hover:text-[#FF8C00] transition-colors inline-flex items-center gap-2">
             Load older notifications <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      </div>

      {/* Bottom Sticky Action Area */}
      <div className="mt-8 px-4 sm:px-0">
         <div className="bg-[#FF8C00] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-orange-500/20">
            <div>
              <h3 className="text-lg font-bold mb-1">Stay updated on the go</h3>
              <p className="text-orange-50 text-sm opacity-90 font-medium">Download the mobile app to receive instant push notifications for every booking.</p>
            </div>
            <div className="flex gap-3 shrink-0">
               <button className="bg-white text-[#FF8C00] px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-50 transition-colors">App Store</button>
               <button className="bg-black/20 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-black/30 transition-colors">Play Store</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProviderNotifications;
