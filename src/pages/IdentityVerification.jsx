import React, { useState } from 'react';
import { 
  Upload, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileText, 
  AlertCircle, 
  Trash2, 
  Info,
  ChevronRight,
  ArrowRight,
  HelpCircle,
  Search,
  Check,
  Briefcase
} from 'lucide-react';

const IdentityVerification = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documents, setDocuments] = useState({
    cinFront: null,
    cinBack: null,
    patente: null,
    address: null
  });

  const handleFileUpload = (type) => (e) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments(prev => ({ ...prev, [type]: e.target.files[0] }));
    }
  };

  const removeFile = (type) => {
    setDocuments(prev => ({ ...prev, [type]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Documents soumis avec succès pour vérification !');
      // In reality, we would redirect or show a success state here
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div>
            <span className="bg-orange-50 text-orange-500 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest border border-orange-100 mb-4 inline-block">Étape Obligatoire</span>
            <h1 className="text-4xl font-black text-gray-900 mb-2">Vérification d'Identité</h1>
            <p className="text-gray-400 font-medium max-w-2xl leading-relaxed">
              Renforcez la confiance de vos futurs clients et accédez à toutes les fonctionnalités de la plateforme en faisant vérifier vos documents officiels.
            </p>
          </div>
          <div className="bg-white px-6 py-4 rounded-[24px] border border-gray-100 shadow-sm flex items-center gap-4 group">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
               <Clock className="w-5 h-5" />
            </div>
            <div>
               <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-tight mb-1">Statut :</p>
               <p className="text-sm font-black text-gray-900">{documents.cinFront || documents.patente ? 'En cours' : 'Non complété'}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            {/* Section 1: Identity Card */}
            <div className={`bg-white p-10 rounded-[40px] border ${documents.cinFront && documents.cinBack ? 'border-green-100' : 'border-gray-100'} shadow-sm transition-all`}>
               <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-6">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${documents.cinFront && documents.cinBack ? 'bg-green-50 text-green-500 border border-green-100' : 'bg-orange-50 text-orange-500'}`}>
                        <Search className="w-6 h-6" />
                     </div>
                     <div>
                        <h2 className="text-xl font-black text-gray-900 leading-tight">1. Pièce d'Identité (Recto/Verso)</h2>
                        <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest leading-none">Carte d'Identité Nationale ou Passeport</p>
                     </div>
                  </div>
                  {documents.cinFront && documents.cinBack ? (
                     <span className="flex items-center gap-1.5 text-[10px] font-black text-green-500 bg-green-50 px-3 py-1 rounded-md uppercase tracking-tighter border border-green-100">
                        <CheckCircle2 className="w-3 h-3" /> COMPLET
                     </span>
                  ) : (
                     <span className="text-[10px] font-black text-gray-300 bg-gray-50 px-3 py-1 rounded-md uppercase tracking-tighter">NON FOURNI</span>
                  )}
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Front Upload */}
                  <label className="border-2 border-dashed border-gray-100 rounded-[32px] p-8 flex flex-col items-center justify-center text-center group/upload hover:border-orange-100 hover:bg-orange-50/20 transition-all cursor-pointer relative">
                     <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileUpload('cinFront')} />
                     {documents.cinFront ? (
                        <>
                           <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 mb-4 border border-green-100">
                              <FileText className="w-6 h-6" />
                           </div>
                           <p className="text-sm font-black text-gray-900 mb-1 truncate max-w-[150px]">{documents.cinFront.name}</p>
                           <button onClick={(e) => { e.preventDefault(); removeFile('cinFront'); }} className="mt-2 text-[10px] font-bold text-red-400 hover:text-red-500 uppercase flex items-center gap-1">
                              <Trash2 className="w-3 h-3"/> Retirer
                           </button>
                        </>
                     ) : (
                        <>
                           <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 mb-4 group-hover/upload:bg-orange-100 group-hover/upload:text-orange-500 transition-all">
                              <Upload className="w-6 h-6" />
                           </div>
                           <p className="text-sm font-black text-gray-900 mb-1">Cliquer pour charger le Recto</p>
                           <p className="text-[10px] text-gray-400 font-bold uppercase">PDF, JPG, PNG (Max 5MB)</p>
                        </>
                     )}
                  </label>
                  
                  {/* Back Upload */}
                  <label className="border-2 border-dashed border-gray-100 rounded-[32px] p-8 flex flex-col items-center justify-center text-center group/upload hover:border-orange-100 hover:bg-orange-50/20 transition-all cursor-pointer relative">
                     <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileUpload('cinBack')} />
                     {documents.cinBack ? (
                        <>
                           <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 mb-4 border border-green-100">
                              <FileText className="w-6 h-6" />
                           </div>
                           <p className="text-sm font-black text-gray-900 mb-1 truncate max-w-[150px]">{documents.cinBack.name}</p>
                           <button onClick={(e) => { e.preventDefault(); removeFile('cinBack'); }} className="mt-2 text-[10px] font-bold text-red-400 hover:text-red-500 uppercase flex items-center gap-1">
                              <Trash2 className="w-3 h-3"/> Retirer
                           </button>
                        </>
                     ) : (
                        <>
                           <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 mb-4 group-hover/upload:bg-orange-100 group-hover/upload:text-orange-500 transition-all">
                              <Upload className="w-6 h-6" />
                           </div>
                           <p className="text-sm font-black text-gray-900 mb-1">Cliquer pour charger le Verso</p>
                           <p className="text-[10px] text-gray-400 font-bold uppercase">Obligatoire pour la CNI</p>
                        </>
                     )}
                  </label>
               </div>
            </div>

            {/* Section 2: Trade Register (Patente) */}
            <div className={`bg-white p-10 rounded-[40px] border ${documents.patente ? 'border-green-100' : 'border-gray-100'} shadow-sm relative`}>
               <div className="flex items-center justify-between mb-8 mt-2">
                  <div className="flex items-center gap-6">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${documents.patente ? 'bg-green-50 text-green-500 border border-green-100' : 'bg-orange-50 text-orange-500 border border-orange-50'}`}>
                        <Briefcase className="w-6 h-6" />
                     </div>
                     <div>
                        <h2 className="text-xl font-black text-gray-900 leading-tight">2. Registre de Commerce (Patente)</h2>
                        <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest font-mono">Document datant de moins de 3 mois</p>
                     </div>
                  </div>
               </div>

               {documents.patente ? (
                  <div className="bg-green-50/30 border border-green-100 rounded-[24px] p-6 flex items-center justify-between group transition-all">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-green-500 border border-green-50">
                           <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-sm font-black text-gray-900 mb-0.5">{documents.patente.name}</p>
                           <p className="text-[10px] text-gray-400 font-bold uppercase">Ajouté à l'instant • {Math.round(documents.patente.size / 1024)} KB</p>
                        </div>
                     </div>
                     <button onClick={() => removeFile('patente')} className="p-3 text-red-300 hover:text-red-500 transition-colors bg-white rounded-xl shadow-sm border border-red-50">
                        <Trash2 className="w-5 h-5" />
                     </button>
                  </div>
               ) : (
                  <label className="border-2 border-dashed border-gray-100 rounded-[32px] p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-orange-100 hover:bg-orange-50/20 transition-all group/upload">
                     <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileUpload('patente')} />
                     <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 mb-4 group-hover/upload:bg-orange-100 group-hover/upload:text-orange-500 transition-all">
                        <Upload className="w-6 h-6" />
                     </div>
                     <p className="text-sm font-black text-gray-900 mb-1">Cliquer pour charger la Patente</p>
                     <p className="text-[10px] text-gray-400 font-bold uppercase">Un justificatif d'immatriculation d'entreprise</p>
                  </label>
               )}
            </div>
            
            {/* Section 3: Proof of Address (Waiting) */}
            <div className={`bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm transition-all ${!documents.cinFront || !documents.patente ? 'opacity-50 grayscale-[0.8] cursor-not-allowed' : ''}`}>
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-6">
                     <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 shadow-sm border border-orange-100">
                        <AlertCircle className="w-6 h-6" />
                     </div>
                     <div>
                        <h2 className="text-xl font-black text-gray-900 leading-tight">3. Justificatif de domicile</h2>
                        <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest leading-none">Facture STEG/SONEDE ou contrat de bail</p>
                     </div>
                  </div>
                  <span className="text-[10px] font-black text-gray-400 bg-gray-50 px-3 py-1 rounded-md uppercase tracking-tighter shadow-sm">À VENIR</span>
               </div>

               <div className="bg-gray-50/50 border-2 border-dashed border-gray-100 rounded-[32px] p-12 flex flex-col items-center justify-center text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 text-gray-300 mb-4 opacity-50">
                       <FileText className="w-full h-full" />
                    </div>
                    <p className="font-black text-gray-500 mb-1">Étape bloquée</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Veuillez d'abord compléter les étapes 1 et 2</p>
                  </div>
               </div>
            </div>

            {/* Main Submit Action */}
            <div className={`p-8 rounded-[40px] border flex flex-col md:flex-row items-center justify-between gap-6 group transition-all ${documents.cinFront && documents.cinBack && documents.patente ? 'bg-orange-50/50 border-orange-100' : 'bg-gray-50 border-gray-100'}`}>
               <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-transform ${documents.cinFront && documents.cinBack && documents.patente ? 'bg-[#FF8C00] text-white shadow-orange-500/20 group-hover:scale-110' : 'bg-gray-200 text-gray-400 shadow-transparent'}`}>
                     <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                     <h3 className={`text-lg font-black leading-none mb-1 ${documents.cinFront && documents.cinBack && documents.patente ? 'text-gray-900' : 'text-gray-400'}`}>Prêt à envoyer ?</h3>
                     <p className="text-xs text-gray-400 font-medium">Assurez-vous que tous les documents sont lisibles et à jour avant de soumettre pour examen final.</p>
                  </div>
               </div>
               <button 
                  onClick={handleSubmit}
                  disabled={!documents.cinFront || !documents.cinBack || !documents.patente || isSubmitting}
                  className={`w-full md:w-auto px-10 py-5 rounded-[24px] font-black text-base transition-all flex items-center justify-center gap-3 active:scale-95 group/btn ${documents.cinFront && documents.cinBack && documents.patente ? 'bg-[#FF8C00] text-white shadow-2xl shadow-orange-500/30 hover:bg-[#E67E00] hover:translate-x-1 cursor-pointer' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
               >
                  {isSubmitting ? (
                     <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Envoi en cours...
                     </>
                  ) : (
                     <>
                        Soumettre pour examen
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                     </>
                  )}
               </button>
            </div>
          </div>

          {/* Right Sidebar: Help & Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 group hover:shadow-xl transition-all">
               <div className="flex items-center gap-3 mb-8">
                  <HelpCircle className="w-6 h-6 text-[#FF8C00]" />
                  <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter">Pourquoi la vérification ?</h3>
               </div>
               <ul className="space-y-6">
                  {[
                     "Badge de confiance sur votre profil public",
                     "Accessibilité aux paiements directs en ligne",
                     "Meilleure visibilité dans les résultats de recherche",
                     "Protection accrue contre les fraudes"
                  ].map((item, i) => (
                     <li key={i} className="flex gap-4">
                        <div className="mt-1 flex-shrink-0">
                           <div className="w-5 h-5 bg-orange-50 rounded-full flex items-center justify-center text-[#FF8C00] shadow-sm">
                              <Check className="w-3.5 h-3.5" />
                           </div>
                        </div>
                        <p className="text-sm text-gray-500 font-bold leading-relaxed">{item}</p>
                     </li>
                  ))}
               </ul>
            </div>

            <div className="bg-[#1A1A1A] rounded-[40px] p-10 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
               <div className="relative z-10">
                  <h3 className="text-xl font-black mb-6 leading-tight">Besoin d'aide ?</h3>
                  <p className="text-gray-400 text-sm font-medium mb-10 leading-relaxed">Notre support est disponible 24/7 pour vous accompagner dans votre démarche de certification.</p>
                  <button className="w-full bg-white text-gray-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#FF8C00] hover:text-white transition-all shadow-lg active:scale-95">
                     Contacter le support
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* Professional Footer Mini */}
        <footer className="mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
           <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">© 2024 Djerba Touriste - Direction du Tourisme</p>
           <div className="flex items-center gap-6">
              <a href="#" className="text-[10px] font-black text-gray-300 hover:text-orange-500 transition-colors uppercase tracking-widest">Politique de confidentialité</a>
              <a href="#" className="text-[10px] font-black text-gray-300 hover:text-orange-500 transition-colors uppercase tracking-widest">Conditions prestataires</a>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default IdentityVerification;
