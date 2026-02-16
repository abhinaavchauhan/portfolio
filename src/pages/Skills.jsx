import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../data/skills';

const Skills = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Technical Skills</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                    A collection of technologies and tools I work with.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skillsData.map((category, index) => (
                    <motion.div
                        key={category.category}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-2">
                            {category.category}
                        </h3>

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
                            {category.skills.map((skill) => (
                                <div key={skill.name} className="flex flex-col items-center gap-2 group">
                                    <div
                                        className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 dark:bg-slate-700 group-hover:bg-white dark:group-hover:bg-slate-600 shadow-sm group-hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1"
                                    >
                                        <skill.icon
                                            className="text-2xl transition-colors duration-300"
                                            style={{ color: skill.color }}
                                        />
                                    </div>
                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors text-center">
                                        {skill.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
