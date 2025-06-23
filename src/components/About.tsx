
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Mail, Phone } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface AboutProps {
  data: {
    bio: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  };
}

const About = ({ data }: AboutProps) => {
  const { isDarkMode } = useTheme();

  return (
    <section id="about" className={`py-20 theme-transition ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 theme-transition ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="prose prose-lg">
                <p className={`text-xl leading-relaxed theme-transition ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-600'
                }`}>
                  {data.bio}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className={`flex items-center space-x-4 theme-transition ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-600'
                }`}>
                  <Mail className={`w-5 h-5 ${
                    isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                  }`} />
                  <span>{data.email}</span>
                </div>
                <div className={`flex items-center space-x-4 theme-transition ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-600'
                }`}>
                  <Phone className={`w-5 h-5 ${
                    isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                  }`} />
                  <span>{data.phone}</span>
                </div>
                <div className={`flex items-center space-x-4 theme-transition ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-600'
                }`}>
                  <MapPin className={`w-5 h-5 ${
                    isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                  }`} />
                  <span>
                    {data.address.street} {data.address.city}, {data.address.state} {data.address.zip}
                  </span>
                </div>
              </div>
            </div>

            <Card className={`shadow-2xl border-0 backdrop-blur-sm theme-transition ${
              isDarkMode 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/90 border-slate-200 shadow-xl'
            }`}>
              <CardContent className="p-8">
                <h3 className={`text-2xl font-bold mb-6 theme-transition ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Quick Facts</h3>
                <div className="space-y-4">
                  <div className={`flex justify-between items-center py-2 border-b theme-transition ${
                    isDarkMode ? 'border-gray-700' : 'border-slate-200'
                  }`}>
                    <span className={`font-semibold theme-transition ${
                      isDarkMode ? 'text-gray-300' : 'text-slate-600'
                    }`}>Experience</span>
                    <span className={`font-bold ${
                      isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                    }`}>5+ Years</span>
                  </div>
                  <div className={`flex justify-between items-center py-2 border-b theme-transition ${
                    isDarkMode ? 'border-gray-700' : 'border-slate-200'
                  }`}>
                    <span className={`font-semibold theme-transition ${
                      isDarkMode ? 'text-gray-300' : 'text-slate-600'
                    }`}>Location</span>
                    <span className={`font-bold ${
                      isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                    }`}>Pune, India</span>
                  </div>
                  <div className={`flex justify-between items-center py-2 border-b theme-transition ${
                    isDarkMode ? 'border-gray-700' : 'border-slate-200'
                  }`}>
                    <span className={`font-semibold theme-transition ${
                      isDarkMode ? 'text-gray-300' : 'text-slate-600'
                    }`}>Specialization</span>
                    <span className={`font-bold ${
                      isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                    }`}>Full Stack</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className={`font-semibold theme-transition ${
                      isDarkMode ? 'text-gray-300' : 'text-slate-600'
                    }`}>Current Role</span>
                    <span className={`font-bold ${
                      isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                    }`}>Lead Developer</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
