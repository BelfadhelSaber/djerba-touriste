import React from 'react';
import { 
  MessageSquare, 
  Star, 
  Clock, 
  HelpCircle, 
  Settings, 
  Globe, 
  Zap, 
  CheckCircle2, 
  ChevronRight, 
  Edit3, 
  Trash2,
  Plus,
  RefreshCw,
  Search,
  Filter,
  BarChart2,
  MoreVertical,
  Activity,
  FileDown
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, trendColor, subtext }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex-1 relative overflow-hidden group">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-orange-50 group-hover:text-[#FF8C00] transition-all">
        <Icon className="w-6 h-6" />
      </div>
      <div className={`text-[11px] font-bold flex items-center gap-1 ${trendColor}`}>
        {trend}
      </div>
    </div>
    <div className="space-y-1">
      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest underline underline-offset-4 decoration-gray-100">{label}</p>
      <h3 className="text-3xl font-display font-bold text-[#1A1A1A]">{value}</h3>
      {subtext && <p className="text-[11px] font-bold text-gray-300 uppercase tracking-tight">{subtext}</p>}
    </div>
    {label === 'Questions récurrentes' && (
      <div className="absolute top-4 right-4 bg-orange-50 text-[#FF8C00] px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest">Top 5</div>
    )}
  </div>
);

const ChatbotConsole = () => {
  return (
    <div className="space-y-10 selection:bg-[#FF8C00]/20">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-4xl font-display font-bold text-[#1A1A1A] mb-2 tracking-tight">Console de Contrôle DjerbaBot</h1>
           <p className="text-sm text-gray-400 font-medium max-w-xl">Gérez l'intelligence artificielle et l'expérience conversationnelle des visiteurs.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl text-green-500 text-[10px] font-bold uppercase tracking-widest border border-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
              Statut: Opérationnel
           </div>
           <button className="flex items-center gap-3 bg-[#FF8C00] hover:bg-[#E67E00] text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-orange-500/20 transition-all active:scale-95">
             <RefreshCw className="w-5 h-5" /> Mettre à jour l'IA
           </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-col lg:flex-row gap-6">
        <StatCard icon={MessageSquare} label="Total Conversations" value="12,840" trend="+12.5% ↑" trendColor="text-green-500" />
        <StatCard icon={Star} label="Satisfaction Client" value="94.2%" trend="+2.1% ↑" trendColor="text-green-500" />
        <StatCard icon={Clock} label="Temps de Réponse" value="1.2s" trend="-0.3s ↓" trendColor="text-green-500" />
        <StatCard icon={HelpCircle} label="Questions récurrentes" value="Hébergement" subtext="Top 5 thèmes identifiés" trendColor="text-gray-300" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chatbot Configuration */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-10">
           <div className="flex items-center gap-3">
              <Settings className="text-[#FF8C00] w-6 h-6 outline-none" />
              <h2 className="text-xl font-display font-bold text-[#1A1A1A]">Configuration du Chatbot</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Modèle de langage (LLM)</label>
                 <div className="relative group">
                    <select className="w-full pl-6 pr-12 py-4 bg-gray-50 border-none rounded-2xl text-xs font-bold text-gray-500 appearance-none outline-none focus:ring-2 focus:ring-orange-100 transition-all cursor-pointer">
                       <option>GPT-4o (Recommandé)</option>
                       <option>Claude 3.5 Sonnet</option>
                       <option>DjerbaGPT Alpha</option>
                    </select>
                    <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none rotate-90" />
                 </div>
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Personnalité</label>
                 <div className="flex bg-gray-50 p-1.5 rounded-2xl gap-1">
                    {['Amical', 'Professionnel', 'Enjoué'].map((p, idx) => (
                      <button key={p} className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold transition-all ${idx === 0 ? 'bg-[#FF8C00] text-white shadow-lg shadow-orange-500/10' : 'text-gray-400 hover:text-gray-600'}`}>
                        {p}
                      </button>
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Support Multilingue</label>
              <div className="flex flex-wrap gap-3">
                 {['Français', 'Anglais', 'Allemand', 'Arabe'].map(lang => (
                   <span key={lang} className="flex items-center gap-2 px-5 py-3 bg-gray-50 text-gray-600 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-gray-100">
                      {lang} <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                   </span>
                 ))}
                 <button className="flex items-center gap-2 px-5 py-3 border-2 border-dashed border-gray-100 text-gray-300 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-orange-100 hover:text-[#FF8C00] transition-all">
                    <Plus className="w-3.5 h-3.5" /> Ajouter
                 </button>
              </div>
           </div>

           {/* Automatic Suggestions */}
           <div className="space-y-8 pt-6 border-t border-gray-50">
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <Zap className="text-orange-400 w-5 h-5" />
                    <h3 className="text-lg font-display font-bold text-[#1A1A1A]">Suggestions automatiques</h3>
                 </div>
                 <button className="text-[10px] font-bold text-[#FF8C00] uppercase tracking-widest hover:underline">Éditer tout</button>
              </div>
              <div className="space-y-3">
                 {[
                   '🏰 Recommander un hôtel', 
                   '☀️ Météo à Djerba', 
                   '🏖️ Les plus belles plages'
                 ].map((suggestion, i) => (
                   <div key={i} className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-orange-100 hover:shadow-sm transition-all group">
                      <div className="flex items-center gap-4">
                         <div className="w-1.5 h-1.5 bg-gray-200 group-hover:bg-[#FF8C00] rounded-full"></div>
                         <span className="text-xs font-bold text-gray-600">{suggestion}</span>
                      </div>
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-1.5 text-gray-300 hover:text-blue-500 transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
                         <button className="p-1.5 text-gray-300 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                   </div>
                 ))}
                 <button className="w-full flex items-center justify-center gap-3 p-5 border-2 border-dashed border-gray-100 rounded-2xl text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:border-orange-100 hover:text-[#FF8C00] transition-all group">
                    <Plus className="w-4 h-4 group-hover:scale-110" /> Ajouter une suggestion rapide
                 </button>
              </div>
           </div>
        </div>

        {/* Sidebar panels */}
        <div className="space-y-8">
           {/* AI Learning Progress */}
           <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                 <BarChart2 className="text-[#FF8C00] w-5 h-5" />
                 <h2 className="text-lg font-display font-bold text-[#1A1A1A]">Apprentissage IA</h2>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-baseline">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fine-tuning en cours</p>
                    <span className="text-xs font-bold text-[#FF8C00]">68%</span>
                 </div>
                 <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF8C00] rounded-full animate-progress-slow" style={{ width: '68%' }}></div>
                 </div>
                 <p className="text-[8px] text-gray-300 font-bold uppercase tracking-wider italic leading-relaxed">optimisation des données locales Djerba-Q3-2024</p>
              </div>

              <div className="pt-6 border-t border-gray-50 space-y-4">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Base de connaissances</p>
                 <div className="space-y-2">
                    {[
                      { name: 'Guide_Hôtels_Djerba_v2', type: 'PDF', size: '2.4 MB' },
                      { name: 'djerba-tourisme.gov.tn/', type: 'WEB', size: 'Sync' }
                    ].map((file, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group cursor-pointer hover:bg-white border border-transparent hover:border-gray-100 transition-all">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-gray-300 group-hover:text-[#FF8C00]">
                               <Activity className="w-4 h-4" />
                            </div>
                            <div>
                               <p className="text-[10px] font-bold text-[#1A1A1A] truncate w-32">{file.name}</p>
                               <p className="text-[8px] text-gray-300 font-bold uppercase">{file.size} • Indexé</p>
                            </div>
                         </div>
                         <button className="text-gray-200 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                    <button className="w-full py-4 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                       <FileDown className="w-3.5 h-3.5" /> Importer un document
                    </button>
                 </div>
              </div>
           </div>

           {/* AI Tip */}
           <div className="bg-orange-50/50 p-10 rounded-[3rem] border border-orange-100/50 space-y-6 relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-orange-400/5 rounded-full blur-3xl"></div>
              <div className="flex items-center gap-3 relative">
                 <Zap className="text-[#FF8C00] w-5 h-5 fill-[#FF8C00]" />
                 <h2 className="text-lg font-display font-bold text-[#FF8C00]">Conseil IA</h2>
              </div>
              <p className="text-xs font-medium text-orange-950/70 leading-relaxed relative">
                Les utilisateurs demandent souvent des informations sur les <strong className="text-[#FF8C00]">horaires de ferry (Bac)</strong>. Pensez à mettre à jour le document PDF correspondant pour améliorer la précision des réponses.
              </p>
           </div>
        </div>
      </div>

      {/* Recent Conversations Table */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex flex-col md:row justify-between items-center gap-6">
           <h3 className="text-xl font-display font-bold text-[#1A1A1A] flex items-center gap-3">
             <Clock className="text-gray-300 w-5 h-5" /> Conversations Récentes
           </h3>
           <div className="flex items-center gap-4 flex-1 max-w-lg md:justify-end">
              <div className="relative group flex-1">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#FF8C00] transition-colors" />
                 <input type="text" placeholder="Rechercher..." className="w-full pl-14 pr-6 py-3 bg-gray-50 border-none rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-orange-100 transition-all" />
              </div>
              <button className="p-3 bg-gray-50 text-gray-300 rounded-xl hover:text-gray-600 transition-colors"><Filter className="w-4 h-4" /></button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Utilisateur</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dernier Message</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Humeur / Sentiment</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Durée</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { 
                  user: 'Visiteur #8421', 
                  origin: 'Paris, FR • mobile', 
                  msg: '"Quels sont les meilleurs restaurants à Houmt S..."', 
                  sentiment: 'POSITIF', 
                  duration: '4m 12s',
                  sentimentColor: 'text-green-500 bg-green-50'
                },
                { 
                  user: 'Visiteur #8420', 
                  origin: 'Tunis, TN • desktop', 
                  msg: '"Prix du bac vers Jorf?"', 
                  sentiment: 'NEUTRE', 
                  duration: '1m 30s',
                  sentimentColor: 'text-gray-400 bg-gray-50'
                },
                { 
                  user: 'Visiteur #8419', 
                  origin: 'Berlin, DE • mobile', 
                  msg: '"Where can I find a kite surf club?"', 
                  sentiment: 'POSITIF', 
                  duration: '8m 45s',
                  sentimentColor: 'text-green-500 bg-green-50'
                },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/20 transition-colors cursor-pointer group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-300 text-[10px] uppercase">
                          {row.user.split(' ')[0][0]}{row.user.split('#')[1][0]}
                       </div>
                       <div>
                          <p className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#FF8C00] transition-colors">{row.user}</p>
                          <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest mt-0.5">{row.origin}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-xs font-semibold text-gray-500 italic truncate max-w-xs">{row.msg}</td>
                  <td className="px-10 py-8">
                    <div className="flex justify-center">
                       <span className={`px-3 py-1 rounded-md text-[8px] font-extrabold tracking-widest ${row.sentimentColor}`}>
                          {row.sentiment}
                       </span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-center text-[10px] font-bold text-gray-400">{row.duration}</td>
                  <td className="px-10 py-8 text-center">
                    <button className="text-[10px] font-bold text-[#FF8C00] uppercase tracking-widest hover:underline underline-offset-4">Voir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-8 border-t border-gray-50 flex justify-between items-center bg-gray-50/10">
             <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Affichage de 3 sur 124 conversations aujourd'hui</p>
             <div className="flex gap-2">
                <button className="px-6 py-2 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-400 cursor-not-allowed">Précédent</button>
                <button className="px-8 py-2 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-[#1A1A1A] hover:bg-gray-50 transition-colors">Suivant</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotConsole;
