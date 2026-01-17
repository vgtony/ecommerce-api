import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
      try {
          const savedCart = localStorage.getItem('cart');
          return savedCart ? JSON.parse(savedCart) : [];
      } catch (e) {
          console.error('Failed to load cart from local storage', e);
          return [];
      }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        // Use the freshest stock info from the incoming product object
        const stockLimit = product.stockQuantity !== undefined ? product.stockQuantity : (existing.stockQuantity || 9999);
        
        if (existing.quantity >= stockLimit) {
             alert(`Cannot add more. Only ${stockLimit} items in stock.`);
             return prev;
        }
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1, stockQuantity: stockLimit } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); 
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
        if (item.id === id) {
            const newQty = item.quantity + delta;
            // Fallback to 9999 is dangerous if stock is missing. But we hope it is there.
            // If delta is positive (adding), check limit.
            if (delta > 0 && newQty > (item.stockQuantity !== undefined ? item.stockQuantity : 9999)) {
                 alert(`Cannot add more. Only ${item.stockQuantity} items in stock.`);
                 return item;
            }
            return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
    }));
  };

  const clearCart = () => setCartItems([]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      toggleCart,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
}
