import React, { useState } from 'react';
import { 
  CreditCard, 
  Lock, 
  Calendar, 
  Users, 
  ChevronRight, 
  Check,
  ShieldCheck,
  Info,
  Clock,
  X,
  CreditCard as CardIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckoutPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [step, setStep] = useState(3);

  const steps = [
    { id: 1, label: "Détails" },
    { id: 2, label: "Réservation" },
    { id: 3, label: "Paiement" }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      {/* Centered Header with Steps */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm max-w-3xl mx-auto">
          {steps.map((s) => (
            <div key={s.id} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                s.id < step ? 'bg-orange-500 text-white' : 
                s.id === step ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 ring-4 ring-orange-50' : 
                'bg-gray-100 text-gray-400'
              }`}>
                {s.id < step ? <Check className="w-4 h-4" /> : s.id}
              </div>
              <span className={`text-sm font-bold ${s.id === step ? 'text-[#FF8C00]' : 'text-gray-400'}`}>
                {s.label}
              </span>
              {s.id !== 3 && <div className="w-12 h-[2px] bg-gray-100 ml-2"></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Form Area */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Mode de paiement</h2>
            
            {/* Payment Method Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <button 
                onClick={() => setPaymentMethod('card')}
                className={`p-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                  paymentMethod === 'card' 
                    ? 'border-[#FF8C00] bg-orange-50/30' 
                    : 'border-gray-100 hover:border-orange-200 bg-white shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === 'card' ? 'bg-[#FF8C00] text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <span className={`font-bold text-sm ${paymentMethod === 'card' ? 'text-gray-900' : 'text-gray-500'}`}>Carte Bancaire</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === 'card' ? 'border-[#FF8C00]' : 'border-gray-200'}`}>
                   {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-[#FF8C00]"></div>}
                </div>
              </button>

              <button 
                onClick={() => setPaymentMethod('paypal')}
                className={`p-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                  paymentMethod === 'paypal' 
                    ? 'border-[#FF8C00] bg-orange-50/30' 
                    : 'border-gray-100 hover:border-orange-200 bg-white shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === 'paypal' ? 'bg-[#FF8C00] text-white' : 'bg-gray-100 text-gray-400'}`}>
                      <div className="font-bold text-sm">P</div>
                   </div>
                   <span className={`font-bold text-sm ${paymentMethod === 'paypal' ? 'text-gray-900' : 'text-gray-500'}`}>PayPal</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === 'paypal' ? 'border-[#FF8C00]' : 'border-gray-200'}`}>
                   {paymentMethod === 'paypal' && <div className="w-2.5 h-2.5 rounded-full bg-[#FF8C00]"></div>}
                </div>
              </button>
            </div>

            {/* Credit Card Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Nom sur la carte</label>
                <input 
                  type="text" 
                  placeholder="M. Jean Dupont" 
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-orange-100 transition-all outline-none font-medium"
                />
              </div>

              <div className="relative">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Numéro de carte</label>
                <div className="relative group">
                  <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#FF8C00] transition-colors" />
                  <input 
                    type="text" 
                    placeholder="0000 0000 0000 0000" 
                    className="w-full pl-14 pr-5 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-orange-100 transition-all outline-none font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Date d'expiration</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-orange-100 transition-all outline-none font-medium"
                  />
                </div>
                <div>
                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">CVV</label>
                   <div className="relative">
                      <input 
                        type="text" 
                        placeholder="123" 
                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-orange-100 transition-all outline-none font-medium pr-12"
                      />
                      <Info className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 cursor-help" />
                   </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                 <input type="checkbox" id="save" className="w-5 h-5 rounded-lg border-gray-200 text-[#FF8C00] focus:ring-orange-100 cursor-pointer" />
                 <label htmlFor="save" className="text-sm text-gray-500 font-medium cursor-pointer">Enregistrer les informations de paiement pour la prochaine fois.</label>
              </div>

              <Link 
                to="/receipt" 
                className="w-full bg-[#FF8C00] text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/20 hover:bg-[#E67E00] transition-all active:scale-[0.99] flex items-center justify-center gap-3 mt-6"
              >
                 <Lock className="w-5 h-5" />
                 Payer maintenant
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center gap-10 mt-10">
             <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                <ShieldCheck className="w-5 h-5 text-orange-400" />
                SSL Secure
             </div>
             <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                <Lock className="w-5 h-5 text-orange-400" />
                Paiement sécurisé
             </div>
             <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                <ShieldCheck className="w-5 h-5 text-orange-400" />
                Protection données
             </div>
          </div>
        </div>

        {/* Sidebar Summary Area */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden sticky top-8">
            <div className="bg-orange-50/50 p-8 flex items-center justify-center relative">
               <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#FF8C00] relative z-10">
                  <Clock className="w-8 h-8" />
               </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Récapitulatif</h3>
              
              <div className="space-y-6 border-b border-gray-50 pb-6 mb-6">
                <div>
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Service</span>
                   <p className="font-bold text-gray-900 leading-tight">Excursion à Houmt Souk & Village de Guellala</p>
                </div>
                <div className="flex items-center justify-between">
                   <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Dates</span>
                      <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        15 Oct - 16 Oct 2023
                      </p>
                   </div>
                </div>
                <div>
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Nombre de voyageurs</span>
                   <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                     <Users className="w-4 h-4 text-orange-500" />
                     2 Adultes
                   </p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                   <span className="text-gray-400 font-medium">Sous-total</span>
                   <span className="text-gray-900 font-bold">110,00 €</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-gray-400 font-medium">Frais de service</span>
                   <span className="text-gray-900 font-bold">10,00 €</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-50">
                   <span className="text-lg font-bold text-gray-900">Prix total</span>
                   <span className="text-2xl font-extrabold text-[#FF8C00]">120,00 €</span>
                </div>
              </div>

              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-3">
                 <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                 <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                   Annulation gratuite jusqu'à 24h avant l'activité. En cliquant sur "Payer maintenant", vous acceptez nos conditions générales de vente.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Footer */}
      <div className="max-w-6xl mx-auto mt-20 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
         <p className="text-[11px] text-gray-400 font-medium">© 2023 Djerba Touriste. Tous droits réservés.</p>
         <div className="flex items-center gap-8">
            <Link to="/help" className="text-[11px] text-gray-400 font-bold uppercase tracking-widest hover:text-orange-500 transition-colors">Aide</Link>
            <Link to="/privacy" className="text-[11px] text-gray-400 font-bold uppercase tracking-widest hover:text-orange-500 transition-colors">Confidentialité</Link>
            <Link to="/terms" className="text-[11px] text-gray-400 font-bold uppercase tracking-widest hover:text-orange-500 transition-colors">Conditions</Link>
         </div>
      </div>
    </div>
  );
};

export default CheckoutPayment;
