import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye, 
  Clock, 
  MapPin, 
  Grid, 
  List,
  ChevronRight,
  Download,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import providerApi from '../services/providerApi';

const EventManager = () => {
  const [view, setView] = useState('grid');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const providerId = providerApi.getProviderId();
      if (!providerId) {
          setError("Not logged in");
          setLoading(false);
          return;
      }
      const data = await providerApi.getEvents(providerId);
      setEvents(data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id) => {
      if(window.confirm("Are you sure you want to delete this event?")) {
          try {
              await providerApi.deleteEvent(id);
              fetchEvents(); // refresh list
          } catch(err) {
              console.error(err);
              alert("Failed to delete event.");
          }
      }
  }

  const stats = [
    { label: "Total Événements", value: events.length.toString(), change: "Active", trend: "up", icon: <Calendar className="w-5 h-5 text-orange-500" /> },
    { label: "Total Participants", value: "0", change: "New", trend: "up", icon: <Users className="w-5 h-5 text-blue-500" /> },
    { label: "Revenus à venir", value: "0 TND", change: "New", trend: "up", icon: <TrendingUp className="w-5 h-5 text-green-500" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Header and Brand */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Calendar className="text-white w-6 h-6" />
           </div>
           <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Événements</h1>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Espace Prestataire</p>
           </div>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <input 
               type="text" 
               placeholder="Rechercher un événement..." 
               className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 shadow-sm"
             />
          </div>
          <button onClick={() => alert("Feature coming soon: Navigate to create event form")} className="bg-[#FF8C00] hover:bg-[#E67E00] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-orange-500/20 flex items-center gap-2 transition-all active:scale-95 whitespace-nowrap">
             <Plus className="w-5 h-5" />
             Créer un nouvel événement
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
             <div className="bg-orange-50 text-[10px] font-bold text-[#FF8C00] px-2 py-0.5 rounded absolute top-6 right-8 uppercase tracking-wider">
                {stat.change}
             </div>
             <div className="mb-6">{stat.icon}</div>
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
             <h3 className="text-3xl font-extrabold text-gray-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      {error && <div className="text-red-500 font-bold p-4 bg-red-50 rounded-2xl mb-8">{error}</div>}

      {/* Events Control Bar */}
      <div className="flex items-center justify-between mb-8">
         <h2 className="text-xl font-bold text-gray-900">Vos Événements</h2>
         <div className="flex items-center gap-4">
            <div className="bg-white p-1 rounded-xl border border-gray-100 shadow-sm flex items-center">
               <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-orange-50 text-orange-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                  <Grid className="w-4 h-4" />
               </button>
               <button onClick={() => setView('list')} className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-orange-50 text-orange-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                  <List className="w-4 h-4" />
               </button>
            </div>
         </div>
      </div>

      {/* Events List/Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8C00]"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <Calendar className="w-16 h-16 text-gray-200 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun événement</h3>
            <p className="text-gray-400 font-medium mb-8">Vous n'avez pas encore créé d'événements.</p>
        </div>
      ) : (
      <div className="space-y-6">
        {events.map((event) => {
            const bookings = event.currentBookings || 0;
            const capacity = event.capacity || 1;
            const status = event.status || 'ACTIF';
            return (
          <div key={event.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all group">
             <div className="flex flex-col md:flex-row">
                <div className="md:w-80 h-56 relative">
                   <img src="https://images.unsplash.com/photo-1544123089-18244f3cb523?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                   <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest text-white shadow-lg ${
                         status === 'ACTIVE' || status === 'ACTIF' ? 'bg-green-500' :
                         status === 'PENDING' || status === 'BROUILLON' ? 'bg-[#FF8C00]' : 'bg-gray-400'
                      }`}>
                         {status}
                      </span>
                   </div>
                   <div className="absolute top-4 right-4 flex gap-2">
                      <button className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-sm text-gray-600 hover:text-[#FF8C00] transition-colors">
                         <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteEvent(event.id)} className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-sm text-gray-600 hover:text-red-500 transition-colors">
                         <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                </div>

                <div className="flex-1 p-8 flex flex-col justify-between">
                   <div>
                      <div className="flex items-center justify-between mb-3">
                         <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FF8C00] transition-colors">{event.title}</h3>
                         {status === 'COMPLETED' && (
                           <button className="p-2 text-gray-400 hover:text-blue-500">
                             <Eye className="w-5 h-5" />
                           </button>
                         )}
                      </div>
                      
                      <div className="flex flex-wrap gap-6 mb-6">
                         <div className="flex items-center gap-2 text-gray-500 text-xs font-bold">
                            <Calendar className="w-4 h-4 text-[#FF8C00]" />
                            {event.eventDate || 'Date Not Set'}
                         </div>
                         <div className="flex items-center gap-2 text-gray-500 text-xs font-bold">
                            <Clock className="w-4 h-4 text-[#FF8C00]" />
                            {event.eventTime || 'Time Not Set'}
                         </div>
                      </div>

                      <div className="mb-4">
                         <div className="flex items-center justify-between mb-2">
                           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Réservations: {bookings}/{capacity}</span>
                           <span className="text-xs font-bold text-[#FF8C00]">{Math.round((bookings / capacity) * 100)}%</span>
                         </div>
                         <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-1000 ${status === 'COMPLETED' ? 'bg-green-500' : 'bg-[#FF8C00]'}`}
                              style={{ width: `${(bookings / capacity) * 100}%` }}
                            ></div>
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                      <div className="flex -space-x-2">
                         {bookings > 0 ? (
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                              +{bookings}
                            </div>
                         ) : (
                             <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest py-1.5 block">Pas encore de participants</span>
                         )}
                      </div>
                      <button className={`text-xs font-bold transition-all ${
                         status === 'PENDING' ? 'text-[#FF8C00] hover:underline' :
                         status === 'COMPLETED' ? 'text-gray-400 hover:text-[#FF8C00]' :
                         'text-[#FF8C00] hover:underline'
                      }`}>
                         {status === 'PENDING' ? 'Publier maintenant' : 
                          status === 'COMPLETED' ? 'Voir l\'archive' : 'Voir les participants'}
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )})}
      </div>
      )}

      <div className="mt-12 flex justify-center">
         <button className="bg-white border border-gray-100 shadow-sm px-10 py-4 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all flex items-center gap-2">
            Charger plus d'événements
         </button>
      </div>

      {/* Footer Branding */}
      <div className="mt-20 flex items-center justify-between pt-8 border-t border-gray-100">
         <div className="flex items-center gap-3">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed" className="w-10 h-10 rounded-full border shadow-sm" alt="User" />
            <div>
               <p className="text-sm font-bold text-gray-900">Prestataire</p>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Djerba Touriste</p>
            </div>
         </div>
         <p className="text-[11px] text-gray-300 font-medium uppercase tracking-[0.2em]">© 2024 Panneau Prestataire Djerba</p>
      </div>
    </div>
  );
};

export default EventManager;
