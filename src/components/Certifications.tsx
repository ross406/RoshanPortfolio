
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, ExternalLink } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface CertificationsProps {
  certifications: Array<{
    title: string;
    issuer: string;
    date: string;
    credentialId: string;
    url?: string;
  }>;
}

const Certifications = ({ certifications }: CertificationsProps) => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-20 theme-transition ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 to-indigo-900' 
        : 'bg-gradient-to-br from-slate-50 to-indigo-50'
    }`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 theme-transition ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Certifications
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full mb-6"></div>
            <p className={`text-xl max-w-2xl mx-auto theme-transition ${
              isDarkMode ? 'text-gray-300' : 'text-slate-600'
            }`}>
              Professional certifications and achievements that validate my technical expertise
            </p>
          </div>

          <div className="grid gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className={`shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm theme-transition ${
                isDarkMode 
                  ? 'border-gray-700 bg-gray-800/50' 
                  : 'border-slate-200 bg-white/90 shadow-lg'
              }`}>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full ${
                        isDarkMode ? 'bg-indigo-600/20' : 'bg-indigo-100'
                      }`}>
                        <Award className={`w-6 h-6 ${
                          isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-xl font-bold mb-2 theme-transition ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {cert.title}
                        </h3>
                        <p className={`text-lg font-semibold mb-2 ${
                          isDarkMode ? 'text-indigo-300' : 'text-indigo-600'
                        }`}>
                          {cert.issuer}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                          <Badge variant="outline" className={`theme-transition ${
                            isDarkMode 
                              ? 'text-blue-400 border-blue-400' 
                              : 'text-blue-600 border-blue-300'
                          }`}>
                            Issued {cert.date}
                          </Badge>
                          <span className={`text-sm theme-transition ${
                            isDarkMode ? 'text-gray-400' : 'text-slate-500'
                          }`}>
                            Credential ID: {cert.credentialId}
                          </span>
                        </div>
                      </div>
                    </div>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 theme-transition ${
                          isDarkMode 
                            ? 'border-indigo-400 text-indigo-400 hover:bg-indigo-400/10' 
                            : 'border-indigo-500 text-indigo-600 hover:bg-indigo-50'
                        }`}
                      >
                        <span className="text-sm font-medium">View Certificate</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
