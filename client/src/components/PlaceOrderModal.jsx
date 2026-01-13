function PlaceOrderModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 backdrop-blur-sm p-4 md:inset-0 h-full max-h-full">
      <div className="relative w-full max-w-lg max-h-full">
        <div className="relative bg-white dark:bg-[#1a212e] rounded-xl shadow-2xl border border-[#cfd7e7] dark:border-gray-700 transition-colors duration-200">
          <button 
            type="button" 
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
            <span className="sr-only">Close modal</span>
          </button>
          
          <div className="p-6 md:p-8 space-y-6">
            <div className="text-center"> 
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <span className="material-symbols-outlined text-3xl text-primary">shopping_cart_checkout</span>
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Place Order</h3>
                <p className="text-gray-500 dark:text-gray-400">Review and confirm your purchase.</p>
            </div>
            
            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-[#101622] rounded-lg transition-colors duration-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Wireless Headphones</p>
                            <p className="text-xs text-gray-500">Qty: 1</p>
                        </div>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white">$129.99</p>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shipping Address</label>
                    <textarea className="form-input w-full rounded-lg text-sm text-[#0d121b] dark:text-white border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-[#101622] focus:border-primary focus:ring-1 focus:ring-primary h-20 p-2.5 transition-colors duration-200" placeholder="123 Main St, New York, NY..."></textarea>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
                    <span className="text-base font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="text-xl font-bold text-primary">$129.99</span>
                </div>
            </div>

            <button 
                className="w-full text-white bg-primary hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(19,91,236,0.6)] hover:-translate-y-0.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-base px-5 py-3 text-center transition-all duration-300 ease-out shadow-lg"
                onClick={() => { alert('Order Placed!'); onClose(); }}
            >
                Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderModal;
