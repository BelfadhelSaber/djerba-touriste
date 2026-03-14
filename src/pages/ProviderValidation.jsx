import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MoreVertical,
  ChevronRight,
  Clock,
  Briefcase,
  FileText,
  ShieldCheck,
  TrendingUp,
  History,
  Info
} from 'lucide-react';
import adminService from '../services/adminService';

const ProviderValidation = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState(null);

  const fetchPendingRequests = async () => {
    try {
      setLoading(true);
      const allUsers = await adminService.getAllUsers();
      const providers = allUsers.filter(u => u.role === 'PROVIDER' && u.status === 'PENDING');
      setPendingRequests(providers);
      
      const statsResponse = await adminService.getStats();
      setStatsData(statsResponse);
    } catch (err) {
      console.error('Error fetching pending providers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await adminService.updateUserStatus(id, status);
      setSelectedRequest(null);
      fetchPendingRequests();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const stats = [
    { label: "Demandes en attente", value: statsData?.pendingUsers || 0, trend: "+12%", icon: Clock, color: "orange" },
    { label: "Prestataires Validés", value: statsData?.providerUsers || 0, trend: "+840", icon: ShieldCheck, color: "green" },
    { label: "Comptes Bannis", value: statsData?.bannedUsers || 0, action: "Action requise", icon: FileText, color: "red" },
    { label: "Taux d'Approbation", value: "94.2%", trend: "+2.4%", icon: TrendingUp, color: "blue" }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8C00]"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Main Content Area */}
      <div className={`flex-1 overflow-y-auto p-10 transition-all duration-500 ${selectedRequest ? 'mr-[400px]' : ''}`}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-black text-gray-900 mb-2 mt-2">Validation des Prestataires</h1>
            <p className="text-gray-400 font-medium">Gérez et examinez les demandes d'inscription des nouveaux prestataires locaux.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-500 group-hover:bg-${stat.color}-500 group-hover:text-white transition-all`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  {stat.trend && (
                    <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-md">{stat.trend}</span>
                  )}
                  {stat.action && (
                    <span className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-1 rounded-md uppercase tracking-tighter">{stat.action}</span>
                  )}
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black text-gray-900">{stat.value}</h3>
              </div>
            ))}
          </div>

          {/* Table Control Bar */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
              <h2 className="text-xl font-black text-gray-900">Requêtes en attente</h2>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-400 font-bold rounded-2xl hover:bg-orange-50 hover:text-orange-500 transition-all">
                  <Filter className="w-4 h-4" />
                  Filtrer
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-400 font-bold rounded-2xl hover:bg-orange-50 hover:text-orange-500 transition-all">
                  <Download className="w-4 h-4" />
                  Exporter
                </button>
              </div>
            </div>

            {/* Request Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="pb-6 text-left text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Prestataire</th>
                    <th className="pb-6 text-left text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Service</th>
                    <th className="pb-6 text-left text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Date d'inscription</th>
                    <th className="pb-6 text-left text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Documents</th>
                    <th className="pb-6 text-right text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {pendingRequests.map((req) => (
                    <tr key={req.id} className="group hover:bg-gray-50/50 transition-all">
                      <td className="py-6">
                        <div className="flex items-center gap-4">
                          <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${req.firstName}`} className="w-10 h-10 rounded-full shadow-inner" alt="Avatar" />
                          <div>
                            <p className="text-sm font-black text-gray-900 leading-none mb-1">{req.firstName} {req.lastName}</p>
                            <p className="text-[11px] text-gray-400 font-medium">{req.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6">
                        <span className="px-3 py-1 bg-orange-50 text-[#FF8C00] text-[10px] font-black rounded-lg uppercase tracking-tighter border border-orange-100">
                           PRESTATAIRE
                        </span>
                      </td>
                      <td className="py-6 text-xs font-bold text-gray-500">{new Date(req.createdAt).toLocaleDateString()}</td>
                      <td className="py-6">
                        <div className="flex items-center gap-1.5">
                           <div className="w-4 h-4 rounded-full flex items-center justify-center bg-orange-50 text-orange-500">
                             <Clock className="w-3 h-3" />
                           </div>
                        </div>
                      </td>
                      <td className="py-6">
                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={() => setSelectedRequest(req)}
                            className="bg-orange-50 text-[#FF8C00] px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-[#FF8C00] hover:text-white transition-all shadow-sm"
                          >
                            Voir le Dossier
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(req.id, 'ACTIVE')}
                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-500 hover:text-white transition-all"
                            title="Approuver"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(req.id, 'BANNED')}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                            title="Refuser"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {pendingRequests.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-10 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                        Aucune demande en attente
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-between mt-10">
              <span className="text-[11px] font-bold text-gray-300">Affichage de {pendingRequests.length} demandes</span>
              <div className="flex items-center gap-2">
                {[1].map(n => (
                  <button key={n} className={`w-8 h-8 rounded-lg font-black text-xs transition-all ${n === 1 ? 'bg-[#FF8C00] text-white shadow-lg' : 'bg-white border border-gray-100 text-gray-400 hover:border-orange-200'}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-in Details Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl border-l border-gray-100 transition-transform duration-500 z-50 p-10 transform ${selectedRequest ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedRequest && (
          <div className="h-full flex flex-col">
            <button 
              onClick={() => setSelectedRequest(null)}
              className="absolute top-6 left-[-20px] bg-white border border-gray-100 p-2 rounded-full shadow-lg text-gray-400 hover:text-orange-500 transition-all hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="mb-10 text-center">
              <div className="w-24 h-24 bg-orange-50 rounded-[32px] mx-auto mb-6 flex items-center justify-center text-[#FF8C00] relative overflow-hidden group">
                 <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedRequest.firstName}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Avatar" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">{selectedRequest.firstName} {selectedRequest.lastName}</h2>
              <p className="text-xs font-black text-orange-400 bg-orange-50 px-3 py-1 rounded-full inline-block uppercase tracking-widest leading-none">PRESTATAIRE</p>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto no-scrollbar pb-10">
              <section>
                 <h3 className="text-xs font-black text-gray-300 uppercase tracking-[0.2em] mb-4">Informations Générales</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nom complet</span>
                       <span className="text-xs font-bold text-gray-900">{selectedRequest.firstName} {selectedRequest.lastName}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</span>
                       <span className="text-xs font-bold text-gray-900">{selectedRequest.email}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Statut actuel</span>
                       <span className="text-xs font-bold text-orange-400">{selectedRequest.status}</span>
                    </div>
                 </div>
              </section>

              <section>
                 <h3 className="text-xs font-black text-gray-300 uppercase tracking-[0.2em] mb-4">Documents Téléchargés</h3>
                 <div className="space-y-3">
                    {[
                       { name: "Registre de Commerce", type: "PDF • 2.4 MB", status: true },
                       { name: "CIN du Gérant", type: "JPG • 1.1 MB", status: true }
                    ].map((doc, idx) => (
                       <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl group hover:border-orange-100 transition-all cursor-pointer">
                          <div className="flex items-center gap-4">
                             <div className={`p-2 rounded-xl bg-${doc.status ? 'orange' : 'red'}-50 text-${doc.status ? 'orange' : 'red'}-500 group-hover:bg-orange-500 group-hover:text-white transition-all`}>
                                <FileText className="w-5 h-5" />
                             </div>
                             <div>
                                <p className="text-xs font-black text-gray-900 leading-none mb-1">{doc.name}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">{doc.type}</p>
                             </div>
                          </div>
                          <Eye className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-all" />
                       </div>
                    ))}
                 </div>
              </section>
            </div>

            <div className="pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
               <button onClick={() => handleUpdateStatus(selectedRequest.id, 'BANNED')} className="py-4 bg-red-50 text-red-600 font-black rounded-2xl hover:bg-red-100 transition-all text-xs uppercase tracking-widest">Refuser</button>
               <button onClick={() => handleUpdateStatus(selectedRequest.id, 'ACTIVE')} className="py-4 bg-[#FF8C00] text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 hover:bg-[#E67E00] transition-all text-xs uppercase tracking-widest">Approuver</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderValidation;
