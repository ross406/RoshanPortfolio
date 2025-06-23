
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Calendar } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ExperienceProps {
  work: Array<{
    company: string;
    title: string;
    years: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    graduated: string;
    description: string;
  }>;
}

const Experience = ({ work, education }: ExperienceProps) => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-20 theme-transition ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-blue-900' 
        : 'bg-gradient-to-br from-white to-indigo-50'
    }`}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 theme-transition ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Experience & Education
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Work Experience */}
            <div>
              <h3 className={`text-2xl font-bold mb-8 flex items-center theme-transition ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                <Building2 className={`mr-3 ${
                  isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                }`} />
                Work Experience
              </h3>
              <div className="space-y-6">
                {work.map((job, index) => (
                  <Card key={index} className={`backdrop-blur-sm border hover:scale-105 transition-all duration-300 theme-transition ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                      : 'bg-white/90 border-slate-200 hover:bg-white shadow-lg hover:shadow-xl'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h4 className={`text-xl font-bold theme-transition ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>{job.title}</h4>
                        <Badge variant="secondary" className={`w-fit mt-2 sm:mt-0 theme-transition ${
                          isDarkMode 
                            ? 'bg-indigo-600/20 text-indigo-300 border-indigo-400/20' 
                            : 'bg-indigo-100 text-indigo-700 border-indigo-200'
                        }`}>
                          {job.years}
                        </Badge>
                      </div>
                      <h5 className={`text-lg font-semibold mb-3 ${
                        isDarkMode ? 'text-blue-300' : 'text-blue-600'
                      }`}>{job.company}</h5>
                      <p className={`leading-relaxed theme-transition ${
                        isDarkMode ? 'text-gray-300' : 'text-slate-600'
                      }`}>{job.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className={`text-2xl font-bold mb-8 flex items-center theme-transition ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                <Calendar className={`mr-3 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
                Education
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card key={index} className={`backdrop-blur-sm border hover:scale-105 transition-all duration-300 theme-transition ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                      : 'bg-white/90 border-slate-200 hover:bg-white shadow-lg hover:shadow-xl'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h4 className={`text-xl font-bold theme-transition ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>{edu.degree}</h4>
                        <Badge variant="secondary" className={`w-fit mt-2 sm:mt-0 theme-transition ${
                          isDarkMode 
                            ? 'bg-blue-600/20 text-blue-300 border-blue-400/20' 
                            : 'bg-blue-100 text-blue-700 border-blue-200'
                        }`}>
                          {edu.graduated}
                        </Badge>
                      </div>
                      <h5 className={`text-lg font-semibold mb-3 ${
                        isDarkMode ? 'text-indigo-300' : 'text-indigo-600'
                      }`}>{edu.school}</h5>
                      <p className={`theme-transition ${
                        isDarkMode ? 'text-gray-300' : 'text-slate-600'
                      }`}>{edu.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
