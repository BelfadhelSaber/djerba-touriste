import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Users, 
  Settings, 
  Save,
  AlertCircle,
  Plus,
  RefreshCcw,
  CheckCircle2,
  XCircle,
  Power,
  ShieldCheck,
  Layout
} from 'lucide-react';
import providerApi from '../services/providerApi';

const AvailabilityManager = () => {
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const providerId = providerApi.getProviderId();
      if (!providerId) return;
      const data = await providerApi.getServices(providerId);
      setServices(data);
      if (data.length > 0) {
        setSelectedServiceId(data[0].id);
        setSelectedService(data[0]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceChange = (e) => {
    const id = parseInt(e.target.value);
    setSelectedServiceId(id);
    const service = services.find(s => s.id === id);
    setSelectedService(service);
  };

  const handleToggleAvailability = async (newStatus) => {
    if (!selectedService) return;
    setIsSaving(true);
    try {
      await providerApi.toggleServiceAvailability(selectedServiceId, newStatus);
      const updatedService = { ...selectedService, available: newStatus };
      setSelectedService(updatedService);
      setServices(services.map(s => s.id === selectedServiceId ? updatedService : s));
    } catch (error) {
      console.error("Error toggling availability:", error);
      alert("Erreur lors de la mise à jour de la disponibilité.");
    } finally {
      setIsSaving(false);
    }
  };

  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8C00]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:row items-start md:items-center justify-between gap-6 mb-10">
           <div>
             <h1 className="text-3xl font-black text-gray-900 mb-2 mt-4 tracking-tight">Gestion de Disponibilité</h1>
             <p className="text-gray-400 font-medium">Contrôlez la visibilité et l'état de vos services en temps réel.</p>
           </div>
           
           <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <select 
                  value={selectedServiceId || ''}
                  onChange={handleServiceChange}
                  className="w-full bg-white px-6 py-4 rounded-2xl border border-gray-100 font-bold text-sm text-gray-700 outline-none shadow-sm focus:ring-2 focus:ring-orange-100 cursor-pointer appearance-none transition-all"
                >
                  {services.map(service => (
                    <option key={service.id} value={service.id}>{service.title}</option>
                  ))}
                  {services.length === 0 && <option value="">Aucun service trouvé</option>}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <Layout className="w-4 h-4" />
                </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Left Column: Calendar UI (Static for now, as requested focusing on availability toggle) */}
           <div className="lg:col-span-8">
              <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 h-full">
                 <div className="flex items-center justify-between mb-12">
                    <h2 className="text-2xl font-black text-gray-900 capitalize">
                       Calendrier Mensuel
                    </h2>
                    <div className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-400 uppercase tracking-widest border border-gray-100">
                      Vision Globale
                    </div>
                 </div>

                 <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-6">
                    <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center text-[#FF8C00]">
                       <CalendarIcon className="w-10 h-10" />
                    </div>
                    <div className="max-w-md">
                       <h3 className="text-xl font-bold text-gray-900 mb-2">Planification Avancée</h3>
                       <p className="text-gray-400 text-sm leading-relaxed">
                         La vue calendrier détaillée arrive bientôt. Vous pourrez gérer les réservations quotidiennes et les stocks de chambres spécifiquement.
                       </p>
                    </div>
                    <button className="px-8 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-gray-400 uppercase tracking-widest cursor-not-allowed">
                       Bientôt Disponible
                    </button>
                 </div>
              </div>
           </div>

           {/* Right Column: Status Toggle */}
           <div className="lg:col-span-4 space-y-8">
              <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                 
                 <div className="flex items-center gap-4 mb-10">
                    <div className={`w-14 h-14 ${selectedService?.available ? 'bg-green-500' : 'bg-red-500'} rounded-2xl flex items-center justify-center text-white shadow-lg transition-colors`}>
                       <Power className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-gray-900">État du Service</h3>
                       <p className={`text-sm font-bold ${selectedService?.available ? 'text-green-500' : 'text-red-500'}`}>
                         {selectedService?.available ? 'Actuellement Visible' : 'Actuellement Masqué'}
                       </p>
                    </div>
                 </div>

                 <div className="space-y-8 relative z-10">
                    <div>
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-3 block">Contrôle de Visibilité</label>
                       <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                          <button 
                            onClick={() => handleToggleAvailability(true)}
                            className={`flex-1 py-4 text-xs font-bold rounded-xl transition-all flex justify-center items-center gap-2
                              ${selectedService?.available ? 'bg-white shadow-md border border-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}
                            `}
                          >
                             <CheckCircle2 className={`w-4 h-4 ${selectedService?.available ? 'text-green-500' : 'text-gray-300'}`}/> Ouvert
                          </button>
                          <button 
                            onClick={() => handleToggleAvailability(false)}
                            className={`flex-1 py-4 text-xs font-bold rounded-xl transition-all flex justify-center items-center gap-2
                              ${!selectedService?.available ? 'bg-white shadow-md border border-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}
                            `}
                          >
                             <XCircle className={`w-4 h-4 ${!selectedService?.available ? 'text-red-500' : 'text-gray-300'}`}/> Fermé
                          </button>
                       </div>
                    </div>

                    <div className={`p-6 rounded-[2rem] border transition-all ${selectedService?.available ? 'bg-green-50/30 border-green-100' : 'bg-red-50/30 border-red-100'}`}>
                        <div className="flex gap-4">
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${selectedService?.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                              <ShieldCheck className="w-5 h-5" />
                           </div>
                           <p className="text-[10px] font-bold text-gray-500 leading-relaxed uppercase tracking-wide">
                              {selectedService?.available 
                                ? "Votre service est visible par tous les touristes. Ils peuvent le trouver via la recherche et les catégories."
                                : "Votre service est masqué. Il n'apparaîtra plus sur la plateforme tant que vous ne l'aurez pas réactivé."
                              }
                           </p>
                        </div>
                    </div>

                    <div className="pt-4">
                      <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Mise à jour</p>
                          <p className="text-sm font-bold text-gray-900">À l'instant</p>
                        </div>
                        <div className="w-10 h-10 bg-white rounded-xl border border-gray-100 flex items-center justify-center text-gray-400">
                          <Clock className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                 </div>
              </div>

              {/* Tips Card */}
              <div className="bg-[#1A1A1A] rounded-[40px] p-8 text-white relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-xl"></div>
                 <div className="relative z-10">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                       <AlertCircle className="w-5 h-5 text-[#FF8C00]" />
                    </div>
                    <h3 className="text-lg font-black mb-3 leading-tight underline decoration-[#FF8C00] underline-offset-4">Conseil Pro</h3>
                    <p className="text-white/60 text-xs font-medium leading-relaxed italic">
                      "Utilisez le bouton 'Fermé' si toutes vos chambres sont occupées ou si vous êtes en maintenance pour éviter des réservations que vous ne pourrez pas honorer."
                    </p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default AvailabilityManager;
