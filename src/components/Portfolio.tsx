
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Filter, Youtube } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import AnimatedElement from './AnimatedElement';

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  url: string;
  github: string;
  videoDemo?: string;
  technologies: string[];
}

interface PortfolioProps {
  projects: Project[];
}

const Portfolio = ({ projects }: PortfolioProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isDarkMode } = useTheme();
  const categories = ['All', ...new Set(projects.map(project => project.category))];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);
   
  return (
    <section className={`py-20 theme-transition ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-purple-900' 
        : 'bg-gradient-to-br from-slate-50 to-indigo-50'
    }`}>
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedElement delay={100}>
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 theme-transition ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                My Portfolio
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full mb-6"></div>
              <p className={`text-xl max-w-2xl mx-auto theme-transition ${
                isDarkMode ? 'text-gray-300' : 'text-slate-600'
              }`}>
                Explore some of my recent projects and technical achievements
              </p>
            </div>
          </AnimatedElement>

          {/* Category Filter */}
          <AnimatedElement delay={200}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className={`flex items-center mb-4 theme-transition ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                <Filter className="w-5 h-5 mr-2" />
                <span className="font-semibold">Filter by category:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={`transition-all duration-300 theme-transition ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700"
                        : isDarkMode
                          ? "border-white/30 text-white hover:bg-white/10 hover:text-white"
                          : "border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white bg-white"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </AnimatedElement>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project, index) => (
              <AnimatedElement key={index} delay={100 + (index * 100)}>
                <Card className={`group backdrop-blur-sm border hover:scale-105 transition-all duration-300 overflow-hidden theme-transition ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/20 hover:bg-white/15' 
                    : 'bg-white/90 border-slate-200 hover:bg-white shadow-lg hover:shadow-xl'
                }`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-1.5 h-auto"
                        onClick={() => window.open(project.url, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                      { project.videoDemo &&
                        <Button
                        size="sm"
                        className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-1.5 h-auto"
                        onClick={() => window.open(project.videoDemo, '_blank')}
                      >
                        <Youtube className="w-3 h-3 text-white" />
                      </Button>
                      }
                      <Button
                        size="sm"
                        className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-1.5 h-auto"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github className="w-3 h-3 text-white" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <h3 className={`text-lg font-bold mb-1 theme-transition ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>{project.title}</h3>
                      <Badge variant="secondary" className={`text-xs theme-transition ${
                        isDarkMode 
                          ? 'bg-indigo-600/20 text-indigo-300 border-indigo-400/20' 
                          : 'bg-indigo-100 text-indigo-700 border-indigo-200'
                      }`}>
                        {project.category}
                      </Badge>
                    </div>
                    <p  title={project.description} className={`text-sm mb-3 line-clamp-2 theme-transition ${
                      isDarkMode ? 'text-gray-300' : 'text-slate-600'
                    }`}>{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className={`text-xs px-1 py-0 theme-transition ${
                            isDarkMode 
                              ? 'text-blue-300 border-blue-400/30' 
                              : 'text-blue-600 border-blue-300'
                          }`}
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className={`text-xs px-1 py-0 theme-transition ${
                          isDarkMode 
                            ? 'text-blue-300 border-blue-400/30' 
                            : 'text-blue-600 border-blue-300'
                        }`}>
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs py-1.5"
                        onClick={() => window.open(project.url, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Live
                      </Button>
                      { project.videoDemo &&
                        <Button
                        size="sm"
                        variant="outline"
                        className={`text-xs py-1.5 px-2 theme-transition ${
                          isDarkMode 
                            ? 'border-white/30 text-white hover:bg-white/10' 
                            : 'border-slate-300 text-slate-700 hover:bg-slate-100 bg-white'
                        }`}
                        onClick={() => window.open(project.videoDemo, '_blank')}
                      >
                        <Youtube className="w-3 h-3" />
                      </Button>
                      }
                      <Button
                        size="sm"
                        variant="outline"
                        className={`text-xs py-1.5 px-2 theme-transition ${
                          isDarkMode 
                            ? 'border-white/30 text-white hover:bg-white/10' 
                            : 'border-slate-300 text-slate-700 hover:bg-slate-100 bg-white'
                        }`}
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
