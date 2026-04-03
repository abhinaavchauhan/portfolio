import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-full h-[500px] bg-accent1/5 rounded-full blur-[120px] translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Let's <span className="gradient-text">Connect</span></h2>
          <p className="text-xl text-gray-400 mb-12 font-light max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <a 
              href="mailto:abhinavsirt@gmail.com"
              className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 hover:border-accent1/50 transition-all duration-300 w-full sm:w-auto min-w-[200px] justify-center shadow-[0_0_15px_rgba(0,0,0,0)] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:-translate-y-1"
            >
              <Mail className="text-accent1" />
              <span>Email Me</span>
            </a>
            
            <div className="flex gap-4">
              <a 
                href="https://github.com/abhinaavchauhan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 hover:text-accent1 hover:border-accent1/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:-translate-y-1"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/abhinaavchauhan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 hover:text-accent2 hover:border-accent2/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 w-full border-t border-white/10 text-center py-6 bg-black/80 backdrop-blur-md">
        <p className="text-sm text-gray-500">
          Designed & Built by Abhinav Chauhan © {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
};

export default Contact;
