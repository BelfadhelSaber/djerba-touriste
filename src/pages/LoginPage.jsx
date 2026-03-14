import React from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  ArrowRight,
  Globe
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      });
      
      const { token, role, id } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
      if (id) {
          localStorage.setItem('userId', id);
      }
      
      if (role === 'ADMIN') {
        navigate('/admin');
      } else if (role === 'PROVIDER') {
        navigate('/provider');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white selection:bg-[#FF8C00]/20">
      {/* Left side: Hero Image & Branding */}
      <div className="relative hidden lg:block overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.png')" }}></div>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
        
        <div className="absolute inset-0 p-20 flex flex-col justify-between">
          <Link to="/" className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white rounded-xl shadow-2xl flex items-center justify-center">
                <Globe className="text-[#FF8C00] w-6 h-6" />
             </div>
             <span className="font-display font-bold text-2xl tracking-tight text-white">Djerba Touriste</span>
          </Link>
          
          <div className="space-y-6 max-w-lg">
             <h1 className="text-7xl font-display font-bold text-white leading-[1.1]">Explore Djerba Smartly</h1>
             <p className="text-xl text-white/80 font-medium leading-relaxed">
               Experience the beauty of the Mediterranean's hidden gem with our intelligent tourism solutions and personalized travel experiences.
             </p>
          </div>
          
          <div className="flex items-center justify-between text-[11px] font-bold text-white/60 uppercase tracking-[0.3em]">
             <p>© 2024 Smart Tourism Platform</p>
             <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex items-center justify-center p-8 lg:p-24 bg-[#F8FAFC]">
        <div className="max-w-md w-full bg-white p-12 lg:p-16 rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-white">
           <div className="mb-12">
              <h2 className="text-4xl font-display font-bold text-[#1A1A1A] mb-3">Welcome Back</h2>
              <p className="text-sm text-gray-400 font-medium tracking-wide">Please enter your details to sign in</p>
           </div>

           <form className="space-y-8" onSubmit={handleLogin}>
              {error && (
                <div className="p-4 bg-red-50 text-red-500 rounded-2xl text-sm font-bold border border-red-100">
                  {error}
                </div>
              )}
              <div className="space-y-3">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Email Address</label>
                 <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF8C00] transition-colors" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@company.com" 
                      className="w-full pl-16 pr-8 py-5 bg-gray-50 border-none rounded-2xl text-sm font-bold text-[#1A1A1A] outline-none focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all"
                    />
                 </div>
              </div>

              <div className="space-y-3">
                 <div className="flex justify-between items-center px-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
                    <Link to="/forgot-password" size="tiny" className="text-[10px] font-bold text-[#FF8C00] uppercase tracking-widest hover:underline">Forgot password?</Link>
                 </div>
                 <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF8C00] transition-colors" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••" 
                      className="w-full pl-16 pr-14 py-5 bg-gray-50 border-none rounded-2xl text-sm font-bold text-[#1A1A1A] outline-none focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all"
                    />
                    <button type="button" className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                       <Eye className="w-4 h-4" />
                    </button>
                 </div>
              </div>

              <div className="flex items-center gap-3 px-2">
                 <input type="checkbox" id="remember" className="w-4 h-4 rounded-md border-gray-200 text-[#FF8C00] focus:ring-[#FF8C00]" />
                 <label htmlFor="remember" className="text-xs font-bold text-gray-400 cursor-pointer">Remember me</label>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF8C00] hover:bg-[#E67E00] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-2xl shadow-orange-500/20 transition-all active:scale-95 group disabled:opacity-50"
              >
                  <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
           </form>

           <div className="mt-12 space-y-8">
              <div className="relative">
                 <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                 <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest"><span className="bg-white px-4 text-gray-300">Or continue with</span></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <button className="flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-2xl text-[11px] font-bold text-[#1A1A1A] hover:bg-gray-50 transition-all active:scale-[0.98]">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
                    Google
                 </button>
                 <button className="flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-2xl text-[11px] font-bold text-[#1A1A1A] hover:bg-gray-50 transition-all active:scale-[0.98]">
                    <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-4 h-4" />
                    Facebook
                 </button>
              </div>

              <p className="text-center text-xs font-bold text-gray-400">
                Don't have an account? <Link to="/register" className="text-[#FF8C00] hover:underline underline-offset-8">Create an account</Link>
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
