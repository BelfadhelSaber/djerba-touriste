import React from 'react';
import { 
  CreditCard, 
  ChevronRight, 
  ShieldCheck, 
  Lock, 
  Info, 
  Calendar, 
  Users, 
  Check,
  Globe,
  Bell,
  X,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StepIndicator = ({ number, title, active, done }) => (
  <div className="flex items-center gap-4">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2 ${
      active ? 'bg-[#FF8C00] text-white border-[#FF8C00] shadow-lg shadow-orange-500/30' : 
      done ? 'bg-orange-50 text-[#FF8C00] border-orange-100' : 
      'bg-gray-50 text-gray-300 border-gray-100'
    }`}>
      {done ? <Check className="w-5 h-5" /> : number}
    </div>
    <span className={`text-sm font-bold uppercase tracking-widest ${active ? 'text-[#1A1A1A]' : 'text-gray-300'}`}>{title}</span>
  </div>
);

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
          <div className="w-8 h-8 bg-[#FF8C00] rounded-full flex items-center justify-center transform group-hover:rotate-12">
             <Globe className="text-white w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-[#1A1A1A]">
            Djerba <span className="text-[#FF8C00]">Touriste</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
           <button className="p-2.5 text-gray-400 hover:text-[#FF8C00] transition-colors relative">
             <Bell className="w-6 h-6" />
             <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#FF8C00] rounded-full border-2 border-white"></span>
           </button>
           <Link to="/" className="p-2.5 bg-gray-50 text-gray-400 hover:bg-gray-100 rounded-xl transition-all"><X className="w-6 h-6" /></Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Progress Bar */}
        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex items-center justify-around mb-12">
           <StepIndicator number="1" title="Détails" done />
           <div className="flex-1 max-w-[150px] h-0.5 bg-orange-100 mx-4"></div>
           <StepIndicator number="2" title="Réservation" done />
           <div className="flex-1 max-w-[150px] h-0.5 bg-gray-100 mx-4"></div>
           <StepIndicator number="3" title="Paiement" active />
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
           {/* Left Column: Payment Methods */}
           <div className="flex-[2] space-y-10">
              <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm">
                 <h2 className="text-3xl font-display font-bold text-[#1A1A1A] mb-12">Mode de paiement</h2>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <label className="relative p-6 bg-[#FFFBF7] border-2 border-[#FF8C00] rounded-3xl cursor-pointer flex items-center gap-6 transition-all ring-4 ring-orange-50">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                           <CreditCard className="text-[#FF8C00] w-6 h-6" />
                       </div>
                       <span className="font-bold text-[#1A1A1A]">Carte Bancaire</span>
                       <div className="ml-auto w-6 h-6 rounded-full border-4 border-[#FF8C00] bg-white flex items-center justify-center">
                          <div className="w-2.5 h-2.5 bg-[#FF8C00] rounded-full"></div>
                       </div>
                    </label>
                    <label className="relative p-6 bg-gray-50 border-2 border-transparent rounded-3xl cursor-pointer flex items-center gap-6 hover:bg-white hover:border-gray-100 transition-all group">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                           <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold text-[10px]">P</div>
                       </div>
                       <span className="font-bold text-gray-400 group-hover:text-[#1A1A1A] transition-colors">PayPal</span>
                       <div className="ml-auto w-6 h-6 rounded-full border-2 border-gray-200 bg-white"></div>
                    </label>
                 </div>

                 <div className="space-y-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Nom sur la carte</label>
                       <input type="text" placeholder="M. Jean Dupont" className="w-full px-8 py-5 bg-gray-50 border-none rounded-2xl text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all outline-none" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Numéro de carte</label>
                       <div className="relative">
                          <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-16 pr-8 py-5 bg-gray-50 border-none rounded-2xl text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all outline-none" />
                       </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Date d'expiration</label>
                          <input type="text" placeholder="MM/YY" className="w-full px-8 py-5 bg-gray-50 border-none rounded-2xl text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all outline-none" />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">CVV</label>
                          <div className="relative">
                             <input type="text" placeholder="123" className="w-full px-8 py-5 bg-gray-50 border-none rounded-2xl text-sm font-bold text-[#1A1A1A] focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all outline-none" />
                             <HelpCircle className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none" />
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="mt-10 flex items-center gap-4 group cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded-md border-gray-200 text-[#FF8C00] focus:ring-[#FF8C00]" />
                    <span className="text-xs font-bold text-gray-400 group-hover:text-gray-500 transition-colors">Enregistrer les informations de paiement pour la prochaine fois.</span>
                 </div>

                 <Link 
                    to="/receipt"
                    className="w-full mt-12 bg-[#FF8C00] hover:bg-[#E67E00] text-white py-6 rounded-[2rem] font-bold text-xl shadow-2xl shadow-orange-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-4"
                  >
                    <Lock className="w-6 h-6" />
                    Payer maintenant
                 </Link>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-12 py-6">
                 <div className="flex items-center gap-3 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-crosshair">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                       <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">SSL SECURE</span>
                 </div>
                 <div className="flex items-center gap-3 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-[#FF8C00]">
                       <CreditCard className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">PAIEMENT SÉCURISÉ</span>
                 </div>
                 <div className="flex items-center gap-3 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                    <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                       <Lock className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">PROTECTION DONNÉES</span>
                 </div>
              </div>
           </div>

           {/* Right Column: Order Summary */}
           <div className="flex-1">
              <div className="sticky top-32 space-y-8">
                 <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden p-1">
                    <div className="bg-[#FFF4E6]/50 p-10 flex flex-col items-center border-b border-orange-50">
                       <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                          <div className="bg-[#FF8C00] p-1.5 rounded-md">
                            <Calendar className="text-white w-6 h-6" />
                          </div>
                       </div>
                       <h3 className="text-2xl font-display font-bold text-[#1A1A1A]">Récapitulatif</h3>
                    </div>
                    <div className="p-10 space-y-10">
                       <div className="space-y-4">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest uppercase">Service</p>
                          <p className="font-bold text-[#1A1A1A] text-lg leading-relaxed">Excursion à Houmt Souk & Village de Guellala</p>
                       </div>

                       <div className="grid grid-cols-1 gap-8">
                          <div className="space-y-3">
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dates</p>
                             <div className="flex items-center gap-3 text-orange-500 font-bold text-sm">
                                <Calendar className="w-4 h-4" />
                                <span>15 Oct - 16 Oct 2023</span>
                             </div>
                          </div>
                          <div className="space-y-3">
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nombre de voyageurs</p>
                             <div className="flex items-center gap-3 text-gray-600 font-bold text-sm">
                                <Users className="w-4 h-4 text-[#FF8C00]" />
                                <span>2 Adultes</span>
                             </div>
                          </div>
                       </div>

                       <div className="pt-10 border-t border-gray-50 space-y-4 font-bold text-sm">
                          <div className="flex justify-between items-center text-gray-400">
                             <span>Sous-total</span>
                             <span className="text-[#1A1A1A]">110,00 €</span>
                          </div>
                          <div className="flex justify-between items-center text-gray-400">
                             <span>Frais de service</span>
                             <span className="text-[#1A1A1A]">10,00 €</span>
                          </div>
                       </div>

                       <div className="flex justify-between items-center pt-8 border-t border-gray-100">
                          <span className="text-xl font-display font-bold text-[#1A1A1A]">Prix total</span>
                          <span className="text-4xl font-display font-bold text-[#FF8C00]">120,00 €</span>
                       </div>

                       <div className="bg-orange-50/50 p-6 rounded-3xl border border-orange-100/50 flex gap-4">
                          <Info className="w-6 h-6 text-[#FF8C00] flex-shrink-0" />
                          <p className="text-[10px] font-bold text-gray-500 leading-relaxed uppercase tracking-wide">
                            Annulation gratuite jusqu'à 24h avant l'activité. En cliquant sur "Payer maintenant", vous acceptez nos conditions générales de vente.
                          </p>
                       </div>
                    </div>
                 </div>

                 <div className="flex justify-center flex-col items-center gap-6 py-6 border-t border-gray-100">
                   <p className="text-[11px] text-gray-300 font-bold uppercase tracking-[0.3em] overflow-hidden">
                     © 2023 Djerba Touriste. Tous droits réservés.
                   </p>
                   <div className="flex gap-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                     <Link to="/help" className="hover:text-gray-600">Aide</Link>
                     <Link to="/privacy" className="hover:text-gray-600">Confidentialité</Link>
                     <Link to="/terms" className="hover:text-gray-600">Conditions</Link>
                   </div>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
