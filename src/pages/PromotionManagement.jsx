import React, { useState } from 'react';
import { 
  Tag as TagIcon, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Percent, 
  Eye, 
  ArrowRight,
  Sparkles,
  Gift
} from 'lucide-react';

const PromotionManagement = () => {
  const [activeTab, setActiveTab] = useState('active');

  const stats = [
    { label: "Promotions Actives", value: "3", change: "+1 ce mois", trend: "up", icon: <TagIcon className="w-5 h-5 text-[#FF8C00]" /> },
    { label: "Ventes générées", value: "48", change: "+12% vs mois dernier", trend: "up", icon: <TrendingUp className="w-5 h-5 text-green-500" /> },
    { label: "Taux de conversion", value: "14.2%", change: "+2.4%", trend: "up", icon: <Percent className="w-5 h-5 text-blue-500" /> },
  ];

  const promotions = [
    {
      id: "PROMO-001",
      title: "Offre Spéciale Été",
      code: "SUMMER15",
      type: "Pourcentage",
      value: "-15%",
      services: ["Suite Royale", "Chambre Double"],
      startDate: "01 Juin 2024",
      endDate: "31 Août 2024",
      usages: 34,
      maxUsages: 100,
      status: "active"
    },
    {
      id: "PROMO-002",
      title: "Pack Découverte Djerba",
      code: "DECOUVERTE2024",
      type: "Montant fixe",
      value: "-50 TND",
      services: ["Excursion Île aux Flamants"],
      startDate: "15 Août 2024",
      endDate: "30 Sept 2024",
      usages: 12,
      maxUsages: 50,
      status: "active"
    },
    {
      id: "PROMO-003",
      title: "Early Bird Hiver",
      code: "WINTER20",
      type: "Pourcentage",
      value: "-20%",
      services: ["Tous les services"],
      startDate: "01 Nov 2024",
      endDate: "31 Déc 2024",
      usages: 0,
      maxUsages: Infinity,
      status: "scheduled"
    },
    {
      id: "PROMO-004",
      title: "Flash Sale Ramadan",
      code: "RAMADAN30",
      type: "Pourcentage",
      value: "-30%",
      services: ["Dîner Spectacle"],
      startDate: "10 Mars 2024",
      endDate: "09 Avril 2024",
      usages: 124,
      maxUsages: 150,
      status: "expired"
    }
  ];

  const filteredPromotions = promotions.filter(p => {
     if (activeTab === 'all') return true;
     return p.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Brand */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-orange-100">
                <Gift className="text-[#FF8C00] w-6 h-6" />
             </div>
             <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Promotions & Offres</h1>
                <p className="text-sm font-medium text-gray-400 mt-1">Créez des codes promo et boostez vos réservations.</p>
             </div>
          </div>
          
          <button className="w-full sm:w-auto bg-[#1A1A1A] hover:bg-[#FF8C00] text-white px-8 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 group relative overflow-hidden">
             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
             <Plus className="w-5 h-5 relative z-10" />
             <span className="relative z-10">Créer une offre</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
               <div className="bg-gray-50 text-[10px] font-bold text-gray-500 px-2.5 py-1 rounded-lg absolute top-8 right-8 uppercase tracking-widest flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" /> {stat.change}
               </div>
               <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {stat.icon}
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
               <h3 className="text-3xl font-black text-gray-900 leading-none">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Tab Navigation & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
           <div className="bg-white border border-gray-100 rounded-[20px] p-1.5 flex flex-wrap items-center gap-1 shadow-sm w-full md:w-auto">
              {[
                { id: 'all', label: 'Toutes' },
                { id: 'active', label: 'Actives' },
                { id: 'scheduled', label: 'Programmées' },
                { id: 'expired', label: 'Expirées' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 md:flex-none py-2.5 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                    activeTab === tab.id 
                    ? 'bg-[#FF8C00] text-white shadow-md shadow-orange-500/20' 
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
           </div>

           <div className="relative w-full md:w-72 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF8C00] transition-colors" />
              <input 
                 type="text" 
                 placeholder="Rechercher par code ou nom..." 
                 className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-[20px] text-sm font-medium focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all shadow-sm"
              />
           </div>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPromotions.map((promo) => (
             <div key={promo.id} className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm hover:shadow-lg hover:border-orange-100 transition-all group flex flex-col relative overflow-hidden">
                
                {/* Status Badge & Actions */}
                <div className="flex items-start justify-between mb-8 relative z-10">
                   <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg border shadow-sm
                         ${promo.status === 'active' ? 'bg-[#FF8C00] text-white border-orange-500 shadow-orange-500/20' : 
                           promo.status === 'scheduled' ? 'bg-blue-50 text-blue-500 border-blue-100' : 
                           'bg-gray-50 text-gray-400 border-gray-200'}
                      `}>
                         {promo.value}
                      </div>
                      <div>
                         <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-[#FF8C00] transition-colors">{promo.title}</h3>
                         <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-black text-gray-500 bg-gray-100 px-2 py-1 rounded-md uppercase tracking-widest">{promo.code}</span>
                            <span className={`w-2 h-2 rounded-full ${
                               promo.status === 'active' ? 'bg-green-500 animate-pulse' : 
                               promo.status === 'scheduled' ? 'bg-blue-500' : 'bg-gray-300'
                            }`}></span>
                         </div>
                      </div>
                   </div>

                   <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                   </button>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 mb-8 relative z-10">
                   <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5"><Calendar className="w-3 h-3"/> Validité</p>
                      <p className="text-xs font-bold text-gray-900">{promo.startDate} - {promo.endDate}</p>
                   </div>
                   <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5"><Sparkles className="w-3 h-3"/> Services</p>
                      <p className="text-xs font-bold text-gray-900 truncate" title={promo.services.join(', ')}>{promo.services.length === 1 && promo.services[0] === "Tous les services" ? "Tous les services" : `${promo.services.length} service(s)`}</p>
                   </div>
                </div>

                {/* Usage Progress */}
                <div className="mt-auto relative z-10 w-full">
                   <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                         <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Utilisations</span>
                         <span className="text-xs font-black text-[#FF8C00]">
                            {promo.usages} / {promo.maxUsages === Infinity ? '∞' : promo.maxUsages}
                         </span>
                      </div>
                      {promo.maxUsages !== Infinity && (
                         <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div 
                               className={`h-full rounded-full transition-all duration-1000 ${
                                  (promo.usages / promo.maxUsages) > 0.9 ? 'bg-red-500' : 'bg-[#FF8C00]'
                               }`}
                               style={{ width: `${(promo.usages / promo.maxUsages) * 100}%` }}
                            ></div>
                         </div>
                      )}
                   </div>
                </div>

                {/* Decorative background mapping to status */}
                {promo.status === 'active' && (
                   <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-colors pointer-events-none"></div>
                )}
             </div>
          ))}

          {/* Create New Promo Card (Appears at end) */}
          {activeTab !== 'expired' && (
             <button className="bg-white/50 border-2 border-dashed border-gray-200 rounded-[40px] p-8 hover:bg-orange-50/30 hover:border-orange-200 transition-all flex flex-col items-center justify-center text-center group min-h-[320px]">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-orange-200 transition-all">
                   <Plus className="w-8 h-8 text-gray-300 group-hover:text-[#FF8C00]" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-[#FF8C00] transition-colors">Nouvelle Promotion</h3>
                <p className="text-xs font-bold text-gray-400 max-w-xs">Attirez plus de clients en proposant des réductions saisonnières ou des offres de dernière minute.</p>
             </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default PromotionManagement;
