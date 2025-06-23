
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Download, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface NavigationProps {
  resumedownload: string;
}

const Navigation = ({ resumedownload }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    if (href === '#about') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 theme-transition ${
      isScrolled 
        ? isDarkMode 
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10' 
          : 'bg-white/80 backdrop-blur-md border-b border-black/10'
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div onClick={() => scrollToSection('#hero')} className={`text-2xl font-bold theme-transition cursor-pointer ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Roshan<span className="text-purple-400">.dev</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`theme-transition font-medium ${
                  isDarkMode 
                    ? 'text-white hover:text-purple-400' 
                    : 'text-gray-900 hover:text-purple-600'
                } transition-colors duration-300`}
              >
                {item.name}
              </button>
            ))}
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`theme-transition ${
                isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              onClick={() => window.open(resumedownload, '_blank')}
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`theme-transition ${
                isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={`theme-transition ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={`md:hidden backdrop-blur-md rounded-lg mt-2 p-4 border theme-transition ${
            isDarkMode 
              ? 'bg-black/90 border-white/10' 
              : 'bg-white/90 border-black/10'
          }`}>
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`theme-transition font-medium text-left ${
                    isDarkMode 
                      ? 'text-white hover:text-purple-400' 
                      : 'text-gray-900 hover:text-purple-600'
                  } transition-colors duration-300`}
                >
                  {item.name}
                </button>
              ))}
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full mt-4"
                onClick={() => window.open(resumedownload, '_blank')}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
