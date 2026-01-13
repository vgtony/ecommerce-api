import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ actionButton }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });
  
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7ebf3] dark:border-b-gray-800 px-6 md:px-10 py-3 bg-white dark:bg-[#1a212e] transition-colors duration-200">
      <div className="flex items-center gap-4 text-[#0d121b] dark:text-white">
        <Link to="/" className="flex items-center gap-4">
          <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">ShopName</h2>
        </Link>
        
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme} 
          className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-all cursor-pointer"
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
           <span className="material-symbols-outlined text-xl">
             {theme === 'dark' ? 'light_mode' : 'dark_mode'}
           </span>
        </button>
      </div>

      <div className="flex flex-1 justify-end gap-8">
        <div className="hidden md:flex items-center gap-9">
          <Link to="/" className={`text-sm font-medium leading-normal transition-colors ${isActive('/') ? 'text-primary font-bold' : 'text-[#0d121b] dark:text-gray-300 hover:text-primary'}`}>Home</Link>
          <Link to="/products" className={`text-sm font-medium leading-normal transition-colors ${isActive('/products') ? 'text-primary font-bold' : 'text-[#0d121b] dark:text-gray-300 hover:text-primary'}`}>Products</Link>
          <Link to="#" className="text-[#0d121b] dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors">Help</Link>
        </div>
        
        {actionButton}
      </div>
    </header>
  );
}

export default Header;
