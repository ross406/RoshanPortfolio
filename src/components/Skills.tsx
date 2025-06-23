
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Database, Palette, Terminal, Wrench, Settings } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import AnimatedElement from '@/components/AnimatedElement';

interface SkillsProps {
  skills: Array<{
    name: string;
    level: string;
    category: string;
  }>;
  skillmessage: string;
}

const Skills = ({ skills, skillmessage }: SkillsProps) => {
  const { isDarkMode } = useTheme();
  const categories = [...new Set(skills.map(skill => skill.category))];
  
  const getCategoryIcon = (category: string) => {
    const icons = {
      'Frontend': Code,
      'Backend': Terminal,
      'Database': Database,
      'Language': Code,
      'Tools': Wrench,
      'State Management': Settings,
      'Styling': Palette
    };
    return icons[category as keyof typeof icons] || Code;
  };

  const getCategoryGradient = (category: string) => {
    const gradients = {
      'Frontend': 'from-blue-500 to-cyan-500',
      'Backend': 'from-green-500 to-emerald-500',
      'Database': 'from-purple-500 to-violet-500',
      'Language': 'from-yellow-500 to-orange-500',
      'Tools': 'from-red-500 to-pink-500',
      'State Management': 'from-indigo-500 to-blue-500',
      'Styling': 'from-pink-500 to-rose-500'
    };
    return gradients[category as keyof typeof gradients] || 'from-gray-500 to-slate-500';
  };

  const getSkillLevelWidth = (level: string) => {
    const levels = {
      'Beginner': '30%',
      'Intermediate': '60%',
      'Advanced': '85%',
      'Expert': '95%',
      '90%': '90%',
      '85%': '85%',
      '80%': '80%',
      '75%': '75%',
      '70%': '70%'
    };
    return levels[level as keyof typeof levels] || level;
  };

  return (
    <section className={`py-20 theme-transition ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 to-gray-800' 
        : 'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedElement delay={0}>
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 theme-transition ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Skills & Technologies
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full mb-6"></div>
              <p className={`text-xl max-w-2xl mx-auto theme-transition ${
                isDarkMode ? 'text-gray-300' : 'text-slate-600'
              }`}>{skillmessage}</p>
            </div>
          </AnimatedElement>

          <div className="grid gap-8">
            {categories.map((category, index) => {
              const IconComponent = getCategoryIcon(category);
              const gradient = getCategoryGradient(category);
              
              return (
                <AnimatedElement key={index} delay={index * 100}>
                  <Card className={`shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm theme-transition ${
                    isDarkMode 
                      ? 'border-gray-700 bg-gray-800/50' 
                      : 'border-slate-200 bg-white/90 shadow-lg'
                  }`}>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} mr-4 shadow-lg`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className={`text-2xl font-bold theme-transition ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {category}
                        </h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills
                          .filter(skill => skill.category === category)
                          .map((skill, skillIndex) => (
                            <AnimatedElement key={skillIndex} delay={(index * 100) + (skillIndex * 50)}>
                              <div className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md hover:scale-105 theme-transition ${
                                isDarkMode 
                                  ? 'bg-gray-700/30 border-gray-600 hover:bg-gray-700/50' 
                                  : 'bg-white/50 border-slate-200 hover:bg-white/80'
                              }`}>
                                <div className="flex justify-between items-center mb-3">
                                  <span className={`font-semibold theme-transition ${
                                    isDarkMode ? 'text-gray-200' : 'text-slate-700'
                                  }`}>{skill.name}</span>
                                  <Badge variant="outline" className={`theme-transition ${
                                    isDarkMode 
                                      ? 'text-indigo-400 border-indigo-400 bg-indigo-400/10' 
                                      : 'text-indigo-600 border-indigo-300 bg-indigo-50'
                                  }`}>
                                    {skill.level}
                                  </Badge>
                                </div>
                                <div className={`w-full rounded-full h-2 theme-transition ${
                                  isDarkMode ? 'bg-gray-600' : 'bg-slate-200'
                                }`}>
                                  <div
                                    className={`h-2 rounded-full bg-gradient-to-r ${gradient} transition-all duration-1000 ease-out shadow-sm`}
                                    style={{ width: getSkillLevelWidth(skill.level) }}
                                  ></div>
                                </div>
                              </div>
                            </AnimatedElement>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedElement>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
