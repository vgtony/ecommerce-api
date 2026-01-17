import { useState, useEffect } from 'react';
import Header from '../components/Header';
import api from '../api/axios';
import UserMenu from '../components/UserMenu';
import { useCart } from '../context/CartContext';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cartItems, setIsCartOpen } = useCart();
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      setError("Failed to load your orders.");
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
        setExpandedOrderId(null);
    } else {
        setExpandedOrderId(orderId);
    }
  };

  const logoutButton = (
    <div className="flex gap-4 items-center">
         <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-gray-400 hover:text-primary transition-colors cursor-pointer group">
             <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">shopping_cart</span>
             {cartItems.length > 0 && (
                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-[#1a212e]">
                     {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                 </span>
             )}
         </button>
        <UserMenu />
    </div>
  );

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors duration-200">
      <div className="layout-container flex h-full grow flex-col">
        <Header actionButton={logoutButton} />

        <main className="flex flex-1 flex-col py-12 px-6 md:px-10 transition-colors duration-200">
             <div className="mb-8">
                  <h1 className="text-[#0d121b] dark:text-white tracking-tight text-[32px] font-bold leading-tight pb-2">My Orders</h1>
                  <p className="text-[#4c669a] dark:text-gray-400 text-base font-normal leading-normal">
                      Track your past purchases.
                  </p>
             </div>

             {error && (
                <div className="mb-6 p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
                    {error}
                </div>
             )}

             {loading ? (
                 <div className="flex justify-center items-center py-20">
                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                 </div>
             ) : orders.length === 0 ? (
                 <div className="text-center py-20 bg-white dark:bg-[#1a212e] rounded-xl border border-[#e7ebf3] dark:border-gray-800">
                      <span className="material-symbols-outlined text-4xl text-gray-400 mb-3">shopping_bag</span>
                      <p className="text-gray-500 dark:text-gray-400 text-lg">You haven't placed any orders yet.</p>
                 </div>
             ) : (
                 <div className="space-y-4">
                     {orders.map((order) => (
                         <div key={order.id} className="bg-white dark:bg-[#1a212e] rounded-xl shadow-sm border border-[#e7ebf3] dark:border-gray-800 overflow-hidden hover:shadow-md transition-all duration-200">
                             <div 
                                className="p-5 flex flex-wrap gap-4 justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                                onClick={() => toggleOrderDetails(order.id)}
                            >
                                 <div className="flex gap-4 items-center">
                                     <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                         <span className="material-symbols-outlined">receipt_long</span>
                                     </div>
                                     <div>
                                         <h3 className="text-lg font-bold text-[#0d121b] dark:text-white">Order #{order.id}</h3>
                                         <p className="text-sm text-[#4c669a] dark:text-gray-400">
                                            {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                                         </p>
                                     </div>
                                 </div>
                                 
                                 <div className="flex gap-6 items-center">
                                     <div className="text-right">
                                         <p className="text-sm text-[#4c669a] dark:text-gray-400">Total</p>
                                         <p className="text-lg font-bold text-[#0d121b] dark:text-white">${order.totalAmount.toFixed(2)}</p>
                                     </div>
                                     <div className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700'}`}>
                                         {order.status}
                                     </div>
                                     <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${expandedOrderId === order.id ? 'rotate-180' : ''}`}>expand_more</span>
                                 </div>
                             </div>

                             <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${expandedOrderId === order.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                 <div className="overflow-hidden">
                                     <div className="p-5 pt-0 border-t border-[#e7ebf3] dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20">
                                         <h4 className="text-sm font-bold text-[#4c669a] dark:text-gray-400 mb-3 mt-4 uppercase tracking-wider">Order Items</h4>
                                         <div className="space-y-3">
                                             {order.items.map((item, idx) => (
                                                 <div key={idx} className="flex justify-between items-center p-3 bg-white dark:bg-[#1a212e] rounded-lg border border-[#e7ebf3] dark:border-gray-800">
                                                     <div className="flex items-center gap-3">
                                                         <span className="material-symbols-outlined text-gray-400">inventory_2</span>
                                                         <span className="font-medium text-[#0d121b] dark:text-white">{item.productName}</span>
                                                         <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">x{item.quantity}</span>
                                                     </div>
                                                     <span className="font-medium text-[#0d121b] dark:text-white">${item.price.toFixed(2)}</span>
                                                 </div>
                                             ))}
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
             )}
        </main>
      </div>
    </div>
  );
}

export default Orders;
