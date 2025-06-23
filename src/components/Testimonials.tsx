
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CircleUserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Quote, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface Testimonial {
  text: string;
  user: string;
  position: string;
  avatar: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlay]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className={`py-20 theme-transition ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-purple-900' 
        : 'bg-gradient-to-br from-slate-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 theme-transition ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              What People Say
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"></div>
          </div>

          <Card className={`relative backdrop-blur-sm border shadow-2xl overflow-hidden theme-transition ${
            isDarkMode 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/90 border-slate-200'
          }`}>
            <CardContent className="p-12 relative">
              <Quote className={`absolute top-6 left-6 w-8 h-8 opacity-30 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`} />
              
              <div className="mb-8 transition-all duration-500 ease-in-out pl-4">
                <p className={`text-lg md:text-xl leading-relaxed italic theme-transition ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-700'
                }`}>
                  "{currentTestimonial.text}"
                </p>
              </div>

              <div className="flex items-center justify-center space-x-4 mb-6">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.user}
                  className={`w-16 h-16 rounded-full object-cover border-4 shadow-lg ${
                    isDarkMode ? 'border-gray-600' : 'border-slate-300'
                  }`}
                />
                <div className="text-left">
                  <h4 className={`font-bold text-lg theme-transition ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>{currentTestimonial.user}</h4>
                  <p className={`font-medium ${
                    isDarkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>{currentTestimonial.position}</p>
                </div>
              </div>

              {/* Navigation and Controls */}
              <div className="flex justify-center items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className={`rounded-full border transition-all duration-300 hover:scale-105 theme-transition ${
                    isDarkMode 
                      ? 'border-purple-400 text-purple-400 hover:bg-purple-400/10' 
                      : 'border-purple-500 text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? (isDarkMode ? 'bg-purple-400 scale-125' : 'bg-purple-600 scale-125')
                          : (isDarkMode ? 'bg-gray-600 hover:bg-purple-400/50' : 'bg-slate-300 hover:bg-purple-500/50')
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleAutoPlay}
                  className={`rounded-full border transition-all duration-300 hover:scale-105 theme-transition ${
                    isDarkMode 
                      ? 'border-purple-400 text-purple-400 hover:bg-purple-400/10' 
                      : 'border-purple-500 text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className={`rounded-full border transition-all duration-300 hover:scale-105 theme-transition ${
                    isDarkMode 
                      ? 'border-purple-400 text-purple-400 hover:bg-purple-400/10' 
                      : 'border-purple-500 text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Auto-play indicator */}
              {isAutoPlay && (
                <div className="mt-4">
                  <div className={`w-full rounded-full h-1 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-slate-200'
                  }`}>
                    <div 
                      className={`h-1 rounded-full transition-all duration-[5000ms] ease-linear ${
                        isDarkMode ? 'bg-purple-400' : 'bg-purple-600'
                      }`}
                      style={{ 
                        width: '100%',
                        animation: 'progress 5s linear infinite'
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
