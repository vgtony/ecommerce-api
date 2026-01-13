import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import api from '../api/axios';

function ProductCreate() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '', // Not sent to backend based on DTO, but kept for UI
    categoryId: 1 // Hardcoded alias for now as needed by DTO
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


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
            categoryId: parseInt(formData.categoryId)
        };
        
        await api.post('/products', payload);
        alert('Product created successfully!');
        // Reset form or navigate
        setFormData({
            name: '',
            description: '',
            price: '',
            stock: '',
            categoryId: 1
        });
        setImagePreview(null);
    } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to create product.');
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

        <main className="flex flex-1 items-center justify-center py-12 px-4 transition-colors duration-200">
          <div className="w-full max-w-[640px] bg-white dark:bg-[#1a212e] rounded-xl shadow-sm border border-[#e7ebf3] dark:border-gray-800 p-8 md:p-10 transition-colors duration-200">
            <div className="text-center mb-8">
              <h1 className="text-[#0d121b] dark:text-white tracking-tight text-[32px] font-bold leading-tight pb-2">Add New Product</h1>
              <p className="text-[#4c669a] dark:text-gray-400 text-base font-normal leading-normal">Expand your inventory with ease.</p>
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
                    className="form-input w-full rounded-lg text-[#0d121b] dark:text-white border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-[#101622] focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-base placeholder:text-[#4c669a] dark:placeholder:text-gray-500 transition-colors duration-200" 
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
                    className="form-input w-full rounded-lg text-[#0d121b] dark:text-white border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-[#101622] focus:border-primary focus:ring-1 focus:ring-primary min-h-[120px] p-4 text-base placeholder:text-[#4c669a] dark:placeholder:text-gray-500 resize-y transition-colors duration-200" 
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
                    className="form-input w-full rounded-lg text-[#0d121b] dark:text-white border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-[#101622] focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-base placeholder:text-[#4c669a] dark:placeholder:text-gray-500 transition-colors duration-200" 
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
                    className="form-input w-full rounded-lg text-[#0d121b] dark:text-white border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-[#101622] focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-base placeholder:text-[#4c669a] dark:placeholder:text-gray-500 transition-colors duration-200" 
                    placeholder="100" 
                    type="number"
                  />
                </label>
              </div>

               <label className="flex flex-col gap-2">
                <span className="text-[#0d121b] dark:text-gray-200 text-sm font-medium">Product Image</span>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-[#cfd7e7] dark:border-gray-700 border-dashed rounded-lg cursor-pointer bg-[#f8f9fc] dark:bg-[#101622] hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-800 transition-colors duration-200">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="h-28 object-contain" />
                            ) : (
                                <>
                                <span className="material-symbols-outlined text-3xl text-gray-400 mb-2">cloud_upload</span>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </>
                            )}
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                    </label>
                </div> 
              </label>

              <button 
                className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg bg-primary h-14 px-4 text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/30 transition-all duration-300 ease-out hover:bg-primary hover:shadow-[0_0_25px_rgba(19,91,236,0.6)] hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 active:shadow-primary/20 disabled:opacity-50" 
                type="submit"
                disabled={loading}
              >
                 {loading ? 'Creating...' : 'Create Product'}
              </button>
            </form>
          </div>
        </main>
         <div className="fixed bottom-10 right-10 hidden lg:block opacity-10">
          <img alt="Abstract background pattern" className="w-64 h-64 rounded-full blur-3xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtOjisHspveMuWkbmcpPcX3W145lymI-QrwSjXYvmk81KxbXcpYBbmHhScZanK-P3ubvYhK2zMnU0m823BU1SD7VW66gkh7hwXJIhvcx2PEgv3WaKt7Pd4xfVbbIWQjc0Isxh0EvDjoZv7TMunsV8HrgbTZ_ZYV1LF7Hk85f1wOT_tK66o1qbycRUxOjGWzuTjRpPmEC76qe1AP_g4-351KWK_ctnf9e5kzf078LdbDJU8EC7sC_eBDcD5c-GsihYzG_WuISWWV21K"/>
        </div>
        <div className="fixed top-20 left-10 hidden lg:block opacity-10">
          <div className="w-48 h-48 bg-primary rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}

export default ProductCreate;
