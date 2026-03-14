import { 
  LayoutDashboard, 
  Users, 
  CheckCircle, 
  ShieldAlert, 
  BarChart3, 
  Receipt,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  FileText,
  DollarSign,
  Layout,
  Clock,
  Calendar,
  Globe,
  Bot,
  Tag,
  MessageSquare,
  FileSearch,
  ShieldCheck
} from 'lucide-react';
import { NavLink, Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import providerApi from '../services/providerApi';
import adminService from '../services/adminService';

const SidebarItem = ({ to, icon: Icon, label, badge }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => `
      flex items-center justify-between px-4 py-3 rounded-xl transition-all group
      ${isActive 
        ? 'bg-[#FF8C00] text-white shadow-lg shadow-orange-500/20' 
        : 'text-gray-500 hover:bg-orange-50 hover:text-[#FF8C00]'}
    `}
  >
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5" />
      <span className="font-semibold text-sm">{label}</span>
    </div>
    {badge && (
      <span className={`
        px-2 py-0.5 rounded-md text-[10px] font-bold
        ${badge.type === 'warning' ? 'bg-orange-100 text-[#FF8C00]' : 'bg-red-100 text-red-500'}
      `}>
        {badge.count}
      </span>
    )}
  </NavLink>
);

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith('/admin');
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const providerId = providerApi.getProviderId();
            if (providerId && !isAdmin) {
                const data = await providerApi.getProviderProfile(providerId);
                setUserProfile(data);
            }
        } catch (err) {
            console.error("Failed to load user profile in layout", err);
        }
    };
    fetchUser();
  }, [isAdmin]);

  const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/login');
  };

  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (isAdmin) {
        try {
          const data = await adminService.getStats();
          setStats(data);
        } catch (err) {
          console.error("Failed to load admin stats in layout", err);
        }
      }
    };
    fetchStats();
  }, [isAdmin]);

  const adminMenuItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Tableau de bord" },
    { 
      to: "/admin/validation", 
      icon: FileSearch, 
      label: "Validation Dossiers", 
      badge: stats?.pendingUsers > 0 ? { count: stats.pendingUsers, type: 'warning' } : null 
    },
    { to: "/admin/reviews", icon: MessageSquare, label: "Modération Avis" },
    { to: "/admin/users", icon: Users, label: "Utilisateurs" },
    { to: "/admin/stats", icon: BarChart3, label: "Statistiques" },
    { to: "/admin/chatbot", icon: Bot, label: "DjerbaBot" },
    { to: "/admin/content", icon: FileText, label: "Contenu" },
    { to: "/admin/commissions", icon: DollarSign, label: "Commissions" },
    { to: "/admin/settings", icon: Settings, label: "Paramètres" },
  ];

  const providerMenuItems = [
    { to: "/provider/dashboard", icon: LayoutDashboard, label: "Tableau de Bord" },
    { to: "/provider/notifications", icon: Bell, label: "Notifications", badge: { count: 12, type: 'warning' } },
    { to: "/provider/bookings", icon: Calendar, label: "Réservations" },
    { to: "/provider/calendar", icon: Clock, label: "Disponibilités" },
    { to: "/provider/verification", icon: ShieldCheck, label: "Vérification Identité" },
    { to: "/provider", icon: Layout, label: "Avis Clients" },
    { to: "/provider/promotions", icon: Tag, label: "Promotions" },
    { to: "/provider/events", icon: Calendar, label: "Événements" },
    { to: "/provider/services/new", icon: Plus, label: "Nouveau Service" },
  ];

  const menuItems = isAdmin ? adminMenuItems : providerMenuItems;

  // Compute display name
  let displayName = isAdmin ? "Super Admin" : "Provider";
  if (!isAdmin && userProfile) {
      displayName = userProfile.businessName || `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim() || userProfile.email;
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 p-6 flex flex-col fixed h-full z-20">
        <div className="flex items-center gap-3 mb-10 px-2">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#FF8C00] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
               <Globe className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-[#1A1A1A] leading-tight flex flex-col">
                Djerba <span className="text-[#FF8C00]">Touriste</span>
              </h1>
            </div>
          </NavLink>
        </div>

        <nav className="flex-1 space-y-2">
          <div className="px-2 pb-4">
             <span className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">{isAdmin ? 'Admin Panel' : 'Agency Portal'}</span>
          </div>
          {menuItems.map((item, idx) => (
            <SidebarItem key={idx} {...item} />
          ))}
        </nav>

        {/* User Profile */}
        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between px-2">
          <Link to={isAdmin ? "/admin/settings" : "/provider/settings"} className="flex flex-1 items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm group-hover:border-orange-100 transition-all flex-shrink-0">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile?.id || 'Felix'}`} alt="User" />
            </div>
            <div className="min-w-0 pr-2">
              <p className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#FF8C00] transition-colors truncate" title={displayName}>{displayName}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider truncate">{isAdmin ? "Admin" : "Provider"}</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link to={isAdmin ? "/admin/settings" : "/provider/settings"} className="p-2 text-gray-400 hover:text-[#FF8C00] transition-colors">
              <Settings className="w-5 h-5" />
            </Link>
            <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex-1 max-w-md">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF8C00] transition-colors" />
              <input 
                type="text" 
                placeholder="Search system logs, users, or tickets..." 
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-[#FF8C00] transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="flex items-center gap-2 bg-[#FF8C00] hover:bg-[#E67E00] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all active:scale-95">
              <Plus className="w-5 h-5" />
              New Report
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
