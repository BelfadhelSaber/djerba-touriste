import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ClipboardCheck, 
  ShieldAlert,
  ArrowUpRight,
  ChevronDown,
  MoreVertical,
  Trash2,
  Check,
  FileText
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Week 1', revenue: 150000, users: 4000 },
  { name: 'Week 2', revenue: 280000, users: 7000 },
  { name: 'Week 3', revenue: 210000, users: 5500 },
  { name: 'Week 4', revenue: 428190, users: 12402 },
];

import adminService from '../services/adminService';

const StatCard = ({ icon: Icon, label, value, trend, color, subValue, subType }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 ${color.bg} ${color.text} rounded-2xl flex items-center justify-center shadow-sm`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded-lg text-xs font-bold">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </div>
      )}
      {subValue && (
        <div className={`flex items-center gap-1 ${subType === 'error' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'} px-2 py-1 rounded-lg text-xs font-bold`}>
           {subType === 'error' ? <ShieldAlert className="w-3 h-3" /> : <ClipboardCheck className="w-3 h-3" />}
           {subValue}
        </div>
      )}
    </div>
    <p className="text-gray-400 text-sm font-semibold mb-1">{label}</p>
    <p className="text-2xl font-display font-bold text-[#1A1A1A]">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getStats();
        setStats(data);
      } catch (err) {
        console.error('Error fetching admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8C00]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={TrendingUp} 
          label="Revenu Global" 
          value={`$${stats?.globalRevenue?.toLocaleString()}`} 
          trend="14%" 
          color={{ bg: 'bg-orange-50', text: 'text-orange-500' }} 
        />
        <StatCard 
          icon={Users} 
          label="Utilisateurs Actifs" 
          value={stats?.activeUsers} 
          trend="8%" 
          color={{ bg: 'bg-green-50', text: 'text-green-500' }} 
        />
        <StatCard 
          icon={ClipboardCheck} 
          label="Demandes d'adhésion" 
          value={stats?.pendingUsers} 
          subValue="En attente"
          subType="warning"
          color={{ bg: 'bg-blue-50', text: 'text-blue-500' }} 
        />
        <StatCard 
          icon={ShieldAlert} 
          label="Comptes Bannis" 
          value={stats?.bannedUsers} 
          subValue="Action Requise"
          subType="error"
          color={{ bg: 'bg-purple-50', text: 'text-purple-500' }} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-xl font-display font-bold text-[#1A1A1A]">Revenue Performance</h2>
              <p className="text-xs text-gray-400 font-medium">Comparison across the last 30 days</p>
            </div>
            <button className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors">
              Last 30 Days
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF8C00" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#FF8C00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#FF8C00" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Verification Queue */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-display font-bold text-[#1A1A1A]">Verification Queue</h2>
            <button className="text-[10px] text-[#FF8C00] font-bold uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {[
              { id: 'ML', name: 'Modern Living ...', type: 'Business License', time: '2h ago' },
              { id: 'GT', name: 'Gourmet Travels', type: 'ID Verification', time: '4h ago' },
              { id: 'AP', name: 'Apex Properties', type: 'Tax Document', time: '5h ago' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-gray-50">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-400">{item.id}</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#1A1A1A]">{item.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.type} • {item.time}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                  <Check className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Moderation Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-display font-bold text-[#1A1A1A]">Latest Content for Moderation</h2>
            <p className="text-xs text-gray-400 font-medium tracking-wide mt-1">Review flagged reviews and comments</p>
          </div>
          <div className="flex gap-3">
             <button className="px-5 py-2.5 bg-gray-50 text-gray-500 rounded-xl font-bold text-xs hover:bg-gray-100 transition-colors">Export CSV</button>
             <button className="px-5 py-2.5 bg-[#FF8C00] text-white rounded-xl font-bold text-xs hover:bg-[#E67E00] shadow-lg shadow-orange-500/10 transition-all active:scale-95">Approve Bulk</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Author</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Target Entity</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Content Preview</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Flag Reason</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { 
                  name: 'John Doe', 
                  id: '#4920', 
                  target: 'Ocean View Resort', 
                  content: 'The service was absolutely terrible and I suspec...', 
                  reason: 'PROFANITY',
                  badge: 'bg-red-50 text-red-500'
                },
                { 
                  name: 'Sarah Smith', 
                  id: '#8321', 
                  target: 'Urban Bistro', 
                  content: 'Click this link for a free discount coupon: bit.ly...', 
                  reason: 'SPAM LINK',
                  badge: 'bg-orange-50 text-[#FF8C00]'
                }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-[#FF8C00]">{row.name[0]}{row.name.split(' ')[1][0]}</div>
                      <div>
                        <p className="text-sm font-bold text-[#1A1A1A]">{row.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">ID: {row.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-semibold text-gray-600">{row.target}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm text-gray-400">"{row.content}"</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${row.badge}`}>
                      {row.reason}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <button className="p-2 hover:bg-green-50 text-gray-400 hover:text-green-500 rounded-lg transition-colors"><Check className="w-5 h-5" /></button>
                       <button className="p-2 hover:bg-gray-100 text-gray-400 rounded-lg transition-colors"><Trash2 className="w-5 h-5" /></button>
                       <button className="p-2 hover:bg-gray-100 text-gray-400 rounded-lg transition-colors"><MoreVertical className="w-5 h-5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
