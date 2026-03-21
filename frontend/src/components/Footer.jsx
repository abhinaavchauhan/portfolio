import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800 py-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            Abhinav Chauhan
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Building digital experiences that matter.
                        </p>
                    </div>

                    <div className="flex space-x-6">
                        <a href="https://github.com/abhinaavchauhan" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <FaGithub size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/abhinav-kumar-singh-74a477237?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <FaLinkedin size={24} />
                        </a>
                        <a href="https://instagram.com/abhinaavchauhan" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                            <FaInstagram size={24} />
                        </a>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
