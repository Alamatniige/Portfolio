import { useState, useEffect, useRef} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { useIsMobile } from '../../hooks/useIsMobile';

// EmailJS configuration
// You'll need to set these up in your EmailJS account:
// 1. Create an account at https://www.emailjs.com/
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Get your Public Key, Service ID, and Template ID
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';
const RECIPIENT_EMAIL = 'Sapioruiz27@gmail.com';

export default function Contact() {
    const isMobile = useIsMobile();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const galaxyRef = useRef<HTMLDivElement>(null);

    // GSAP Parallax effects
    useEffect(() => {
        const section = sectionRef.current;
        const header = headerRef.current;
        const form = formRef.current;
        const galaxy = galaxyRef.current;
        
        if (!section || !header || !form) return;

        // Reduce parallax intensity on mobile
        const parallaxMultiplier = isMobile ? 0.3 : 1;

        // Parallax effect for header
        gsap.to(header, {
            y: -60 * parallaxMultiplier,
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            },
        });

        // Parallax effect for Galaxy background
        if (galaxy) {
            gsap.to(galaxy, {
                y: -50 * parallaxMultiplier,
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
        }

        // Fade in animation for header
        gsap.fromTo(
            header,
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        // Fade in animation for form
        gsap.fromTo(
            form,
            {
                opacity: 0,
                y: 50,
                scale: 0.95,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                delay: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: form,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        return () => {
            // Kill all ScrollTriggers associated with this section
            ScrollTrigger.getAll().forEach((trigger) => {
                const triggerElement = trigger.vars.trigger;
                if (triggerElement === section || triggerElement === header || triggerElement === form || triggerElement === galaxy) {
                    trigger.kill();
                }
            });
        };
    }, [isMobile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const sendEmail = async (templateParams: {
        from_name: string;
        from_email: string;
        message: string;
        to_email: string;
        reply_to?: string;
    }) => {
        try {
            // Check if EmailJS is properly configured
            if (EMAILJS_PUBLIC_KEY === 'your_public_key' || 
                EMAILJS_SERVICE_ID === 'your_service_id' || 
                EMAILJS_TEMPLATE_ID === 'your_template_id') {
                throw new Error('EmailJS is not configured. Please set up your .env file with EmailJS credentials.');
            }

            // Initialize EmailJS with your public key
            emailjs.init(EMAILJS_PUBLIC_KEY);
            
            // Send email using EmailJS
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );
            
            return { success: true, response };
        } catch (error) {
            console.error('EmailJS error:', error);
            
            // Provide more helpful error messages
            const errorObj = error as { text?: string; message?: string };
            if (errorObj?.text?.includes('insufficient authentication scopes')) {
                throw new Error('Gmail authentication issue. Please reconnect your Gmail service in EmailJS dashboard.');
            }
            
            if (errorObj?.text?.includes('Invalid service ID') || errorObj?.text?.includes('Invalid template ID')) {
                throw new Error('Invalid EmailJS configuration. Please check your Service ID and Template ID.');
            }
            
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setStatusMessage('');
        
        try {
            // Prepare email template parameters
            // Include sender's email in the message so it's visible in the email
            const formattedMessage = `From: ${formData.name} <${formData.email}>\n\nMessage:\n${formData.message}`;
            
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                message: formattedMessage,
                to_email: RECIPIENT_EMAIL,
                reply_to: formData.email, // This allows you to reply directly
            };
            
            // Send email
            await sendEmail(templateParams);
            
            // Success state
            setSubmitStatus('success');
            setStatusMessage('Message sent successfully! I\'ll get back to you soon.');
            
            // Reset form after a short delay
            setTimeout(() => {
                setFormData({ name: '', email: '', message: '' });
            }, 2000);
            
        } catch (error) {
            // Error state
            setSubmitStatus('error');
            const errorObj = error as { message?: string; text?: string };
            const errorMsg = errorObj?.message || errorObj?.text || 'Unknown error occurred';
            setStatusMessage(
                errorMsg.includes('authentication') || errorMsg.includes('scopes')
                    ? 'Email service authentication error. Please contact me directly at ' + RECIPIENT_EMAIL
                    : `Failed to send message: ${errorMsg}. Please try again or contact me directly at ${RECIPIENT_EMAIL}`
            );
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section ref={sectionRef} id="contact" className="section-1 relative flex flex-col items-center justify-center overflow-hidden py-20 md:py-28">
            <div className="relative z-10 mx-auto w-full max-w-full sm:max-w-md md:max-w-4xl px-4 sm:px-6">
                <header ref={headerRef} className="mb-12 md:mb-16 text-center">
                    <h2 className="text-heading-2 text-foreground">Get in touch</h2>
                    <p className="mt-4 text-body text-muted-foreground max-w-2xl mx-auto">
                        I'm always looking for new opportunities and collaborations. Feel free to contact me using the form below.
                    </p>
                </header>

                <form 
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="relative backdrop-blur-sm bg-gradient-to-br from-background/80 via-background/60 to-background/80 border border-border/50 rounded-2xl p-6 md:p-8 lg:p-10 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-shadow duration-300"
                >
                    {/* Glowing border effect */}
                    <div 
                        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-2xl bg-primary/20"
                    />
                    
                    <div className="relative z-10 flex flex-col gap-4 md:gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-body-sm font-medium text-foreground">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                required
                                className="w-full px-3 py-2 md:px-4 md:py-3 bg-background/50 border border-border rounded-lg text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 backdrop-blur-sm min-h-[44px]"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-body-sm font-medium text-foreground">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your.email@example.com"
                                required
                                className="w-full px-3 py-2 md:px-4 md:py-3 bg-background/50 border border-border rounded-lg text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 backdrop-blur-sm min-h-[44px]"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-body-sm font-medium text-foreground">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project or just say hello..."
                                rows={6}
                                required
                                className="w-full px-3 py-2 md:px-4 md:py-3 bg-background/50 border border-border rounded-lg text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 resize-none backdrop-blur-sm"
                            />
                        </div>

                        {submitStatus !== 'idle' && (
                            <div 
                                className={`p-3 rounded-lg text-sm ${
                                    submitStatus === 'success' 
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}
                            >
                                {statusMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-3 min-h-[44px] bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-primary/50 relative overflow-hidden group touch-manipulation"
                        >
                            <span className="relative z-10">
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </span>
                            <div 
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), transparent)'
                                }}
                            />
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}