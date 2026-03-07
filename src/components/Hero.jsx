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
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-slate-950">
            {/* Background Elements */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/30 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/30 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
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

                <h1 className="text-4xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                    Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Abhinav Chauhan</span>
                </h1>

                <h2 className="text-2xl md:text-4xl font-medium text-gray-600 dark:text-gray-300 mb-8 h-12">
                    I am a <span className="text-blue-600 dark:text-blue-400 border-r-4 border-blue-600 dark:border-blue-400 pr-1 animate-pulse">{text}</span>
                </h2>

                <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Building secure, scalable, and premium digital experiences. Passionate about coding and cybersecurity.
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link to="/projects" className="group relative px-8 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:shadow-blue-500/40 transition-all overflow-hidden">
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
        </section>
    );
};

export default Hero;
