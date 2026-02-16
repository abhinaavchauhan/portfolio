import React from 'react';
import AboutSection from '../components/AboutSection';
import ResumeTimeline from '../components/ResumeTimeline';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

const About = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <AboutSection />

            <div className="mt-16 max-w-4xl mx-auto">
                <ResumeTimeline />

                <div className="text-center mt-12">
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="/resume.pdf"
                        download
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                    >
                        <FaDownload /> Download Full Resume
                    </motion.a>
                </div>
            </div>
        </div>
    );
};

export default About;
