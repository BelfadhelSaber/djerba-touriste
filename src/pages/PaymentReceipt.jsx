import React from 'react';
import { 
  CheckCircle2, 
  Download, 
  Printer, 
  Calendar, 
  Users, 
  MapPin, 
  CreditCard, 
  Mail, 
  Phone, 
  ChevronRight,
  Globe,
  Star,
  Receipt,
  ArrowLeft,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentReceipt = () => {
  const transaction = {
    id: "#DT-2023-8829341",
    date: "14 Octobre 2023, 14:32",
    method: "Visa **** 1234",
    status: "Payé"
  };

  const stay = {
    dates: "12 - 15 Octobre 2023",
    duration: "3 Nuits",
    guests: "2 Adultes"
  };

  const pricing = [
    { label: "Hébergement (3 nuits x 450 TND)", value: "1 350,00 TND" },
    { label: "TVA (19%)", value: "256,50 TND" },
    { label: "Frais de service plateforme", value: "45,00 TND" },
    { label: "Taxe de séjour", value: "12,00 TND" }
  ];

  const total = "1 663,50 TND";

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation / Back Button */}
        <div className="flex items-center justify-between mb-10">
           <Link to="/account" className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-[#FF8C00] transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour à mes réservations
           </Link>
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FF8C00] rounded-lg"></div>
              <span className="font-bold text-gray-900">Djerba Touriste</span>
           </div>
        </div>

        {/* Success Header Card */}
        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm mb-8 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-2 h-full bg-green-500"></div>
           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                 <h1 className="text-4xl font-black text-gray-900 mb-2">Reçu de Paiement</h1>
                 <p className="text-gray-400 font-medium">Merci pour votre réservation sur notre plateforme intelligente.</p>
              </div>
              <div className="flex items-center gap-2 bg-green-50 text-green-600 px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest border border-green-100 shadow-sm">
                 <CheckCircle2 className="w-5 h-5" />
                 {transaction.status}
              </div>
           </div>
        </div>

        {/* Transaction & Stay Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
           <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm group hover:border-orange-100 transition-all">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF8C00] group-hover:bg-[#FF8C00] group-hover:text-white transition-all shadow-sm">
                    <Info className="w-6 h-6" />
                 </div>
                 <h2 className="text-xl font-black text-gray-900">Détails de la transaction</h2>
              </div>
              <div className="space-y-6">
                 <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">ID de commande</span>
                    <span className="text-sm font-black text-gray-900">{transaction.id}</span>
                 </div>
                 <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date de transaction</span>
                    <span className="text-sm font-black text-gray-900">{transaction.date}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Mode de paiement</span>
                    <span className="text-sm font-black text-gray-900 flex items-center gap-2">
                       <CreditCard className="w-4 h-4 text-[#FF8C00]" />
                       {transaction.method}
                    </span>
                 </div>
              </div>
           </div>

           <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm group hover:border-orange-100 transition-all">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF8C00] group-hover:bg-[#FF8C00] group-hover:text-white transition-all shadow-sm">
                    <Calendar className="w-6 h-6" />
                 </div>
                 <h2 className="text-xl font-black text-gray-900">Détails du séjour</h2>
              </div>
              <div className="space-y-6">
                 <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Dates</span>
                    <span className="text-sm font-black text-gray-900">{stay.dates}</span>
                 </div>
                 <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Durée</span>
                    <span className="text-sm font-black text-gray-900">{stay.duration}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Voyageurs</span>
                    <span className="text-sm font-black text-gray-900 flex items-center gap-2">
                       <Users className="w-4 h-4 text-[#FF8C00]" />
                       {stay.guests}
                    </span>
                 </div>
              </div>
           </div>
        </div>

        {/* Property Summary Card */}
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden mb-8 group hover:shadow-xl transition-all">
           <div className="flex flex-col md:flex-row">
              <div className="md:w-64 h-56 md:h-auto relative overflow-hidden">
                 <img 
                    src="/images/resort.png" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt="Property" 
                 />
                 <div className="absolute inset-0 bg-black/10"></div>
              </div>
              <div className="flex-1 p-10">
                 <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                       <Star key={i} className="w-4 h-4 text-orange-400 fill-orange-400" />
                    ))}
                 </div>
                 <h3 className="text-2xl font-black text-gray-900 mb-2">Hasdrubal Prestige Thalassa & Spa</h3>
                 <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest mb-6">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    Zone Touristique Aghir, Djerba, Tunisie
                 </div>
                 <button className="text-sm font-bold text-[#FF8C00] hover:text-[#E67E00] flex items-center gap-2 transition-colors uppercase tracking-widest">
                    Voir les détails de l'établissement
                    <ChevronRight className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>

        {/* Pricing Summary Table */}
        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm mb-12">
           <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF8C00] shadow-sm">
                 <Receipt className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Récapitulatif du paiement</h2>
           </div>
           
           <div className="space-y-6 mb-10">
              {pricing.map((item, idx) => (
                 <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">{item.label}</span>
                    <span className="font-black text-gray-900">{item.value}</span>
                 </div>
              ))}
           </div>
           
           <div className="pt-8 border-t-[3px] border-gray-50 flex items-center justify-between">
              <span className="text-2xl font-black text-gray-900">Total Payé</span>
              <span className="text-4xl font-black text-[#FF8C00]">{total}</span>
           </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-16">
           <button className="w-full sm:flex-1 bg-[#FF8C00] text-white py-6 rounded-[24px] font-black text-lg shadow-2xl shadow-orange-500/30 hover:bg-[#E67E00] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 group">
              <Download className="w-6 h-6 group-hover:animate-bounce" />
              Télécharger en PDF
           </button>
           <button className="w-full sm:w-auto px-10 py-6 bg-white border-2 border-gray-100 text-gray-600 rounded-[24px] font-black hover:bg-gray-50 hover:border-orange-100 transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95">
              <Printer className="w-6 h-6" />
              Imprimer
           </button>
        </div>

        {/* Professional Footer Support Area */}
        <div className="border-t border-gray-100 pt-16 flex flex-col items-center">
           <div className="mb-8 flex items-center gap-2 grayscale group hover:grayscale-0 transition-all">
              <div className="p-3 bg-orange-50 rounded-2xl">
                 <CheckCircle2 className="w-6 h-6 text-[#FF8C00]" />
              </div>
              <span className="text-lg font-black text-gray-900 uppercase tracking-tighter">Merci d'avoir choisi Djerba Touriste</span>
           </div>
           
           <div className="flex flex-wrap justify-center gap-10 mb-12">
              <a href="mailto:support@djerba-tourisme.tn" className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors">
                 <Mail className="w-4 h-4 text-orange-500" />
                 support@djerba-tourisme.tn
              </a>
              <a href="tel:+21675000000" className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors">
                 <Phone className="w-4 h-4 text-orange-500" />
                 +216 75 000 000
              </a>
              <a href="#" className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors">
                 <Globe className="w-4 h-4 text-orange-500" />
                 Centre d'aide
              </a>
           </div>
           
           <div className="text-center">
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em] mb-2">© 2023 Djerba Intelligent Tourist Platform. Tous droits réservés.</p>
              <p className="text-[10px] font-medium text-gray-300 italic uppercase">Ce document est un reçu officiel de paiement.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
