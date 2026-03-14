import React from 'react';
import { 
  Star, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  CheckCircle2, 
  MessageSquare, 
  Share2,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Search,
  User,
  Instagram,
  Twitter,
  Facebook
} from 'lucide-react';

const ProviderProfile = () => {
  const stats = [
    { label: "PLATFORM AGE", value: "5 Years", color: "text-orange-500" },
    { label: "RESPONSE", value: "98%", color: "text-orange-500" },
    { label: "REVIEWS", value: "124", color: "text-orange-500" },
    { label: "RATING", value: "4.9", icon: <Star className="w-4 h-4 text-orange-400 fill-orange-400 ml-1" />, color: "text-orange-500" },
  ];

  const services = [
    {
      id: 1,
      title: "Traditional Djerbian Dar with Pool",
      location: "Houmt Souk",
      price: "85",
      type: "HOTEL",
      rating: "5.0",
      reviews: "42",
      image: "https://images.unsplash.com/photo-1549412656-9905bbfa069a?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "Sunset Dromedary & Beach Picnic",
      location: "Aghir",
      price: "35",
      type: "EXCURSION",
      rating: "4.8",
      reviews: "89",
      image: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const reviews = [
    {
      id: 1,
      user: "Sarah Jenkins",
      date: "October 2023",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      comment: "Ahmed was an incredible host! He knows every corner of Djerba and his house was impeccably clean and beautifully decorated. Highly recommend his sunset tour!"
    },
    {
      id: 2,
      user: "Marc Lefebvre",
      date: "September 2023",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marc",
      comment: "Expérience authentique au top. Ahmed parle parfaitement français et nous a fait découvrir des endroits que nous n'aurions jamais trouvés seuls. Merci encore !"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Mini Navbar */}
      <nav className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-50">
         <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
               <div className="w-6 h-6 bg-[#FF8C00] rounded-lg"></div>
               <span className="font-bold text-gray-900">Djerba Touriste</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-400 uppercase tracking-widest">
               <a href="#" className="hover:text-gray-900 transition-colors">Explore</a>
               <a href="#" className="hover:text-gray-900 transition-colors">Experiences</a>
               <a href="#" className="hover:text-gray-900 transition-colors">Support</a>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
               <input type="text" placeholder="Search experiences..." className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm outline-none w-64 focus:ring-2 focus:ring-orange-100 transition-all" />
            </div>
            <button className="p-2 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
               <User className="w-4 h-4 text-gray-600" />
            </button>
         </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="relative h-64 sm:h-80 rounded-[40px] overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1544123089-18244f3cb523?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover" 
            alt="Cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        {/* Profile Info Overlay */}
        <div className="max-w-6xl mx-auto -mt-20 relative z-10 px-4 sm:px-10">
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 p-10 rounded-[40px] shadow-2xl shadow-orange-500/5">
             <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                   <div className="relative group">
                      <div className="w-32 h-32 rounded-full border-[6px] border-white shadow-xl overflow-hidden ring-4 ring-orange-50 transition-transform group-hover:scale-105">
                         <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed" className="w-full h-full object-cover" alt="Profile" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-orange-500 p-1.5 rounded-full border-4 border-white shadow-lg shadow-orange-500/30">
                         <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                   </div>
                   
                   <div>
                      <h1 className="text-4xl font-black text-gray-900 mb-1">Ahmed Ben Salem</h1>
                      <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest">
                         <MapPin className="w-4 h-4 text-orange-500" />
                         Houmt Souk, Djerba
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-4">
                   <button className="bg-[#FF8C00] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-orange-500/20 hover:bg-[#E67E00] transition-all active:scale-95 group">
                      <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      Contact Provider
                   </button>
                   <button className="p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors shadow-sm">
                      <Share2 className="w-5 h-5 text-gray-400" />
                   </button>
                </div>
             </div>

             {/* Stats Grid */}
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12 pt-10 border-t border-gray-100/50">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center group cursor-default">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 group-hover:text-orange-400 transition-colors">{stat.label}</p>
                     <p className={`text-3xl font-black ${stat.color} flex items-center justify-center`}>
                        {stat.value}
                        {stat.icon}
                     </p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24">
        {/* Left Column: Bio & Services */}
        <div className="lg:col-span-8">
           <section className="mb-16">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                 About Ahmed
                 <div className="h-1.5 w-1.5 bg-orange-500 rounded-full"></div>
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed font-medium">
                 Hello! I'm Ahmed, a passionate local guide born and raised in the beautiful island of Djerba. With over 15 years of experience in the hospitality industry, I specialize in creating authentic experiences that showcase the hidden gems of our island. From traditional pottery workshops in Guellala to sunset boat trips to Flamingo Island, my goal is to make your stay unforgettable.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                 <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-orange-200 transition-all">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                       <Globe className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Languages</p>
                       <p className="text-sm font-bold text-gray-900">Arabic, French, English, German</p>
                    </div>
                 </div>
                 <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-orange-200 transition-all">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                       <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Trust & Safety</p>
                       <p className="text-sm font-bold text-gray-900">Verified Identity & Insurance</p>
                    </div>
                 </div>
              </div>
           </section>

           <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                    Services by Ahmed
                    <div className="h-1.5 w-1.5 bg-orange-500 rounded-full"></div>
                 </h2>
                 <button className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-all flex items-center gap-2">
                    View all (12)
                    <ChevronRight className="w-4 h-4" />
                 </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 {services.map((service) => (
                    <div key={service.id} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                       <div className="relative h-60">
                          <img src={service.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={service.title} />
                          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur rounded-lg px-2 py-1 text-[10px] font-black text-white tracking-widest uppercase">
                             {service.type}
                          </div>
                       </div>
                       <div className="p-8">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-orange-500 transition-colors uppercase tracking-tight">{service.title}</h3>
                          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-6">
                             <MapPin className="w-3.5 h-3.5 text-orange-500" />
                             {service.location} • Up to 6 guests
                          </div>
                          <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                             <div>
                                <span className="text-2xl font-black text-[#FF8C00]">€{service.price}</span>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">{service.type === 'HOTEL' ? '/night' : '/person'}</span>
                             </div>
                             <div className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                                <span className="text-sm font-bold text-gray-900">{service.rating}</span>
                                <span className="text-xs font-medium text-gray-400">({service.reviews})</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </section>

           <section>
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                    Customer Reviews
                    <div className="h-1.5 w-1.5 bg-orange-500 rounded-full"></div>
                 </h2>
                 <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-orange-400 fill-orange-400" />
                    <span className="text-lg font-black text-gray-900">4.9</span>
                    <span className="text-sm font-bold text-gray-400 tracking-widest uppercase ml-1">• 124 reviews</span>
                 </div>
              </div>

              <div className="space-y-6">
                 {reviews.map((review) => (
                    <div key={review.id} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                       <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                             <img src={review.avatar} className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm" alt={review.user} />
                             <div>
                                <h4 className="font-bold text-gray-900">{review.user}</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.date}</p>
                             </div>
                          </div>
                          <div className="flex gap-0.5">
                             {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-orange-400 fill-orange-400' : 'text-gray-200'}`} />
                             ))}
                          </div>
                       </div>
                       <p className="text-gray-500 font-medium leading-relaxed italic">"{review.comment}"</p>
                    </div>
                 ))}
                 
                 <button className="w-full py-4 bg-white border border-gray-100 rounded-[20px] text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-widest shadow-sm">
                    Show all 124 reviews
                 </button>
              </div>
           </section>
        </div>

        {/* Right Column: Sidebar Panels */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm sticky top-24">
              <h3 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-tight">Verified Information</h3>
              <ul className="space-y-6">
                 <li className="flex items-center gap-4 text-sm font-bold text-gray-600">
                    <div className="bg-green-50 p-1.5 rounded-lg"><CheckCircle2 className="w-4 h-4 text-green-500" /></div>
                    Identity verified
                 </li>
                 <li className="flex items-center gap-4 text-sm font-bold text-gray-600">
                   <div className="bg-green-50 p-1.5 rounded-lg"><CheckCircle2 className="w-4 h-4 text-green-500" /></div>
                    Email address confirmed
                 </li>
                 <li className="flex items-center gap-4 text-sm font-bold text-gray-600 text-gray-300">
                    <div className="bg-green-50 p-1.5 rounded-lg"><CheckCircle2 className="w-4 h-4 text-green-500" /></div>
                    Phone number confirmed
                 </li>
                 <li className="flex items-center gap-4 text-sm font-bold text-gray-600">
                   <div className="bg-green-50 p-1.5 rounded-lg"><CheckCircle2 className="w-4 h-4 text-green-500" /></div>
                    Tourist Guide License #9829
                 </li>
              </ul>
              
              <div className="mt-12 pt-8 border-t border-gray-50">
                 <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Social Media</h4>
                 <div className="flex items-center gap-4">
                    <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:bg-orange-50 hover:text-orange-500 transition-all"><Globe className="w-5 h-5" /></button>
                    <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:bg-orange-50 hover:text-orange-500 transition-all"><Instagram className="w-5 h-5" /></button>
                    <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:bg-orange-50 hover:text-orange-500 transition-all"><Facebook className="w-5 h-5" /></button>
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">Location</h3>
              <p className="text-sm font-medium text-gray-400 leading-relaxed mb-6">
                 Located in the heart of Houmt Souk, the capital of Djerba.
              </p>
              <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-inner h-64 relative group cursor-pointer">
                 <img src="https://api.mapbox.com/styles/v1/mapbox/light-v10/static/10.84,33.87,11/800x600?access_token=pk.eyJ1IjoiYW50aWdyYXZpdHkiLCJhIjoiY2xwYnB6c2YwMGJmZTJrb2RhNmtuMjZpYyJ9.xxxxxxxxxxxxx" className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-700" alt="Map" />
                 <div className="absolute inset-0 bg-orange-500/5 group-hover:bg-transparent transition-all"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-125">
                    <div className="relative">
                       <MapPin className="w-8 h-8 text-[#FF8C00] fill-orange-50" />
                       <div className="absolute top-0 left-0 w-8 h-8 bg-orange-500/20 rounded-full animate-ping"></div>
                    </div>
                 </div>
              </div>
              <button className="w-full mt-6 py-4 text-xs font-black text-[#FF8C00] hover:text-[#E67E00] transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
                 Open in Google Maps
                 <ChevronRight className="w-4 h-4" />
              </button>
              
              <button className="w-full mt-10 pt-6 border-t border-gray-50 text-[10px] font-bold text-gray-300 hover:text-red-400 transition-colors uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                 <ShieldAlert className="w-3.5 h-3.5" />
                 Report this profile
              </button>
           </div>
        </div>
      </div>

      {/* Corporate Footer */}
      <footer className="bg-white border-t border-gray-100 py-10 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-4 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
              <div className="w-8 h-8 bg-black rounded-lg"></div>
              <span className="font-bold text-gray-900">© 2024 Djerba Touriste</span>
           </div>
           <div className="flex items-center gap-10 text-[10px] font-black text-gray-300 uppercase tracking-widest">
              <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Cookies</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Help Center</a>
           </div>
        </div>
      </footer>
    </div>
  );
};

const ShieldAlert = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);

export default ProviderProfile;
