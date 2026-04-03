import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/skills';

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="skills" className="py-24 bg-transparent relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Technical <span className="gradient-text">Expertise</span></h2>
          <p className="text-gray-400">Technologies and tools I work with.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skills.map((category, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-surface p-8 rounded-2xl border border-[var(--border-color)] shadow-sm dark:shadow-2xl flex flex-col transition-all duration-500 hover:border-accent1/30"
            >
              <h3 className="text-xl font-bold mb-4 tracking-wide">
                {category.category}
              </h3>
              
              <div className="h-px w-full bg-[var(--border-color)] mb-8" />
              
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-y-8 gap-x-4">
                {category.skills.map((skill, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * i + index * 0.2 }}
                    className="flex flex-col items-center justify-center p-2 group cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-background dark:bg-[#1c212c] flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent1/10 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] border border-[var(--border-color)] group-hover:border-accent1/20">
                      <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
                        {skill.icon}
                      </div>
                    </div>
                    <span className="text-[13px] text-center text-[var(--text-muted)] font-medium transition-colors duration-300 group-hover:text-accent1">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
