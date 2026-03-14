import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import providerApi from '../services/providerApi';

const BookingRequests = () => {
  const [activeTab, setActiveTab] = useState('PENDING');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Note: We'll fetch the service details for these bookings to show names
  const [servicesMap, setServicesMap] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const providerId = providerApi.getProviderId();
      if (!providerId) {
          setError("Not logged in");
          setLoading(false);
          return;
      }
      
      const [bookingsData, servicesData] = await Promise.all([
          providerApi.getBookings(providerId),
          providerApi.getServices(providerId)
      ]);
      
      // Create a map of serviceId -> service for easy lookup
      const map = {};
      if (servicesData) {
          servicesData.forEach(s => {
              map[s.id] = s;
          });
      }
      setServicesMap(map);
      setBookings(bookingsData || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch bookings.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
      try {
          await providerApi.updateBookingStatus(id, status);
          fetchData(); // refresh list
      } catch (err) {
          console.error(err);
          alert("Failed to update booking status.");
      }
  };

  const filteredBookings = bookings.filter(b => b.status === activeTab);
  const pendingCount = bookings.filter(b => b.status === 'PENDING').length;
  const confirmedCount = bookings.filter(b => b.status === 'CONFIRMED').length;
  const cancelledCount = bookings.filter(b => b.status === 'CANCELLED' || b.status === 'REJECTED').length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Stats */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-10">
           <div>
             <h1 className="text-3xl font-black text-gray-900 mb-2 mt-4 tracking-tight">Demandes de Réservation</h1>
             <p className="text-gray-400 font-medium">Gérez vos réservations entrantes et confirmez les disponibilités de vos clients.</p>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                 <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF8C00]">
                    <AlertCircle className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">En attente</p>
                    <p className="text-xl font-black text-gray-900 leading-none">{pendingCount} <span className="text-sm text-gray-400 font-medium">demandes</span></p>
                 </div>
              </div>
              <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                 <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-500">
                    <TrendingUp className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Aujourd'hui</p>
                    <p className="text-xl font-black text-gray-900 leading-none">+{pendingCount} <span className="text-sm text-gray-400 font-medium">nouvelles</span></p>
                 </div>
              </div>
           </div>
        </div>

        {error && <div className="text-red-500 font-bold p-4 bg-red-50 rounded-2xl mb-8">{error}</div>}

        {/* Tab Navigation */}
        <div className="bg-white border border-gray-100 rounded-[24px] p-2 flex items-center gap-2 mb-8 shadow-sm max-w-2xl">
           {[
             { id: 'PENDING', label: 'En attente', count: pendingCount },
             { id: 'CONFIRMED', label: 'Confirmées', count: confirmedCount },
             { id: 'REJECTED', label: 'Annulées', count: cancelledCount }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`flex-1 py-3 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                 activeTab === tab.id 
                 ? 'bg-[#FF8C00] text-white shadow-lg shadow-orange-500/20' 
                 : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
               }`}
             >
               {tab.label}
               <span className={`px-2 py-0.5 rounded-lg text-[10px] ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>
                 {tab.count}
               </span>
             </button>
           ))}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
           <div className="relative w-full sm:w-96 group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF8C00] transition-colors" />
             <input 
               type="text" 
               placeholder="Rechercher un client, N° de rés..." 
               className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-[20px] text-sm font-medium focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all shadow-sm"
             />
           </div>
           
           <button className="flex items-center gap-2 bg-white border border-gray-100 px-6 py-3.5 rounded-[20px] text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
             <Filter className="w-4 h-4" />
             Filtrer
           </button>
        </div>

        {/* Bookings List */}
        {loading ? (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8C00]"></div>
            </div>
        ) : (
        <div className="space-y-4">
           {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-[32px] border border-gray-100 p-20 text-center shadow-sm">
                 <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-8 h-8 text-gray-300" />
                 </div>
                 <h3 className="text-xl font-black text-gray-900 mb-2">Aucune réservation</h3>
                 <p className="text-gray-400">Vous n'avez pas de réservations dans cette catégorie pour le moment.</p>
              </div>
           ) : (
              filteredBookings.map((booking) => {
                  const service = servicesMap[booking.serviceId];
                  return (
                 <div key={booking.id} className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row gap-8">
                    {/* Guest Info Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0 border-r border-gray-100 pr-8">
                       <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">RES-{booking.id}</span>
                          <span className="text-[10px] font-bold text-gray-400">Client ID: {booking.userId}</span>
                       </div>
                       <div className="flex items-center gap-4 mb-6">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.userId}`} alt="User" className="w-14 h-14 rounded-2xl bg-gray-100 border border-gray-200" />
                          <div>
                             <h4 className="font-black text-gray-900 leading-tight">Tourist</h4>
                             <p className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1 mt-1">
                               <MapPin className="w-3 h-3" /> Djerba, TN
                             </p>
                          </div>
                       </div>
                       <button className="w-full py-2.5 bg-gray-50 hover:bg-orange-50 text-gray-600 hover:text-orange-500 rounded-xl text-xs font-bold transition-colors">
                          Contacter le client
                       </button>
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1">
                       <h3 className="text-xl font-black text-gray-900 mb-6">{service ? service.title : `Service #${booking.serviceId}`}</h3>
                       
                       <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                          <div>
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Date</p>
                             <p className="font-bold text-gray-900">{booking.bookingDate || 'TBD'}</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Heure</p>
                             <p className="font-bold text-gray-900">{booking.time || 'TBD'}</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Users className="w-3 h-3"/> Personnes</p>
                             <p className="font-bold text-gray-900">{booking.totalPrice && service ? Math.round(booking.totalPrice / service.price) : 1} invités</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Montant Total</p>
                             <p className="font-black text-[#FF8C00] text-lg leading-none">{booking.totalPrice} TND</p>
                          </div>
                       </div>

                       {/* Action Buttons */}
                       {booking.status === 'PENDING' && (
                          <div className="flex items-center gap-4 bg-orange-50/50 p-4 border border-orange-100 rounded-2xl">
                             <button onClick={() => handleUpdateStatus(booking.id, 'CONFIRMED')} className="flex-1 bg-[#FF8C00] hover:bg-[#E67E00] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/20 active:scale-95">
                                <CheckCircle2 className="w-5 h-5" />
                                Accepter la demande
                             </button>
                             <button onClick={() => handleUpdateStatus(booking.id, 'REJECTED')} className="px-6 py-3.5 bg-white border border-gray-200 hover:border-red-200 text-gray-500 hover:text-red-500 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                                <XCircle className="w-5 h-5" />
                                Refuser
                             </button>
                          </div>
                       )}
                       {booking.status === 'CONFIRMED' && (
                          <div className="flex items-center gap-3 bg-green-50 p-4 border border-green-100 rounded-2xl">
                             <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                                <CheckCircle2 className="w-4 h-4" />
                             </div>
                             <p className="text-sm font-bold text-green-700">Réservation confirmée. Le client a été notifié.</p>
                          </div>
                       )}
                       {booking.status === 'REJECTED' && (
                          <div className="flex items-center gap-3 bg-red-50 p-4 border border-red-100 rounded-2xl">
                             <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white shrink-0">
                                <XCircle className="w-4 h-4" />
                             </div>
                             <p className="text-sm font-bold text-red-700">Réservation refusée.</p>
                          </div>
                       )}
                    </div>
                 </div>
              )})
           )}
        </div>
        )}

        {/* Pagination */}
        {filteredBookings.length > 0 && (
           <div className="mt-10 flex items-center justify-center gap-2">
              <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                 <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-[#FF8C00] text-white font-bold shadow-md shadow-orange-500/20">1</button>
              <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 font-bold hover:bg-gray-50 transition-colors">2</button>
              <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                 <ChevronRight className="w-5 h-5" />
              </button>
           </div>
        )}

      </div>
    </div>
  );
};

export default BookingRequests;
