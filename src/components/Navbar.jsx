import { Search, Globe, User, Bell, LogIn } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onExploreCategories }) => {
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const handleExploreClick = (e) => {
    e.preventDefault();
    if (onExploreCategories) {
      onExploreCategories();
    } else {
      navigate('/');
      // Small timeout to allow navigation before scrolling
      setTimeout(() => {
        const el = document.getElementById('categories-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white px-8 py-3 rounded-2xl shadow-md border border-gray-100">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
          <div className="w-8 h-8 bg-[#FF8C00] rounded-full flex items-center justify-center transform transition-transform hover:rotate-12">
             <Globe className="text-white w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-[#1A1A1A]">
            Djerba <span className="text-[#FF8C00]">Touriste</span>
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10 font-medium text-[#1A1A1A]/80">
          <NavLink to="/" className={({ isActive }) => `hover:text-[#FF8C00] transition-colors relative group ${isActive ? 'text-[#FF8C00]' : ''}`}>
            Accueil
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C00] transition-all group-hover:w-full"></span>
          </NavLink>
          <button 
            onClick={handleExploreClick}
            className="hover:text-[#FF8C00] transition-colors relative group text-[#1A1A1A]/80 font-medium"
          >
            Explorer les Catégories
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C00] transition-all group-hover:w-full"></span>
          </button>
          <NavLink to="/chat" className={({ isActive }) => `flex items-center gap-1.5 hover:text-[#FF8C00] transition-colors ${isActive ? 'text-[#FF8C00]' : ''}`}>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]"></span>
            Guide IA
          </NavLink>

          {/* Conditional Role-Based Links */}
          {userRole === 'ADMIN' && (
            <>
              <NavLink to="/admin" className={({ isActive }) => `hover:text-[#FF8C00] transition-colors relative group ${isActive ? 'text-[#FF8C00]' : ''}`}>
                Admin Console
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C00] transition-all group-hover:w-full"></span>
              </NavLink>
            </>
          )}

          {userRole === 'PROVIDER' && (
            <>
              <NavLink to="/provider" className={({ isActive }) => `hover:text-[#FF8C00] transition-colors relative group ${isActive ? 'text-[#FF8C00]' : ''}`}>
                Provider Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C00] transition-all group-hover:w-full"></span>
              </NavLink>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full transition-all hover:bg-white shadow-sm active:scale-90">
            <Search className="w-5 h-5 text-[#333]" />
          </button>
          
          {userRole ? (
             <div className="flex items-center gap-3">
               <Link 
                 to={userRole === 'ADMIN' ? '/admin' : userRole === 'PROVIDER' ? '/provider' : '/account'} 
                 className="flex items-center gap-2 bg-[#FF8C00] hover:bg-[#E67E00] text-white px-6 py-2.5 rounded-2xl font-bold shadow-lg shadow-orange-500/20 transition-all active:scale-95"
               >
                 <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center">
                   <User className="w-3.5 h-3.5" />
                 </div>
                 Profile
               </Link>
               <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 font-bold text-sm px-2">Logout</button>
             </div>
          ) : (
             <Link 
               to="/login" 
               className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-black text-white px-6 py-2.5 rounded-2xl font-bold shadow-lg transition-all active:scale-95"
             >
               <LogIn className="w-4 h-4" />
               Log In
             </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
