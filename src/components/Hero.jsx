import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaDownload } from 'react-icons/fa';

const Hero = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [delta, setDelta] = useState(150);

    const toRotate = ["Software Developer", "Cybersecurity Enthusiast", "Tech Explorer"];
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [text, delta]);

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(150);
        } else {
            // Reset delta when typing
            if (!isDeleting && delta === period) setDelta(150);
        }
    };

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-slate-950 pt-20 md:pt-0">
            {/* Background Elements */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                    {/* Text Content */}
                    <div className="flex-1 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6 inline-block"
                        >
                            <span className="py-2 px-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide">
                                Welcome to my Portfolio
                            </span>
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                            Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Abhinav Chauhan</span>
                        </h1>

                        <div className="h-12 md:h-16 mb-6">
                            <h2 className="text-2xl md:text-4xl font-medium text-gray-600 dark:text-gray-300">
                                I am a <span className="text-blue-600 dark:text-blue-400 border-r-4 border-blue-600 dark:border-blue-400 pr-1 animate-pulse">{text}</span>
                            </h2>
                        </div>

                        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                            Building secure, scalable, and premium digital experiences. Passionate about coding and cybersecurity.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="flex flex-wrap gap-4 justify-center md:justify-start"
                        >
                            <Link to="/projects" className="group relative px-8 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:shadow-blue-500/40 transition-all overflow-hidden flex items-center gap-2">
                                <span className="relative z-10 flex items-center gap-2">View Projects <FaArrowRight className="group-hover:translate-x-1 transition-transform" /></span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Link>

                            <Link to="/contact" className="px-8 py-3 rounded-full bg-white dark:bg-slate-800 text-gray-800 dark:text-white font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all shadow-sm hover:shadow-md">
                                Contact Me
                            </Link>

                            <a href="/resume.pdf" download className="px-8 py-3 rounded-full bg-transparent border border-blue-600/30 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all flex items-center gap-2">
                                Download Resume <FaDownload size={14} />
                            </a>
                        </motion.div>
                    </div>

                    {/* Image/Photo Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 flex justify-center md:justify-end relative"
                    >
                        {/* Blob Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>

                        <motion.div
                            className="relative w-72 h-72 md:w-[28rem] md:h-[28rem]"
                        >
                            {/* Morphing Border/Frame */}
                            <motion.div
                                animate={{
                                    borderRadius: [
                                        "60% 40% 30% 70% / 60% 30% 70% 40%",
                                        "30% 60% 70% 40% / 50% 60% 30% 60%",
                                        "60% 40% 30% 70% / 60% 30% 70% 40%"
                                    ]
                                }}
                                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                                className="absolute inset-0 border-2 border-dashed border-blue-500/30"
                            ></motion.div>

                            {/* Image Container with Morphing Shape */}
                            <motion.div
                                animate={{
                                    borderRadius: [
                                        "60% 40% 30% 70% / 60% 30% 70% 40%",
                                        "30% 60% 70% 40% / 50% 60% 30% 60%",
                                        "60% 40% 30% 70% / 60% 30% 70% 40%"
                                    ]
                                }}
                                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                                className="w-full h-full overflow-hidden border-4 border-gray-100 dark:border-slate-800 shadow-2xl relative z-10 bg-gray-200 dark:bg-slate-800"
                            >
                                <img
                                    src="/profile.png"
                                    alt="Abhinav Chauhan"
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        // Fallback to a gradient if image fails entirely
                                        e.target.style.display = 'none';
                                        e.target.parentNode.style.background = 'linear-gradient(45deg, #3b82f6, #8b5cf6)';
                                    }}
                                />
                            </motion.div>

                            {/* Floating Badge */}
                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3 z-20"
                            >
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Open to Work</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
