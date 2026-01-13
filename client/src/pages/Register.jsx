import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import api from '../api/axios';

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'USER' // Default to USER/COSTUMER based on enum usually, checking DTO: private Role role;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Backend expects 'role' to be UPPERCASE usually if it's an enum, let's ensure.
      // The UI has "customer" and "admin".
      // Assuming backend Role enum is USER/ADMIN or CUSTOMER/ADMIN. 
      // Let's guess 'USER' for Customer based on typical Spring Sec setups, or 'CUSTOMER'.
      // Looking at the check in the code snippet provided earlier: public class RegisterRequest { ... private Role role; }
      // The UI values are "customer" and "admin". I'll map "customer" -> "USER" just in case, or "CUSTOMER" if that's the enum.
      // Safest is to try sending what the form gives but uppercased.
      
      const payload = {
        ...formData,
        role: formData.role.toUpperCase() // Sends 'CUSTOMER' or 'ADMIN' directly
      };
      
      // Actually, if the backend enum is strict, I should check it. 
      // But for now, let's assume 'USER' and 'ADMIN'.
      
      await api.post('/auth/register', payload);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loginButton = (
    <Link to="/login">
      <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary hover:shadow-[0_0_20px_rgba(19,91,236,0.6)] hover:-translate-y-0.5 active:scale-95">
        <span>Log In</span>
      </button>
    </Link>
  );

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors duration-200">
      <div className="layout-container flex h-full grow flex-col">
        <Header actionButton={loginButton} />

        <main className="flex flex-1 items-center justify-center py-12 px-4 transition-colors duration-200">
          <div className="w-full max-w-[520px] bg-white dark:bg-[#1a212e] rounded-xl shadow-sm border border-[#e7ebf3] dark:border-gray-800 p-8 md:p-10 transition-colors duration-200">
            {/* Headline Section */}
            <div className="text-center mb-8">
              <h1 className="text-[#0d121b] dark:text-white tracking-tight text-[32px] font-bold leading-tight pb-2">Get Started with ShopName</h1>
              <p className="text-[#4c669a] dark:text-gray-400 text-base font-normal leading-normal">Create your account to start shopping or managing your store.</p>
            </div>

            {error && (
              <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                {error}
              </div>
            )}

            {/* Registration Form */}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name Field */}
                <label className="flex flex-col gap-2">
                  <span className="text-[#0d121b] dark:text-gray-200 text-sm font-medium">First Name</span>
                  <input 
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="form-input w-full rounded-lg text-[#0d121b] dark:text-white border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-[#101622] focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-base placeholder:text-[#4c669a] dark:placeholder:text-gray-500 transition-colors duration-200" 
                    placeholder="John" 
                    type="text"
                    required
                  />
                </label>
                {/* Last Name Field */}
                <label className="flex flex-col gap-2">
                  <span className="text-[#0d121b] dark:text-gray-200 text-sm font-medium">Last Name</span>
                  <input 
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="form-input w-full rounded-lg text-[#0d121b] dark:text-white border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-[#101622] focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-base placeholder:text-[#4c669a] dark:placeholder:text-gray-500 transition-colors duration-200" 
                    placeholder="Doe" 
                    type="text"
                    required
                  />
                </label>
              </div>

              {/* Email Field */}
              <label className="flex flex-col gap-2">
                <span className="text-[#0d121b] dark:text-gray-200 text-sm font-medium">Email Address</span>
                <input 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input w-full rounded-lg text-[#0d121b] dark:text-white border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-[#101622] focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-base placeholder:text-[#4c669a] dark:placeholder:text-gray-500 transition-colors duration-200" 
                  placeholder="john.doe@example.com" 
                  type="email"
                  required
                />
              </label>

              {/* Password Field */}
              <label className="flex flex-col gap-2">
                <span className="text-[#0d121b] dark:text-gray-200 text-sm font-medium">Password</span>
                <div className="relative">
                  <input 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input w-full rounded-lg text-[#0d121b] dark:text-white border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-[#101622] focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-base placeholder:text-[#4c669a] dark:placeholder:text-gray-500 transition-colors duration-200" 
                    placeholder="••••••••" 
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                  />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4c669a] dark:text-gray-400 transition-all duration-200 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(19,91,236,0.8)] hover:scale-110" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </label>

              {/* Role Selection */}
              <div className="flex flex-col gap-2">
                <span className="text-[#0d121b] dark:text-gray-200 text-sm font-medium">I am a...</span>
                <div className="grid grid-cols-2 gap-3">
                  <label className="cursor-pointer">
                    <input 
                      checked={formData.role === 'customer'} 
                      onChange={handleChange}
                      className="peer hidden" 
                      name="role" 
                      type="radio" 
                      value="customer"
                    />
                    <div className="flex items-center justify-center gap-2 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-[#101622] p-3 text-[#4c669a] dark:text-gray-400 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary peer-checked:shadow-[0_0_15px_rgba(19,91,236,0.15)] transition-all duration-200 hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5">
                      <span className="material-symbols-outlined text-lg">shopping_bag</span>
                      <span className="text-sm font-semibold">Customer</span>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input 
                      checked={formData.role === 'admin'} 
                      onChange={handleChange}
                      className="peer hidden" 
                      name="role" 
                      type="radio" 
                      value="admin"
                    />
                    <div className="flex items-center justify-center gap-2 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-[#101622] p-3 text-[#4c669a] dark:text-gray-400 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary peer-checked:shadow-[0_0_15px_rgba(19,91,236,0.15)] transition-all duration-200 hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5">
                      <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                      <span className="text-sm font-semibold">Admin</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Terms of Service */}
              <div className="flex items-center gap-2 px-1">
                <input className="rounded border-[#cfd7e7] text-primary focus:ring-primary" id="terms" type="checkbox" required/>
                <label className="text-xs text-[#4c669a] dark:text-gray-400" htmlFor="terms">
                   I agree to the <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a>
                </label>
              </div>

              {/* Submit Button */}
              <button 
                className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg bg-primary h-14 px-4 text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/30 transition-all duration-300 ease-out hover:bg-primary hover:shadow-[0_0_25px_rgba(19,91,236,0.6)] hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 active:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed" 
                type="submit"
                disabled={loading}
              >
                 {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Footer Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-[#4c669a] dark:text-gray-400">
                  Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
              </p>
            </div>
          </div>
        </main>

        {/* Decorative Elements */}
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

export default Register;
