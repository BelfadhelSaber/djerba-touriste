import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Languages, 
  Save, 
  Camera, 
  ShieldCheck,
  Facebook,
  Instagram
} from 'lucide-react';
import providerApi from '../services/providerApi';

const ProviderSettings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    businessName: "",
    type: "Hébergement",
    bio: "",
    address: "",
    phone: "",
    email: "", // This comes from User login email
    website: "",
    languages: [],
    facebook: "",
    instagram: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const providerId = providerApi.getProviderId();
        if (!providerId) return;

        const data = await providerApi.getProviderProfile(providerId);
        
        // Parse languages from comma-separated string
        const parsedLanguages = data.languages ? data.languages.split(',').map(l => l.trim()).filter(l => l) : [];

        setProfileData({
          businessName: data.businessName || "",
          type: data.type || "Hébergement",
          bio: data.bio || "",
          address: data.address || "",
          phone: data.phone || "",
          email: data.email || "", 
          website: data.website || "",
          languages: parsedLanguages,
          facebook: data.facebook || "",
          instagram: data.instagram || ""
        });
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
        const providerId = providerApi.getProviderId();
        if (!providerId) return;
        
        // Prepare data for backend (join languages array to string)
        const updatePayload = {
            ...profileData,
            languages: profileData.languages.join(',')
        };

        await providerApi.updateProviderProfile(providerId, updatePayload);
        alert('Profil mis à jour avec succès !');
    } catch (err) {
        console.error("Failed to save profile", err);
        alert('Erreur lors de la mise à jour.');
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Mon Profil Public</h1>
            <p className="text-gray-400 font-medium">Gérez la façon dont votre établissement apparaît aux yeux des touristes.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#FF8C00] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-orange-500/20 hover:bg-[#E67E00] active:scale-95 transition-all text-sm"
          >
            {isSaving ? (
               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
               <Save className="w-4 h-4" />
            )}
            Sauvegarder
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Avatar & Verification Status */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm text-center">
               <div className="relative inline-block mb-6 group">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden ring-4 ring-orange-50 mx-auto">
                     <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Property Logo" />
                  </div>
                  <button className="absolute bottom-1 right-1 bg-[#FF8C00] p-2.5 rounded-full border-4 border-white shadow-lg text-white hover:bg-[#E67E00] transition-all">
                     <Camera className="w-4 h-4" />
                  </button>
               </div>
               <h3 className="text-lg font-black text-gray-900">{profileData.businessName}</h3>
               <p className="text-sm font-bold text-[#FF8C00] uppercase tracking-widest mt-1">{profileData.type}</p>
            </div>

            <div className="bg-green-50/50 rounded-[32px] p-8 border border-green-100 text-center">
               <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-green-500/20 mb-4">
                  <ShieldCheck className="w-6 h-6" />
               </div>
               <h3 className="text-base font-black text-green-700 mb-2">Prestataire Vérifié</h3>
               <p className="text-xs text-green-600 font-medium">Vos documents sont à jour. Votre profil bénéficie du badge de confiance.</p>
            </div>
          </div>

          {/* Right Column: Edit Form */}
          <div className="lg:col-span-8">
             <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm space-y-10">
                {/* Section 1 */}
                <section>
                   <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2 mb-6">
                      <Building2 className="w-5 h-5 text-[#FF8C00]" />
                      Informations Générales
                   </h3>
                   <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nom de l'établissement</label>
                           <input type="text" name="businessName" value={profileData.businessName} onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-orange-100 outline-none transition-all" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Type de service</label>
                           <select name="type" value={profileData.type} onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-orange-100 outline-none transition-all appearance-none">
                              <option>Hébergement</option>
                              <option>Restauration</option>
                              <option>Excursion / Activité</option>
                              <option>Transport</option>
                           </select>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Présentation (Bio)</label>
                         <textarea name="bio" value={profileData.bio} onChange={handleChange} rows="3" className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-orange-100 outline-none transition-all resize-none"></textarea>
                      </div>
                   </div>
                </section>

                <hr className="border-gray-100" />

                {/* Section 2 */}
                <section>
                   <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2 mb-6">
                      <MapPin className="w-5 h-5 text-[#FF8C00]" />
                      Coordonnées & Contact
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="col-span-1 md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5"><MapPin className="w-3 h-3"/> Adresse Complète</label>
                        <input type="text" name="address" value={profileData.address} onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-orange-100 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5"><Phone className="w-3 h-3"/> Téléphone</label>
                        <input type="text" name="phone" value={profileData.phone} onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-orange-100 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5"><Mail className="w-3 h-3"/> Email Professionnel</label>
                        <input type="email" name="email" value={profileData.email} onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-orange-100 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5"><Globe className="w-3 h-3"/> Site Web (Optionnel)</label>
                        <input type="text" name="website" value={profileData.website} onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-orange-100 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5"><Facebook className="w-3 h-3"/> Réseaux Sociaux</label>
                        <input type="text" name="facebook" value={profileData.facebook} onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-orange-100 outline-none" />
                      </div>
                   </div>
                </section>
                
                <hr className="border-gray-100" />
                
                {/* Section 3 */}
                <section>
                   <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2 mb-6">
                      <Languages className="w-5 h-5 text-[#FF8C00]" />
                      Langues Parlées
                   </h3>
                   <div className="flex flex-wrap gap-3">
                      {["Français", "Anglais", "Arabe", "Allemand", "Italien", "Espagnol"].map(lang => (
                         <button 
                           key={lang}
                           type="button"
                           onClick={() => {
                              const isSelected = profileData.languages.includes(lang);
                              setProfileData(prev => ({
                                 ...prev,
                                 languages: isSelected 
                                    ? prev.languages.filter(l => l !== lang)
                                    : [...prev.languages, lang]
                              }))
                           }}
                           className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                              profileData.languages.includes(lang) 
                              ? 'bg-[#FF8C00] text-white border-[#FF8C00] shadow-md shadow-orange-500/20' 
                              : 'bg-white text-gray-400 border-gray-200 hover:border-orange-200 hover:text-orange-500'
                           }`}
                         >
                            {lang}
                         </button>
                      ))}
                   </div>
                </section>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderSettings;
