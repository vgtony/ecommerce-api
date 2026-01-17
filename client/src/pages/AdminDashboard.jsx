import { Link } from 'react-router-dom';
import api from '../api/axios';
import Header from '../components/Header';

import UserMenu from '../components/UserMenu';

function AdminDashboard() {
  const logoutButton = <UserMenu />;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors duration-200">
      <div className="layout-container flex h-full grow flex-col">
        <Header actionButton={logoutButton} />

        <main className="flex flex-1 flex-col py-12 px-6 md:px-10 transition-colors duration-200 gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-[#0d121b] dark:text-white tracking-tight text-[32px] font-bold leading-tight">Admin Dashboard</h1>
                <p className="text-[#4c669a] dark:text-gray-400 text-base font-normal">Overview of your store performance.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Sales', value: '$12,450', icon: 'payments', trend: '+12%' },
                    { label: 'Active Orders', value: '45', icon: 'shopping_bag', trend: '+5%' },
                    { label: 'Total Products', value: '124', icon: 'inventory_2', trend: 'Stable' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-[#1a212e] p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                <span className="material-symbols-outlined">{stat.icon}</span>
                            </div>
                            <span className="text-sm font-medium text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">{stat.trend}</span>
                        </div>
                        <h3 className="text-3xl font-bold text-[#0d121b] dark:text-white mb-1">{stat.value}</h3>
                        <p className="text-sm text-[#4c669a] dark:text-gray-400">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <Link to="/products" className="group block bg-gradient-to-br from-primary to-blue-600 rounded-xl p-8 text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-2xl font-bold">Manage Products</span>
                        <span className="material-symbols-outlined text-4xl opacity-50 group-hover:opacity-100 transition-opacity">inventory</span>
                    </div>
                    <p className="text-white/80">Add, edit, or remove products from your catalog.</p>
                 </Link>

                 <div className="bg-white dark:bg-[#1a212e] rounded-xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xl font-bold text-[#0d121b] dark:text-white">Bulk Upload</span>
                            <span className="material-symbols-outlined text-4xl text-green-500 opacity-50">upload_file</span>
                        </div>
                        <p className="text-sm text-[#4c669a] dark:text-gray-400 mb-4">Upload a CSV file to add products in bulk.</p>
                        <p className="text-xs text-gray-400 mb-4 font-mono bg-gray-50 dark:bg-gray-900 p-2 rounded">format: name, description, price, category, imageUrl</p>
                    </div>
                    <label className="cursor-pointer bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-bold py-3 px-4 rounded-lg text-center hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">cloud_upload</span>
                        <span>Select CSV</span>
                         <input 
                            type="file" 
                            accept=".csv" 
                            className="hidden" 
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                
                                const formData = new FormData();
                                formData.append('file', file);
                                
                                try {
                                    await api.post('/products/upload', formData, {
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                        },
                                    });
                                    alert('Products uploaded successfully!');
                                } catch (err) {
                                    console.error(err);
                                    alert('Failed to upload.');
                                }
                            }}
                        />
                    </label>
                 </div>
                 
                 <div className="bg-white dark:bg-[#1a212e] rounded-xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-center items-center text-center opacity-60">
                    <span className="material-symbols-outlined text-4xl text-gray-400 mb-4">analytics</span>
                    <h3 className="text-xl font-bold text-[#0d121b] dark:text-white">Analytics Report</h3>
                    <p className="text-sm text-[#4c669a] dark:text-gray-400 mt-2">Coming Soon</p>
                 </div>
            </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
