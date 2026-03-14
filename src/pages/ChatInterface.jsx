import React from 'react';
import { 
  Send, 
  Plus, 
  Bot, 
  Settings, 
  Search, 
  MessageSquare, 
  Bookmark, 
  Mic, 
  Paperclip,
  Star,
  MapPin,
  Clock,
  ExternalLink,
  Sparkles,
  Compass
} from 'lucide-react';

const ChatInterface = () => {
  return (
    <div className="flex h-screen bg-white">
      {/* Messages Sidebar */}
      <aside className="w-80 border-r border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-100">
           <div className="flex items-center gap-3 mb-6">
             <div className="w-6 h-6 bg-[#FF8C00] rounded-md flex items-center justify-center">
               <div className="w-3 h-3 bg-white rounded-sm rotate-45"></div>
             </div>
             <span className="font-display font-bold text-lg">Djerba <span className="text-[#FF8C00]">Touriste</span></span>
           </div>
           <button className="w-full bg-[#FF8C00] hover:bg-[#E67E00] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all active:scale-95">
             <Plus className="w-5 h-5" />
             New Conversation
           </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <p className="px-4 py-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest">Recent History</p>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#FFF4E6]/50 rounded-xl text-left hover:bg-orange-50 transition-colors border-l-4 border-[#FF8C00]">
            <MessageSquare className="w-4 h-4 text-[#FF8C00]" />
            <span className="text-sm font-bold text-[#1A1A1A]">Best Beaches Tour</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-gray-50 transition-colors">
            <MessageSquare className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-semibold text-gray-500">Houmt Souk Market</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-gray-50 transition-colors">
            <MessageSquare className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-semibold text-gray-500">Seafood Restaurants</span>
          </button>

          <p className="px-4 py-2 mt-6 text-[10px] font-bold text-gray-300 uppercase tracking-widest">Saved</p>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-gray-50 transition-colors">
            <Bookmark className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-semibold text-gray-500">Radisson Blu Resort</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-gray-50 transition-colors">
            <Bookmark className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-semibold text-gray-500">Guellala Village</span>
          </button>
        </div>

        <div className="p-6 border-t border-gray-100">
           <button className="w-full py-3 rounded-xl flex items-center gap-3 font-semibold text-gray-400 hover:text-[#1A1A1A] transition-colors">
             <Settings className="w-5 h-5" />
             Settings
           </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative">
        {/* Chat Header */}
        <header className="h-20 border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 bg-[#FF8C00] rounded-xl flex items-center justify-center">
                <Bot className="text-white w-6 h-6" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></span>
            </div>
            <div>
              <h4 className="font-bold text-[#1A1A1A]">DjerbaBot AI Assistant</h4>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Active Now</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-[#FF8C00] transition-colors"><Search className="w-5 h-5" /></button>
            <div className="w-px h-6 bg-gray-100"></div>
            <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
              <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=Djerba" alt="User" />
            </div>
          </div>
        </header>

        {/* Conversation */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8">
           {/* Welcome Message */}
           <div className="flex flex-col items-center text-center py-10">
              <div className="w-20 h-20 bg-orange-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm">
                <div className="relative">
                  <Bot className="text-[#FF8C00] w-10 h-10" />
                  <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-orange-300 animate-pulse" />
                </div>
              </div>
              <h2 className="text-3xl font-display font-bold text-[#1A1A1A] mb-4">Welcome to Djerba!</h2>
              <p className="text-gray-400 max-w-md font-medium leading-relaxed uppercase text-[11px] tracking-[0.1em]">
                I'm your AI local expert. Ask me anything about the island, from hidden beaches to the best couscous spots.
              </p>
           </div>

           {/* Bot Message */}
           <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#FF8C00] rounded-lg flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                <Bot className="text-white w-5 h-5" />
              </div>
              <div className="bg-[#FF8C00] text-white p-6 rounded-[2rem] rounded-tl-none max-w-2xl shadow-xl shadow-orange-500/10 font-medium">
                Marhaba! Welcome to Djerba. How can I help you plan your perfect island getaway today? I can suggest hotels, find the best beaches, or recommend cultural tours.
              </div>
           </div>

           {/* User Message */}
           <div className="flex justify-end gap-4">
              <div className="bg-gray-50 p-6 rounded-[2rem] rounded-tr-none max-w-2xl shadow-sm text-gray-600 font-medium border border-gray-100">
                I'm looking for a luxury hotel near the beach and some good seafood restaurants.
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex-shrink-0 mt-1 overflow-hidden border border-gray-100">
                 <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=Djerba" alt="User" />
              </div>
           </div>

           {/* Bot Response with Cards */}
           <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#FF8C00] rounded-lg flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                <Bot className="text-white w-5 h-5" />
              </div>
              <div className="space-y-6 flex-1">
                <div className="bg-[#FF8C00] text-white p-6 rounded-[2rem] rounded-tl-none max-w-2xl shadow-xl shadow-orange-500/10 font-medium">
                  Excellent choices! Djerba is famous for its "Zone Touristique" with stunning beach resorts. Here is a top-rated hotel and a restaurant you'll love:
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 max-w-4xl">
                   {/* Recommendation Card 1 */}
                   <div className="flex-1 bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-xl group hover:shadow-2xl transition-all cursor-pointer">
                      <div className="relative h-44 overflow-hidden">
                        <img 
                          src="/images/resort.png" 
                          alt="Hotel" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[9px] font-bold text-[#FF8C00] tracking-widest uppercase shadow-sm">Luxury</div>
                      </div>
                      <div className="p-6">
                        <h5 className="font-bold text-[#1A1A1A] mb-1">Hasdrubal Prestige Thalassa</h5>
                        <div className="flex items-center gap-1 mb-4">
                           <Star className="w-3 h-3 text-[#FF8C00] fill-[#FF8C00]" />
                           <Star className="w-3 h-3 text-[#FF8C00] fill-[#FF8C00]" />
                           <Star className="w-3 h-3 text-[#FF8C00] fill-[#FF8C00]" />
                           <Star className="w-3 h-3 text-[#FF8C00] fill-[#FF8C00]" />
                           <Star className="w-3 h-3 text-[#FF8C00] fill-[#FF8C00]" />
                           <span className="text-[10px] text-gray-400 font-bold ml-1">(4.8/5)</span>
                        </div>
                        <button className="w-full bg-[#FFF4E6] text-[#FF8C00] py-3 rounded-xl font-bold text-xs hover:bg-[#FFE8CC] transition-colors uppercase tracking-widest">View Details</button>
                      </div>
                   </div>

                   {/* Recommendation Card 2 */}
                   <div className="flex-1 bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-xl group hover:shadow-2xl transition-all cursor-pointer">
                      <div className="relative h-44 overflow-hidden">
                        <img 
                          src="/images/scuba.png" 
                          alt="Restaurant" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[9px] font-bold text-green-500 tracking-widest uppercase shadow-sm">Food</div>
                      </div>
                      <div className="p-6">
                        <h5 className="font-bold text-[#1A1A1A] mb-1">Le Phénicien Restaurant</h5>
                        <div className="flex items-center gap-1 mb-4 text-gray-400">
                           <MapPin className="w-3 h-3" />
                           <span className="text-[10px] font-bold uppercase tracking-wider">Houmt Souk Marina</span>
                        </div>
                        <button className="w-full bg-[#FFF4E6] text-[#FF8C00] py-3 rounded-xl font-bold text-xs hover:bg-[#FFE8CC] transition-colors uppercase tracking-widest">Book Table</button>
                      </div>
                   </div>
                </div>
              </div>
           </div>
        </div>

        {/* Input Area */}
        <div className="p-8 bg-white border-t border-gray-50 overflow-hidden">
           <div className="max-w-4xl mx-auto space-y-6">
              {/* Quick Suggestions */}
              <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 scrollbar-hide">
                <button className="whitespace-nowrap flex items-center gap-2 px-5 py-2.5 bg-gray-50 border border-gray-100 hover:border-[#FF8C00]/20 rounded-full text-xs font-bold text-gray-500 hover:text-[#1A1A1A] transition-all">
                   <Clock className="w-3.5 h-3.5 text-gray-400" /> Recommend a hotel
                </button>
                <button className="whitespace-nowrap flex items-center gap-2 px-5 py-2.5 bg-gray-50 border border-gray-100 hover:border-[#FF8C00]/20 rounded-full text-xs font-bold text-gray-500 hover:text-[#1A1A1A] transition-all">
                   <Bookmark className="w-3.5 h-3.5 text-gray-400" /> Best beaches in Djerba
                </button>
                <button className="whitespace-nowrap flex items-center gap-2 px-5 py-2.5 bg-gray-50 border border-gray-100 hover:border-[#FF8C00]/20 rounded-full text-xs font-bold text-gray-500 hover:text-[#1A1A1A] transition-all">
                   <Star className="w-3.5 h-3.5 text-gray-400" /> Current weather
                </button>
                <button className="whitespace-nowrap flex items-center gap-2 px-5 py-2.5 bg-gray-50 border border-gray-100 hover:border-[#FF8C00]/20 rounded-full text-xs font-bold text-gray-500 hover:text-[#1A1A1A] transition-all">
                   <Compass className="w-3.5 h-3.5 text-gray-400" /> Top restaurants
                </button>
              </div>

              {/* Input Wrapper */}
              <div className="relative flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-[1.5rem] border border-gray-100 focus-within:ring-2 focus-within:ring-orange-100 focus-within:bg-white transition-all group">
                <button className="text-gray-400 hover:text-[#FF8C00] transition-colors p-1">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input 
                  type="text" 
                  placeholder="Describe your dream trip to Djerba..." 
                  className="bg-transparent border-none outline-none flex-1 font-medium text-[#1A1A1A] placeholder:text-gray-300"
                />
                <div className="flex items-center gap-3">
                   <button className="p-2.5 text-gray-300 hover:text-gray-500"><Mic className="w-5 h-5" /></button>
                   <button className="bg-[#FF8C00] hover:bg-[#E67E00] text-white p-3 rounded-2xl shadow-lg shadow-orange-500/20 transition-all active:scale-90">
                     <Send className="w-5 h-5" />
                   </button>
                </div>
              </div>
              <p className="text-[10px] text-center text-gray-300 font-bold uppercase tracking-widest">Djerba Touriste AI can make mistakes. Consider checking important information.</p>
           </div>
        </div>
      </main>
    </div>
  );
};

export default ChatInterface;
