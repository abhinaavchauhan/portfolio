import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate cursor if the device supports hovering (disables it on touch devices)
    if (!window.matchMedia("(any-hover: hover)").matches) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      // Check if we are hovering over an anchor, button, or any clickable element
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        window.getComputedStyle(e.target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseOut = () => {
      setIsVisible(true); // default stay visible inside document
    };

    const handleMouseLeave = () => {
      setIsVisible(false); // Hide when leaving the browser tab
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseOut);
    };
  }, [isVisible]);

  if (!isVisible && window.matchMedia("(any-hover: hover)").matches) {
    return null;
  }

  // Purely render nothing on mobile to be safe
  if (typeof window !== 'undefined' && !window.matchMedia("(any-hover: hover)").matches) {
     return null;
  }

  return (
    <>
      {/* Outer Glow Ring (Lagging) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent1 pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
          borderColor: isHovering ? 'rgba(0, 240, 255, 0.8)' : 'rgba(0, 240, 255, 0.5)',
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      />
      
      {/* Inner Dot (Instant) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[10000] hidden md:block shadow-[0_0_10px_#fff]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{
          type: 'tween',
          ease: 'backOut',
          duration: 0.1,
        }}
      />
    </>
  );
};

export default CustomCursor;
