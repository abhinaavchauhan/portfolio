import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { ChevronRight, Terminal } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <section 
      ref={containerRef}
      className="relative h-[90vh] md:h-screen w-full flex flex-col justify-center overflow-hidden pt-20"
    >
      <div 
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent2/10 via-transparent to-transparent opacity-50"
      />
      
      <div className="z-10 w-full px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[55%_40%] xl:grid-cols-[55%_45%] gap-8 lg:gap-12 xl:gap-8 justify-between items-center">
        {/* Left Content Area */}
        <div className="text-left order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent1/10 border border-accent1/20 text-accent1 font-mono text-sm mb-6 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-accent1 animate-pulse" />
            Welcome to my Portfolio
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[7.5vw] sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold mb-4 tracking-tight text-[var(--text-color)] whitespace-nowrap"
          >
            Hii, I'm <span className="gradient-text">Abhinav Chauhan</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-3xl font-light text-gray-400 mb-8 h-12 flex items-center justify-center lg:justify-start"
          >
            <span className="mr-2">&gt;</span>
            <Typewriter
              options={{
                strings: [
                  'Software Developer',
                  'Cybersecurity Enthusiast',
                  'Tech Explorer',
                  'System Designer',
                  'Full-Stack Engineer'
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 40,
                delay: 80,
                wrapperClassName: 'text-[var(--text-color)] font-mono',
                cursorClassName: 'text-accent1 font-mono animate-pulse'
              }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg text-[var(--text-muted)] font-light max-w-xl mb-10 leading-relaxed"
          >
            Engineering <span className="text-[var(--text-color)] font-medium">secure</span>, <span className="text-accent2 font-medium border-b border-accent2/30">scalable</span>, and high-performance digital systems. Bridging the gap between robust architecture and immersive experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a href="#projects" className="w-full sm:w-auto group relative px-8 py-4 bg-accent1 text-black font-semibold rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] flex items-center justify-center gap-2 overflow-hidden">
              <span className="relative z-10">Explore Projects</span>
              <ChevronRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
              {/* Button inner glow/shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            </a>
            
            <a 
            href="mailto:abhinavsirt@mail.com" 
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-[var(--border-color)] text-[var(--text-color)] font-semibold hover:bg-surface transition-colors duration-300 flex items-center justify-center">
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right Content Area: Terminal Window Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ perspective: 1000 }}
          className="order-2 w-full mt-6 lg:mt-0"
        >
          <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] transform-gpu hover:-translate-y-2 transition-transform duration-500">
            {/* Terminal Header */}
            <div className="bg-black/50 px-4 py-3 border-b border-white/10 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto flex items-center gap-2 text-xs text-gray-500 font-mono">
                <Terminal size={12} />
                <span>admin@abhinaavchauhan:~</span>
              </div>
            </div>
            
            {/* Terminal Body */}
            <div className="p-4 md:p-6 font-mono text-xs md:text-sm text-gray-300 bg-black/60 min-h-[250px] w-full flex flex-col gap-3 relative overflow-x-auto whitespace-pre-wrap break-words">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-20 hidden md:block" />
              
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}} className="flex items-start gap-3">
                <span className="text-accent1 mt-1">➜</span>
                <div>
                  <span className="text-accent2">~</span> <span className="text-white">./initialize_profile.sh</span>
                  <div className="text-gray-400 mt-1">Loading core modules... [OK]</div>
                </div>
              </motion.div>
              
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.0}} className="flex items-start gap-3">
                <span className="text-accent1 mt-1">➜</span>
                <div>
                  <span className="text-accent2">~</span> <span className="text-white">cat current_status.txt</span>
                  <div className="text-green-400 mt-1">{"{"}</div>
                  <div className="ml-4"><span className="text-accent1">"status"</span><span className="text-gray-300">: "Building scalable solutions",</span></div>
                  <div className="ml-4"><span className="text-accent1">"role"</span><span className="text-gray-300">: "Software Developer + Cybersecurity",</span></div>
                  <div className="ml-4"><span className="text-accent1">"learning"</span><span className="text-gray-300">: "Advanced Networking",</span></div>
                  <div className="ml-4"><span className="text-accent1">"uptime"</span><span className="text-gray-300">: "21 years",</span></div>
                  <div className="ml-4"><span className="text-accent1">"location"</span><span className="text-gray-300">: "India"</span></div>
                  <div className="text-green-400">{"}"}</div>
                </div>
              </motion.div>
              
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3.0}} className="flex items-start gap-3 mt-auto">
                <span className="text-accent1">➜</span>
                <span className="text-accent2 animate-pulse">_</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center animate-bounce z-20"
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-mono">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent1 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
