
import React from 'react';
import { Facebook, Github, Instagram, Linkedin } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface SocialLinksProps {
  social: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
}

const SocialLinks = ({ social }: SocialLinksProps) => {
  const { isDarkMode } = useTheme();
  const iconMap = {
    facebook: Facebook,
    github: Github,
    instagram: Instagram,
    linkedin: Linkedin,
  };

  return (
    <div className="flex justify-center space-x-6">
      {social.map((platform, index) => {
        const IconComponent = iconMap[platform.icon as keyof typeof iconMap];
        
        return (
          <a
            key={index}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative p-3 backdrop-blur-sm rounded-full border transition-all duration-300 hover:scale-110 hover:rotate-12 theme-transition ${
              isDarkMode 
                ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                : 'bg-gray-800/10 border-gray-600/30 hover:bg-gray-800/20'
            }`}
          >
            <IconComponent className={`w-6 h-6 transition-colors duration-300 theme-transition ${
              isDarkMode 
                ? 'text-white group-hover:text-purple-300' 
                : 'text-gray-700 group-hover:text-purple-600'
            }`} />
            <span className={`absolute -top-10 left-1/2 transform -translate-x-1/2 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 capitalize theme-transition ${
              isDarkMode 
                ? 'bg-black/80 text-white' 
                : 'bg-gray-800/90 text-white'
            }`}>
              {platform.name}
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
