import React from 'react';
import { 
  FileText, 
  MapPin, 
  BookOpen, 
  Eye, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  MoreVertical
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex-1">
    <div className="flex justify-between items-start mb-6">
      <div className={`w-12 h-12 ${color.bg} ${color.text} rounded-2xl flex items-center justify-center shadow-sm`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-green-500 font-bold text-[10px]">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </div>
      )}
    </div>
    <div className="space-y-1">
      <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">{label}</p>
      <h3 className="text-3xl font-display font-bold text-[#1A1A1A]">{value}</h3>
    </div>
  </div>
);

const ContentManagement = () => {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-[#1A1A1A] mb-1">Gestion des Contenus Touristiques</h1>
          <p className="text-xs text-gray-400 font-medium tracking-wide">Gérez les articles, points d'intérêt et guides de voyage pour l'île de Djerba.</p>
        </div>
        <button className="flex items-center gap-3 bg-[#FF8C00] hover:bg-[#E67E00] text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-orange-500/20 transition-all active:scale-95">
          <Plus className="w-5 h-5" /> Ajouter Contenu
        </button>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-col lg:flex-row gap-6">
        <StatCard 
          icon={FileText} 
          label="Total Articles" 
          value="128" 
          trend="+12%" 
          color={{ bg: 'bg-orange-50', text: 'text-orange-500' }} 
        />
        <StatCard 
          icon={MapPin} 
          label="Points d'Intérêt" 
          value="85" 
          trend="+5%" 
          color={{ bg: 'bg-green-50', text: 'text-green-500' }} 
        />
        <StatCard 
          icon={BookOpen} 
          label="Guides de Voyage" 
          value="24" 
          trend="+2%" 
          color={{ bg: 'bg-blue-50', text: 'text-blue-500' }} 
        />
        <StatCard 
          icon={Eye} 
          label="Vues Totales" 
          value="45.2k" 
          trend="+18%" 
          color={{ bg: 'bg-purple-50', text: 'text-purple-500' }} 
        />
      </div>

      {/* Content Table Container */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="relative group flex-1 max-w-xl">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF8C00] transition-colors" />
             <input type="text" placeholder="Rechercher un contenu..." className="w-full pl-16 pr-6 py-4 bg-gray-50 border-none rounded-[1.5rem] text-sm font-medium outline-none focus:ring-2 focus:ring-orange-100 transition-all" />
          </div>
          <div className="flex items-center gap-3">
             <div className="flex bg-gray-50 p-1.5 rounded-2xl">
               {['Tous', 'Articles', 'POI', 'Guides'].map((tab, i) => (
                 <button key={tab} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                   i === 0 ? 'bg-[#FF8C00] text-white shadow-lg shadow-orange-500/10' : 'text-gray-400 hover:text-gray-600'
                 }`}>
                   {tab}
                 </button>
               ))}
             </div>
             <button className="flex items-center gap-2 px-6 py-3.5 bg-gray-50 text-gray-500 rounded-[1.2rem] font-bold text-xs hover:bg-gray-100 transition-colors">
               <Filter className="w-4 h-4" /> Filtrer
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contenu</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Catégorie</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Auteur</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Statut</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { 
                  title: 'Les plus belles plages de Djerba', 
                  type: 'Article', 
                  views: '5.2k', 
                  category: 'Nature', 
                  author: 'Amira B.', 
                  date: '12 Mai 2024', 
                  status: 'Publié',
                  image: '/images/resort.png'
                },
                { 
                  title: 'Synagogue de la Ghriba', 
                  type: 'POI', 
                  views: '12.8k', 
                  category: 'Culture', 
                  author: 'Admin', 
                  date: '08 Mai 2024', 
                  status: 'Publié',
                  image: '/images/tour.png'
                },
                { 
                  title: 'Route de la Gastronomie', 
                  type: 'Guide', 
                  views: '1.1k', 
                  category: 'Gastronomie', 
                  author: 'Yassine K.', 
                  date: '15 Mai 2024', 
                  status: 'Brouillon',
                  image: '/images/scuba.png'
                },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/10 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                       <div className="w-16 h-12 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                         <img src={row.image} alt={row.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                       </div>
                       <div>
                         <p className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#FF8C00] transition-colors">{row.title}</p>
                         <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{row.type} • {row.views} vues</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="bg-orange-50 text-[#FF8C00] px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">
                      {row.category}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-sm font-semibold text-gray-600">{row.author}</td>
                  <td className="px-10 py-8">
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter leading-tight">
                      {row.date.split(' ').slice(0, 2).join(' ')}<br/>{row.date.split(' ')[2]}
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                      row.status === 'Publié' ? 'text-green-500' : 'text-slate-400'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${row.status === 'Publié' ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
                      {row.status}
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2">
                      <button className="p-2.5 bg-gray-50 hover:bg-orange-50 text-gray-400 hover:text-[#FF8C00] rounded-xl transition-all"><Eye className="w-4 h-4" /></button>
                      <button className="p-2.5 bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-500 rounded-xl transition-all"><Edit3 className="w-4 h-4" /></button>
                      <button className="p-2.5 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-10 border-t border-gray-50 flex items-center justify-between">
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">Affichage de 1-10 sur 128 résultats</p>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-300 hover:text-[#FF8C00] transition-colors"><ChevronLeft className="w-6 h-6" /></button>
              <div className="flex items-center gap-1">
                <button className="w-10 h-10 bg-[#FF8C00] rounded-xl text-white font-bold text-xs">1</button>
                <button className="w-10 h-10 rounded-xl text-gray-400 font-bold text-xs hover:bg-gray-50">2</button>
                <button className="w-10 h-10 rounded-xl text-gray-400 font-bold text-xs hover:bg-gray-50">3</button>
              </div>
              <button className="p-2 text-gray-600 hover:text-[#FF8C00] transition-colors"><ChevronRight className="w-6 h-6" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
