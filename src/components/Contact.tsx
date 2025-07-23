
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/useToast';
import { useAnalytics } from '@/hooks/useAnalytics';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackFormSubmission, trackSocialLink } = useAnalytics();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [fieldErrors, setFieldErrors] = useState({
    firstName: false,
    email: false,
    message: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Validate field on blur and set error state
    let hasError = false;
    
    if (name === 'firstName' && !value.trim()) {
      hasError = true;
    } else if (name === 'email' && (!value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) {
      hasError = true;
    } else if (name === 'message' && (!value.trim() || value.length < 10)) {
      hasError = true;
    }
    
    setFieldErrors(prev => ({
      ...prev,
      [name]: hasError
    }));
  };

  const validateForm = () => {
    const errors = {
      firstName: !formData.firstName.trim(),
      email: !formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      message: !formData.message.trim() || formData.message.length < 10
    };
    
    setFieldErrors(errors);
    
    if (errors.firstName) {
      toast({
        title: "Error",
        description: "First name is required",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.email.trim()) {
      toast({
        title: "Error", 
        description: "Email is required",
        variant: "destructive",
      });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.message.trim()) {
      toast({
        title: "Error",
        description: "Message is required", 
        variant: "destructive",
      });
      return false;
    }
    if (formData.message.length < 10) {
      toast({
        title: "Error",
        description: "Message must be at least 10 characters long",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Track form submission attempt
    trackFormSubmission('contact_form', true);
    
    setIsSubmitting(true);
    
    try {    
      const response = await fetch('https://formspree.io/f/xrblbble', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Track successful form submission
        trackFormSubmission('contact_form', true);
        
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. I'll get back to you soon!",
          variant: "success",
        });
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        });
        setFieldErrors({
          firstName: false,
          email: false,
          message: false
        });
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      // Track form submission error
      trackFormSubmission('contact_form', false, error instanceof Error ? error.message : 'Unknown error');
      
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-[hsl(var(--section-bg-light))] to-[hsl(var(--section-bg-dark))]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            <span className="gradient-text">Let's Connect</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">
                <span className="gradient-text-orange">Get In Touch</span>
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 spotlight-hover p-4 rounded-lg frosted-glass">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-white/10">
                    <Mail className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <p className="text-gray-300">joedyfelts.dev@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 spotlight-hover p-4 rounded-lg frosted-glass">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-white/10">
                    <Phone className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Phone</p>
                    <p className="text-gray-300">+1 (804) 512-3093</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 spotlight-hover p-4 rounded-lg frosted-glass">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-white/10">
                    <MapPin className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Location</p>
                    <p className="text-gray-300">Richmond, VA</p>
                  </div>
                </div>
              </div>
            </div>
            
            <a 
              href="https://www.linkedin.com/in/joedyfelts/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block btn-professional p-6 rounded-xl transition-all duration-300"
              aria-label="Connect with Joedy on LinkedIn (opens in new tab)"
              onClick={() => trackSocialLink('linkedin')}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[hsl(198_93%_60%_/_0.2)] rounded-lg flex items-center justify-center border border-[hsl(198_93%_60%_/_0.3)]">
                  <Linkedin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Connect on LinkedIn</h4>
                  <p className="text-white/80">Let's build something together</p>
                </div>
              </div>
            </a>
          </div>
          
          <div className="frosted-glass rounded-xl p-8 spotlight-hover">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                   <Label htmlFor="firstName" className="text-white mb-2 block">First Name <span className="gradient-text-coral">*</span></Label>
                   <Input 
                     id="firstName"
                     name="firstName"
                     value={formData.firstName}
                     onChange={handleInputChange}
                     onBlur={handleBlur}
                      placeholder="Anakin" 
                      required
                      className={`bg-[hsl(245,35%,5%)] text-white placeholder:text-gray-500 focus:border-orange-500/50 ${
                       fieldErrors.firstName ? 'border-red-500/70' : 'border-[hsl(273,41%,18%)]'
                     }`}
                   />
                 </div>
                 <div>
                   <Label htmlFor="lastName" className="text-white mb-2 block">Last Name</Label>
                   <Input 
                     id="lastName"
                     name="lastName"
                     value={formData.lastName}
                     onChange={handleInputChange}
                      placeholder="Skywalker" 
                      className="bg-[hsl(245,35%,5%)] border-[hsl(273,41%,18%)] text-white placeholder:text-gray-500 focus:border-orange-500/50"
                   />
                 </div>
               </div>
               
               <div>
                 <Label htmlFor="email" className="text-white mb-2 block">Email Address <span className="gradient-text-coral">*</span></Label>
                 <Input 
                   id="email"
                   name="email"
                   type="email" 
                   value={formData.email}
                   onChange={handleInputChange}
                   onBlur={handleBlur}
                    placeholder="darth.vader@galactic-empire.com" 
                    required
                    className={`bg-[hsl(245,35%,5%)] text-white placeholder:text-gray-500 focus:border-orange-500/50 ${
                     fieldErrors.email ? 'border-red-500/70' : 'border-[hsl(273,41%,18%)]'
                   }`}
                 />
               </div>
               
               <div>
                 <Label htmlFor="subject" className="text-white mb-2 block">Subject</Label>
                 <Input 
                   id="subject"
                   name="subject"
                   value={formData.subject}
                   onChange={handleInputChange}
                    placeholder="What's this about?" 
                    className="bg-[hsl(245,35%,5%)] border-[hsl(273,41%,18%)] text-white placeholder:text-gray-500 focus:border-orange-500/50"
                 />
               </div>
               
               <div>
                 <Label htmlFor="message" className="text-white mb-2 block">Message <span className="gradient-text-coral">*</span></Label>
                 <Textarea 
                   id="message"
                   name="message"
                   value={formData.message}
                   onChange={handleInputChange}
                   onBlur={handleBlur}
                    placeholder="Tell me about your project or just say hello!" 
                    rows={5}
                    required
                    className={`bg-[hsl(245,35%,5%)] text-white placeholder:text-gray-500 focus:border-orange-500/50 resize-none ${
                     fieldErrors.message ? 'border-red-500/70' : 'border-[hsl(273,41%,18%)]'
                   }`}
                 />
               </div>
             
             <Button 
               type="submit" 
               disabled={isSubmitting}
               className="w-full btn-energetic-coral py-3 text-white font-semibold disabled:opacity-50"
             >
               {isSubmitting ? (
                 <>
                   <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                   Sending...
                 </>
               ) : (
                 <>
                   <Send className="h-4 w-4 mr-2" />
                   Send Message
                 </>
               )}
             </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
