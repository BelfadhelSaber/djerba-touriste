import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Star, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Flag,
  Trash2,
  Undo2,
  EyeOff
} from 'lucide-react';

const ReviewModeration = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const stats = [
    { label: "Total des avis", value: "1,284", change: "+12%", trend: "up" },
    { label: "Avis en attente", value: "42", change: "+5%", trend: "up" },
    { label: "Avis signalés", value: "15", change: "-2%", trend: "down", color: "text-red-500" },
    { label: "Note moyenne", value: "4.8/5", change: "Stable", trend: "stable", icon: <Star className="w-4 h-4 text-orange-400 fill-orange-400" /> },
  ];

  const reviews = [
    {
      id: 1,
      user: { name: "Ahmed Ben Salem", email: "ahmed.bs@email.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed" },
      service: "Hôtel Radisson Blu",
      rating: 1,
      comment: "Le service était déplorable, j'ai attendu...",
      date: "12 Mai 2024",
      status: "SIGNALÉ"
    },
    {
      id: 2,
      user: { name: "Elena Rossi", email: "elena.r@email.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" },
      service: "Restaurant El Ferida",
      rating: 5,
      comment: "Une cuisine authentique au coeur...",
      date: "14 Mai 2024",
      status: "EN ATTENTE"
    },
    {
      id: 3,
      user: { name: "Jean Dupont", email: "j.dupont@email.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jean" },
      service: "Djerba Explore Park",
      rating: 4,
      comment: "Superbe après-midi avec les crocodiles. Trè...",
      date: "10 Mai 2024",
      status: "PUBLIÉ"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Modération des Avis</h1>
        <p className="text-gray-500">Gérez et modérez les retours des visiteurs sur l'île de Djerba.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-gray-400">{stat.label}</span>
              {stat.icon || (
                <div className={`px-2 py-1 rounded-lg text-[10px] font-bold ${stat.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {stat.change}
                </div>
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Rechercher par service ou utilisateur..." 
            className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-100 transition-all outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 outline-none focus:ring-2 focus:ring-orange-100">
            <option>Toutes les notes</option>
            <option>1 étoile</option>
            <option>2 étoiles</option>
            <option>3 étoiles</option>
            <option>4 étoiles</option>
            <option>5 étoiles</option>
          </select>
          <select className="bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 outline-none focus:ring-2 focus:ring-orange-100">
            <option>Tous les statuts</option>
            <option>Publié</option>
            <option>En attente</option>
            <option>Signalé</option>
          </select>
          <button className="bg-[#FF8C00] text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-orange-500/20 hover:bg-[#E67E00] transition-colors">
            Filtrer
          </button>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Utilisateur</th>
                <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Service</th>
                <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Avis & Note</th>
                <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Statut</th>
                <th className="px-8 py-4 text-right text-[11px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reviews.map((review) => (
                <tr key={review.id} className="group hover:bg-orange-50/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img src={review.user.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="" />
                      <div>
                        <div className="text-sm font-bold text-gray-900">{review.user.name}</div>
                        <div className="text-[11px] text-gray-400 font-medium">{review.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm">
                    <div className="font-bold text-[#FF8C00]">{review.service.split(' ')[0]}</div>
                    <div className="font-medium text-gray-900">{review.service.split(' ').slice(1).join(' ')}</div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'text-orange-400 fill-orange-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 max-w-[200px] truncate">"{review.comment}"</p>
                  </td>
                  <td className="px-8 py-5 text-xs font-semibold text-gray-500">{review.date}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                      review.status === 'SIGNALÉ' ? 'bg-red-50 text-red-500' :
                      review.status === 'EN ATTENTE' ? 'bg-orange-50 text-orange-500' :
                      'bg-green-50 text-green-500'
                    }`}>
                      {review.status === 'SIGNALÉ' && <AlertCircle className="w-3 h-3 inline mr-1 -mt-0.5" />}
                      {review.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-orange-500 shadow-sm transition-all" title="Répondre">
                        <Undo2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-green-500 shadow-sm transition-all" title="Approuver">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-red-500 shadow-sm transition-all" title="Supprimer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-between transition-all">
          <div className="text-xs text-gray-400 font-medium">Affichage de 1 à 10 sur 1,284 avis</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">Précédent</button>
            <button className="px-4 py-2 text-xs font-bold bg-[#FF8C00] text-white rounded-lg transition-colors border border-orange-200">1</button>
            <button className="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">2</button>
            <button className="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">Suivant</button>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-12 text-center text-[11px] text-gray-300 font-medium uppercase tracking-widest">
        © 2024 Plateforme Touristique Djerba - Panneau d'Administration. Tous droits réservés.
      </div>
    </div>
  );
};

export default ReviewModeration;
