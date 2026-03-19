import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);



    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Projects', path: '/projects' },
        { name: 'Skills', path: '/skills' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-white/10 dark:bg-slate-900/10 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            Abhinav
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `text-sm font-medium transition-colors duration-200 hover:text-blue-500 ${isActive
                                            ? 'text-blue-600 dark:text-blue-400'
                                            : 'text-gray-700 dark:text-gray-300'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}

                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                                aria-label="Toggle Theme"
                            >
                                {theme === 'dark' ? (
                                    <FaSun className="text-yellow-400 text-lg" />
                                ) : (
                                    <FaMoon className="text-slate-700 text-lg" />
                                )}
                            </button>

                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden gap-2 items-center flex-shrink-0">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
                        >
                            {theme === 'dark' ? (
                                <FaSun className="text-yellow-400 text-lg" />
                            ) : (
                                <FaMoon className="text-slate-700 text-lg" />
                            )}
                        </button>



                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-500 focus:outline-none flex-shrink-0"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <FaTimes className="block h-5 w-5" /> : <FaBars className="block h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive
                                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
