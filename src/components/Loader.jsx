import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ setLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 800); // wait a bit before fading out completely
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 1; // random increments for hacking feel
      });
    }, 150);

    return () => clearInterval(interval);
  }, [setLoading]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-white font-mono overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent2/10 via-background to-background" />

      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-white">
            AC<span className="text-accent1">.</span>
          </h1>
          <motion.div 
            animate={{ left: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-1 bg-accent1 shadow-[0_0_8px_rgba(0,240,255,0.8)]" 
          />
        </motion.div>

        <div className="w-full">
          <div className="flex justify-between text-xs text-gray-500 mb-2 uppercase tracking-widest">
            <span>System Payload</span>
            <span className="text-accent1">{progress > 100 ? 100 : progress}%</span>
          </div>
          
          <div className="h-px w-full bg-white/10 relative overflow-hidden">
            <motion.div 
              style={{ width: `${progress}%` }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent1 to-accent2 shadow-[0_0_10px_rgba(0,240,255,0.5)]"
            />
          </div>
          
          <div className="mt-4 text-xs text-gray-400 min-h-[20px] flex items-center justify-center space-x-1">
             {progress < 30 ? (
               <span className="animate-pulse">Establishing secure connection...</span>
             ) : progress < 60 ? (
               <span className="animate-pulse">Bypassing security protocols...</span>
             ) : progress < 90 ? (
               <span className="animate-pulse">Loading visual components...</span>
             ) : (
               <span className="text-accent2">Access Granted.</span>
             )}
          </div>
        </div>
      </div>
      
      {/* Decorative Grid items for loader */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-white/20" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-white/20" />
    </motion.div>
  );
};

export default Loader;
