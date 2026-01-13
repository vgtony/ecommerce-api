import { useState } from 'react';
import api from '../api/axios';

function ProductCreateModal({ isOpen, onClose, onProductCreated }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
        const payload = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            categoryId: 1 // Forced to 1
        };
        
        await api.post('/products', payload);
        
        // Reset and notify
        setFormData({
            name: '',
            description: '',
            price: '',
            stock: '',
            categoryId: 1
        });
        setImagePreview(null);
        if (onProductCreated) onProductCreated();
        onClose();
    } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to create product.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 backdrop-blur-sm p-4 md:inset-0 h-full max-h-full">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="relative bg-white dark:bg-[#1a212e] rounded-xl shadow-2xl border border-[#cfd7e7] dark:border-gray-700 transition-colors duration-200">
          <button 
            type="button" 
            className="absolute top-4 right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
            <span className="sr-only">Close modal</span>
          </button>
          
          <div className="p-6 md:p-8">
            <div className="text-center mb-6">
              <h2 className="text-[#0d121b] dark:text-white tracking-tight text-2xl font-bold leading-tight pb-2">Add New Product</h2>
              <p className="text-[#4c669a] dark:text-gray-400 text-sm font-normal">Expand your inventory with ease.</p>
            </div>

            {error && (
              <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                {error}
              </div>
            )}

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-2">
                <span className="text-[#0d121b] dark:text-gray-200 text-sm font-medium">Product Name</span>
                <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input w-full rounded-lg text-[#0d121b] dark:text-white border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-[#101622] focus:border-primary focus:ring-1 focus:ring-primary h-11 px-4 text-sm placeholder:text-[#4c669a] dark:placeholder:text-gray-500 transition-colors duration-200" 
                    placeholder="e.g. Wireless Headphones" 
                    type="text"
                    required
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[#0d121b] dark:text-gray-200 text-sm font-medium">Description</span>
                <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-input w-full rounded-lg text-[#0d121b] dark:text-white border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-[#101622] focus:border-primary focus:ring-1 focus:ring-primary min-h-[100px] p-4 text-sm placeholder:text-[#4c669a] dark:placeholder:text-gray-500 resize-y transition-colors duration-200" 
                    placeholder="Describe the key features..."
                ></textarea>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-[#0d121b] dark:text-gray-200 text-sm font-medium">Price ($)</span>
                  <input 
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-input w-full rounded-lg text-[#0d121b] dark:text-white border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-[#101622] focus:border-primary focus:ring-1 focus:ring-primary h-11 px-4 text-sm placeholder:text-[#4c669a] dark:placeholder:text-gray-500 transition-colors duration-200" 
                    placeholder="0.00" 
                    type="number" 
                    step="0.01"
                    required
                  />
                </label>
                 <label className="flex flex-col gap-2">
                  <span className="text-[#0d121b] dark:text-gray-200 text-sm font-medium">Stock Quantity</span>
                  <input 
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="form-input w-full rounded-lg text-[#0d121b] dark:text-white border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-[#101622] focus:border-primary focus:ring-1 focus:ring-primary h-11 px-4 text-sm placeholder:text-[#4c669a] dark:placeholder:text-gray-500 transition-colors duration-200" 
                    placeholder="100" 
                    type="number"
                  />
                </label>
              </div>

               <label className="flex flex-col gap-2">
                <span className="text-[#0d121b] dark:text-gray-200 text-sm font-medium">Product Image</span>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="modal-dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#cfd7e7] dark:border-gray-700 border-dashed rounded-lg cursor-pointer bg-[#f8f9fc] dark:bg-[#101622] hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-800 transition-colors duration-200">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="h-20 object-contain" />
                            ) : (
                                <>
                                <span className="material-symbols-outlined text-3xl text-gray-400 mb-2">cloud_upload</span>
                                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                                </>
                            )}
                        </div>
                        <input id="modal-dropzone-file" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                    </label>
                </div> 
              </label>

              <button 
                className="mt-2 w-full text-white bg-primary hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(19,91,236,0.6)] hover:-translate-y-0.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-base px-5 py-3 text-center transition-all duration-300 ease-out shadow-lg disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                 {loading ? 'Creating...' : 'Create Product'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCreateModal;
