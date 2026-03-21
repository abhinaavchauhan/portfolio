import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Contact = () => {
    const form = useRef();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(form.current);
        const user_name = formData.get('user_name');
        const user_email = formData.get('user_email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        if (!user_name || !user_email || !message) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('https://portfolio-backend-yn64.onrender.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_name,
                    user_email,
                    subject,
                    message
                })
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "Failed to send message");
                setLoading(false);
                return;
            }

            if (data.success && data.userNotified) {
                toast.success("Messages sent successfully!");
            } else if (data.success) {
                toast.success("Message sent! (But thank you email failed)");
            }
            
            form.current.reset();
            setLoading(false);
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Network error. Please try again later.");
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Have a project in mind or want to discuss cybersecurity? Feel free to reach out.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white shadow-xl"
                >
                    <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                    <p className="mb-8 text-blue-100">
                        I'm open for freelance opportunities, collaboration, or just a friendly chat about tech.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <FaPhone className="mt-1 text-xl opacity-80" />
                            <div>
                                <h4 className="font-semibold text-lg">Phone</h4>
                                <p className="text-blue-100">+91 9155883571</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <FaEnvelope className="mt-1 text-xl opacity-80" />
                            <div>
                                <h4 className="font-semibold text-lg">Email</h4>
                                <p className="text-blue-100">abhinavsirt@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <FaMapMarkerAlt className="mt-1 text-xl opacity-80" />
                            <div>
                                <h4 className="font-semibold text-lg">Location</h4>
                                <p className="text-blue-100">New Delhi, India</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <form ref={form} onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-colors text-gray-900 dark:text-white"
                                    placeholder="Abhinav Chauhan"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="user_email"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-colors text-gray-900 dark:text-white"
                                    placeholder="yours@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-colors text-gray-900 dark:text-white"
                                    placeholder="Project Inquiry"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-colors text-gray-900 dark:text-white resize-none"
                                    placeholder="Your message here..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
