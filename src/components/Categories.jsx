import React, { useState, useEffect } from 'react';
import { Hotel, Compass, Ship, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import publicApi from '../services/publicApi';

const categoryMap = [
  { icon: Hotel, name: 'Hébergement', label: 'Hotels', count: '0', color: 'bg-[#FFF4E6] text-[#FF8C00]', type: 'ROOM' },
  { icon: Compass, name: 'Guide Touristique', label: 'Guides', count: '0', color: 'bg-[#FFF4E6] text-[#FF8C00]', type: 'GUIDE_TOUR' },
  { icon: Utensils, name: 'Restauration', label: 'Dining', count: '0', color: 'bg-[#FFF4E6] text-[#FF8C00]', type: 'TABLE' },
  { icon: Ship, name: 'Activités Nautiques', label: 'Activities', count: '0', color: 'bg-[#FFF4E6] text-[#FF8C00]', type: 'GENERIC' },
];

const Categories = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState(categoryMap);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const services = await publicApi.getAllServices();
        const newCats = categoryMap.map(cat => {
            const count = services.filter(s => s.category === cat.name || s.serviceType === cat.type).length;
            return { ...cat, count: `${count}+ ${cat.label}` };
        });
        setCategories(newCats);
      } catch (err) {
        console.error("Failed to fetch category counts", err);
      }
    };
    fetchCounts();
  }, []);

  const handleCategoryClick = (e, catName, catType) => {
    e.preventDefault();
    if (onCategoryClick) {
        onCategoryClick(catName, catType);
        window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-4xl font-display font-bold text-[#1A1A1A] mb-3">Explorer par Catégorie</h2>
          <p className="text-gray-500 font-medium">Des expériences curatées pour chaque type de voyageur</p>
        </div>
        <button 
          onClick={() => onCategoryClick('')}
          className="text-[#FF8C00] font-bold text-sm tracking-wide hover:underline decoration-2 underline-offset-8 uppercase transition-all"
        >
          Voir Tout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, i) => (
          <button 
            key={i} 
            onClick={(e) => handleCategoryClick(e, cat.name, cat.type)}
            className="group p-10 bg-white border border-gray-100 rounded-[2.5rem] hover:border-[#FF8C00]/20 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500 text-center cursor-pointer block w-full"
          >
            <div className={`w-20 h-20 ${cat.color} rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
              <cat.icon className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h3 className="font-display font-bold text-2xl text-[#1A1A1A] mb-2">{cat.name}</h3>
            <p className="text-gray-400 text-sm font-semibold tracking-wide">{cat.count}</p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
