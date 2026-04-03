import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-black/50 overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Professional <span className="gradient-text">Experience</span></h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line timeline */}
          <div className="absolute left-0 sm:left-1/2 top-0 bottom-0 w-px bg-white/10 sm:-translate-x-1/2" />

          {/* Experience Item */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col sm:flex-row items-start sm:justify-between w-full mb-12 sm:even:flex-row-reverse"
          >
            {/* Timeline Dot */}
            <div className="absolute left-[-5px] sm:left-1/2 sm:-translate-x-1/2 w-3 h-3 rounded-full bg-accent1 shadow-[0_0_10px_rgba(0,240,255,0.8)] mt-2 sm:mt-0" />
            
            <div className="w-full sm:w-[calc(50%-20px)] sm:pt-0 pt-6 pl-8 sm:pl-0 sm:text-right sm:even:text-left sm:pr-8 sm:even:pr-0 sm:even:pl-8">
              <div className="glass-panel p-6 rounded-2xl glass-panel-hover text-left inline-block w-full">
                <span className="text-accent1 text-sm font-mono mb-2 block">Training</span>
                <h3 className="text-2xl font-bold text-white mb-1">Core Java Training</h3>
                <h4 className="text-gray-400 text-lg mb-4">Internshala</h4>
                <p className="text-gray-300 font-light leading-relaxed">
                  Completed structured training focused on core Java concepts and object-oriented programming, building a strong foundation in backend development logic.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
