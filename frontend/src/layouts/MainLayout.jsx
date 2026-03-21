import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
            <Navbar />
            <main className="flex-grow pt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
