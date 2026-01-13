import { useState } from 'react';

function App() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7ebf3] dark:border-b-gray-800 px-6 md:px-10 py-3 bg-white dark:bg-[#1a212e]">
          <div className="flex items-center gap-4 text-[#0d121b] dark:text-white">
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">ShopName</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="hidden md:flex items-center gap-9">
              <a className="text-[#0d121b] dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Home</a>
              <a className="text-[#0d121b] dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Features</a>
              <a className="text-[#0d121b] dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Help</a>
            </div>
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
              <span>Log In</span>
            </button>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center py-12 px-4">
          <div className="w-full max-w-[520px] bg-white dark:bg-[#1a212e] rounded-xl shadow-sm border border-[#e7ebf3] dark:border-gray-800 p-8 md:p-10">
            {/* Headline Section */}
            <div className="text-center mb-8">
              <h1 className="text-[#0d121b] dark:text-white tracking-tight text-[32px] font-bold leading-tight pb-2">Get Started with ShopName</h1>
              <p className="text-[#4c669a] dark:text-gray-400 text-base font-normal leading-normal">Create your account to start shopping or managing your store.</p>
            </div>

            {/* Registration Form */}
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name Field */}
                <label className="flex flex-col gap-2">
                  <span className="text-[#0d121b] dark:text-gray-200 text-sm font-medium">First Name</span>
                  <input className="form-input w-full rounded-lg text-[#0d121b] dark:text-white border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-[#101622] focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-base placeholder:text-[#4c669a] dark:placeholder:text-gray-500" placeholder="John" type="text"/>
                </label>
                {/* Last Name Field */}
                <label className="flex flex-col gap-2">
                  <span className="text-[#0d121b] dark:text-gray-200 text-sm font-medium">Last Name</span>
                  <input className="form-input w-full rounded-lg text-[#0d121b] dark:text-white border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-[#101622] focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-base placeholder:text-[#4c669a] dark:placeholder:text-gray-500" placeholder="Doe" type="text"/>
                </label>
              </div>

              {/* Email Field */}
              <label className="flex flex-col gap-2">
                <span className="text-[#0d121b] dark:text-gray-200 text-sm font-medium">Email Address</span>
                <input className="form-input w-full rounded-lg text-[#0d121b] dark:text-white border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-[#101622] focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-base placeholder:text-[#4c669a] dark:placeholder:text-gray-500" placeholder="john.doe@example.com" type="email"/>
              </label>

              {/* Password Field */}
              <label className="flex flex-col gap-2">
                <span className="text-[#0d121b] dark:text-gray-200 text-sm font-medium">Password</span>
                <div className="relative">
                  <input 
                    className="form-input w-full rounded-lg text-[#0d121b] dark:text-white border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-[#101622] focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-base placeholder:text-[#4c669a] dark:placeholder:text-gray-500" 
                    placeholder="••••••••" 
                    type={showPassword ? "text" : "password"}
                  />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4c669a] dark:text-gray-400" 
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
                    <input defaultChecked className="peer hidden" name="role" type="radio" value="customer"/>
                    <div className="flex items-center justify-center gap-2 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-[#101622] p-3 text-[#4c669a] dark:text-gray-400 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all">
                      <span className="material-symbols-outlined text-lg">shopping_bag</span>
                      <span className="text-sm font-semibold">Customer</span>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input className="peer hidden" name="role" type="radio" value="admin"/>
                    <div className="flex items-center justify-center gap-2 rounded-lg border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-[#101622] p-3 text-[#4c669a] dark:text-gray-400 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all">
                      <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                      <span className="text-sm font-semibold">Admin</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Terms of Service */}
              <div className="flex items-center gap-2 px-1">
                <input className="rounded border-[#cfd7e7] text-primary focus:ring-primary" id="terms" type="checkbox"/>
                <label className="text-xs text-[#4c669a] dark:text-gray-400" htmlFor="terms">
                   I agree to the <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a>
                </label>
              </div>

              {/* Submit Button */}
              <button className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg bg-primary h-14 px-4 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 shadow-md shadow-primary/20 transition-all" type="submit">
                 Create Account
              </button>
            </form>

            {/* Footer Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-[#4c669a] dark:text-gray-400">
                  Already have an account? <a className="text-primary font-bold hover:underline" href="#">Log in</a>
              </p>
            </div>
          </div>
        </main>

        {/* Decorative Elements (Mobile hidden) */}
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

export default App;
