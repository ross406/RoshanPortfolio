
import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Portfolio from '@/components/Portfolio';
import Certifications from '@/components/Certifications';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';
import AnimatedElement from '@/components/AnimatedElement';
import portfolioConfig from '@/data/portfolio-config.json';
import { useTheme } from '@/contexts/ThemeContext';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    // Simulate loading time for smooth entrance animations
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center theme-transition ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="text-center">
          <div className={`w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-4 ${
            isDarkMode 
              ? 'border-white/30 border-t-white' 
              : 'border-gray-300 border-t-gray-900'
          }`}></div>
          <p className={`text-xl font-semibold theme-transition ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen theme-transition ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <Navigation resumedownload={portfolioConfig.main.resumedownload} />
      
      <Hero data={portfolioConfig.main} />
      
      <div id="portfolio">
        <Portfolio projects={portfolioConfig.portfolio.projects} />
      </div>
      
      <ScrollAnimationWrapper>
        <About data={portfolioConfig.main} />
      </ScrollAnimationWrapper>
      
      <div id="experience">
        <ScrollAnimationWrapper>
          <Experience 
            work={portfolioConfig.resume.work} 
            education={portfolioConfig.resume.education}
          />
        </ScrollAnimationWrapper>
      </div>
      
      <div id="skills">
        <ScrollAnimationWrapper>
          <Skills 
            skills={portfolioConfig.resume.skills}
            skillmessage={portfolioConfig.resume.skillmessage}
          />
        </ScrollAnimationWrapper>
      </div>
      
      <div id="certifications">
        <ScrollAnimationWrapper>
          <Certifications certifications={portfolioConfig.certifications} />
        </ScrollAnimationWrapper>
      </div>
      
      <div id="testimonials">
        <ScrollAnimationWrapper>
          <Testimonials testimonials={portfolioConfig.testimonials.testimonials} />
        </ScrollAnimationWrapper>
      </div>
      
      <div id="contact">
        <ScrollAnimationWrapper>
          <Contact data={portfolioConfig.main} />
        </ScrollAnimationWrapper>
      </div>
      
      {/* Footer */}
      <AnimatedElement delay={100}>
        <footer className={`py-8 theme-transition ${
          isDarkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'
        }`}>
          <div className="container mx-auto px-6 text-center">
            <p className={`theme-transition ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              © 2024 Roshan Sharma. All rights reserved. Built with React, TypeScript & Tailwind CSS.
            </p>
          </div>
        </footer>
      </AnimatedElement>
    </div>
  );
};

export default Index;
