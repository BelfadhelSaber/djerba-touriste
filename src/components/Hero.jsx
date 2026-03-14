import React from 'react';
import { MapPin, LayoutGrid, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState('');

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query, category);
    }
  };

  return (
    <div className="relative h-[100vh] min-h-[700px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-8 leading-[1.1] drop-shadow-2xl">
          Découvrez la Magie<br />
          de <span className="text-[#FF8C00]">l'Île de Djerba</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/95 mb-16 max-w-3xl mx-auto font-normal leading-relaxed drop-shadow-lg">
          Votre porte d'entrée vers le secret le mieux gardé de la Méditerranée. Trouvez des hôtels de luxe,<br className="hidden md:block" />
          des circuits authentiques et des activités insulaires inoubliables.
        </p>

        {/* Search Bar */}
        <div className="bg-white p-2.5 rounded-[2rem] flex flex-col md:row-item items-center gap-2 max-w-4xl mx-auto shadow-2xl">
          <div className="flex flex-col md:flex-row w-full gap-2">
            {/* Where to */}
            <div className="flex-1 flex items-center gap-4 px-6 py-4 bg-gray-50/50 rounded-2xl transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-100">
              <MapPin className="text-[#FF8C00] w-6 h-6" />
              <input 
                type="text" 
                placeholder="Que recherchez-vous ?" 
                className="bg-transparent border-none outline-none text-[#333] placeholder:text-gray-400 w-full font-medium"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            
            {/* Divider */}
            <div className="hidden md:block w-px h-10 bg-gray-200 self-center"></div>

            {/* All Services */}
            <div className="flex-1 flex items-center gap-4 px-6 py-4 bg-gray-50/50 rounded-2xl transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-100">
              <LayoutGrid className="text-[#FF8C00] w-6 h-6" />
              <select 
                className="bg-transparent border-none outline-none text-[#333] w-full cursor-pointer font-medium appearance-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Tous les Services</option>
                <option value="Hébergement">Hôtels</option>
                <option value="Restauration">Restaurants</option>
                <option value="Guide Touristique">Guides</option>
                <option value="Activités Nautiques">Activités</option>
              </select>
              <div className="pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            {/* Search Button */}
            <button 
              onClick={handleSearchClick}
              className="w-full md:w-auto bg-[#FF8C00] hover:bg-[#E67E00] text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-orange-500/30 transition-all active:scale-95 text-lg flex items-center justify-center whitespace-nowrap"
            >
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
