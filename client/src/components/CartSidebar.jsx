import { useState } from 'react';
import { useCart } from '../context/CartContext';
import api from '../api/axios';

function CartSidebar() {
  const { cartItems, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
        const payload = {
            items: cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity
            }))
        };
        await api.post('/orders', payload);
        setSuccess(true);
        clearCart();
        setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
        console.error(err);
        setError('Failed to placed order. ' + (err.response?.data?.message || ''));
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-[#1a212e] shadow-2xl border-l border-gray-200 dark:border-gray-800 flex flex-col z-40 pt-20"> 
       {/* pt-20 to verify header spacing or just standard padding if header is not fixed. 
           If header is sticky, this sidebar might need to come below it. 
           For now, I assume Sidebar is full height but pushed down or Header is above.
           Let's assume Header is normal flow, so Sidebar covers it? 
           Better: z-40. Header usually z-50.
       */}
       <div className="p-6 flex-1 flex flex-col overflow-hidden">
            <h2 className="text-xl font-bold text-[#0d121b] dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">shopping_cart</span>
                Your Cart
            </h2>

            {error && (
                <div className="mb-4 p-3 text-xs text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
                    {error}
                </div>
            )}
            
            {success ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-green-500 animate-fade-in-up">
                    <span className="material-symbols-outlined text-6xl mb-4">check_circle</span>
                    <h3 className="text-xl font-bold text-[#0d121b] dark:text-white">Order Placed!</h3>
                    <p className="text-gray-500 text-sm mt-2">Thank you for your purchase.</p>
                </div>
            ) : (
                <>
                <div className="flex-1 overflow-y-auto pr-2 -mr-2">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                            <span className="material-symbols-outlined text-4xl mb-3 opacity-50">shopping_cart_off</span>
                            <p className="text-sm">Your cart is empty.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#101622]">
                                    <div className="h-16 w-16 flex-shrink-0 bg-white rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                                       <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-sm font-bold text-[#0d121b] dark:text-white line-clamp-1">{item.name}</h3>
                                            <p className="text-primary text-xs font-bold">${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-50 cursor-pointer text-[#0d121b] dark:text-white text-xs">-</button>
                                            <span className="font-medium w-4 text-center text-xs dark:text-white">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, 1)} 
                                                disabled={item.quantity >= (item.stockQuantity || 9999)}
                                                className={`w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-600 text-[#0d121b] dark:text-white text-xs ${item.quantity >= (item.stockQuantity || 9999) ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed' : 'bg-white dark:bg-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer'}`}
                                            >
                                                +
                                            </button>
                                            <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500 hover:text-red-600 text-[10px] font-bold uppercase cursor-pointer">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-6 mt-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-500 dark:text-gray-400 text-sm">Total</span>
                            <span className="text-2xl font-bold text-[#0d121b] dark:text-white">${total.toFixed(2)}</span>
                        </div>
                        <button 
                            onClick={handleCheckout}
                            disabled={loading}
                            className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : 'Checkout'}
                        </button>
                    </div>
                )}
                </>
            )}
       </div>
    </div>
  );
}

export default CartSidebar;
