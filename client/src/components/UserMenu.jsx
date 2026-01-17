import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const firstname = localStorage.getItem('firstname') || 'User';
  const role = localStorage.getItem('role') || 'CUSTOMER';
  const initial = firstname.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg shadow-lg hover:shadow-primary/50 transition-all cursor-pointer border-2 border-white dark:border-[#1a212e]"
        title={`Logged in as ${firstname}`}
      >
        {initial}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a212e] rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 py-1 z-50 animate-fade-in-up origin-top-right">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <p className="text-sm font-bold text-[#0d121b] dark:text-white truncate">{firstname}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{role.toLowerCase()}</p>
            </div>
            
            {role === 'ADMIN' && (
                <Link 
                    to="/admin" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                >
                    Admin Dashboard
                </Link>
            )}

            <Link 
                to="/orders" 
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => setIsOpen(false)}
            >
                My Orders
            </Link>

            <button 
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => alert("Settings page coming soon!")}
            >
                Settings
            </button>
            
            <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
            >
                Log Out
            </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
