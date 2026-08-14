import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, User, MessageSquare, Tag } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '' // Honeypot field
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      errors.name = 'Full Name is required.';
    } else if (formData.name.length > 100) {
      errors.name = 'Full Name cannot exceed 100 characters.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email Address is required.';
    } else if (!emailRegex.test(formData.email.trim()) || formData.email.length > 254) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required.';
    } else if (formData.subject.length > 200) {
      errors.subject = 'Subject cannot exceed 200 characters.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required.';
    } else if (formData.message.length > 5000) {
      errors.message = 'Message cannot exceed 5000 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMsg('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          honeypot: formData.website
        })
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '', website: '' });
        setFieldErrors({});
      } else {
        throw new Error(resData.message || 'Unable to send your message right now.');
      }
    } catch (err) {
      console.error('Contact Form Submission Error:', err);
      setErrorMsg(err.message || 'Unable to send your message right now. Please try again or contact me directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-full h-[500px] bg-accent1/5 rounded-full blur-[120px] translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-12 font-light max-w-2xl mx-auto">
            Have a question, a project proposal, or just want to say hi? Drop me a message below and I'll get back to you soon!
          </p>

          {/* Glassmorphic Contact Form */}
          <div className="bg-white/5 border border-white/10 hover:border-accent1/30 backdrop-blur-xl rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto text-left mb-14 transition-colors duration-300">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center justify-center space-y-4"
              >
                <div className="p-4 bg-accent1/10 rounded-full text-accent1 border border-accent1/30">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-2xl font-bold text-white">✓ Message Sent Successfully!</h3>
                <p className="text-gray-300 max-w-md text-sm leading-relaxed">
                  Thanks for reaching out. A confirmation email has been sent to your inbox, and I'll get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Invisible Honeypot Field for Anti-Spam */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: 'none', opacity: 0, position: 'absolute', left: '-9999px' }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Your Name <span className="text-accent1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        maxLength={100}
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full bg-black/40 border ${fieldErrors.name ? 'border-red-500/80' : 'border-white/10'} rounded-xl px-4 py-3 pl-11 text-white placeholder-gray-500 hover:border-white/20 focus:border-accent1 focus:ring-1 focus:ring-accent1 focus:outline-none transition-all duration-300`}
                      />
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                    {fieldErrors.name && (
                      <span className="text-red-400 text-xs mt-1 block font-mono">{fieldErrors.name}</span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Your Email <span className="text-accent1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        maxLength={254}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full bg-black/40 border ${fieldErrors.email ? 'border-red-500/80' : 'border-white/10'} rounded-xl px-4 py-3 pl-11 text-white placeholder-gray-500 hover:border-white/20 focus:border-accent1 focus:ring-1 focus:ring-accent1 focus:outline-none transition-all duration-300`}
                      />
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                    {fieldErrors.email && (
                      <span className="text-red-400 text-xs mt-1 block font-mono">{fieldErrors.email}</span>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                    Subject <span className="text-accent1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      maxLength={200}
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry / Opportunity"
                      className={`w-full bg-black/40 border ${fieldErrors.subject ? 'border-red-500/80' : 'border-white/10'} rounded-xl px-4 py-3 pl-11 text-white placeholder-gray-500 hover:border-white/20 focus:border-accent1 focus:ring-1 focus:ring-accent1 focus:outline-none transition-all duration-300`}
                    />
                    <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                  {fieldErrors.subject && (
                    <span className="text-red-400 text-xs mt-1 block font-mono">{fieldErrors.subject}</span>
                  )}
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                    Message <span className="text-accent1">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      rows={4}
                      maxLength={5000}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or inquiry..."
                      className={`w-full bg-black/40 border ${fieldErrors.message ? 'border-red-500/80' : 'border-white/10'} rounded-xl px-4 py-3 pl-11 pt-3 text-white placeholder-gray-500 hover:border-white/20 focus:border-accent1 focus:ring-1 focus:ring-accent1 focus:outline-none transition-all duration-300 resize-none`}
                    />
                    <MessageSquare size={18} className="absolute left-4 top-4 text-gray-500" />
                  </div>
                  {fieldErrors.message && (
                    <span className="text-red-400 text-xs mt-1 block font-mono">{fieldErrors.message}</span>
                  )}
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                    {errorMsg}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-accent1 text-black font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Direct Email & Social Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <a 
              href="mailto:abhinavsirt@gmail.com"
              className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:text-white hover:bg-white/10 hover:border-accent1/50 transition-all duration-300 text-sm shadow-[0_0_15px_rgba(0,0,0,0)] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:-translate-y-1"
            >
              <Mail className="text-accent1" size={18} />
              <span>abhinavsirt@gmail.com</span>
            </a>
            
            <div className="flex gap-4">
              <a 
                href="https://github.com/abhinaavchauhan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:text-white hover:bg-white/10 hover:border-accent1/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:-translate-y-1"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/abhinaavchauhan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:text-white hover:bg-white/10 hover:border-accent2/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 w-full border-t border-white/10 text-center py-6 bg-black/80 backdrop-blur-md">
        <p className="text-sm text-gray-500">
          Designed & Built by Abhinav Chauhan © {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
};

export default Contact;
