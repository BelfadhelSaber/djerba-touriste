import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Info, 
  ImagePlus, 
  Upload, 
  DollarSign, 
  MapPin, 
  Tag as TagIcon,
  ChevronDown,
  CheckCircle2,
  HelpCircle,
  Hash,
  Clock,
  Coffee,
  List
} from 'lucide-react';
import providerApi from '../services/providerApi';

const FormSection = ({ number, title, children, icon: Icon }) => (
  <div className="bg-white p-12 rounded-[3.5rem] border border-gray-50 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-center gap-6 mb-12">
      <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-[#FF8C00] font-bold text-sm">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-display font-bold text-[#1A1A1A]">{number}. {title}</h3>
      </div>
    </div>
    <div className="space-y-10">
      {children}
    </div>
  </div>
);

const InputWrapper = ({ label, placeholder, type = "text", select, textarea, value, onChange, options = [] }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">{label}</label>
    {textarea ? (
      <textarea 
        placeholder={placeholder} 
        rows={6}
        value={value}
        onChange={onChange}
        className="w-full px-8 py-5 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all outline-none"
      />
    ) : select ? (
      <div className="relative">
        <select 
          value={value} 
          onChange={onChange}
          className="w-full px-8 py-5 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all outline-none appearance-none cursor-pointer text-gray-500"
        >
          <option value="">{placeholder}</option>
          {options.map((opt, idx) => (
             <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    ) : (
      <input 
        type={type} 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        className="w-full px-8 py-5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all outline-none font-bold text-[#1A1A1A]" 
      />
    )}
  </div>
);

const CreateService = () => {
  const navigate = useNavigate();
  const [providerType, setProviderType] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    currency: 'TND',
    capacity: '',
    address: '',
    roomView: '',     
    boardType: '',    
    menuDetails: '',  
    duration: '',     
    serviceType: 'GENERIC'
  });
  
  const [boardPrices, setBoardPrices] = useState({}); // { "Demi Pension": 150, ... }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const boardTypeOptions = ['Logement Simple', 'Petit Déjeuner', 'Demi Pension', 'All Inclusive', 'Soft Inclusive', 'Logement Complet'];

  useEffect(() => {
    const fetchProviderType = async () => {
        try {
            const providerId = providerApi.getProviderId();
            if (providerId) {
                const profile = await providerApi.getProviderProfile(providerId);
                const type = profile.type || '';
                setProviderType(type);
                
                let defaultCategory = type;
                let defaultServiceType = 'GENERIC';
                
                if (type === 'Hébergement') {
                    defaultServiceType = 'ROOM';
                } else if (type === 'Restauration') {
                     defaultServiceType = 'TABLE'; 
                } else if (type === 'Guide Touristique') {
                     defaultServiceType = 'GUIDE_TOUR';
                }

                setFormData(prev => ({ 
                    ...prev, 
                    category: defaultCategory,
                    serviceType: defaultServiceType
                }));
            }
        } catch (err) {
            console.error("Could not fetch provider profile", err);
        }
    };
    fetchProviderType();
  }, []);

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleBoardPriceChange = (type, price) => {
    setBoardPrices(prev => ({ ...prev, [type]: price }));
  };

  const toggleBoardType = (type) => {
    setBoardPrices(prev => {
        const next = { ...prev };
        if (next[type] !== undefined) {
            delete next[type];
        } else {
            next[type] = '';
        }
        return next;
    });
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.category) {
      alert("Veuillez remplir les champs obligatoires (Titre, Catégorie).");
      return;
    }
    
    // For hotels, we might have multiple prices or a base price
    if (providerType !== 'Hébergement' && !formData.price) {
        alert("Veuillez indiquer le prix.");
        return;
    }

    setError('');
    setIsSubmitting(true);

    try {
        const providerId = providerApi.getProviderId();
        if (!providerId) {
            setError("Authentication error. Please log in again as a provider.");
            setIsSubmitting(false);
            return;
        }

        const servicePayload = {
            title: formData.title,
            category: formData.category,
            description: formData.description,
            price: parseFloat(formData.price) || 0,
            capacity: parseInt(formData.capacity) || 1,
            location: formData.address,
            providerId: providerId,
            serviceType: formData.serviceType,
            roomView: formData.roomView,
            boardType: Object.keys(boardPrices)[0] || '', // Pick first one as primary
            boardPrices: JSON.stringify(boardPrices),
            menuDetails: formData.menuDetails,
            duration: formData.duration
        };

        await providerApi.createService(servicePayload);
        alert("Service publié avec succès !");
        navigate('/provider/dashboard');
    } catch(err) {
        console.error(err);
        setError("Failed to create service. Please ensure all data is valid.");
    } finally {
        setIsSubmitting(false);
    }
  };

  // Determine which specialized section to show
  const isHotel = providerType === 'Hébergement';
  const isRestaurant = providerType === 'Restauration';
  const isGuide = providerType === 'Guide Touristique';

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <main className="max-w-4xl mx-auto px-6 pb-20 pt-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-[#FF8C00] text-[10px] font-bold uppercase tracking-widest mb-10 hover:-translate-x-1 transition-transform group">
          <ArrowLeft className="w-4 h-4 group-hover:scale-110" /> Retour au Tableau de Bord
        </button>

        <div className="space-y-4 mb-20">
          <h1 className="text-4xl font-display font-bold text-[#1A1A1A]">Publier un Nouveau Service</h1>
          <p className="text-gray-400 font-medium tracking-wide">
            {isHotel ? "Détaillez les caractéristiques de votre chambre (capacité, vue, types de pension et tarifs)." : 
             isRestaurant ? "Ajoutez une table ou publiez votre menu." :
             isGuide ? "Décrivez votre excursion ou visite guidée." :
             "Remplissez les détails ci-dessous pour lister votre service."}
          </p>
          {error && <div className="text-red-500 font-bold bg-red-50 p-4 rounded-xl mt-4">{error}</div>}
        </div>

        <div className="space-y-12">
          <FormSection number="1" title="Informations Générales" icon={Info}>
            <InputWrapper 
                label={isHotel ? "Type de Chambre (Titre)" : isRestaurant ? "Nom de la Table/Menu" : "Titre du Service"} 
                placeholder={isHotel ? "ex: Chambre Double Vue Mer" : "ex: Table VIP (4 pers) ou Menu Dégustation"} 
                value={formData.title} 
                onChange={(e) => handleInputChange(e, 'title')} 
            />
            
            {isRestaurant && (
               <InputWrapper 
                 label="Type de Service" 
                 placeholder="Sélectionnez" 
                 select 
                 options={['TABLE', 'MENU']}
                 value={formData.serviceType} 
                 onChange={(e) => handleInputChange(e, 'serviceType')} 
               />
            )}

            <InputWrapper 
                label="Description" 
                placeholder="Décrivez l'expérience en détail..." 
                textarea 
                value={formData.description} 
                onChange={(e) => handleInputChange(e, 'description')} 
            />
          </FormSection>

          {/* DYNAMIC SECTION BASED ON TYPE */}
          {(isHotel || isRestaurant || isGuide) && (
              <FormSection number="2" title="Détails Spécifiques" icon={List}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {isHotel && (
                        <div className="col-span-full space-y-8">
                            <InputWrapper 
                                label="Vue de la Chambre" 
                                placeholder="ex: Vue Mer, Vue Jardin" 
                                value={formData.roomView} 
                                onChange={(e) => handleInputChange(e, 'roomView')} 
                            />
                            
                            <div className="space-y-4">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Formules de Pension & Tarifs (TND)</label>
                                <div className="grid grid-cols-1 gap-4">
                                    {boardTypeOptions.map((opt) => (
                                        <div key={opt} className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl transition-all hover:bg-white hover:shadow-sm border border-transparent hover:border-orange-50">
                                            <label className="flex items-center gap-4 flex-1 cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={boardPrices[opt] !== undefined}
                                                    onChange={() => toggleBoardType(opt)}
                                                    className="w-5 h-5 rounded-lg border-gray-200 text-[#FF8C00] focus:ring-[#FF8C00]"
                                                />
                                                <span className="text-sm font-bold text-[#1A1A1A]">{opt}</span>
                                            </label>
                                            
                                            {boardPrices[opt] !== undefined && (
                                                <div className="flex items-center gap-3 w-40">
                                                    <DollarSign className="w-4 h-4 text-[#FF8C00]" />
                                                    <input 
                                                        type="number"
                                                        placeholder="Prix"
                                                        value={boardPrices[opt]}
                                                        onChange={(e) => handleBoardPriceChange(opt, e.target.value)}
                                                        className="w-full bg-white border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-orange-100 outline-none p-2"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {isGuide && (
                        <InputWrapper 
                            label="Durée estimée" 
                            placeholder="ex: 2 Heures, Demi-journée" 
                            value={formData.duration} 
                            onChange={(e) => handleInputChange(e, 'duration')} 
                        />
                    )}
                </div>
                {isRestaurant && formData.serviceType === 'MENU' && (
                     <InputWrapper 
                         label="Détails du Menu" 
                         placeholder="Entrées, Plats, Desserts..." 
                         textarea
                         value={formData.menuDetails} 
                         onChange={(e) => handleInputChange(e, 'menuDetails')} 
                     />
                )}
              </FormSection>
          )}

          <FormSection number={isHotel || isRestaurant || isGuide ? "3" : "2"} title="Tarification & Capacité" icon={DollarSign}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {!isHotel && <InputWrapper label="Prix de base" placeholder="0.00" type="number" value={formData.price} onChange={(e) => handleInputChange(e, 'price')} />}
              <InputWrapper label="Devise" placeholder="TND" select options={['TND', 'EUR', 'USD']} value={formData.currency} onChange={(e) => handleInputChange(e, 'currency')}/>
              <InputWrapper 
                label={isHotel ? "Capacité (Personnes)" : isRestaurant && formData.serviceType === 'TABLE' ? "Couverts" : "Capacité Max"} 
                placeholder="Nb. de personnes" 
                type="number" 
                value={formData.capacity} 
                onChange={(e) => handleInputChange(e, 'capacity')} 
              />
            </div>
          </FormSection>


          <FormSection number={isHotel || isRestaurant || isGuide ? "4" : "3"} title="Localisation" icon={MapPin}>
            <div className="space-y-8">
              <InputWrapper label="Adresse / Lieu de Rendez-vous" placeholder="Commencez à taper..." value={formData.address} onChange={(e) => handleInputChange(e, 'address')} />
            </div>
          </FormSection>

          <FormSection number={isHotel || isRestaurant || isGuide ? "5" : "4"} title="Commodités & Tags" icon={TagIcon}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['WiFi Gratuit', 'Accès Piscine', 'Spa / Massage', 'Adapté aux Familles', 'Boissons Incluses', 'Navette', 'Guide Inclus', 'Assurance'].map((tag, i) => (
                <label key={i} className="flex items-center gap-4 px-6 py-5 bg-white border border-gray-50 rounded-[1.5rem] cursor-pointer hover:border-orange-100 hover:shadow-sm transition-all group">
                  <input type="checkbox" className="w-5 h-5 rounded-lg border-gray-200 text-[#FF8C00] focus:ring-[#FF8C00] transition-all" />
                  <span className="text-[11px] font-bold text-gray-400 group-hover:text-[#1A1A1A] transition-colors uppercase tracking-widest">{tag}</span>
                </label>
              ))}
            </div>
          </FormSection>

          <div className="pt-20 flex flex-col sm:flex-row items-center justify-center gap-8">
            <button className="w-full sm:w-auto px-16 py-6 bg-white border border-gray-100 rounded-[2rem] font-bold text-gray-400 hover:text-[#1A1A1A] hover:shadow-xl transition-all text-lg mb-10">Brouillon</button>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-20 py-6 bg-[#FF8C00] hover:bg-[#E67E00] text-white rounded-[2rem] font-bold shadow-2xl shadow-orange-500/30 transition-all active:scale-95 flex items-center justify-center gap-4 text-xl disabled:opacity-70 disabled:cursor-not-allowed mb-10">
              {isSubmitting ? (
                 <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white"></div>
              ) : (
                 <CheckCircle2 className="w-7 h-7" />
              )}
              {isSubmitting ? 'Publication...' : 'Publier le Service'}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CreateService;
