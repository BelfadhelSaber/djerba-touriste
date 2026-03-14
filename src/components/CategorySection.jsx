import React, { useState, useEffect } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import publicApi from '../services/publicApi';

const CategorySection = ({ title, subtitle, category, serviceType, searchQuery, limit = 3 }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        let data = [];
        if (serviceType) {
            data = await publicApi.getServicesByType(serviceType);
        } else if (category) {
            data = await publicApi.getServicesByCategory(category);
        } else {
            data = await publicApi.getAllServices();
        }

        // Apply client-side search filtering
        if (searchQuery) {
            const lowQuery = searchQuery.toLowerCase();
            data = data.filter(s => 
                s.title?.toLowerCase().includes(lowQuery) || 
                s.description?.toLowerCase().includes(lowQuery) ||
                s.category?.toLowerCase().includes(lowQuery)
            );
        }

        setServices(data.slice(0, limit));
      } catch (err) {
        console.error(`Failed to fetch services for ${title}`, err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [category, serviceType, searchQuery, limit]);

  if (loading) return null; // Or a skeleton

  if (services.length === 0) return null;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-16 underline-offset-8">
        <div>
          <h2 className="text-4xl font-display font-bold text-[#1A1A1A] mb-3">{title}</h2>
          <p className="text-gray-500 font-medium text-lg">{subtitle}</p>
        </div>
        <Link to="/" className="text-[#FF8C00] font-bold text-sm tracking-wide hover:underline decoration-2 uppercase transition-all">
          Voir Tout {title}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((item, i) => (
          <Link 
            key={i} 
            to={`/service/${item.id}`} 
            className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100/50 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 block"
          >
            <div className="relative h-72 overflow-hidden bg-gray-50">
              <img 
                src={item.imageUrl || `https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800`} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                <Star className="w-4 h-4 text-[#FF8C00] fill-[#FF8C00]" />
                <span className="text-sm font-bold text-[#1A1A1A]">4.9</span>
              </div>
              
              {item.serviceType === 'ROOM' && (
                 <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                    {item.boardPrices ? (
                      Object.entries(JSON.parse(item.boardPrices)).slice(0, 1).map(([type, price]) => (
                        <div key={type} className="bg-[#FF8C00] text-white px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-lg">
                           {type}: {price} TND
                        </div>
                      ))
                    ) : item.boardType && (
                        <div className="bg-[#FF8C00] text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                           {item.boardType}
                        </div>
                    )}
                 </div>
              )}
            </div>
            
            <div className="p-10">
              <div className="inline-block bg-[#FFF4E6] text-[#FF8C00] text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg mb-6 shadow-sm">
                {item.category || item.serviceType}
              </div>
              <h3 className="text-2xl font-display font-bold text-[#1A1A1A] mb-4 group-hover:text-[#FF8C00] transition-colors">{item.title}</h3>
              <p className="text-gray-400 text-sm mb-10 leading-relaxed line-clamp-2 font-medium">
                {item.description}
              </p>
              <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-display font-bold text-[#1A1A1A]">
                      {item.boardPrices ? (
                        `À partir de ${Math.min(...Object.values(JSON.parse(item.boardPrices)))} TND`
                      ) : (
                        `${item.price} TND`
                      )}
                    </span>
                  </div>
                </div>
                <div className="text-[#FF8C00] font-bold text-sm flex items-center gap-2 group/btn hover:gap-4 transition-all uppercase tracking-wider">
                  Explorer <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
