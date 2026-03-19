import React, { useState, useEffect } from 'react';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Hide scrollbar while loading
        document.body.style.overflow = 'hidden';

        // Fake progress loading (since it's a visual effect)
        let currentProgress = 0;
        const totalDuration = 500; // ms
        const updateInterval = 20; // update frequency
        const step = 100 / (totalDuration / updateInterval);

        const progressTimer = setInterval(() => {
            currentProgress += step + (Math.random() * 2 - 0.5); // Add slight randomness for a 'hacking' feel
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(progressTimer);

                // Add a small delay at 100% before starting the exit animation
                setTimeout(() => {
                    // Start fade out
                    setIsLoading(false);
                }, 150);
            }
            // Use Math.min to ensure we don't exceed 100 and floor it to an integer
            setProgress(Math.floor(Math.min(currentProgress, 100)));
        }, updateInterval);

        return () => {
            clearInterval(progressTimer);
        };
    }, []);

    // Unlock body scroll after the exit transition completes
    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => {
                document.body.style.overflow = 'unset';
            }, 300); // Wait for CSS transition duration (.duration-700)
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    return (
        <div
            className={`fixed inset-0 z-[99999] bg-[#0a0f1c] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111827] via-[#0a0f1c] to-[#050810] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${isLoading ? 'opacity-100 scale-100 backdrop-blur-none' : 'opacity-0 scale-105 backdrop-blur-sm pointer-events-none'
                }`}
        >

            {/* Animated Background Grid (Cyberpunk/Security vibe) */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1c] to-transparent pointer-events-none" />
            </div>

            {/* Glowing Particle effect overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />
            </div>

            <div className="w-full max-w-sm px-6 relative z-10 flex flex-col items-center justify-center">

                {/* Rotating Cyber-Ring Centerpiece */}
                <div className="relative w-32 h-32 mb-12 flex items-center justify-center">

                    {/* Outer slow ring */}
                    <svg className="absolute w-full h-full animate-[spin_6s_linear_infinite] opacity-30" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" strokeDasharray="4 8" />
                    </svg>

                    {/* Inner fast ring with electric glow */}
                    <svg className="absolute w-[85%] h-[85%] animate-[spin_3s_linear_infinite_reverse]" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.6))' }}>
                        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400" strokeDasharray="80 140" strokeLinecap="round" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-500" strokeDasharray="30 40 10 20" strokeLinecap="round" />
                    </svg>

                    {/* Progress Text inside the ring */}
                    <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-2xl font-mono text-cyan-300 tracking-wider filter drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                            {progress.toString().padStart(3, '0')}
                        </span>
                        <span className="text-[10px] font-mono text-blue-400/80 tracking-widest mt-0.5">
                            SYS.LOAD
                        </span>
                    </div>
                </div>

                {/* Name & Title */}
                <div className="text-center relative w-full mb-8">
                    {/* Animated scanning line behind text */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                        <div className="w-full h-[2px] bg-cyan-400 animate-[scan_2s_ease-in-out_infinite]" />
                    </div>

                    <h1 className="text-xl sm:text-2xl font-semibold tracking-[0.25em] uppercase bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent filter drop-shadow-[0_0_12px_rgba(34,211,238,0.3)] mb-2">
                        Abhinav Chauhan
                    </h1>
                    <h2 className="text-xs sm:text-sm font-mono tracking-[0.6em] uppercase text-blue-500/70">
                        Portfolio
                    </h2>
                </div>

                {/* Cyberpunk Progress Bar */}
                <div className="w-full relative">
                    {/* Progress Bar Container */}
                    <div className="w-full h-[3px] bg-[#1a2333]/80 rounded-full overflow-hidden border border-blue-900/30 p-[1px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
                        {/* the Fill */}
                        <div
                            className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-white rounded-full relative transition-all duration-75 ease-out shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                            style={{ width: `${progress}%` }}
                        >
                            {/* Glowing head of the progress bar */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[4px] h-[8px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                        </div>
                    </div>
                </div>

            </div>

            {/* Global Styles for Custom Animations */}
            <style jsx="true">{`
                @keyframes scan {
                    0% { transform: translateY(-10px); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(40px); opacity: 0; }
                }
            `}</style>

        </div>
    );
};

export default Preloader;
