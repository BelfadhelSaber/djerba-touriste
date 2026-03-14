import React from 'react';
import { 
  TrendingUp, 
  Percent, 
  Wallet, 
  ChevronRight, 
  Edit3, 
  MoreVertical,
  Filter,
  Search,
  Bed,
  Compass,
  Utensils,
  ArrowUpRight,
  ChevronLeft,
  Settings,
  Bell
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color, currency = "TND" }) => (
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
      {!trend && <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Derniers 30 jours</p>}
    </div>
    <div className="space-y-1">
      <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">{label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-display font-bold text-[#1A1A1A]">{value}</h3>
        <span className="text-sm font-bold text-gray-300">{currency}</span>
      </div>
    </div>
  </div>
);

const RateConfigCard = ({ icon: Icon, label, rate, subtext }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex-1 flex items-center justify-between group hover:border-orange-100 transition-all">
    <div className="flex items-center gap-6">
      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-orange-50 group-hover:text-[#FF8C00] transition-colors">
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-display font-bold text-[#1A1A1A]">{rate}%</span>
          <span className="text-[10px] font-bold text-gray-300 uppercase">par {subtext}</span>
        </div>
      </div>
    </div>
    <button className="p-2 text-gray-300 hover:text-[#FF8C00] transition-colors">
      <Edit3 className="w-5 h-5" />
    </button>
  </div>
);

const CommissionManagement = () => {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold text-[#1A1A1A]">Gestion des Commissions</h1>
        <div className="flex items-center gap-4">
           <div className="relative group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF8C00] transition-colors" />
             <input type="text" placeholder="Rechercher une transaction..." className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-orange-100 transition-all w-64" />
           </div>
           <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-[#FF8C00] transition-colors relative shadow-sm">
             <Bell className="w-5 h-5" />
             <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
           </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-col lg:flex-row gap-6">
        <StatCard 
          icon={Wallet} 
          label="Revenu Total" 
          value="125,450" 
          trend="+12.5%" 
          color={{ bg: 'bg-orange-50', text: 'text-orange-500' }} 
        />
        <StatCard 
          icon={Percent} 
          label="Commissions Totales" 
          value="12,545" 
          trend="+8.2%" 
          color={{ bg: 'bg-green-50', text: 'text-green-500' }} 
        />
        <StatCard 
          icon={TrendingUp} 
          label="Paiements en Attente" 
          value="3,200" 
          color={{ bg: 'bg-blue-50', text: 'text-blue-500' }} 
        />
      </div>

      {/* Rates Configuration */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#FF8C00] rounded-full"></div>
            <h2 className="text-xl font-display font-bold text-[#1A1A1A]">Configuration des Taux par Catégorie</h2>
          </div>
          <button className="text-[11px] font-bold text-[#FF8C00] uppercase tracking-widest hover:underline">Modifier tout</button>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <RateConfigCard icon={Bed} label="HÔTELS" rate="10" subtext="réservation" />
          <RateConfigCard icon={Compass} label="EXCURSIONS" rate="15" subtext="activité" />
          <RateConfigCard icon={Utensils} label="RESTAURANTS" rate="5" subtext="commande" />
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-xl font-display font-bold text-[#1A1A1A]">Transactions Récentes</h3>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-50 text-gray-500 rounded-xl font-bold text-xs hover:bg-gray-100 transition-colors">
            <Filter className="w-4 h-4" />
            Filtrer
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID Transaction</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Prestataire</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Service</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Montant Total</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Commission</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Statut</th>
                <th className="px-10 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { id: '#TR-2024-8842', provider: 'Radisson Blu Djerba', service: 'HÔTEL', amount: '1,250.00', comm: '125.00', date: '12 Mai, 2024', status: 'Payé' },
                { id: '#TR-2024-8841', provider: 'Djerba Adventure', service: 'EXCURSION', amount: '450.00', comm: '67.50', date: '12 Mai, 2024', status: 'En Attente' },
                { id: '#TR-2024-8840', provider: 'Chez Khaled', service: 'RESTAURANT', amount: '180.00', comm: '9.00', date: '11 Mai, 2024', status: 'Payé' },
                { id: '#TR-2024-8839', provider: 'Hasdrubal Prestige', service: 'HÔTEL', amount: '2,100.00', comm: '210.00', date: '11 Mai, 2024', status: 'En Attente' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-10 py-8 text-sm font-bold text-[#1A1A1A]">{row.id}</td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-400 text-xs uppercase tracking-tighter">
                        {row.provider.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{row.provider}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="bg-gray-50 text-gray-400 px-2 py-1 rounded text-[8px] font-bold uppercase tracking-widest border border-gray-100">
                      {row.service}
                    </span>
                  </td>
                  <td className="px-10 py-8 font-display font-bold text-sm text-[#1A1A1A]">{row.amount} <span className="text-[10px] text-gray-400 ml-0.5">TND</span></td>
                  <td className="px-10 py-8 font-display font-bold text-sm text-[#1A1A1A]">{row.comm} <span className="text-[10px] text-gray-400 ml-0.5">TND</span></td>
                  <td className="px-10 py-8">
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter leading-tight">
                      {row.date.split(',')[0]}<br/>{row.date.split(',')[1]}
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                      row.status === 'Payé' ? 'bg-green-50 text-green-500' : 'bg-orange-50 text-[#FF8C00]'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${row.status === 'Payé' ? 'bg-green-500' : 'bg-[#FF8C00]'}`}></div>
                      {row.status}
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <button className="text-gray-300 hover:text-gray-600 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-8 border-t border-gray-50 flex items-center justify-between">
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Affichage de 1-4 sur 256 transactions</p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-gray-50 text-gray-300 rounded-xl font-bold text-xs cursor-not-allowed">Précédent</button>
              <div className="flex items-center gap-1">
                {[2, 3].map(n => (
                  <button key={n} className="w-8 h-8 rounded-lg text-[11px] font-bold text-gray-400 hover:bg-gray-50 transition-colors">{n}</button>
                ))}
              </div>
              <button className="px-6 py-2 bg-gray-50 text-gray-600 rounded-xl font-bold text-xs hover:bg-gray-100 transition-colors">Suivant</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionManagement;
