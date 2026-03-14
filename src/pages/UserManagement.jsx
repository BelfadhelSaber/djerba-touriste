import React from 'react';
import { 
  Users, 
  MapPin, 
  ShieldCheck, 
  UserPlus, 
  Search, 
  Filter, 
  Edit3, 
  Ban, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  MoreVertical,
  Bell,
  CheckCircle2,
  Clock,
  RotateCcw
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';

const StatCard = ({ label, value, trend, trendUp, color }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex-1">
    <div className="flex items-center gap-4 mb-4">
       <div className={`w-10 h-10 ${color.bg} ${color.text} rounded-xl flex items-center justify-center`}>
          <Users className="w-5 h-5" />
       </div>
       <div className={`flex items-center gap-1 text-[10px] font-bold ${trendUp ? 'text-green-500' : 'text-red-400'}`}>
          <TrendingUp className={`w-3 h-3 ${!trendUp && 'rotate-180'}`} />
          {trend}
       </div>
    </div>
    <div className="space-y-1">
       <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{label}</p>
       <h3 className="text-3xl font-display font-bold text-[#1A1A1A]">{value}</h3>
    </div>
  </div>
);

const UserManagement = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [stats, setStats] = React.useState({
    totalUsers: 0,
    touristUsers: 0,
    providerUsers: 0,
    pendingUsers: 0,
    newUsers: 0
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllUsers();
      setUsers(data);
      
      const statsData = await adminService.getStats();
      setStats({
        totalUsers: statsData.totalUsers,
        touristUsers: statsData.touristUsers,
        providerUsers: statsData.providerUsers,
        pendingUsers: statsData.pendingUsers,
        newUsers: 124
      });
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Impossible de charger les utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await adminService.updateUserStatus(id, status);
      fetchUsers();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await adminService.deleteUser(id);
        fetchUsers();
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8C00]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Search Bar */}
      <div className="flex justify-between items-center bg-transparent">
        <div className="relative group flex-1 max-w-2xl">
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#FF8C00] transition-colors" />
           <input type="text" placeholder="Rechercher un utilisateur, email, ID..." className="w-full pl-16 pr-8 py-4 bg-white border-none rounded-2xl text-xs font-bold shadow-sm outline-none focus:ring-2 focus:ring-orange-100 transition-all" />
        </div>
        <div className="flex items-center gap-4">
          <button className="p-3 bg-white border border-gray-50 rounded-2xl text-gray-400 hover:text-[#FF8C00] transition-colors relative shadow-sm">
             <Bell className="w-5 h-5" />
             <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button className="flex items-center gap-3 bg-[#FF8C00] hover:bg-[#E67E00] text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-orange-500/20 transition-all active:scale-95">
            <UserPlus className="w-5 h-5" /> Nouvel Utilisateur
          </button>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-display font-bold text-[#1A1A1A] mb-1">Gestion des Utilisateurs</h1>
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Gérez les comptes, les rôles et les autorisations de la plateforme.</p>
      </div>

      {/* Stats Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        <StatCard label="Total Utilisateurs" value={stats.totalUsers} trend="+12%" trendUp color={{ bg: 'bg-orange-50', text: 'text-orange-500' }} />
        <StatCard label="En Attente" value={stats.pendingUsers} trend="Action" trendUp={stats.pendingUsers === 0} color={{ bg: 'bg-blue-50', text: 'text-blue-500' }} />
        <StatCard label="Prestataires" value={stats.providerUsers} trend="+2%" trendUp color={{ bg: 'bg-purple-50', text: 'text-purple-500' }} />
        <StatCard label="Touristes" value={stats.touristUsers} trend="+5.2%" trendUp color={{ bg: 'bg-green-50', text: 'text-green-500' }} />
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
           <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-500 rounded-xl font-bold text-[10px] uppercase tracking-widest border border-gray-100">
                <Filter className="w-3.5 h-3.5" /> Tous les Rôles
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-[#FF8C00] rounded-xl font-bold text-[10px] uppercase tracking-widest border border-orange-100">
                <ShieldCheck className="w-3.5 h-3.5" /> Statut: Vérifié
              </button>
           </div>
           <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Affichage de {users.length} utilisateurs</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/20">
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Utilisateur</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rôle</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Statut</th>
                <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-orange-100 flex items-center justify-center font-bold text-[#FF8C00]">
                          {row.firstName?.[0]}{row.lastName?.[0]}
                       </div>
                       <span className="text-sm font-bold text-[#1A1A1A]">{row.firstName} {row.lastName}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-xs font-semibold text-gray-500">{row.email}</td>
                  <td className="px-10 py-6">
                    <span className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${
                      row.role === 'ADMIN' ? 'bg-gray-100 text-gray-600' :
                      row.role === 'PROVIDER' ? 'bg-purple-50 text-purple-500' :
                      'bg-orange-50 text-orange-500'
                    }`}>
                      {row.role}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className={`flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest ${
                      row.status === 'ACTIVE' ? 'text-green-500' :
                      row.status === 'BANNED' ? 'text-red-400' :
                      'text-orange-400'
                    }`}>
                      {row.status === 'ACTIVE' ? <CheckCircle2 className="w-3.5 h-3.5" /> :
                       row.status === 'PENDING' ? <Clock className="w-3.5 h-3.5" /> :
                       <Ban className="w-3.5 h-3.5" />}
                      {row.status}
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-gray-300 hover:text-blue-500 transition-colors"><Edit3 className="w-4 h-4" /></button>
                        {row.status === 'PENDING' ? (
                          <button onClick={() => handleUpdateStatus(row.id, 'ACTIVE')} className="p-2 text-gray-300 hover:text-green-500 transition-colors" title="Approuver"><CheckCircle2 className="w-4 h-4" /></button>
                        ) : row.status === 'BANNED' ? (
                          <button onClick={() => handleUpdateStatus(row.id, 'ACTIVE')} className="p-2 text-gray-300 hover:text-green-500 transition-colors" title="Réactiver"><RotateCcw className="w-4 h-4" /></button>
                        ) : (
                          <button onClick={() => handleUpdateStatus(row.id, 'BANNED')} className="p-2 text-gray-300 hover:text-red-400 transition-colors" title="Bannir"><Ban className="w-4 h-4" /></button>
                        )}
                       <button onClick={() => handleDeleteUser(row.id)} className="p-2 text-gray-300 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-8 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
             <button className="px-8 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#1A1A1A] transition-colors shadow-sm">Précédent</button>
             <div className="flex items-center gap-2">
                {[1, 2, 3, '...', 12].map((n, idx) => (
                  <button key={idx} className={`w-10 h-10 rounded-xl text-[11px] font-bold transition-all ${
                    n === 1 ? 'bg-[#FF8C00] text-white shadow-lg shadow-orange-500/20' : 'text-gray-400 hover:bg-gray-50'
                  }`}>
                    {n}
                  </button>
                ))}
             </div>
             <button className="px-8 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] hover:bg-gray-50 transition-colors shadow-sm">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
