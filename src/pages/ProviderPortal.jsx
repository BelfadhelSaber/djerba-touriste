import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  TrendingUp, 
  Star, 
  Euro, 
  Edit3, 
  Trash2, 
  Layout, 
  Clock, 
  Calendar, 
  BarChart3,
  Globe,
  MoreVertical,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import providerApi from '../services/providerApi';

const StatCard = ({ label, value, trend, icon: Icon, color }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex-1 group hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-6">
       <div className={`w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-[#FF8C00] transition-colors`}>
          <Icon className="w-6 h-6" />
       </div>
       <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">
          <TrendingUp className="w-3 h-3" />
          {trend}
       </div>
    </div>
    <div className="space-y-1">
       <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{label}</p>
       <h3 className="text-3xl font-display font-bold text-[#1A1A1A]">{value}</h3>
    </div>
  </div>
);

const ServiceCard = ({ id, name, category, price, status, image, type, location, onDelete }) => (
  <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
    <div className="relative h-64 overflow-hidden">
       <img src={image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5904?q=80&w=800&auto=format&fit=crop"} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
       <div className={`absolute top-6 left-6 px-4 py-2 rounded-xl text-[9px] font-extrabold uppercase tracking-widest backdrop-blur-md border border-white/20 shadow-xl ${
         status === 'ACTIVE' ? 'bg-green-500/80 text-white' : 
         status === 'PENDING' ? 'bg-orange-500/80 text-white' : 
         'bg-gray-500/80 text-white'
       }`}>
         {status || 'ACTIVE'}
       </div>
    </div>
    <div className="p-8 space-y-6">
       <div className="flex justify-between items-start">
          <div className="space-y-1">
             <p className="text-[10px] font-bold text-[#FF8C00] uppercase tracking-[0.2em]">{category}</p>
             <h4 className="text-lg font-display font-bold text-[#1A1A1A] group-hover:text-[#FF8C00] transition-colors leading-tight">{name}</h4>
          </div>
          <div className="text-right">
             <p className="text-xl font-display font-bold text-[#1A1A1A]">TND {price}</p>
             <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">/{type || 'unit'}</p>
          </div>
       </div>
       
       <div className="flex items-center gap-3 text-gray-400 text-[10px] font-bold uppercase tracking-widest px-1">
          <Globe className="w-3.5 h-3.5" />
          {location || 'Djerba'}
       </div>

       <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <button className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-orange-50 hover:text-[#FF8C00] transition-all"><Edit3 className="w-4 h-4" /></button>
             <button onClick={() => onDelete(id)} className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
          </div>
          <button className="text-[10px] font-bold text-[#FF8C00] uppercase tracking-widest hover:underline underline-offset-8">View Analytics</button>
       </div>
    </div>
  </div>
);

const ProviderPortal = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const providerId = providerApi.getProviderId();
      if (!providerId) {
          setError("Not logged in");
          setLoading(false);
          return;
      }
      const data = await providerApi.getServices(providerId);
      setServices(data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch services.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id) => {
      if(window.confirm("Are you sure you want to delete this service?")) {
          try {
              await providerApi.deleteService(id);
              fetchServices(); // refresh list
          } catch(err) {
              console.error(err);
              alert("Failed to delete service.");
          }
      }
  }

  return (
    <div className="space-y-12 selection:bg-[#FF8C00]/20 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h1 className="text-4xl font-display font-bold text-[#1A1A1A] tracking-tight mb-2">My Services</h1>
           <p className="text-sm text-gray-400 font-medium">Manage and monitor your service listings on Djerba.</p>
        </div>
        <NavLink to="/provider/services/new" className="flex items-center gap-3 bg-[#FF8C00] hover:bg-[#E67E00] text-white px-8 py-5 rounded-2xl font-bold shadow-2xl shadow-orange-500/20 transition-all active:scale-95">
          <Plus className="w-5 h-5" /> Add New Service
        </NavLink>
      </div>

      {/* Tabs */}
      <div className="flex gap-10 border-b border-gray-100">
         {[`All (${services.length})`].map((tab, idx) => (
           <button key={tab} className={`pb-6 text-sm font-bold transition-all relative ${idx === 0 ? 'text-[#FF8C00]' : 'text-gray-400 hover:text-gray-600'}`}>
             {tab}
             {idx === 0 && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF8C00] rounded-t-full shadow-[0_-2px_8px_rgba(255,140,0,0.3)]"></div>}
           </button>
         ))}
      </div>

      {/* Stats Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        <StatCard label="Total Services" value={services.length.toString()} trend="Active" icon={Layout} />
        <StatCard label="Total Bookings (Monthly)" value="0" trend="+0%" icon={Calendar} />
        <StatCard label="Average Rating" value="0.0 / 5.0" trend="New" trendUp icon={Star} />
      </div>

      {error && <div className="text-red-500 font-bold p-4 bg-red-50 rounded-2xl mb-4">{error}</div>}

      {/* Services Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8C00]"></div>
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[3rem] border border-gray-100">
            <Layout className="w-16 h-16 text-gray-200 mx-auto mb-6" />
            <h3 className="text-2xl font-display font-bold text-[#1A1A1A] mb-2">No Services Yet</h3>
            <p className="text-gray-400 font-medium mb-8">You haven't added any services to your portal.</p>
            <NavLink to="/provider/services/new" className="inline-flex items-center gap-3 bg-[#FF8C00] hover:bg-[#E67E00] text-white px-8 py-4 rounded-2xl font-bold transition-all active:scale-95">
                <Plus className="w-5 h-5" /> Create Your First Service
            </NavLink>
        </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map(service => (
                <ServiceCard 
                  key={service.id}
                  id={service.id}
                  name={service.title} 
                  category={service.category} 
                  price={service.price} 
                  type="unit" 
                  status="ACTIVE" 
                  image={null}
                  location={service.location}
                  onDelete={handleDeleteService}
                />
            ))}
          </div>
      )}

      {/* Service Table Summary */}
      {services.length > 0 && (
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden mt-12">
            <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
               <h3 className="text-xl font-display font-bold text-[#1A1A1A]">Service Table Summary</h3>
               <div className="relative group w-full md:w-80">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#FF8C00] transition-colors" />
                  <input type="text" placeholder="Search services..." className="w-full pl-16 pr-6 py-4 bg-[#F8FAFC] border-none rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-orange-100 transition-all" />
               </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Service Name</th>
                    <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
                    <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</th>
                    <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {services.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/20 transition-colors">
                      <td className="px-10 py-8 text-sm font-bold text-[#1A1A1A]">{row.title}</td>
                      <td className="px-10 py-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">{row.category}</td>
                      <td className="px-10 py-8">
                        <span className="bg-green-50 text-green-500 px-3 py-1.5 rounded-lg text-[9px] font-extrabold tracking-widest">ACTIVE</span>
                      </td>
                      <td className="px-10 py-8 text-sm font-bold text-[#1A1A1A]">TND {row.price}</td>
                      <td className="px-10 py-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">{row.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      )}
    </div>
  );
};

export default ProviderPortal;
