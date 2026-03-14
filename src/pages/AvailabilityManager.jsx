import React, { useState } from 'react';
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
  CheckCircle2
} from 'lucide-react';

const AvailabilityManager = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 7)); // August 2024
  const [selectedDate, setSelectedDate] = useState(15);
  const [isSaving, setIsSaving] = useState(false);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleSave = () => {
     setIsSaving(true);
     setTimeout(() => {
        setIsSaving(false);
        alert('Disponibilités mises à jour avec succès !');
     }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
           <div>
             <h1 className="text-3xl font-black text-gray-900 mb-2 mt-4 tracking-tight">Disponibilités & Calendrier</h1>
             <p className="text-gray-400 font-medium">Gérez l'ouverture, la fermeture et la capacité de vos services au quotidien.</p>
           </div>
           
           <div className="flex items-center gap-4">
              <select className="bg-white px-6 py-4 rounded-2xl border border-gray-100 font-bold text-sm text-gray-700 outline-none shadow-sm focus:ring-2 focus:ring-orange-100 cursor-pointer appearance-none pr-10 relative">
                 <option>Suite Royale - Hôtel Amel</option>
                 <option>Chambre Double Standard</option>
                 <option>Excursion Île aux Flamants</option>
              </select>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Left Column: Calendar */}
           <div className="lg:col-span-8">
              <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
                 {/* Calendar Header */}
                 <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-gray-900 capitalize">
                       {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h2>
                    <div className="flex items-center gap-2">
                       <button onClick={prevMonth} className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center hover:bg-orange-50 hover:text-[#FF8C00] hover:border-orange-100 transition-all text-gray-400">
                          <ChevronLeft className="w-5 h-5" />
                       </button>
                       <button onClick={nextMonth} className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center hover:bg-orange-50 hover:text-[#FF8C00] hover:border-orange-100 transition-all text-gray-400">
                          <ChevronRight className="w-5 h-5" />
                       </button>
                    </div>
                 </div>

                 {/* Days of week */}
                 <div className="grid grid-cols-7 gap-4 mb-4">
                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                       <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                          {day}
                       </div>
                    ))}
                 </div>

                 {/* Calendar Grid */}
                 <div className="grid grid-cols-7 gap-4">
                    {/* Empty slots */}
                    {[...Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1)].map((_, i) => (
                       <div key={`empty-${i}`} className="h-24 rounded-2xl bg-gray-50/50 border border-transparent"></div>
                    ))}
                    
                    {/* Days */}
                    {[...Array(daysInMonth)].map((_, i) => {
                       const day = i + 1;
                       const isSelected = selectedDate === day;
                       const isToday = day === 15 && currentMonth.getMonth() === 7; // Mock today
                       
                       // Mock statuses
                       let status = 'available'; // available,  low, full, closed
                       let capacity = "8/10";
                       if (day === 5 || day === 6) { status = 'closed'; capacity = "Fermé"; }
                       if (day === 12 || day === 13) { status = 'full'; capacity = "10/10"; }
                       if (day >= 20 && day <= 24) { status = 'low'; capacity = "2/10"; }

                       return (
                          <div 
                             key={day}
                             onClick={() => setSelectedDate(day)}
                             className={`h-28 rounded-3xl p-3 flex flex-col justify-between cursor-pointer transition-all border-2 relative overflow-hidden group
                                ${isSelected ? 'border-[#FF8C00] shadow-xl shadow-orange-500/20' : 'border-gray-100 hover:border-orange-200 hover:bg-orange-50/30'}
                                ${status === 'closed' ? 'bg-gray-50 grayscale select-none' : 'bg-white'}
                             `}
                          >
                             {/* Date Number */}
                             <div className="flex justify-between items-start">
                                <span className={`text-base font-black w-8 h-8 rounded-xl flex items-center justify-center
                                   ${isToday ? 'bg-[#FF8C00] text-white shadow-md' : isSelected ? 'bg-orange-100 text-[#FF8C00]' : 'text-gray-900 group-hover:text-[#FF8C00]'}
                                `}>
                                   {day}
                                </span>
                                {status === 'full' && (
                                   <div className="w-2 h-2 rounded-full bg-red-400 mt-2 mr-1"></div>
                                )}
                                {status === 'closed' && (
                                   <div className="w-2 h-2 rounded-full bg-gray-300 mt-2 mr-1"></div>
                                )}
                             </div>

                             {/* Status Indicator */}
                             {status !== 'closed' && (
                                <div className="mt-auto">
                                   <div className={`text-[10px] font-bold px-2 py-1 rounded-lg w-fit mb-1
                                      ${status === 'full' ? 'bg-red-50 text-red-500' : status === 'low' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-500'}
                                   `}>
                                      {status === 'full' ? 'COMPLET' : status === 'low' ? 'FORTE DEM.' : 'DISPO'}
                                   </div>
                                   <p className="text-[10px] text-gray-400 font-bold px-1">{capacity}</p>
                                </div>
                             )}
                             {status === 'closed' && (
                                <div className="mt-auto text-center py-2">
                                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white/80 rounded-md backdrop-blur-sm">FERMÉ</p>
                                </div>
                             )}
                          </div>
                       );
                    })}
                 </div>
              </div>
           </div>

           {/* Right Column: Day Details & Quick Actions */}
           <div className="lg:col-span-4 space-y-8">
              {/* Day Editor */}
              <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                 
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-[#FF8C00] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                       <CalendarIcon className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-gray-900">{selectedDate} {monthNames[currentMonth.getMonth()]}</h3>
                       <p className="text-sm font-bold text-[#FF8C00]">Modifier les paramètres</p>
                    </div>
                 </div>

                 <div className="space-y-6 relative z-10">
                    {/* Status Toggle */}
                    <div>
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">État d'ouverture</label>
                       <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                          <button className="flex-1 py-3 text-xs font-bold rounded-xl bg-white shadow-sm border border-gray-100 text-gray-900 transition-all flex justify-center items-center gap-2">
                             <CheckCircle2 className="w-4 h-4 text-green-500"/> Ouvert
                          </button>
                          <button className="flex-1 py-3 text-xs font-bold rounded-xl text-gray-500 hover:text-gray-900 transition-all">
                             Fermé
                          </button>
                       </div>
                    </div>

                    <hr className="border-gray-50" />

                    {/* Capacity */}
                    <div>
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 flex items-center gap-2">
                          <Users className="w-3 h-3"/> Capacité Totale
                       </label>
                       <div className="flex items-center bg-gray-50 rounded-2xl border border-gray-100 p-2">
                          <button className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-[#FF8C00] bg-white rounded-xl shadow-sm font-black text-lg">-</button>
                          <input type="number" value="10" readOnly className="flex-1 text-center bg-transparent border-none font-black text-gray-900 text-lg outline-none" />
                          <button className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-[#FF8C00] bg-white rounded-xl shadow-sm font-black text-lg">+</button>
                       </div>
                    </div>

                    {/* Minimum Stay / Advance Notice */}
                    <div className="bg-orange-50/50 p-5 rounded-3xl border border-orange-100/50">
                       <label className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Settings className="w-3 h-3"/> Paramètres Avancés
                       </label>
                       <div className="space-y-4">
                          <div className="flex items-center justify-between">
                             <span className="text-xs font-bold text-gray-600">Séjour minimum</span>
                             <select className="bg-white border flex-1 ml-4 border-gray-100 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 outline-none">
                                <option>1 nuit</option>
                                <option>2 nuits</option>
                                <option>3 nuits</option>
                             </select>
                          </div>
                       </div>
                    </div>

                    <button 
                       onClick={handleSave}
                       className="w-full bg-[#1A1A1A] hover:bg-[#FF8C00] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-colors shadow-xl active:scale-95 group"
                    >
                       {isSaving ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                       ) : (
                          <>
                             <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                             Sauvegarder les Date(s)
                          </>
                       )}
                    </button>
                 </div>
              </div>

              {/* Bulk Actions Card */}
              <div className="bg-[#FF8C00] rounded-[40px] p-8 text-white relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
                 <div className="relative z-10">
                    <h3 className="text-xl font-black mb-4 leading-tight">Actions Groupées</h3>
                    <p className="text-white/80 text-xs font-medium mb-8 leading-relaxed">Mettez à jour plusieurs dates en une seule fois (Ex: Fermeture saisonnière).</p>
                    
                    <button className="w-full bg-white text-[#FF8C00] py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-50 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                       <RefreshCcw className="w-4 h-4" />
                       Modifier la période
                    </button>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default AvailabilityManager;
