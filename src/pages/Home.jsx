import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
// We will import Projects, Skills, Contact later as sections for the single scrollable page if desired,
// but the nav links point to separate pages. 
// However, modern portfolios often use a single page landing + separate pages for details.
// Given routes like /projects, I will keep them separate pages, but Home can have teasers.
// For now, let's keep Home as just Hero + About teaser? 
// The prompt asks for "Pages to Include... 1. Hero, 2. About...".
// It lists them as "Pages / Sections". 
// A common pattern: Home Page has Hero -> About -> Projects Teaser -> Contact Teaser.
// Or single page application with scroll.
// The Navbar has links to /about, /projects etc. which implies multi-page.
// I will keep components reusable.

const Home = () => {
    return (
        <>
            <Hero />
            <AboutSection />
            {/* We can add a "Recent Projects" or "Skills" summary here too later */}
        </>
    );
};

export default Home;
