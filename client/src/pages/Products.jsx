import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import api from '../api/axios';
import ProductCreateModal from '../components/ProductCreateModal';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch products. Please ensure you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductCreated = () => {
    // Refresh the list after creation or edit
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

  const logoutButton = (
    <Link to="/login">
       <button 
        className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary hover:shadow-[0_0_20px_rgba(19,91,236,0.6)] hover:-translate-y-0.5 active:scale-95"
        onClick={() => localStorage.removeItem('token')}
       >
        <span>Log Out</span>
      </button>
    </Link>
  );

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors duration-200">
      <div className="layout-container flex h-full grow flex-col">
        <Header actionButton={logoutButton} />

        <main className="flex flex-1 flex-col py-12 px-6 md:px-10 transition-colors duration-200">
           <div className="mb-8 flex justify-between items-center">
              <div>
                  <h1 className="text-[#0d121b] dark:text-white tracking-tight text-[32px] font-bold leading-tight pb-2">Products</h1>
                  <p className="text-[#4c669a] dark:text-gray-400 text-base font-normal leading-normal">Manage and browse your inventory.</p>
              </div>
              <button 
                onClick={openCreateModal}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary h-12 px-5 text-white text-sm font-bold leading-normal shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary hover:shadow-[0_0_25px_rgba(19,91,236,0.6)] hover:-translate-y-0.5 active:scale-95"
              >
                  <span className="material-symbols-outlined text-lg">add</span>
                  <span>Add Product</span>
              </button>
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
            ) : products.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-[#1a212e] rounded-xl border border-[#e7ebf3] dark:border-gray-800">
                     <span className="material-symbols-outlined text-4xl text-gray-400 mb-3">inventory_2</span>
                     <p className="text-gray-500 dark:text-gray-400 text-lg">No products found.</p>
                     <button onClick={openCreateModal} className="text-primary hover:underline mt-2 inline-block cursor-pointer">Create your first product</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white dark:bg-[#1a212e] rounded-xl shadow-sm border border-[#e7ebf3] dark:border-gray-800 overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                            <div className="h-48 bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                                {product.imageUrl ? (
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                                ) : (
                                    <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-700">image</span>
                                )}
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                     <h3 className="text-lg font-bold text-[#0d121b] dark:text-white line-clamp-1">{product.name}</h3>
                                     <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">{product.categoryName || 'General'}</span>
                                </div>
                                <p className="text-[#4c669a] dark:text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">{product.description || 'No description provided.'}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-[#0d121b] dark:text-white">${product.price.toFixed(2)}</span>
                                    <button 
                                        onClick={() => openEditModal(product)}
                                        className="p-2 text-gray-400 hover:text-primary transition-colors cursor-pointer"
                                        title="Edit Product"
                                    >
                                        <span className="material-symbols-outlined">edit</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
        
        {/* Modal Injection */}
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
