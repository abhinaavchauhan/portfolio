import React, { useEffect, useRef } from 'react';

const Background = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let shockwaves = [];
    let shootingStars = [];
    let fluidOrbs = [];
    let time = 0;
    
    // Mouse tracking for interactivity
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 200,
      active: false
    };

    // Responsive Canvas Resizing
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initElements();
    };

    // Helper color palette based on dark / light mode
    const getPalette = () => {
      const isDark = document.documentElement.classList.contains('dark') || theme === 'dark';
      return isDark ? {
        orbs: [
          { r: 0, g: 240, b: 255 },    // Electric Cyan
          { r: 168, g: 85, b: 247 },   // Vivid Violet
          { r: 236, g: 72, b: 153 },   // Hot Pink
          { r: 59, g: 130, b: 246 }    // Neon Blue
        ],
        particles: ['#00f0ff', '#a855f7', '#ec4899', '#38bdf8', '#ffffff', '#e0e7ff'],
        lines: 'rgba(0, 240, 255, ',
        bgFade: '#0a0a0a'
      } : {
        orbs: [
          { r: 56, g: 189, b: 248 },   // Sky Blue
          { r: 192, g: 132, b: 252 },  // Light Purple
          { r: 251, g: 113, b: 133 },  // Rose
          { r: 45, g: 212, b: 191 }    // Teal
        ],
        particles: ['#0284c7', '#7e22ce', '#e11d48', '#0d9488', '#475569'],
        lines: 'rgba(14, 165, 233, ',
        bgFade: '#f8fafc'
      };
    };

    // 1. Fluid Orbs Class
    class FluidOrb {
      constructor(index, total) {
        this.index = index;
        this.total = total;
        this.baseRadius = Math.min(canvas.width, canvas.height) * (0.25 + Math.random() * 0.15);
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = 0.003 + Math.random() * 0.003;
      }

      update(time, palette) {
        this.x += this.vx + Math.sin(time * this.speed + this.phase) * 0.4;
        this.y += this.vy + Math.cos(time * this.speed + this.phase) * 0.4;

        if (this.x < -this.baseRadius) this.x = canvas.width + this.baseRadius;
        if (this.x > canvas.width + this.baseRadius) this.x = -this.baseRadius;
        if (this.y < -this.baseRadius) this.y = canvas.height + this.baseRadius;
        if (this.y > canvas.height + this.baseRadius) this.y = -this.baseRadius;

        this.color = palette.orbs[this.index % palette.orbs.length];
      }

      draw(ctx) {
        const radius = this.baseRadius + Math.sin(time * 0.02 + this.phase) * 30;
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, radius
        );
        const { r, g, b } = this.color;
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.18)`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.07)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 2. Stardust Particle Class
    class Particle {
      constructor(palette) {
        this.reset(palette, true);
      }

      reset(palette, initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : (Math.random() < 0.5 ? -10 : canvas.height + 10);
        this.size = Math.random() * 1.8 + 0.6;
        this.baseSize = this.size;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.ox = this.vx;
        this.oy = this.vy;
        this.color = palette.particles[Math.floor(Math.random() * palette.particles.length)];
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.twinkleSpeed = 0.02 + Math.random() * 0.03;
        this.alpha = Math.random() * 0.7 + 0.3;
        this.glow = Math.random() > 0.7;
      }

      update(palette) {
        this.twinklePhase += this.twinkleSpeed;
        const currentAlpha = Math.max(0.15, Math.min(1, this.alpha + Math.sin(this.twinklePhase) * 0.35));

        // Velocity damping towards original speed
        this.vx += (this.ox - this.vx) * 0.02;
        this.vy += (this.oy - this.vy) * 0.02;

        // Mouse magnetic gravity / push interaction
        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius);
            const angle = Math.atan2(dy, dx);
            // Slight orbital pull
            this.vx += Math.cos(angle + Math.PI / 4) * force * 0.3;
            this.vy += Math.sin(angle + Math.PI / 4) * force * 0.3;
            this.size = this.baseSize * (1 + force * 0.8);
          } else {
            this.size = this.baseSize;
          }
        } else {
          this.size = this.baseSize;
        }

        // Apply velocities
        this.x += this.vx;
        this.y += this.vy;

        // Screen wrap
        if (this.x < -20) this.x = canvas.width + 20;
        if (this.x > canvas.width + 20) this.x = -20;
        if (this.y < -20) this.y = canvas.height + 20;
        if (this.y > canvas.height + 20) this.y = -20;

        this.currentAlpha = currentAlpha;
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.currentAlpha;
        ctx.fillStyle = this.color;

        if (this.glow) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = this.color;
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // 3. Shooting Star / Comet Class
    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width * 0.8;
        this.y = Math.random() * canvas.height * 0.4;
        this.length = 80 + Math.random() * 70;
        this.speed = 12 + Math.random() * 8;
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2;
        this.alpha = 1;
        this.active = false;
        this.life = 0;
        this.maxLife = 40 + Math.random() * 20;
      }

      spawn() {
        this.reset();
        this.active = true;
      }

      update() {
        if (!this.active) return;
        this.life++;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha = 1 - (this.life / this.maxLife);
        if (this.life >= this.maxLife) {
          this.active = false;
        }
      }

      draw(ctx) {
        if (!this.active || this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);

        const tailX = this.x - Math.cos(this.angle) * this.length;
        const tailY = this.y - Math.sin(this.angle) * this.length;

        const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
        grad.addColorStop(0, 'rgba(0, 240, 255, 0)');
        grad.addColorStop(0.7, 'rgba(168, 85, 247, 0.4)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        ctx.restore();
      }
    }

    // 4. Click Shockwave Class
    class Shockwave {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.maxRadius = 160;
        this.alpha = 1;
        this.speed = 4.5;
      }

      update(particles) {
        this.radius += this.speed;
        this.alpha = 1 - (this.radius / this.maxRadius);

        // Push nearby particles outward
        for (let p of particles) {
          const dx = p.x - this.x;
          const dy = p.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(dist - this.radius) < 25 && dist > 0) {
            const push = (1 - this.radius / this.maxRadius) * 4;
            p.vx += (dx / dist) * push;
            p.vy += (dy / dist) * push;
          }
        }
      }

      draw(ctx) {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha * 0.6);
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#00f0ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    // Initialize all canvas objects
    const initElements = () => {
      const palette = getPalette();

      // Setup Fluid Orbs
      fluidOrbs = [];
      for (let i = 0; i < 4; i++) {
        fluidOrbs.push(new FluidOrb(i, 4));
      }

      // Setup Stardust Particles
      particles = [];
      let particleCount = Math.floor((canvas.width * canvas.height) / 14000);
      if (particleCount > 130) particleCount = 130;
      if (particleCount < 40) particleCount = 40;

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(palette));
      }

      // Setup Shooting Stars
      shootingStars = [new ShootingStar(), new ShootingStar()];
    };

    setCanvasSize();

    // Event handlers
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleClick = (e) => {
      shockwaves.push(new Shockwave(e.clientX, e.clientY));
      if (shockwaves.length > 5) shockwaves.shift();
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    // Main animation loop
    const animate = () => {
      time += 1;
      const palette = getPalette();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Clear canvas with subtle background color fill
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render Fluid Mesh Orbs
      for (let orb of fluidOrbs) {
        orb.update(time, palette);
        orb.draw(ctx);
      }

      // Randomly spawn shooting star
      if (Math.random() < 0.004) {
        const inactiveStar = shootingStars.find(s => !s.active);
        if (inactiveStar) inactiveStar.spawn();
      }

      // Draw & Update Shooting Stars
      for (let star of shootingStars) {
        star.update();
        star.draw(ctx);
      }

      // Render Stardust Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update(palette);
        p.draw(ctx);
      }

      // Render Constellation Network Lines between nearby particles
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 10000) { // ~100px connection range
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / 100) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = `${palette.lines}${lineAlpha})`;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Interactive Cursor Aura Glow & Node Connections
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const auraGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, mouse.radius * 0.75
        );
        auraGrad.addColorStop(0, 'rgba(0, 240, 255, 0.12)');
        auraGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.05)');
        auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 0.75, 0, Math.PI * 2);
        ctx.fill();

        // Connect cursor to closest particles
        for (let p of particles) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.4;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Update & Draw Click Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.update(particles);
        sw.draw(ctx);
        if (sw.alpha <= 0) {
          shockwaves.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Event Listeners
    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouchMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background transition-colors duration-500">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />
      {/* Soft Vignette and Ambient Radial Contrast Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--bg-color)_100%)] pointer-events-none opacity-70" />
      {/* Subtle Noise Texture overlay */}
      <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMGg0djRIMHoiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPgo8L3N2Zz4=')] mix-blend-overlay" />
    </div>
  );
};

export default Background;

