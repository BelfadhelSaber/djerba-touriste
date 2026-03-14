import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Globe,
  Camera,
  Layers,
  MapPin,
  Briefcase,
  ShieldAlert
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [role, setRole] = useState('TOURIST');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const names = formData.firstName.trim().split(' ');
      const firstName = names[0];
      const lastName = names.slice(1).join(' ') || 'User';

      const response = await axios.post('http://localhost:8080/api/auth/register', {
        firstName,
        lastName,
        email: formData.email,
        password: formData.password,
        role: role.toUpperCase()
      });
      
      const { token, role: userRole, id, status } = response.data;

      // If account is pending approval, redirect to a waiting page without storing credentials
      if (status === 'PENDING') {
        navigate('/pending-approval');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('userRole', userRole);
      if (id) {
          localStorage.setItem('userId', id);
      }
      
      if (userRole === 'ADMIN') {
        navigate('/admin');
      } else if (userRole === 'PROVIDER') {
        navigate('/provider');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { id: 'TOURIST', icon: User, label: 'Tourist' },
    { id: 'PROVIDER', icon: Briefcase, label: 'Service Provider' },
    { id: 'ADMIN', icon: ShieldCheck, label: 'Administrator' }
  ];

  return (
    <div className="flex min-h-screen bg-white font-sans selection:bg-[#FF8C00]/20">
      {/* Left Column: Visual Storytelling */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
         <img 
            src="https://images.unsplash.com/photo-1544123089-18244f3cb523?auto=format&fit=crop&q=80&w=1600" 
            className="absolute inset-0 w-full h-full object-cover grayscale-25 brightness-75 scale-110 animate-pulse-slow" 
            alt="Djerba Sunset" 
         />
         <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1A1A]/80 via-transparent to-transparent"></div>
         
         <div className="relative z-10 flex flex-col justify-end p-20 w-full">
            <div className="mb-10 w-16 h-1 bg-[#FF8C00] rounded-full"></div>
            <h1 className="text-6xl font-black text-white mb-6 leading-[1.1] tracking-tighter">
               Discover the Magic of <span className="text-[#FF8C00]">Djerba</span>
            </h1>
            <p className="text-xl text-gray-200/80 font-medium max-w-lg leading-relaxed mb-12">
               Join thousands of travelers exploring the island of dreams with our smart digital companion.
            </p>
            
            <div className="flex items-center gap-6">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                     <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`} className="w-10 h-10 rounded-full border-2 border-white shadow-lg" alt="User" />
                  ))}
               </div>
               <p className="text-xs font-bold text-white/60 uppercase tracking-widest">+ 5k Members joined this week</p>
            </div>
         </div>

         {/* Floating Badge */}
         <Link to="/" className="absolute top-10 left-10 z-20 flex items-center gap-3">
            <div className="w-12 h-12 bg-[#FF8C00] rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/40">
               <Globe className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black text-white tracking-tighter uppercase">Djerba <span className="text-orange-400">Touriste</span></span>
         </Link>
      </div>

      {/* Right Column: Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#FDFDFD]">
        <div className="max-w-md w-full">
           <div className="mb-12">
              <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Create your account</h2>
               <p className="text-gray-400 font-medium">Start your journey on the island of dreams today.</p>
           </div>

           <form className="space-y-6" onSubmit={handleRegister}>
              {error && (
                <div className="p-4 bg-red-50 text-red-500 rounded-[20px] text-sm font-bold border border-red-100">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                 <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#FF8C00] transition-colors" />
                    <input 
                       type="text" 
                       name="firstName"
                       value={formData.firstName}
                       onChange={handleInputChange}
                       required
                       placeholder="Full Name" 
                       className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-[20px] text-sm font-bold text-gray-900 focus:bg-white focus:border-orange-100 outline-none transition-all placeholder:text-gray-400"
                    />
                 </div>
                 <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#FF8C00] transition-colors" />
                    <input 
                       type="email" 
                       name="email"
                       value={formData.email}
                       onChange={handleInputChange}
                       required
                       placeholder="Email Address" 
                       className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-[20px] text-sm font-bold text-gray-900 focus:bg-white focus:border-orange-100 outline-none transition-all placeholder:text-gray-400"
                    />
                 </div>
                 <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#FF8C00] transition-colors" />
                    <input 
                       type="text" 
                       name="phone"
                       value={formData.phone}
                       onChange={handleInputChange}
                       placeholder="+216 00 000 000" 
                       className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-[20px] text-sm font-bold text-gray-900 focus:bg-white focus:border-orange-100 outline-none transition-all placeholder:text-gray-400"
                    />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                       <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#FF8C00] transition-colors" />
                       <input 
                          type="password" 
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          placeholder="Password" 
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-[20px] text-sm font-bold text-gray-900 focus:bg-white focus:border-orange-100 outline-none transition-all placeholder:text-gray-400"
                       />
                    </div>
                    <div className="relative group">
                       <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#FF8C00] transition-colors" />
                       <input 
                          type="password" 
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          placeholder="Confirm" 
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-[20px] text-sm font-bold text-gray-900 focus:bg-white focus:border-orange-100 outline-none transition-all placeholder:text-gray-400"
                       />
                    </div>
                 </div>
              </div>

              {/* Role Multi-Select */}
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Register as</label>
                 <div className="grid grid-cols-2 gap-3 pb-2">
                    {roles.map((r) => (
                       <button 
                          key={r.id}
                          type="button"
                          onClick={() => setRole(r.id)}
                          className={`flex items-center justify-center gap-3 py-4 rounded-[20px] transition-all border-2 text-sm font-bold ${
                             role === r.id ? 'bg-orange-50 border-orange-100 text-[#FF8C00] shadow-sm shadow-orange-500/5' : 'bg-white border-transparent text-gray-400 hover:bg-gray-50'
                          }`}
                       >
                          <r.icon className="w-4 h-4" />
                          {r.label}
                       </button>
                    ))}
                    {role === 'ADMIN' ? null : (
                       <div className="bg-orange-500/5 rounded-[20px] flex items-center justify-center p-1">
                          <div className="flex-1 text-center py-3 text-[10px] font-black text-orange-400 uppercase tracking-tighter opacity-70">Secured Access</div>
                       </div>
                    )}
                 </div>
              </div>

              <div className="flex items-center gap-3 px-1">
                 <input type="checkbox" id="tos" required className="w-5 h-5 rounded-lg accent-orange-500 border-gray-200" />
                 <label htmlFor="tos" className="text-xs font-semibold text-gray-400 leading-tight">
                    I agree to the <Link to="/terms" className="text-orange-500">Terms of Service</Link> and <Link to="/privacy" className="text-orange-500">Privacy Policy</Link> of the Smart Tourism Platform.
                 </label>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF8C00] text-white py-6 rounded-[24px] font-black text-lg shadow-2xl shadow-orange-500/20 hover:bg-[#E67E00] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 group mt-4 px-4 disabled:opacity-50"
              >
                  {loading ? 'Creating Account...' : 'Register Now'}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
           </form>

           <div className="mt-10">
              <div className="relative flex items-center justify-center mb-8">
                 <div className="absolute inset-0 flex items-center px-2">
                    <div className="w-full h-px bg-gray-100"></div>
                 </div>
                 <span className="relative bg-[#FDFDFD] px-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">Or sign up with</span>
              </div>

              <button className="w-full bg-white border-2 border-gray-100 py-4 rounded-[24px] flex items-center justify-center gap-4 hover:bg-gray-50 transition-all shadow-sm active:scale-95 group">
                 <img src="https://www.google.com/favicon.ico" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
                 <span className="text-sm font-bold text-gray-600">Google Account</span>
              </button>
           </div>

           <p className="text-center mt-12 text-sm font-bold text-gray-400">
               Already have an account? <Link to="/login" className="text-orange-500 hover:underline">Log in</Link>
           </p>
        </div>
      </div>

      <style>{`
         @keyframes pulse-slow {
            0%, 100% { transform: scale(1.1); }
            50% { transform: scale(1.15); }
         }
         .animate-pulse-slow {
            animation: pulse-slow 15s ease-in-out infinite;
         }
         .no-scrollbar::-webkit-scrollbar {
            display: none;
         }
      `}</style>
    </div>
  );
};

export default RegisterPage;
