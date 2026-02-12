import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MatrixBackground from '../components/MatrixBackground';
import { motion } from 'framer-motion';
import {
    MessageCircle,
    Mail,
    Phone,
    Clock,
    HelpCircle,
    Send,
    CheckCircle,
    AlertCircle,
    BookOpen,
    Users,
    FileText
} from 'lucide-react';

const ContactSupport = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: '',
        subject: '',
        message: '',
        priority: 'medium'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Call backend API to save contact request
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: `[${formData.category}] ${formData.subject}`,
                    message: `Priority: ${formData.priority}\n\n${formData.message}`
                })
            });

            const data = await response.json();

            if (data.success) {
                setSubmitStatus('success');

                // Reset form after 3 seconds
                setTimeout(() => {
                    setFormData({
                        name: '',
                        email: '',
                        category: '',
                        subject: '',
                        message: '',
                        priority: 'medium'
                    });
                    setSubmitStatus(null);
                }, 3000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Contact submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const supportCategories = [
        { value: 'account', label: 'Account Issues', icon: Users },
        { value: 'application', label: 'Application Help', icon: FileText },
        { value: 'technical', label: 'Technical Problems', icon: AlertCircle },
        { value: 'general', label: 'General Inquiry', icon: HelpCircle },
        { value: 'other', label: 'Other', icon: MessageCircle }
    ];

    const faqItems = [
        {
            question: "How do I apply for internships?",
            answer: "Browse available internships, click on the one you're interested in, and click the 'Apply Now' button. Make sure your profile is complete before applying."
        },
        {
            question: "Can I edit my application after submission?",
            answer: "Once submitted, applications cannot be edited. However, you can withdraw and reapply if the position is still open."
        },
        {
            question: "How long does it take to hear back?",
            answer: "Response times vary by organization, but typically you'll hear back within 1-2 weeks. You can track your application status in your dashboard."
        },
        {
            question: "What if I forgot my password?",
            answer: "Click on 'Forgot Password' on the login page. You'll receive a password reset link via email within minutes."
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a192f] text-gray-300 font-sans selection:bg-green-500/30 selection:text-green-200">
            <Navbar />
            <MatrixBackground />

            {/* Header Section */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center justify-center p-3 bg-green-500/10 rounded-full mb-6">
                            <MessageCircle className="h-8 w-8 text-green-400" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            We're Here to <span className="text-green-500">Help</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Having trouble? Our support team is ready to assist you with any questions or concerns.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Quick Contact Info */}
            <section className="py-12 bg-[#112240]/50 border-y border-gray-800 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Mail,
                                title: 'Email Us',
                                content: 'aisharya05@gmail.com',
                                subtext: 'We reply within 24 hours'
                            },
                            {
                                icon: Phone,
                                title: 'Call Us',
                                content: '+91 6204439707',
                                subtext: 'Mon-Fri, 9AM-6PM IST'
                            },
                            {
                                icon: Clock,
                                title: 'Response Time',
                                content: '< 24 Hours',
                                subtext: 'Average response time'
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#112240] p-6 rounded-xl border border-gray-800 hover:border-green-500 transition-all text-center"
                            >
                                <div className="inline-flex items-center justify-center p-3 bg-green-500/10 rounded-full mb-4">
                                    <item.icon className="h-6 w-6 text-green-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-green-400 font-semibold mb-1">{item.content}</p>
                                <p className="text-sm text-gray-500">{item.subtext}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content - Form and FAQ */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Support Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="bg-[#112240] p-8 rounded-xl border border-gray-800">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <Send className="h-6 w-6 text-green-400 mr-3" />
                                    Submit a Support Request
                                </h2>

                                {submitStatus === 'success' && (
                                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start">
                                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-green-400 font-semibold">Request Submitted Successfully!</p>
                                            <p className="text-sm text-gray-400 mt-1">We'll get back to you within 24 hours.</p>
                                        </div>
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start">
                                        <AlertCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-red-400 font-semibold">Submission Failed</p>
                                            <p className="text-sm text-gray-400 mt-1">Please try again or contact us directly via email.</p>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#0a192f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#0a192f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#0a192f] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        >
                                            <option value="">Select a category</option>
                                            {supportCategories.map((cat) => (
                                                <option key={cat.value} value={cat.value}>
                                                    {cat.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Priority */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Priority Level
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {['low', 'medium', 'high'].map((level) => (
                                                <button
                                                    key={level}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, priority: level }))}
                                                    className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${formData.priority === level
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-[#0a192f] text-gray-400 border border-gray-700 hover:border-green-500'
                                                        }`}
                                                >
                                                    {level}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#0a192f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                            placeholder="Brief description of your issue"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="6"
                                            className="w-full px-4 py-3 bg-[#0a192f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                                            placeholder="Please provide as much detail as possible about your issue..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-5 w-5 mr-2" />
                                                Submit Request
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </motion.div>

                        {/* FAQ Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="bg-[#112240] p-8 rounded-xl border border-gray-800 mb-8">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <BookOpen className="h-6 w-6 text-green-400 mr-3" />
                                    Frequently Asked Questions
                                </h2>

                                <div className="space-y-6">
                                    {faqItems.map((faq, idx) => (
                                        <div key={idx} className="border-b border-gray-800 pb-6 last:border-b-0 last:pb-0">
                                            <h3 className="text-lg font-semibold text-white mb-3 flex items-start">
                                                <HelpCircle className="h-5 w-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                                                {faq.question}
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed ml-7">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Additional Help */}
                            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-8 rounded-xl border border-green-500/30">
                                <h3 className="text-xl font-bold text-white mb-4">Need Immediate Help?</h3>
                                <p className="text-gray-300 mb-6 leading-relaxed">
                                    Check out our comprehensive help center for instant answers to common questions and detailed guides.
                                </p>
                                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50 flex items-center">
                                    <BookOpen className="h-5 w-5 mr-2" />
                                    Visit Help Center
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Support Categories */}
            <section className="py-20 bg-[#0f213e]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">How Can We Help You?</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Browse our support categories to find the help you need
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {supportCategories.map((category, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#112240] p-6 rounded-xl border border-gray-800 hover:border-green-500 transition-all cursor-pointer group hover:-translate-y-1"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="p-3 bg-green-500/10 rounded-lg mb-4 group-hover:bg-green-500/20 transition-all">
                                        <category.icon className="h-6 w-6 text-green-400" />
                                    </div>
                                    <h3 className="text-white font-semibold">{category.label}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ContactSupport;
