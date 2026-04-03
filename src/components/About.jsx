import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-12 md:py-24 relative z-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-surface p-8 md:p-12 rounded-3xl relative overflow-hidden border border-[var(--border-color)] shadow-sm dark:shadow-2xl"
        >
          {/* Background glow decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent1/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <h2 className="text-3xl md:text-5xl font-bold mb-8 relative z-10">
            About <span className="gradient-text">Me</span>
          </h2>
          
          <div className="space-y-6 text-lg text-[var(--text-muted)] relative z-10 leading-relaxed font-light font-sans">
            <p>
              I am a Software Developer with a strong foundation in building scalable, high-performance applications across web and mobile platforms.
            </p>
            <p>
              My work spans Android development, full-stack systems, and automation tools, with a growing focus on cybersecurity and system-level engineering.
            </p>
            <p>
              I have developed multiple production-grade projects, including a modular web vulnerability scanner, real-time multi-device systems, and full-stack applications with modern architectures.
            </p>
            <p className="font-medium text-[var(--text-color)] border-l-4 border-accent1 pl-4">
              I approach development with an emphasis on performance, security, and clean system design.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
