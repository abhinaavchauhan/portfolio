import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaProjectDiagram, FaEnvelope, FaHome } from 'react-icons/fa';

const AdminLayout = () => {

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: FaTachometerAlt, end: true },
        { name: 'Projects', path: '/admin/projects', icon: FaProjectDiagram },
        { name: 'Messages', path: '/admin/messages', icon: FaEnvelope },
    ];

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-800 shadow-xl hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Admin Panel</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Welcome, Admin</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                                }`
                            }
                        >
                            <item.icon />
                            <span className="font-medium">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
                    <NavLink to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">
                        <FaHome />
                        <span className="font-medium">Back to Home</span>
                    </NavLink>
                </div>
            </aside>

            {/* Mobile Header (visible on small screens) */}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
