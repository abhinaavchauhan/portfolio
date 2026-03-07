import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
    return (
        <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300" id="about">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Discover who I am and what drives my passion for technology.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Image / Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-blue-600 rounded-2xl rotate-6 opacity-20 group-hover:rotate-12 transition-transform duration-300"></div>
                        <div className="relative bg-gray-100 dark:bg-slate-800 rounded-2xl p-8 shadow-xl overflow-hidden min-h-[300px] flex items-center justify-center">
                            {/* Placeholder for Profile Image if user had one, for now an icon or abstract */}
                            <div className="text-9xl text-gray-300 dark:text-slate-600">
                                👨‍💻
                            </div>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Software Developer & Cybersecurity Enthusiast
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            Hello! I'm <strong className="text-blue-600 dark:text-blue-400">Abhinav Chauhan</strong>. I possess a strong foundation in software development and a keen interest in cybersecurity. My journey involves not just building applications but ensuring they are secure and efficient.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            I enjoy solving complex problems and turning ideas into reality through code. Whether it's crafting beautiful frontends with React or diving deep into backend logic and security protocols, I am always eager to learn and grow.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">Results Driven</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Focus on delivering high-quality solutions.</p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">Security First</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Integrating security best practices.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
