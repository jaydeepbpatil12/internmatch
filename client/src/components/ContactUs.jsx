import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await axios.post('http://localhost:5000/api/contact', formData);

            if (response.data.success) {
                setStatus({
                    type: 'success',
                    message: 'Thank you for contacting us! We will get back to you soon.'
                });
                setFormData({ name: '', email: '', subject: '', message: '' });
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Failed to send message. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-[#0a192f]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Have questions or need assistance? We're here to help. Reach out to us and we'll respond as soon as possible.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {/* Contact Information - Centered */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-8 text-center">Contact Information</h3>

                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            <div className="flex flex-col items-center text-center bg-[#112240] p-6 rounded-lg border border-gray-800 hover:border-green-500/50 transition-colors">
                                <div className="bg-green-500/10 p-3 rounded-lg mb-4">
                                    <MapPin className="h-6 w-6 text-green-400" />
                                </div>
                                <h4 className="text-white font-semibold mb-2">Address</h4>
                                <p className="text-gray-400 text-sm">
                                    Phagwara, Punjab<br />
                                    India
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center bg-[#112240] p-6 rounded-lg border border-gray-800 hover:border-green-500/50 transition-colors">
                                <div className="bg-green-500/10 p-3 rounded-lg mb-4">
                                    <Mail className="h-6 w-6 text-green-400" />
                                </div>
                                <h4 className="text-white font-semibold mb-2">Email</h4>
                                <a href="mailto:jaydeeppatil@gmail.com" className="text-gray-400 text-sm hover:text-green-400 transition-colors">
                                    jaydeeppatil@gmail.com
                                </a>
                            </div>
                            <div className="flex flex-col items-center text-center bg-[#112240] p-6 rounded-lg border border-gray-800 hover:border-green-500/50 transition-colors">
                                <div className="bg-green-500/10 p-3 rounded-lg mb-4">
                                    <Phone className="h-6 w-6 text-green-400" />
                                </div>
                                <h4 className="text-white font-semibold mb-2">Phone</h4>
                                <a href="tel:+911234567890" className="text-gray-400 text-sm hover:text-green-400 transition-colors">
                                    +91 1234567890
                                </a>
                            </div>
                        </div>
                        <div className="text-center">
                            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                            <div className="flex gap-4 justify-center">
                                {[
                                    { name: 'Twitter', icon: '𝕏', link: '#' },
                                    { name: 'LinkedIn', icon: 'in', link: '#' },
                                    { name: 'GitHub', icon: 'GH', link: '#' }
                                ].map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.link}
                                        className="w-12 h-12 bg-[#112240] border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:border-green-500 hover:text-green-400 transition-all"
                                        aria-label={social.name}
                                    >
                                        <span className="font-bold">{social.icon}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="mt-12 bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-8 rounded-xl border border-green-500/30 text-center">
                            <h4 className="text-xl font-bold text-white mb-3">Need Help?</h4>
                            <p className="text-gray-400 mb-6">
                                Have questions or need assistance? Visit our Contact Support page for detailed help.
                            </p>
                            <a
                                href="/contact-support"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
                            >
                                <Send className="h-5 w-5" />
                                Contact Support
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
