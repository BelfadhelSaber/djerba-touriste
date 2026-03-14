import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  ShieldCheck, 
  Info,
  Clock,
  ArrowRight,
  Minus,
  Plus,
  Star,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingSelection = () => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [step, setStep] = useState(2);

  const steps = [
    { id: 1, label: "Détails", status: "completed" },
    { id: 2, label: "Réservation", status: "active" },
    { id: 3, label: "Paiement", status: "pending" }
  ];

  const days = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"];
  const dates = [
    { day: 27, status: "prev" }, { day: 28, status: "prev" }, { day: 29, status: "prev" }, { day: 30, status: "prev" },
    { day: 1, status: "current" }, { day: 2, status: "current" }, { day: 3, status: "current" },
    { day: 4, status: "current" }, { day: 5, status: "selected" }, { day: 6, status: "range" }, { day: 7, status: "range" },
    { day: 8, status: "range" }, { day: 9, status: "range" }, { day: 10, status: "selected" },
    { day: 11, status: "current" }, { day: 12, status: "current" }, { day: 13, status: "current" }, { day: 14, status: "current" },
    { day: 15, status: "current" }, { day: 16, status: "current" }, { day: 17, status: "current" },
    { day: 18, status: "current" }, { day: 19, status: "current" }, { day: 20, status: "current" }, { day: 21, status: "current" },
    { day: 22, status: "current" }, { day: 23, status: "current" }, { day: 24, status: "current" },
    { day: 25, status: "current" }, { day: 26, status: "current" }, { day: 27, status: "current" }, { day: 28, status: "current" },
    { day: 29, status: "current" }, { day: 30, status: "current" }, { day: 31, status: "current" }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      {/* Centered Flow Stepper */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex items-center justify-between max-w-xl mx-auto">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center gap-3 relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 z-10 ${
                s.status === 'completed' ? 'bg-[#FF8C00] text-white' : 
                s.status === 'active' ? 'bg-[#FF8C00] text-white shadow-xl shadow-orange-500/30 ring-8 ring-orange-50' : 
                'bg-white border-2 border-gray-100 text-gray-300'
              }`}>
                {s.status === 'completed' ? <Check className="w-5 h-5" /> : s.id}
              </div>
              <span className={`text-[11px] font-black uppercase tracking-widest ${s.status === 'active' ? 'text-orange-500' : 'text-gray-300'}`}>
                {s.label}
              </span>
              {idx !== steps.length - 1 && (
                <div className="absolute left-[80px] top-[19px] w-[140%] h-[3px] bg-gray-100 -z-0">
                   <div className={`h-full bg-orange-500 transition-all duration-700 ${s.status === 'completed' ? 'w-full' : 'w-0'}`}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Interactive Controls */}
        <div className="lg:col-span-8 space-y-8">
          {/* Service Preview Mini */}
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
             <div className="w-32 h-24 rounded-2xl overflow-hidden shadow-inner">
                <img src="https://images.unsplash.com/photo-1549412656-9905bbfa069a?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="Villa" />
             </div>
             <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                   <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                   <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest leading-none">Premier Choice</span>
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-1">Villa Panoramique avec Vue Mer</h2>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                   <MapPin className="w-4 h-4 text-orange-500" />
                   Côte d'Azur, France
                </div>
             </div>
             <button className="text-xs font-black text-orange-500 hover:text-orange-600 transition-colors uppercase tracking-widest flex items-center gap-1">
                <EditIcon className="w-3.5 h-3.5" />
                Modifier le service
             </button>
          </div>

          {/* Calendar Select */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
             <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF8C00]">
                   <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Sélectionnez vos dates</h3>
             </div>

             <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-8">
                   <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors"><ChevronLeft className="w-6 h-6 text-gray-400" /></button>
                   <h4 className="text-lg font-black text-gray-900 uppercase tracking-widest">Juillet 2024</h4>
                   <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors"><ChevronRight className="w-6 h-6 text-gray-400" /></button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-4">
                   {days.map((d) => (
                      <div key={d} className="text-[10px] font-black text-gray-300 text-center uppercase tracking-widest py-2">
                         {d}
                      </div>
                   ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                   {dates.map((d, i) => (
                      <button 
                        key={i} 
                        className={`h-12 rounded-xl text-sm font-bold transition-all relative ${
                           d.status === 'prev' ? 'text-gray-200 cursor-not-allowed' :
                           d.status === 'selected' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' :
                           d.status === 'range' ? 'bg-orange-50 text-orange-500 border border-orange-100' :
                           'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                         {d.day}
                         {d.status === 'selected' && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>}
                      </button>
                   ))}
                </div>
             </div>
          </div>

          {/* Travelers Select */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
             <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF8C00]">
                   <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Nombre de voyageurs</h3>
             </div>

             <div className="space-y-8 max-w-lg mx-auto md:ml-0 md:pl-6">
                <div className="flex items-center justify-between">
                   <div>
                      <h4 className="text-base font-black text-gray-900 mb-0.5 uppercase tracking-tighter">Adultes</h4>
                      <p className="text-xs font-bold text-gray-400">13 ans et plus</p>
                   </div>
                   <div className="flex items-center gap-6">
                      <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm active:scale-90">
                         <Minus className="w-4 h-4 text-gray-400" />
                      </button>
                      <span className="text-xl font-black text-gray-900 w-4 text-center">{adults}</span>
                      <button onClick={() => setAdults(adults + 1)} className="w-10 h-10 border-2 border-[#FF8C00] rounded-full flex items-center justify-center hover:bg-orange-50 transition-colors shadow-sm active:scale-90 group">
                         <Plus className="w-4 h-4 text-[#FF8C00]" />
                      </button>
                   </div>
                </div>

                <div className="flex items-center justify-between">
                   <div>
                      <h4 className="text-base font-black text-gray-900 mb-0.5 uppercase tracking-tighter">Enfants</h4>
                      <p className="text-xs font-bold text-gray-400">2 à 12 ans</p>
                   </div>
                   <div className="flex items-center gap-6">
                      <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm active:scale-90">
                         <Minus className="w-4 h-4 text-gray-400" />
                      </button>
                      <span className="text-xl font-black text-gray-900 w-4 text-center">{children}</span>
                      <button onClick={() => setChildren(children + 1)} className="w-10 h-10 border-2 border-[#FF8C00] rounded-full flex items-center justify-center hover:bg-orange-50 transition-colors shadow-sm active:scale-90">
                         <Plus className="w-4 h-4 text-[#FF8C00]" />
                      </button>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right: Summary Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden sticky top-8">
             <div className="p-8">
                <h3 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-tight">Résumé de la réservation</h3>
                
                <div className="space-y-6 pb-8 border-b border-gray-50">
                   <div className="flex gap-4">
                      <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 shrink-0 shadow-sm">
                         <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Dates</p>
                         <p className="text-sm font-black text-gray-900">5 Juil - 10 Juil, 2024</p>
                         <p className="text-[10px] font-bold text-orange-400">5 nuits</p>
                      </div>
                   </div>

                   <div className="flex gap-4">
                      <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 shrink-0 shadow-sm">
                         <Users className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Voyageurs</p>
                         <p className="text-sm font-black text-gray-900">{adults} Adultes, {children} Enfant</p>
                      </div>
                   </div>
                </div>

                <div className="py-8 space-y-4">
                   <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">Séjour (5 nuits)</span>
                      <span className="font-black text-gray-900">1 250 €</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">Frais de service</span>
                      <span className="font-black text-gray-900">45 €</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">Taxes</span>
                      <span className="font-black text-gray-900">22 €</span>
                   </div>
                </div>

                <div className="pt-8 border-t-2 border-dashed border-gray-100 flex items-center justify-between mb-8">
                   <span className="text-xl font-black text-gray-900">Total</span>
                   <span className="text-3xl font-black text-[#FF8C00]">1 317 €</span>
                </div>

                <Link 
                  to="/checkout/payment" 
                  className="w-full bg-[#FF8C00] text-white py-5 rounded-2xl font-black text-base shadow-xl shadow-orange-500/20 hover:bg-[#E67E00] flex items-center justify-center gap-3 group transition-all active:scale-95"
                >
                   Continuer vers le paiement
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-6">Vous ne serez débité qu'à l'étape suivante</p>
             </div>
          </div>

          <div className="bg-white/40 p-6 rounded-3xl border border-white/60 shadow-sm flex items-start gap-4 backdrop-blur-sm group hover:bg-white transition-all">
             <div className="p-2 bg-orange-50 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-orange-500" />
             </div>
             <div>
                <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-1">Paiement sécurisé</h4>
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed">Toutes vos informations sont protégées par un chiffrement SSL de bout en bout.</p>
             </div>
          </div>
        </div>
      </div>

      {/* Corporate Footer Mini */}
      <footer className="max-w-6xl mx-auto mt-20 pt-8 border-t border-gray-100 flex items-center justify-center">
         <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em]">© 2024 Djerba Touriste. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

const EditIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);

export default BookingSelection;
