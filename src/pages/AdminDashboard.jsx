import React from 'react';
import { FaProjectDiagram, FaEnvelope, FaEye, FaCodeBranch } from 'react-icons/fa';

const AdminDashboard = () => {
    const stats = [
        { title: 'Total Projects', value: '12', icon: FaProjectDiagram, color: 'bg-blue-500' },
        { title: 'New Messages', value: '5', icon: FaEnvelope, color: 'bg-green-500' },
        { title: 'Profile Views', value: '1,234', icon: FaEye, color: 'bg-purple-500' },
        { title: 'Skills Listed', value: '24', icon: FaCodeBranch, color: 'bg-orange-500' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                        </div>
                        <div className={`w-12 h-12 rounded-full ${stat.color} bg-opacity-10 flex items-center justify-center text-${stat.color.replace('bg-', '')}`}>
                            <stat.icon size={24} className="text-white" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity Mockup */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Recent Messages</h3>
                    <ul className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <li key={i} className="flex items-center gap-4 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700"></div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800 dark:text-white">User Name {i}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Project inquiry...</p>
                                </div>
                                <span className="ml-auto text-xs text-gray-400">2h ago</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
