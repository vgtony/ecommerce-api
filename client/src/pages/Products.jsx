import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import api from '../api/axios';
import ProductCreateModal from '../components/ProductCreateModal';
import { useCart } from '../context/CartContext';
import UserMenu from '../components/UserMenu';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, cartItems, setIsCartOpen } = useCart();
  const [userRole, setUserRole] = useState('CUSTOMER'); 
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    // Check role safely
    const storedRole = localStorage.getItem('role');
    if (storedRole) setUserRole(storedRole);
    fetchCategories();
    fetchProducts();
  }, [categoryFilter]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products');
      let data = response.data;
      
      if (Array.isArray(data)) {
        if (categoryFilter) {
             const filterId = parseInt(categoryFilter);
             data = data.filter(p => p.categoryId === filterId);
        }
        setProducts(data);
      } else {
        console.error("API returned non-array data:", data);
        setProducts([]);
        setError("Invalid data received from server.");
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch products. Please ensure you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductCreated = () => {
    fetchProducts();
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setIsCreateModalOpen(true);
  };
  
  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsCreateModalOpen(true);
  };

  const isAdmin = userRole === 'ADMIN';



// ... (top of file)

  const logoutButton = (
    <div className="flex gap-4 items-center">
        {!isAdmin && (
             <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-gray-400 hover:text-primary transition-colors cursor-pointer group">
                 <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">shopping_cart</span>
                 {cartItems.length > 0 && (
                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-[#1a212e]">
                         {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                     </span>
                 )}
             </button>
        )}
        <UserMenu />
    </div>
  );

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors duration-200">
      <div className="layout-container flex h-full grow flex-col">
        <Header actionButton={logoutButton} />

        <main className="flex flex-1 flex-col py-12 px-6 md:px-10 transition-colors duration-200">
           <div className="mb-8 flex flex-wrap gap-4 justify-between items-end">
              <div>
                  <h1 className="text-[#0d121b] dark:text-white tracking-tight text-[32px] font-bold leading-tight pb-2">Products</h1>
                  <p className="text-[#4c669a] dark:text-gray-400 text-base font-normal leading-normal">
                      {isAdmin ? 'Manage inventory.' : 'Browse our collection.'}
                  </p>
              </div>
              
              <div className="flex gap-4 items-center">
                  <div className="relative hidden md:block">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                      <input 
                          type="text" 
                          placeholder="Search products..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 h-12 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-[#101622] text-sm text-[#0d121b] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary w-64 outline-none transition-shadow"
                      />
                  </div>
                  <select 
                    value={categoryFilter || ''}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val) {
                            setSearchParams({ category: val });
                        } else {
                            setSearchParams({});
                        }
                    }}
                    // Note: Since I didn't verify setSearchParams is imported or used, I'll use Link or just simple navigation
                    // Actually useSearchParams return [searchParams, setSearchParams]
                    // I need to update the import in line 2 or use the setter if I destructure it.
                    // Checking line 15: const [searchParams] = useSearchParams(); -> I need to add setter
                    className="h-12 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-[#101622] text-sm text-[#0d121b] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                      <option value="">All Categories</option>
                      {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                  </select>

                  {isAdmin && (
                      <button 
                        onClick={openCreateModal}
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary h-12 px-5 text-white text-sm font-bold leading-normal shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary hover:shadow-[0_0_25px_rgba(19,91,236,0.6)] hover:-translate-y-0.5 active:scale-95"
                      >
                          <span className="material-symbols-outlined text-lg">add</span>
                          <span>Add Product</span>
                      </button>
                  )}
              </div>
           </div>

           {error && (
              <div className="mb-6 p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                {error}
              </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : !Array.isArray(products) || products.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-[#1a212e] rounded-xl border border-[#e7ebf3] dark:border-gray-800">
                     <span className="material-symbols-outlined text-4xl text-gray-400 mb-3">inventory_2</span>
                     <p className="text-gray-500 dark:text-gray-400 text-lg">No products found.</p>
                     {isAdmin && <button onClick={openCreateModal} className="text-primary hover:underline mt-2 inline-block cursor-pointer">Create your first product</button>}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                        <div key={product.id || Math.random()} className="bg-white dark:bg-[#1a212e] rounded-xl shadow-sm border border-[#e7ebf3] dark:border-gray-800 overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col group">
                            <div className="h-48 bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                                {product.imageUrl ? (
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                ) : (
                                    <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-700">image</span>
                                )}
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                     <h3 className="text-lg font-bold text-[#0d121b] dark:text-white line-clamp-1">{product.name}</h3>
                                     <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">{product.categoryName || 'General'}</span>
                                </div>
                                <div className="mb-2">
                                     {product.stockQuantity === 0 ? (
                                         <span className="text-xs font-bold text-red-500 bg-red-100 px-2 py-1 rounded">Out of Stock</span>
                                     ) : product.stockQuantity < 5 ? (
                                         <span className="text-xs font-bold text-orange-500 bg-orange-100 px-2 py-1 rounded">Low Stock: {product.stockQuantity} left</span>
                                     ) : (
                                         <span className="text-xs font-bold text-green-500 bg-green-100 px-2 py-1 rounded">In Stock</span>
                                     )}
                                </div>
                                <p className="text-[#4c669a] dark:text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px] flex-1">{product.description || 'No description provided.'}</p>
                                <div className="flex justify-between items-center mt-auto">
                                    <span className="text-xl font-bold text-[#0d121b] dark:text-white">${(product.price || 0).toFixed(2)}</span>
                                    
                                    {isAdmin ? (
                                        <button 
                                            onClick={() => openEditModal(product)}
                                            className="p-2 text-gray-400 hover:text-primary transition-colors cursor-pointer"
                                            title="Edit Product"
                                        >
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => addToCart(product)}
                                            disabled={product.stockQuantity === 0}
                                            className={`h-10 w-10 flex items-center justify-center rounded-full text-white shadow-lg transition-all cursor-pointer ${product.stockQuantity === 0 ? 'bg-gray-400 cursor-not-allowed shadow-none' : 'bg-primary shadow-primary/30 hover:bg-primary hover:scale-110'}`}
                                            title={product.stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
                                        >
                                            <span className="material-symbols-outlined text-xl">add</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
        
        {/* Modals */}
        <ProductCreateModal 
            isOpen={isCreateModalOpen} 
            onClose={() => setIsCreateModalOpen(false)}
            onProductCreated={handleProductCreated}
            productToEdit={editingProduct}
        />
      </div>
    </div>
  );
}

export default Products;
