import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  DollarSign, 
  Calendar,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  Star,
  AlertCircle
} from 'lucide-react';
import providerApi from '../services/providerApi';

const AgencyDashboard = () => {
  const [stats, setStats] = useState([
    { title: "Revenus (30 jours)", value: "0 TND", trend: "0%", isPositive: true, icon: DollarSign, color: "bg-green-50 text-green-500" },
    { title: "Réservations", value: "0", trend: "0%", isPositive: true, icon: Calendar, color: "bg-blue-50 text-blue-500" },
    { title: "Vues du profil", value: "N/A", trend: "-", isPositive: true, icon: Eye, color: "bg-purple-50 text-purple-500" },
    { title: "Nouveaux clients", value: "0", trend: "-", isPositive: true, icon: Users, color: "bg-orange-50 text-[#FF8C00]" }
  ]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const providerId = providerApi.getProviderId();
        if (!providerId) return;

        const [bookingsData, servicesData] = await Promise.all([
            providerApi.getBookings(providerId),
            providerApi.getServices(providerId)
        ]);
        
        const servicesMap = {};
        if (servicesData) {
            servicesData.forEach(s => { servicesMap[s.id] = s.title; });
        }

        const validBookings = bookingsData || [];
        
        // Compute Total Revenue (Confirmed)
        const revenue = validBookings
            .filter(b => b.status === "CONFIRMED")
            .reduce((sum, b) => sum + (b.totalAmount || b.totalPrice || 0), 0);
            
        // Compute Unique Clients
        const uniqueClients = new Set(validBookings.map(b => b.userId)).size;

        setStats([
            { title: "Revenus (Total)", value: `${revenue} TND`, trend: "Actif", isPositive: true, icon: DollarSign, color: "bg-green-50 text-green-500" },
            { title: "Réservations", value: validBookings.length.toString(), trend: "Nouveau", isPositive: true, icon: Calendar, color: "bg-blue-50 text-blue-500" },
            { title: "Services Actifs", value: (servicesData?.length || 0).toString(), trend: "-", isPositive: true, icon: Eye, color: "bg-purple-50 text-purple-500" },
            { title: "Clients uniques", value: uniqueClients.toString(), trend: "Actif", isPositive: true, icon: Users, color: "bg-orange-50 text-[#FF8C00]" }
        ]);

        // Map recent bookings (take last 4)
        const mappedRecent = validBookings.slice().reverse().slice(0, 4).map(b => ({
            id: `RES-${b.id}`,
            guest: `Client #${b.userId}`,
            service: servicesMap[b.serviceId] || `Service #${b.serviceId}`,
            date: b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : 'Aujourd\'hui',
            amount: `${b.totalAmount || b.totalPrice || 0} TND`,
            status: b.status.toLowerCase()
        }));

        setRecentBookings(mappedRecent);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
           <div>
             <h1 className="text-3xl font-black text-gray-900 mb-2 mt-4 tracking-tight">Bonjour, Hôtel Amel 👋</h1>
             <p className="text-gray-400 font-medium tracking-wide">Voici un aperçu de vos performances sur les 30 derniers jours.</p>
           </div>
           
           <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-3 aspect-square md:aspect-auto bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                 <Filter className="w-4 h-4" />
                 <span className="hidden md:inline">Filtrer</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-3 aspect-square md:aspect-auto bg-[#1A1A1A] hover:bg-[#FF8C00] text-white rounded-2xl text-sm font-bold shadow-lg transition-colors group">
                 <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                 <span className="hidden md:inline">Exporter</span>
              </button>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
           {stats.map((stat, idx) => (
             <div key={idx} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center justify-between mb-8">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform shadow-sm`}>
                      <stat.icon className="w-6 h-6" />
                   </div>
                   <div className={`flex items-center gap-1 font-bold text-sm px-3 py-1.5 rounded-lg ${stat.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      {stat.trend}
                   </div>
                </div>
                <div>
                   <h3 className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-2">{stat.title}</h3>
                   <p className="text-3xl font-black text-gray-900 leading-none">{stat.value}</p>
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Chart Area (Mock) */}
           <div className="lg:col-span-8">
              <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 h-full min-h-[400px] flex flex-col relative overflow-hidden group">
                 {/* Decorative background blur */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-orange-500/10 transition-colors"></div>
                 
                 <div className="flex items-center justify-between mb-8 relative z-10">
                    <div>
                       <h2 className="text-xl font-black text-gray-900">Évolution des Revenus</h2>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Comparé au mois précédent</p>
                    </div>
                    <select className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-700 outline-none hover:bg-orange-50 hover:text-orange-500 hover:border-orange-100 transition-colors appearance-none cursor-pointer">
                       <option>Cet été (Juin - Août)</option>
                       <option>Cette année</option>
                       <option>Mois dernier</option>
                    </select>
                 </div>

                 <div className="flex-1 flex items-end gap-2 mt-10 relative z-10">
                    {/* Mock Bar Chart */}
                    {[40, 65, 45, 80, 50, 95, 70, 100, 85, 60, 45, 75].map((height, i) => (
                       <div key={i} className="flex-1 flex flex-col items-center gap-3 group/bar">
                          <div className="w-full relative flex items-end h-[200px]">
                             <div 
                                className="w-full bg-gray-100 rounded-t-xl group-hover/bar:bg-orange-100 transition-colors relative"
                                style={{ height: `${height}%` }}
                             >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white text-[10px] font-bold px-3 py-2 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                                   {height * 120} TND
                                </div>
                             </div>
                             {i === 7 && (
                                <div 
                                   className="absolute bottom-0 w-full bg-[#FF8C00] rounded-t-xl shadow-lg shadow-orange-500/20"
                                   style={{ height: `${height}%` }}
                                ></div>
                             )}
                          </div>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${i === 7 ? 'text-[#FF8C00]' : 'text-gray-300 group-hover/bar:text-gray-900 transition-colors'}`}>
                             {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                          </span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Sidebar Info */}
           <div className="lg:col-span-4 space-y-8">
              {/* Recent Bookings List */}
              <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
                 <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-black text-gray-900">Activité Récente</h2>
                    <button className="text-[10px] font-bold text-orange-500 uppercase tracking-widest hover:text-orange-600">Voir tout</button>
                 </div>
                 
                 <div className="space-y-6">
                    {recentBookings.length === 0 ? (
                       <div className="text-center py-8">
                         <p className="text-sm font-bold text-gray-400">Aucune activité récente.</p>
                       </div>
                    ) : (
                       recentBookings.map((booking, i) => (
                       <div key={i} className="flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border
                                ${booking.status === 'confirmed' ? 'bg-green-50 text-green-500 border-green-100' : 
                                  booking.status === 'pending' ? 'bg-orange-50 text-[#FF8C00] border-orange-100' : 
                                  'bg-red-50 text-red-500 border-red-100'}`}
                             >
                                {booking.status === 'confirmed' ? <CheckCircle2 className="w-5 h-5"/> : 
                                 booking.status === 'pending' ? <Clock className="w-5 h-5"/> : 
                                 <AlertCircle className="w-5 h-5"/>}
                             </div>
                             <div>
                                <p className="text-sm font-bold text-gray-900 leading-tight group-hover:text-[#FF8C00] transition-colors">{booking.guest}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest truncate max-w-[120px]">{booking.service}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-sm font-black text-gray-900 leading-tight">{booking.amount}</p>
                             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{booking.date}</p>
                          </div>
                       </div>
                    )))}
                 </div>
              </div>

              {/* Performance Indicator Card */}
              <div className="bg-[#1A1A1A] rounded-[40px] p-8 text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF8C00]/20 rounded-full -mr-16 -mt-16 blur-xl"></div>
                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                       <div className="w-10 h-10 bg-[#FF8C00] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                          <Star className="w-5 h-5 text-white fill-white" />
                       </div>
                       <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight">Super Hôte</p>
                          <p className="font-black text-lg">Niveau 4</p>
                       </div>
                    </div>
                    <p className="text-gray-300 text-sm font-medium leading-relaxed mb-6">Vous êtes dans le top <span className="text-white font-bold">5%</span> des prestataires sur Djerba. Continuez ainsi pour débloquer le badge Or !</p>
                    
                    {/* Progress */}
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                          <span className="text-gray-400">Progression</span>
                          <span className="text-[#FF8C00]">85%</span>
                       </div>
                       <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#FF8C00] rounded-full w-[85%] relative">
                             <div className="absolute inset-0 bg-white/20"></div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default AgencyDashboard;
