import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Settings, 
  Globe, 
  Star, 
  MapPin, 
  Clock, 
  ArrowUpRight,
  TrendingUp,
  ChevronDown,
  Bell,
  Search,
  CheckCircle2,
  Calendar,
  CreditCard,
  User,
  Heart,
  Share2,
  Maximize2,
  ChevronRight
} from 'lucide-react';

const Amenity = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-4 py-1">
    <div className="w-6 h-6 flex items-center justify-center">
      <Icon className="w-5 h-5 text-[#FF8C00]" />
    </div>
    <span className="text-sm font-medium text-gray-500">{label}</span>
  </div>
);

const ServiceDetails = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Header */}
      <header className="h-20 bg-white border-b border-gray-50 sticky top-0 z-50 px-10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
          <div className="w-8 h-8 bg-[#FF8C00] rounded-full flex items-center justify-center">
             <Globe className="text-white w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-[#1A1A1A]">
            Djerba <span className="text-[#FF8C00]">Touriste</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-10">
          {['Hébergement', 'Thalasso', 'Restauration', 'Offres'].map(link => (
            <Link key={link} to="/categories" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#1A1A1A] transition-all">{link}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
             <button className="p-2.5 text-gray-400 hover:text-[#FF8C00] transition-colors"><Heart className="w-5 h-5" /></button>
             <button className="p-2.5 text-gray-400 hover:text-[#FF8C00] transition-colors"><Share2 className="w-5 h-5" /></button>
           </div>
           <div className="w-10 h-10 rounded-full border-2 border-orange-100 overflow-hidden shadow-sm">
             <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=Felix" alt="User" />
           </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-10 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-300 mb-8">
           <Link to="/" className="hover:text-gray-600">Accueil</Link>
           <ChevronRight className="w-3 h-3" />
           <Link to="/chat" className="hover:text-gray-600">Djerba</Link>
           <ChevronRight className="w-3 h-3 text-[#FF8C00]" />
           <span className="text-[#FF8C00]">Djerba Touriste</span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 rounded-[3rem] overflow-hidden mb-12 h-[600px]">
           <div className="h-full group relative cursor-pointer">
              <img src="/images/resort.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Main" />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all"></div>
           </div>
           <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
              <div className="relative group cursor-pointer overflow-hidden rounded-tr-[3rem]">
                 <img src="/images/scuba.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Interior" />
              </div>
              <div className="relative group cursor-pointer overflow-hidden">
                 <img src="/images/tour.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Interior" />
              </div>
              <div className="relative group cursor-pointer overflow-hidden">
                 <img src="/images/hero-bg.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="View" />
              </div>
              <div className="relative group cursor-pointer overflow-hidden rounded-br-[3rem]">
                 <img src="/images/resort.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 blur-sm" alt="More" />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-display font-bold text-2xl">+12 Photos</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 relative">
           {/* Detailed Content */}
           <div className="flex-[2] space-y-12">
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <span className="bg-orange-50 text-[#FF8C00] px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest border border-orange-100">Hôtel 5 étoiles</span>
                    <div className="flex gap-0.5">
                       {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-orange-400 fill-orange-400" />)}
                    </div>
                 </div>
                 <h1 className="text-5xl font-display font-bold text-[#1A1A1A]">Djerba Touriste</h1>
                 <div className="flex items-center gap-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#FF8C00]" /> Djerba, Tunisie - Bord de mer</div>
                    <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-500" /> <span className="text-[#1A1A1A]">4.9</span> (1,240 avis)</div>
                 </div>
              </div>

              <div className="flex items-center gap-4 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                 <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Host" />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-[#1A1A1A]">Géré par Amin K.</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Hôte d'exception • Membre depuis 2015</p>
                 </div>
              </div>

              <div className="space-y-8">
                 <h3 className="text-xl font-display font-bold text-[#1A1A1A]">Équipements et services</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    <Amenity icon={TrendingUp} label="Piscine à débordement" />
                    <Amenity icon={Heart} label="Centre de Thalasso & Spa" />
                    <Amenity icon={Globe} label="WiFi haut débit gratuit" />
                    <Amenity icon={MapPin} label="Accès plage privée" />
                    <Amenity icon={Utensils} label="4 Restaurants gastronomiques" />
                    <Amenity icon={BarChart3} label="Salle de sport moderne" />
                 </div>
                 <button className="px-8 py-3.5 bg-white border border-gray-100 rounded-xl text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] hover:shadow-lg transition-all">Afficher les 45 équipements</button>
              </div>

              <div className="space-y-6">
                 <h3 className="text-xl font-display font-bold text-[#1A1A1A]">À propos de cet établissement</h3>
                 <div className="text-sm text-gray-500 leading-relaxed space-y-4 font-medium">
                    <p>Situé sur la magnifique plage de Sidi Mahrez, le Hasdrubal Prestige Thalassa & Spa offre une expérience de luxe inégalée à Djerba. Notre établissement combine l'architecture traditionnelle tunisienne avec le confort moderne le plus raffiné.</p>
                    <p>Profitez de notre centre de thalassothérapie de 11 000 m², de nos jardins luxuriants et de nos suites spacieuses avec vue imprenable sur la Méditerranée. Chaque détail a été pensé pour votre sérénité.</p>
                 </div>
                 <button className="text-[#FF8C00] font-bold text-xs uppercase tracking-widest hover:underline underline-offset-8">Lire la suite</button>
              </div>

              <div className="space-y-10 pt-10 border-t border-gray-50">
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <Star className="w-5 h-5 text-[#FF8C00] fill-[#FF8C00]" />
                       <span className="text-2xl font-display font-bold text-[#1A1A1A]">4.9 • 1,240 avis</span>
                    </div>
                    <button className="text-[10px] font-bold text-[#FF8C00] uppercase tracking-widest hover:underline">Voir tout</button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {[
                      { name: 'Sarah L.', from: 'Lyon, France', date: 'Octobre 2023', comment: '"Un séjour paradisiaque. Le centre de thalasso est l\'un des meilleurs que j\'ai visités. Le personnel est aux petits soins et la nourriture est excellente."' },
                      { name: 'Marc D.', from: 'Bruxelles, Belgique', date: 'Septembre 2023', comment: '"Hôtel magnifique avec une architecture unique. La piscine lagon est incroyable. Parfait pour se ressourcer en toute tranquillité."' }
                    ].map((review, i) => (
                      <div key={i} className="space-y-4">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-[#FF8C00] text-xs">
                               {review.name[0]}
                            </div>
                            <div>
                               <p className="text-xs font-bold text-[#1A1A1A]">{review.name}</p>
                               <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{review.from} • {review.date}</p>
                            </div>
                         </div>
                         <p className="text-xs text-gray-400 italic font-medium leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-6 pt-10 border-t border-gray-50">
                 <div className="relative rounded-[3rem] overflow-hidden grayscale border border-gray-100 h-[400px]">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/10.8451,33.8075,12,0/1200x400?access_token=pk.eyJ1IjoiYm90IiwiYSI6ImNrMmJ2Z3J6YjBmaGYzYm8yeHh4eHh4eHh4In0')" }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <button className="bg-white/95 backdrop-blur-sm px-8 py-4 rounded-2xl font-bold shadow-2xl flex items-center gap-3 active:scale-95 transition-all text-sm">
                          <MapPin className="text-[#FF8C00] w-5 h-5" />
                          Afficher sur la carte
                       </button>
                    </div>
                 </div>
              </div>
           </div>

           {/* Sticky Booking Sidebar */}
           <div className="lg:w-[400px]">
              <div className="sticky top-32 bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-10 space-y-10 group overflow-hidden">
                 <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                       <span className="text-3xl font-display font-bold text-[#1A1A1A]">245 €</span>
                       <span className="text-sm font-bold text-gray-400">/ nuit</span>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-0 border border-gray-100 rounded-[1.5rem] overflow-hidden">
                       <div className="p-4 border-r border-gray-100 bg-gray-50/50 space-y-1 hover:bg-white transition-colors cursor-pointer">
                          <p className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-gray-400">ARRIVÉE</p>
                          <p className="text-xs font-bold text-[#1A1A1A]">12/11/2023</p>
                       </div>
                       <div className="p-4 bg-gray-50/50 space-y-1 hover:bg-white transition-colors cursor-pointer">
                          <p className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-gray-400">DÉPART</p>
                          <p className="text-xs font-bold text-[#1A1A1A]">19/11/2023</p>
                       </div>
                       <div className="col-span-2 p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between hover:bg-white transition-colors cursor-pointer">
                          <div className="space-y-1">
                             <p className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-gray-400">VOYAGEURS</p>
                             <p className="text-xs font-bold text-[#1A1A1A]">2 adultes, 0 enfant</p>
                          </div>
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                       </div>
                    </div>
                 </div>

                 <Link 
                    to="/booking/selection" 
                    className="w-full bg-[#FF8C00] hover:bg-[#E67E00] text-white py-5 rounded-[1.5rem] font-bold text-lg shadow-xl shadow-orange-500/20 transition-all active:scale-[0.98] block text-center"
                 >
                    Réserver maintenant
                 </Link>
                 <p className="text-[10px] text-center text-gray-300 font-bold uppercase tracking-widest">Aucun montant ne sera débité pour le moment</p>

                 <div className="space-y-4 pt-6 border-t border-gray-50 font-bold text-xs uppercase tracking-tighter">
                    <div className="flex justify-between items-center text-gray-400">
                       <span>245 € x 7 nuits</span>
                       <span className="text-[#1A1A1A]">1,715 €</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-400">
                       <span>Frais de service</span>
                       <span className="text-[#1A1A1A]">0 €</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-400">
                       <span>Taxes locales</span>
                       <span className="text-[#1A1A1A]">35 €</span>
                    </div>
                 </div>

                 <div className="flex justify-between items-center pt-8 border-t border-gray-100">
                    <span className="text-xl font-display font-bold text-[#1A1A1A]">Total</span>
                    <span className="text-3xl font-display font-bold text-[#1A1A1A]">1,750 €</span>
                 </div>

                 <div className="bg-orange-50/50 p-6 rounded-[2rem] border border-orange-100/50 flex gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                       <CheckCircle2 className="w-5 h-5 text-[#FF8C00]" />
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 leading-relaxed uppercase tracking-wide">
                      Meilleur prix garanti. Vous ne trouverez pas moins cher ailleurs.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </main>

      {/* Footer (Reusing sections) */}
      <footer className="bg-gray-50/50 pt-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-12 pb-24 border-b border-gray-100">
          <div className="space-y-8">
            <h4 className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#1A1A1A]">À propos</h4>
            <ul className="space-y-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <li><a href="#" className="hover:text-[#FF8C00] transition-colors">Notre histoire</a></li>
              <li><a href="#" className="hover:text-[#FF8C00] transition-colors">Carrières</a></li>
              <li><a href="#" className="hover:text-[#FF8C00] transition-colors">Presse</a></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#1A1A1A]">Destinations</h4>
            <ul className="space-y-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <li><a href="#" className="hover:text-[#FF8C00] transition-colors">Houmt Souk</a></li>
              <li><a href="#" className="hover:text-[#FF8C00] transition-colors">Midoun</a></li>
              <li><a href="#" className="hover:text-[#FF8C00] transition-colors">Aghir</a></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#1A1A1A]">Assistance</h4>
            <ul className="space-y-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <li><a href="#" className="hover:text-[#FF8C00] transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="hover:text-[#FF8C00] transition-colors">Conditions d'annulation</a></li>
              <li><a href="#" className="hover:text-[#FF8C00] transition-colors">Sécurité</a></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#1A1A1A]">Suivez-nous</h4>
            <div className="flex gap-4">
               {[Globe, Heart, Share2].map((Icon, i) => (
                 <button key={i} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#FF8C00] hover:border-[#FF8C00] transition-all">
                   <Icon className="w-4 h-4" />
                 </button>
               ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-10 py-10 flex flex-col md:row items-center justify-between text-[11px] font-bold text-gray-300 uppercase tracking-[0.2em] gap-6">
           <p>© 2024 Djerba Touriste. Tous droits réservés.</p>
           <div className="flex gap-10">
              <a href="#" className="hover:text-gray-600 transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Conditions</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Plan du site</a>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default ServiceDetails;
