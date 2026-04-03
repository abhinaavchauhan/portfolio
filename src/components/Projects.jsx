import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { ExternalLink, X, ArrowUpRight } from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-24 relative z-20">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent2/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:flex justify-between items-end border-b border-white/10 pb-6"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Featured <span className="gradient-text">Work</span></h2>
            <p className="text-[var(--text-muted)]">A selection of my best projects.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-3xl overflow-hidden glass-panel relative h-[450px] flex flex-col justify-end p-8 border border-white/10"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 mix-blend-luminosity" 
                />
              </div>

              {/* Gradient Overlay for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent z-10 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-20 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 w-full">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-mono text-accent1 block">{project.category}</span>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => e.stopPropagation()}
                      className="p-3 bg-black/40 border border-white/10 rounded-full hover:bg-accent1 hover:text-black transition-all duration-300 backdrop-blur-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-110"
                      title="View Code on GitHub"
                    >
                      <ArrowUpRight size={20} strokeWidth={2.5} />
                    </a>
                  )}
                </div>
                <h3 className="text-3xl font-bold text-white group-hover:text-accent1 transition-colors duration-300 w-full pr-12">{project.title}</h3>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-0 group-hover:h-auto overflow-hidden">
                  <p className="text-gray-200 text-sm mb-6 leading-relaxed line-clamp-3">{project.description}</p>
                  <div className="flex gap-2 flex-wrap pb-4">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-wider text-accent1 bg-accent1/10 py-1 px-2 rounded border border-accent1/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent1 to-accent2 opacity-0 blur-xl group-hover:opacity-20 transition-opacity duration-700 pointer-events-none z-0" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal / Expanded View */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setSelectedProject(null)} 
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="bg-surface w-full max-w-4xl rounded-3xl relative z-10 shadow-2xl overflow-hidden border border-[var(--border-color)] flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-accent1 transition-colors bg-surface/50 backdrop-blur-lg p-2 rounded-full z-20 border border-[var(--border-color)] hover:bg-accent1/10"
              >
                <X size={24} />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-background">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background md:bg-gradient-to-r md:from-transparent md:to-background pointer-events-none" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-surface/80 relative">
                <span className="text-sm font-mono text-accent1 mb-3 block">{selectedProject.category}</span>
                <h3 className="text-4xl font-bold mb-6 leading-tight">{selectedProject.title}</h3>
                
                <div className="max-w-none mb-10">
                  <p className="text-lg text-[var(--text-muted)] leading-relaxed font-light">{selectedProject.description}</p>
                </div>

                <div className="mb-10">
                  <h4 className="font-medium mb-4 uppercase tracking-wider text-sm border-b border-[var(--border-color)] pb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, i) => (
                      <span key={i} className="px-4 py-2 bg-accent1/5 border border-accent1/10 rounded-full text-sm text-[var(--text-muted)] hover:border-accent1/50 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.link && selectedProject.link !== "#" && (
                   <a 
                     href={selectedProject.link}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 px-8 py-4 bg-accent1 text-black font-bold uppercase tracking-wider rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:-translate-y-1"
                   >
                     View Project <ExternalLink size={20} />
                   </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
