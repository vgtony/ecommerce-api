import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import Header from '../components/Header'; // Reusing Header for authenticated view
import UserMenu from '../components/UserMenu';
import CategoryCarousel from '../components/CategoryCarousel';

function Landing() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    const fetchFeatured = async () => {
       try {
         const response = await api.get('/products');
         if (response.data && response.data.length > 0) {
             setFeaturedProducts(response.data.slice(0, 8)); 
         }
       } catch (e) {
         console.log("Could not fetch featured products", e);
       }
    };
    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            setCategories(response.data);
        } catch(e) {
            console.log("Could not fetch categories", e);
        }
    }
    fetchFeatured();
    fetchCategories();
  }, []);

  const fallbackImages = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1585298723682-7115561c51b7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1572569028738-411a56106515?auto=format&fit=crop&w=800&q=80",
  ];

  const itemsToShow = featuredProducts.length > 0 ? featuredProducts : fallbackImages;

  const logoutButton = <UserMenu />;

  // Authenticated Dashboard
  if (isAuthenticated) {
     return (
       <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors duration-200">
         <div className="layout-container flex h-full grow flex-col">
            <Header actionButton={logoutButton} />
            
            <main className="flex flex-1 flex-col py-8 px-6 md:px-10 transition-colors duration-200 gap-12">
                
                {/* 1. Carousel Section */}
                <section>
                    <h2 className="text-2xl font-bold text-[#0d121b] dark:text-white mb-6">Featured Products</h2>
                    <div className="w-full relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-[#1a212e]">
                        <div className="flex gap-4 animate-marquee hover:pause py-6">
                            {[...itemsToShow, ...itemsToShow].map((item, idx) => (
                                <Link 
                                    key={idx} 
                                    to={typeof item === 'object' ? `/products/${item.id}` : '#'} 
                                    className={`flex-shrink-0 w-64 h-80 relative rounded-xl overflow-hidden group ${typeof item !== 'object' ? 'pointer-events-none' : ''} mx-2`}
                                >
                                    <img 
                                        src={typeof item === 'object' ? item.imageUrl : item} 
                                        alt={typeof item === 'object' ? item.name : 'Product'} 
                                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                        <h3 className="text-white font-bold leading-tight line-clamp-2">{typeof item === 'object' ? item.name : ''}</h3>
                                        <span className="text-primary-300 text-sm font-medium mt-1">
                                            {typeof item === 'object' ? `$${item.price.toFixed(2)}` : ''}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2. Categories Section */}
                <section>
                    <h2 className="text-2xl font-bold text-[#0d121b] dark:text-white mb-6">Shop by Category</h2>
                    <div className="w-full">
                        <CategoryCarousel categories={categories} />
                    </div>
                </section>
                
            </main>
         </div>

       </div>
     );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors duration-200 justify-center items-center">
      
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="z-10 flex flex-col items-center max-w-4xl px-4 w-full">
        
        {/* Logo & Title */}
        <div className="flex items-center gap-4 mb-8 md:mb-12 animate-fade-in-up">
          <div className="size-16 md:size-20 text-primary drop-shadow-lg shadow-primary/50">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#0d121b] dark:text-white drop-shadow-sm">
            ShopName
          </h1>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 md:gap-6 mb-16 animate-fade-in-up delay-100">
          <Link to="/login">
            <button className="h-14 px-8 md:px-10 rounded-full border-2 border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-[#1a212e] text-[#0d121b] dark:text-white text-lg font-bold hover:border-primary hover:text-primary transition-all hover:-translate-y-1 hover:shadow-lg">
              Log In
            </button>
          </Link>
          <Link to="/register">
            <button className="h-14 px-8 md:px-10 rounded-full bg-primary text-white text-lg font-bold shadow-lg shadow-primary/30 hover:bg-primary hover:shadow-[0_0_25px_rgba(19,91,236,0.6)] hover:-translate-y-1 transition-all">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Carousel */}
        <div className="w-full relative overflow-hidden rounded-2xl border-4 border-white dark:border-[#1a212e] shadow-2xl animate-fade-in-up delay-200">
          <div className="flex gap-4 animate-marquee hover:pause">
            {[...itemsToShow, ...itemsToShow].map((item, idx) => (
               <Link 
                  key={idx} 
                  to={typeof item === 'object' ? `/products/${item.id}` : '#'} 
                  className={`flex-shrink-0 w-64 h-80 relative rounded-xl overflow-hidden group ${typeof item !== 'object' ? 'pointer-events-none' : ''}`}
               >
                 <img 
                  src={typeof item === 'object' ? item.imageUrl : item} 
                  alt={typeof item === 'object' ? item.name : 'Product'} 
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold leading-tight">{typeof item === 'object' ? item.name : ''}</h3>
                  <span className="text-primary-300 text-sm font-medium mt-1">
                    {typeof item === 'object' ? `$${item.price.toFixed(2)}` : ''}
                  </span>
                 </div>
              </Link>
            ))}
          </div>
           {/* Fade edges */}
           <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none"></div>
           <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Categories Carousel */}
        <div className="w-full mt-16 mb-20 animate-fade-in-up delay-200">
             <h2 className="text-2xl font-bold text-[#0d121b] dark:text-white mb-6 text-center">Shop by Category</h2>
             <CategoryCarousel categories={categories} />
        </div>

      </div>
      

    </div>
  );
}

export default Landing;
