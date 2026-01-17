import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';
import Landing from './pages/Landing';
import ProductDetails from './pages/ProductDetails';
import PlaceOrderModal from './components/PlaceOrderModal';
import AdminDashboard from './pages/AdminDashboard';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import Orders from './pages/Orders';

function App() {
  const location = useLocation();
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  
  // Show sidebar only if logged in as CUSTOMER
  const showSidebar = token && role === 'CUSTOMER' || role === 'USER'; // Allow USER just in case
  
  // Dynamic padding if sidebar is visible
  const contentStyle = showSidebar ? { paddingRight: '320px' } : {};

  return (
    <CartProvider>
      <div className="min-h-screen w-full" style={contentStyle}>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            } />
            <Route path="/products/:id" element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />
            
            {/* Checkout Route to demonstrate the Place Order Modal */}
            <Route path="/checkout" element={
              <ProtectedRoute>
                <CheckoutDemo />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
          {showSidebar && <CartSidebar />}
      </div>
    </CartProvider>
  );
}


// Wrapper to display the modal as a standalone page for demonstration
function CheckoutDemo() {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuAtOjisHspveMuWkbmcpPcX3W145lymI-QrwSjXYvmk81KxbXcpYBbmHhScZanK-P3ubvYhK2zMnU0m823BU1SD7VW66gkh7hwXJIhvcx2PEgv3WaKt7Pd4xfVbbIWQjc0Isxh0EvDjoZv7TMunsV8HrgbTZ_ZYV1LF7Hk85f1wOT_tK66o1qbycRUxOjGWzuTjRpPmEC76qe1AP_g4-351KWK_ctnf9e5kzf078LdbDJU8EC7sC_eBDcD5c-GsihYzG_WuISWWV21K')] bg-cover bg-center transition-colors duration-200">
      <div className="text-center p-6 bg-white/80 dark:bg-[#1a212e]/90 backdrop-blur-md rounded-xl border border-white/20">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Checkout Demo</h2>
        <button 
          onClick={() => setIsOpen(true)}
          className="px-6 py-2 bg-primary text-white rounded-lg shadow-lg hover:shadow-primary/50 hover:-translate-y-0.5 transition-all"
        >
          Open Place Order Modal
        </button>
      </div>
      <PlaceOrderModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default App;
