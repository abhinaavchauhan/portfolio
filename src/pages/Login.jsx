import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaUserShield } from 'react-icons/fa';

const Login = () => {
    const [isAdminLogin, setIsAdminLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        // Mock Authentication Logic
        if (isAdminLogin) {
            if (email === 'admin@example.com' && password === 'admin123') {
                login({ email, role: 'admin', name: 'Admin User' });
                toast.success("Welcome back, Admin!");
                navigate('/admin');
            } else {
                toast.error("Invalid Admin credentials");
            }
        } else {
            // User Login (simulate checking DB)
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const foundUser = existingUsers.find(u => u.email === email && u.password === password);

            if (foundUser) {
                login({ ...foundUser, role: 'user' });
                toast.success("Login successful!");
                navigate('/');
            } else {
                // Fallback for demo/testing without signup
                // Check if it's a known demo user or just allow entry with generated name
                // To be safe and show the issue is fixed, let's prefer the DB lookup. 
                // But for "lazy" testing, if they didn't sign up, we can still allow logic but maybe warn.
                // However, the user specifically wants their name to show.
                // Let's assume if they don't exist in DB, we use the fallback BUT looking at the prompt, 
                // the user implies they DID sign up ("jo sign up karne time fill kiya tha").
                // So if I fix the DB lookup, it should work for them IF they signup again.
                // Since I can't migrate their existing session state (which is just 'user' in localstorage),
                // I will add the lookup logic. If they didn't signup in THIS session's 'users' db, 
                // we might still fall back to the email split, but at least for NEW signups/logins it will work.

                // Better approach: If not found in DB, just use the old fallback but maybe try to be smarter? 
                // No, sticking to the fallback is fine for generic testing, but priority is DB.

                const name = email.split('@')[0];
                login({ email, role: 'user', name: name });
                toast.success("Login successful! (Demo Mode)");
                navigate('/');
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[80vh]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700"
            >
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 text-2xl">
                        {isAdminLogin ? <FaUserShield /> : <FaUser />}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {isAdminLogin ? 'Admin Login' : 'User Login'}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Enter your credentials to access the account.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-colors text-gray-900 dark:text-white"
                                placeholder="yours@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-colors text-gray-900 dark:text-white"
                                placeholder="********"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                    >
                        {isAdminLogin ? 'Access Dashboard' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={() => setIsAdminLogin(!isAdminLogin)}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        {isAdminLogin ? 'Login as User' : 'Login as Admin'}
                    </button>
                </div>

                {!isAdminLogin && (
                    <div className="mt-4 text-center text-sm text-gray-500">
                        Don't have an account? <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">Sign up</Link>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Login;
