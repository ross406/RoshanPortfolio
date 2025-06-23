
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeContext';

interface ContactProps {
  data: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    contactmessage: string;
  };
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = ({ data }: ContactProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { isDarkMode } = useTheme();

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        break;
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 5) return 'Subject must be at least 5 characters';
        break;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        break;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create email content
      const emailSubject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
      const emailBody = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Subject: ${formData.subject}\n\n` +
        `Message:\n${formData.message}\n\n` +
        `---\nSent from your portfolio contact form`
      );
      
      // Open default email client
      const mailtoLink = `mailto:roshansharma406@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      window.location.href = mailtoLink;

      toast({
        title: "Email Client Opened!",
        description: "Your default email client should open with the message pre-filled.",
      });

      // Reset form after successful submission
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open email client. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldClassName = (fieldName: keyof FormErrors) => {
    const baseClasses = "border transition-all duration-300 theme-transition";
    const errorClasses = errors[fieldName] 
      ? (isDarkMode ? "border-red-400 bg-red-400/10" : "border-red-500 bg-red-50")
      : (isDarkMode 
          ? "bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400" 
          : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-purple-500");
    
    return `${baseClasses} ${errorClasses}`;
  };

  return (
    <section id="contact" className={`py-20 theme-transition ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-purple-900' 
        : 'bg-gradient-to-br from-slate-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 theme-transition ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full mb-6"></div>
            <p className={`text-xl max-w-2xl mx-auto theme-transition ${
              isDarkMode ? 'text-gray-300' : 'text-slate-600'
            }`}>
              {data.contactmessage}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className={`text-2xl font-bold mb-6 theme-transition ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Let's Connect</h3>
                <p className={`text-lg mb-8 theme-transition ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-600'
                }`}>
                  I'm always interested in new opportunities and exciting projects. 
                  Let's discuss how we can work together!
                </p>
              </div>

              <div className="space-y-6">
                <div className={`flex items-center space-x-4 theme-transition ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-600'
                }`}>
                  <div className="bg-purple-600 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold theme-transition ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>Email</h4>
                    <p>{data.email}</p>
                  </div>
                </div>

                <div className={`flex items-center space-x-4 theme-transition ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-600'
                }`}>
                  <div className="bg-blue-600 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold theme-transition ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>Phone</h4>
                    <p>{data.phone}</p>
                  </div>
                </div>

                <div className={`flex items-center space-x-4 theme-transition ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-600'
                }`}>
                  <div className="bg-indigo-600 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold theme-transition ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>Location</h4>
                    <p>
                      {data.address.street} {data.address.city}, {data.address.state} {data.address.zip}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className={`backdrop-blur-sm border theme-transition ${
              isDarkMode 
                ? 'bg-white/10 border-white/20' 
                : 'bg-white/90 border-slate-200'
            }`}>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="relative">
                        <Input
                          name="name"
                          placeholder="Your Name *"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className={getFieldClassName('name')}
                        />
                        {errors.name && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          </div>
                        )}
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <div className="relative">
                        <Input
                          name="email"
                          type="email"
                          placeholder="Your Email *"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={getFieldClassName('email')}
                        />
                        {errors.email && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          </div>
                        )}
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="relative">
                      <Input
                        name="subject"
                        placeholder="Subject *"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className={getFieldClassName('subject')}
                      />
                      {errors.subject && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <div className="relative">
                      <Textarea
                        name="message"
                        placeholder="Your Message *"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className={`${getFieldClassName('message')} resize-none`}
                      />
                      {errors.message && (
                        <div className="absolute top-3 right-3">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.message}
                      </p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Opening Email...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                  
                  <p className={`text-sm text-center ${
                    isDarkMode ? 'text-gray-400' : 'text-slate-500'
                  }`}>
                    * Required fields - This will open your email client with the message pre-filled
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
