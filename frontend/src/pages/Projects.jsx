import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

const Projects = () => {
    const [filter, setFilter] = useState('All');

    // Extract unique categories
    const categories = ['All', ...new Set(projects.map(project => project.category))];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(project => project.category === filter);

    return (
        <div className="container mx-auto px-4 py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm">Portfolio</span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-6">Featured Projects</h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg hover:text-blue-600 transition-colors">
                    Highlighting some of the best works demonstrating my skills in full-stack development and security.
                </p>
            </motion.div>

            {/* Filter Tabs */}
            <div className="flex justify-center mb-12 flex-wrap gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === category
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-gray-700'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </motion.div>

            {filteredProjects.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No projects found in this category.</p>
            )}
        </div>
    );
};

export default Projects;
