import React, { useEffect, useRef } from 'react';

const Background = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let isGridDrawn = false;
    
    // Resize canvas
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(); // Reinit on resize to prevent clustering or stretching
    };

    // Initial setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Mouse tracking for interactivity
    const mouse = { x: null, y: null, radius: 180 };
    
    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };
    
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Particle class
    class Particle {
      constructor() {
        const isDark = document.documentElement.classList.contains('dark');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        // Theme-aware colors
        const colors = isDark 
          ? ['#00f0ff', '#a855f7', '#ffffff'] 
          : ['#00f0ff', '#a855f7', '#475569'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width + 10) this.x = -10;
        else if (this.x < -10) this.x = canvas.width + 10;
        if (this.y > canvas.height + 10) this.y = -10;
        else if (this.y < -10) this.y = canvas.height + 10;
      }
    }

    const init = () => {
      particles = [];
      let particleCount = Math.floor((window.innerWidth * window.innerHeight) / 25000); 
      if (particleCount > 100) particleCount = 100;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Cache grid rendering to an offscreen canvas
    const gridCanvas = document.createElement('canvas');
    const gridCtx = gridCanvas.getContext('2d');

    const cacheGrid = () => {
      const isDark = document.documentElement.classList.contains('dark');
      gridCanvas.width = canvas.width;
      gridCanvas.height = canvas.height;
      gridCtx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.05)';
      gridCtx.lineWidth = 1;
      const gridSize = 60;
      
      gridCtx.beginPath();
      for (let x = 0; x <= gridCanvas.width; x += gridSize) {
        gridCtx.moveTo(x, 0);
        gridCtx.lineTo(x, gridCanvas.height);
      }
      for (let y = 0; y <= gridCanvas.height; y += gridSize) {
        gridCtx.moveTo(0, y);
        gridCtx.lineTo(gridCanvas.width, y);
      }
      gridCtx.stroke();
      isGridDrawn = true;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');
      
      if (!isGridDrawn) cacheGrid();
      ctx.drawImage(gridCanvas, 0, 0);

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
        
      // Connect particles
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distanceSq = dx * dx + dy * dy;
          
          if (distanceSq < 15000) {
            const distance = Math.sqrt(distanceSq);
            ctx.beginPath();
            ctx.strokeStyle = `${particles[i].color}${Math.floor(((120 - distance) / 120) * 150).toString(16).padStart(2, '0')}`;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Dynamic Mouse Interactions
      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < particles.length; i++) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 240, 255, ${1 - distance / mouse.radius})`;
            ctx.lineWidth = 1.2;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            particles[i].x -= dx * 0.01;
            particles[i].y -= dy * 0.01;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    cacheGrid();
    animate();

    const handleResizeWrapper = () => {
      isGridDrawn = false;
      setCanvasSize();
    };

    window.addEventListener('resize', handleResizeWrapper);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('touchstart', (e) => { handleMouseMove(e.touches[0]); });
    window.addEventListener('touchmove', (e) => { handleMouseMove(e.touches[0]); });
    window.addEventListener('touchend', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResizeWrapper);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('touchstart', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-background transition-colors duration-500">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-80 mix-blend-screen dark:mix-blend-screen" />
      {/* Noise overlay and gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-color)_100%)] pointer-events-none opacity-80" />
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMGg0djRIMHoiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPgo8L3N2Zz4=')] mix-blend-overlay" />
    </div>
  );
};

export default Background;
