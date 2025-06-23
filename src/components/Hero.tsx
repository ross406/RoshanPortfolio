
import React, { useEffect, useState } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SocialLinks from './SocialLinks';
import { useTheme } from '@/contexts/ThemeContext';

interface HeroProps {
  data: {
    name: string;
    occupation: string;
    description: string;
    image: string;
    bio: string;
    resumedownload: string;
    social: Array<{
      name: string;
      url: string;
      icon: string;
    }>;
  };
}

const Hero = ({ data }: HeroProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const { isDarkMode } = useTheme();
  const roles = ['Full Stack Developer', 'React Specialist', 'Node.js Expert', 'Tech Lead'];

  useEffect(() => {
    const text = roles[currentRole];
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentRole]);

  return (
    <section className={`min-h-screen flex items-center justify-center relative overflow-hidden theme-transition ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900' 
        : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-500/10'
        }`}></div>
        <div className={`absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
          isDarkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse delay-2000 ${
          isDarkMode ? 'bg-purple-500/10' : 'bg-purple-500/5'
        }`}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8 animate-fade-in">
            <div className="relative inline-block">
              <div className={`w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 shadow-2xl ${
                isDarkMode ? 'border-gray-600' : 'border-gray-700'
              }`}>
                <img
                  src="/lovable-uploads/f4cb0829-d74c-44d4-93f7-6c901b0b8db3.png"
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/20 to-blue-500/20"></div>
            </div>
          </div>

          {/* Name and Title */}
          <div className="mb-8 animate-fade-in delay-200">
            <h1 className={`text-5xl md:text-7xl font-bold mb-4 theme-transition ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {data.name}
            </h1>
            <div className={`text-2xl md:text-3xl mb-6 h-12 ${
              isDarkMode ? 'text-indigo-300' : 'text-indigo-600'
            }`}>
              <span className={`border-r-2 pr-2 animate-pulse ${
                isDarkMode ? 'border-indigo-400' : 'border-indigo-500'
              }`}>
                {displayText}
              </span>
            </div>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed theme-transition ${
              isDarkMode ? 'text-blue-200' : 'text-slate-600'
            }`}>
              {data.bio}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in delay-400">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => window.open(data.resumedownload, '_blank')}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={`border-2 px-8 py-3 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 theme-transition ${
                isDarkMode 
                  ? 'border-white/30 text-white hover:bg-white/10' 
                  : 'border-slate-300 text-slate-900 hover:bg-slate-100'
              }`}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="mb-12 animate-fade-in delay-600">
            <SocialLinks social={data.social} />
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ChevronDown 
              className={`w-8 h-8 mx-auto cursor-pointer transition-colors duration-300 theme-transition ${
                isDarkMode ? 'text-white/60 hover:text-white' : 'text-slate-400 hover:text-slate-600'
              }`}
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
