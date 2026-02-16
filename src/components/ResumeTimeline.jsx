import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaTrophy } from 'react-icons/fa';

const ResumeTimeline = () => {
    const experiences = [
        {
            id: 1,
            type: 'education',
            title: "Bachelor of Technology in Computer Science",
            organization: "Example University",
            period: "2020 - 2024",
            description: "Focused on Software Engineering and Cybersecurity. Graduated with Honors."
        },
        {
            id: 2,
            type: 'experience',
            title: "Software Developer Intern",
            organization: "Tech Solutions Inc.",
            period: "Jun 2023 - Aug 2023",
            description: "Developed REACT components for the main dashboard. Optimised API calls reducing load time by 30%."
        },
        {
            id: 3,
            type: 'achievement',
            title: "Cybersecurity Hackathon Winner",
            organization: "National Tech Fest",
            period: "2022",
            description: "Secured 1st place in CTF challenge demonstrating proficiency in network security."
        }
    ];

    const getIcon = (type) => {
        switch (type) {
            case 'education': return <FaGraduationCap />;
            case 'experience': return <FaBriefcase />;
            case 'achievement': return <FaTrophy />;
            default: return <FaBriefcase />;
        }
    };

    return (
        <div className="py-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Journey & Achievements</h3>

            <div className="relative border-l-2 border-blue-200 dark:border-blue-900 ml-4 md:ml-10 space-y-12">
                {experiences.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative pl-8 md:pl-12"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 shadow-md"></div>

                        {/* Icon Box */}
                        <div className="absolute -left-[45px] top-[-10px] hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 shadow-sm">
                            {getIcon(item.type)}
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-2">
                                {item.period}
                            </span>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                            <h5 className="text-md font-medium text-gray-600 dark:text-gray-300 mb-2">{item.organization}</h5>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ResumeTimeline;
