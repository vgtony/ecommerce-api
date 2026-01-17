import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import api from '../api/axios';
import { useCart } from '../context/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (err) {
      console.error(err);
      setError('Product not found.');
    } finally {
      setLoading(false);
    }
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

        <main className="flex flex-1 items-center justify-center py-12 px-6 md:px-10 transition-colors duration-200">
           
           {error && (
              <div className="text-center p-8 bg-white dark:bg-[#1a212e] rounded-xl shadow border border-[#e7ebf3] dark:border-gray-800">
                 <p className="text-red-500 mb-4">{error}</p>
                 <Link to="/products" className="text-primary hover:underline">Back to Products</Link>
              </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : product && (
                <div className="w-full max-w-5xl bg-white dark:bg-[#1a212e] rounded-2xl shadow-xl border border-[#cfd7e7] dark:border-gray-800 overflow-hidden flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 h-[400px] md:h-auto bg-gray-100 dark:bg-gray-900 flex items-center justify-center relative">
                        {product.imageUrl ? (
                             <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                             <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-700">image</span>
                        )}
                        <div className="absolute top-4 left-4">
                           <Link to="/products">
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-lg text-sm font-medium hover:bg-white dark:hover:bg-black transition-colors">
                                <span className="material-symbols-outlined text-base">arrow_back</span>
                                Back
                            </button>
                           </Link>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                                {product.categoryName || 'General'}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-black text-[#0d121b] dark:text-white leading-tight mb-4">{product.name}</h1>
                            <p className="text-lg text-[#4c669a] dark:text-gray-400 leading-relaxed">{product.description}</p>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-0.5">Price</p>
                                <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                                <div className="mt-2">
                                     {product.stockQuantity === 0 ? (
                                         <span className="text-sm font-bold text-red-500">Out of Stock</span>
                                     ) : (
                                         <span className="text-sm font-bold text-green-500">{product.stockQuantity} In Stock</span>
                                     )}
                                </div>
                            </div>
                            <button 
                                onClick={() => addToCart(product)}
                                disabled={product.stockQuantity === 0}
                                className={`h-12 px-8 text-white rounded-lg font-bold shadow-lg transition-all ${product.stockQuantity === 0 ? 'bg-gray-400 cursor-not-allowed shadow-none' : 'bg-primary hover:bg-primary/90 shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5'}`}
                            >
                                {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
      </div>
    </div>
  );
}

export default ProductDetails;
