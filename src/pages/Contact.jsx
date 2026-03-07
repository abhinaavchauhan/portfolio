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
            const config = {
                Host: "smtp.gmail.com",
                Username: import.meta.env.VITE_EMAIL_USER,
                Password: import.meta.env.VITE_EMAIL_PASS,
                From: import.meta.env.VITE_EMAIL_USER,
            };

            const ownerEmail = window.Email.send({
                ...config,
                To: import.meta.env.VITE_EMAIL_USER,
                Subject: subject ? `Portfolio Message: ${subject}` : `New Message from ${user_name}`,
                Body: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
                        <h3>New Message from Portfolio Website</h3>
                        <p><strong>Name:</strong> ${user_name}</p>
                        <p><strong>Email:</strong> ${user_email}</p>
                        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
                        <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
                        <p><strong>Message:</strong></p>
                        <p>${message.replace(/\n/g, '<br>')}</p>
                    </div>
                `
            });

            const userEmail = window.Email.send({
                ...config,
                To: user_email,
                Subject: "Thank you for contacting me!",
                Body: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
                        <h3>Hi ${user_name},</h3>
                        <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
                        <p><strong>Your Message Summary:</strong></p>
                        <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; font-style: italic;">
                            ${message.replace(/\n/g, '<br>')}
                        </p>
                        <br/>
                        <p>Best Regards,</p>
                        <p><strong>Abhinav Chauhan</strong></p>
                        <p><small>Cybersecurity Enthusiast | Developer</small></p>
                    </div>
                `
            });

            Promise.all([ownerEmail, userEmail]).then((results) => {
                const [ownerResult, userResult] = results;
                if (ownerResult === "OK" && userResult === "OK") {
                    toast.success("Messages sent successfully!");
                    form.current.reset();
                } else if (ownerResult === "OK") {
                    // Owner received it, but user failed...
                    toast.success("Message sent! (Thank you email failed)");
                    form.current.reset();
                } else {
                    toast.error("Failed to send message: " + ownerResult);
                }
            }).catch(error => {
                console.error("Transmission Error:", error);
                toast.error("Failed to connect to mail server.");
            }).finally(() => {
                setLoading(false);
            });

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
                                <p className="text-blue-100">+91 98765 43210</p>
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
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="user_email"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-colors text-gray-900 dark:text-white"
                                    placeholder="john@example.com"
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
