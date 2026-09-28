import React, { useEffect, useRef } from 'react';

const Background = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Canvas sizing
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Detect theme
    const checkIsDark = () => {
      if (theme) return theme === 'dark';
      return document.documentElement.classList.contains('dark');
    };

    let isDark = checkIsDark();

    // Palette config
    const colorsDark = {
      orbs: ['#00f0ff', '#a855f7', '#ec4899', '#3b82f6'],
      particles: ['#00f0ff', '#a855f7', '#ffffff', '#ec4899', '#60a5fa'],
      cometHead: '#ffffff',
      cometMid: 'rgba(168, 85, 247, 0.8)',
      cometTail: 'rgba(0, 240, 255, 0)',
      constellation: 'rgba(0, 240, 255, ',
      aura: 'rgba(0, 240, 255, 0.15)',
      shockwave: '#00f0ff',
    };

    const colorsLight = {
      orbs: ['#38bdf8', '#c084fc', '#fb7185', '#2dd4bf'],
      particles: ['#0284c7', '#9333ea', '#e11d48', '#0d9488', '#2563eb'],
      cometHead: '#ffffff',
      cometMid: 'rgba(192, 132, 252, 0.8)',
      cometTail: 'rgba(56, 189, 248, 0)',
      constellation: 'rgba(56, 189, 248, ',
      aura: 'rgba(56, 189, 248, 0.18)',
      shockwave: '#38bdf8',
    };

    const getColors = () => (isDark ? colorsDark : colorsLight);

    // Mouse & Touch Tracking with Lerp
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
      radius: 200,
    };

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

    // Ambient Fluid Orbs
    class Orb {
      constructor(index) {
        this.index = index;
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.min(canvas.width, canvas.height) * (0.35 + Math.random() * 0.25);
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = 0.006 + Math.random() * 0.009;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.012 + Math.random() * 0.015;
      }

      update() {
        this.angle += this.angleSpeed;
        this.pulse += this.pulseSpeed;

        this.x += Math.cos(this.angle) * 1.2 + this.vx;
        this.y += Math.sin(this.angle) * 1.2 + this.vy;

        // Bounce gently inside canvas bounds
        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius;
      }

      draw() {
        const palette = getColors().orbs;
        const color = palette[this.index % palette.length];
        const currentRadius = this.radius + Math.sin(this.pulse) * 45;

        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          Math.max(1, currentRadius)
        );

        gradient.addColorStop(0, color);
        gradient.addColorStop(0.4, color + (isDark ? '88' : '66'));
        gradient.addColorStop(0.8, color + (isDark ? '22' : '11'));
        gradient.addColorStop(1, 'transparent');

        ctx.save();
        ctx.globalCompositeOperation = isDark ? 'screen' : 'multiply';
        ctx.globalAlpha = isDark ? 0.65 : 0.45;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(1, currentRadius), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Stardust Particles
    class Particle {
      constructor() {
        this.init();
      }

      init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.baseSize = Math.random() * 1.8 + 0.6; // 0.6px to 2.4px
        this.size = this.baseSize;
        this.alpha = Math.random() * 0.7 + 0.3;
        this.alphaSpeed = 0.015 + Math.random() * 0.035;
        this.alphaAngle = Math.random() * Math.PI * 2;
        this.sizePulseSpeed = 0.01 + Math.random() * 0.02;
        this.sizeAngle = Math.random() * Math.PI * 2;
        const currentPalette = getColors().particles;
        this.color = currentPalette[Math.floor(Math.random() * currentPalette.length)];
      }

      update(shockwaves) {
        // Dynamic twinkling alpha modulation (0.15 to 0.95)
        this.alphaAngle += this.alphaSpeed;
        this.alpha = 0.55 + Math.sin(this.alphaAngle) * 0.4;

        // Dynamic size breathing pulsation
        this.sizeAngle += this.sizePulseSpeed;
        this.size = Math.max(0.5, this.baseSize + Math.sin(this.sizeAngle) * 0.5);

        // Base movement
        this.x += this.vx;
        this.y += this.vy;

        // Magnetic Attraction & Swirl to Mouse
        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = mouse.radius * mouse.radius;

          if (distSq < maxDistSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / mouse.radius) * 0.06;
            
            // Attraction force towards cursor
            this.x += (dx / dist) * force * 15;
            this.y += (dy / dist) * force * 15;

            // Subtle tangential swirl force around cursor
            this.x += (-dy / dist) * force * 8;
            this.y += (dx / dist) * force * 8;
          }
        }

        // Click Shockwave Physics
        shockwaves.forEach((sw) => {
          const dx = this.x - sw.x;
          const dy = this.y - sw.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);
          const ringWidth = 35;

          if (Math.abs(dist - sw.radius) < ringWidth && dist > 0) {
            const pushForce = ((1 - sw.radius / sw.maxRadius) * 4 * (1 - Math.abs(dist - sw.radius) / ringWidth));
            this.x += (dx / dist) * pushForce;
            this.y += (dy / dist) * pushForce;
          }
        });

        // Canvas Boundary Loop
        if (this.x < -20) this.x = canvas.width + 20;
        if (this.x > canvas.width + 20) this.x = -20;
        if (this.y < -20) this.y = canvas.height + 20;
        if (this.y > canvas.height + 20) this.y = -20;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, this.alpha));
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = isDark ? (this.size * 5) : (this.size * 2.5);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Shooting Stars (Comets)
    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width * 1.2 - canvas.width * 0.1;
        this.y = -50;
        this.length = Math.random() * 80 + 70;
        this.speed = Math.random() * 10 + 12;
        this.angle = Math.PI / 4; // ~45 deg down-right
        this.active = false;
        this.timer = 0;
        this.wait = Math.random() * 180 + 120; // Spawn delay in frames
      }

      update() {
        if (!this.active) {
          this.timer++;
          if (this.timer >= this.wait) {
            this.active = true;
            this.timer = 0;
            this.x = Math.random() * (canvas.width + 300) - 150;
            this.y = -50;
          }
          return;
        }

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x > canvas.width + 200 || this.y > canvas.height + 200) {
          this.active = false;
          this.reset();
        }
      }

      draw() {
        if (!this.active) return;
        const tailX = this.x - Math.cos(this.angle) * this.length;
        const tailY = this.y - Math.sin(this.angle) * this.length;

        const palette = getColors();
        const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
        grad.addColorStop(0, palette.cometTail);
        grad.addColorStop(0.6, palette.cometMid);
        grad.addColorStop(1, palette.cometHead);

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.shadowColor = palette.cometHead;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        // White glowing head point
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Click Shockwave
    class Shockwave {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.maxRadius = 160;
        this.speed = 4.5;
        this.opacity = 1;
      }

      update() {
        this.radius += this.speed;
        this.opacity = 1 - this.radius / this.maxRadius;
      }

      draw() {
        if (this.opacity <= 0) return;
        ctx.save();
        ctx.strokeStyle = getColors().shockwave;
        ctx.globalAlpha = Math.max(0, this.opacity * 0.7);
        ctx.lineWidth = 2.5;
        ctx.shadowColor = getColors().shockwave;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(1, this.radius), 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      isDead() {
        return this.radius >= this.maxRadius || this.opacity <= 0;
      }
    }

    // Storage arrays
    let orbs = [];
    let particles = [];
    let shootingStars = [];
    let shockwaves = [];

    const init = () => {
      isDark = checkIsDark();

      // Orbs (4 floating radial gradient orbs)
      orbs = [0, 1, 2, 3].map((i) => new Orb(i));

      // Particles scaled dynamically to screen dimensions (40 to 130)
      const count = Math.min(
        130,
        Math.max(40, Math.floor((canvas.width * canvas.height) / 18000))
      );
      particles = Array.from({ length: count }, () => new Particle());

      // 2 Shooting stars pool
      shootingStars = [new ShootingStar(), new ShootingStar()];
      shockwaves = [];
    };

    const handleClick = (e) => {
      shockwaves.push(new Shockwave(e.clientX, e.clientY));
    };

    // Animation Loop
    const animate = () => {
      isDark = checkIsDark();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth lerp mouse coordinates
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
      }

      // Update and draw Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        shockwaves[i].update();
        shockwaves[i].draw();
        if (shockwaves[i].isDead()) {
          shockwaves.splice(i, 1);
        }
      }

      // 1. Draw Ambient Fluid Gradient Mesh Orbs
      orbs.forEach((orb) => {
        orb.update();
        orb.draw();
      });

      // 2. Update & Draw Particles
      particles.forEach((p) => {
        p.update(shockwaves);
        p.draw();
      });

      // Constellation Connecting Lines
      const constColor = getColors().constellation;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 10000) { // ~100px distance
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / 100) * (isDark ? 0.35 : 0.25);
            ctx.strokeStyle = `${constColor}${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 3. Interactive Mouse Aura & Laser Node Connections
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        // Cursor Radial Glow Aura
        const auraGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius
        );
        auraGrad.addColorStop(0, getColors().aura);
        auraGrad.addColorStop(1, 'transparent');

        ctx.save();
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Laser Node Connections to nearby particles
        for (let i = 0; i < particles.length; i++) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouse.radius * mouse.radius) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / mouse.radius) * 0.45;
            ctx.save();
            ctx.strokeStyle = isDark ? `rgba(0, 240, 255, ${alpha})` : `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // 4. Intermittent Shooting Stars
      shootingStars.forEach((star) => {
        star.update();
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      setCanvasSize();
    };

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        handleMouseMove(e.touches[0]);
        handleClick(e.touches[0]);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        handleMouseMove(e.touches[0]);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-background transition-colors duration-500 overflow-hidden">
      {/* 1. Base canvas element with soft opacity (0.9) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-90 w-full h-full"
      />
      {/* 2. Radial vignette gradient for depth and contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--bg-color,rgba(10,10,18,0.85))_100%)] pointer-events-none" />
      {/* 3. Micro noise SVG texture overlay for modern subtle grain feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMGg0djRIMHoiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPgo8L3N2Zz4=')] mix-blend-overlay" />
    </div>
  );
};

export default Background;

