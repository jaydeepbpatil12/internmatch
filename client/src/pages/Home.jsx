import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MatrixBackground from '../components/MatrixBackground';
import AuthPromptModal from '../components/AuthPromptModal';
import ContactUs from '../components/ContactUs';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Zap, CheckCircle, Clock, MapPin, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMessage, setAuthMessage] = useState('');

    // Check if user is authenticated
    const isAuthenticated = () => {
        return localStorage.getItem('token') !== null;
    };

    // Handle protected link clicks
    const handleProtectedClick = (e, message) => {
        if (!isAuthenticated()) {
            e.preventDefault();
            setAuthMessage(message);
            setShowAuthModal(true);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a192f] text-gray-300 font-sans selection:bg-green-500/30 selection:text-green-200">
            <Navbar />
            <MatrixBackground />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Hero Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
                                Online Internship and <br />
                                Project Matching <br />
                                Platform
                            </h1>
                            <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
                                Finding internships and project opportunities that align with students' interests is often difficult.
                                A platform is needed to connect students with organizations based on mutual requirements.
                            </p>

                            <div className="flex flex-wrap gap-4 mb-14">
                                <Link to="/register" className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:scale-105 animate-glow-pulse overflow-hidden">
                                    <span className="relative z-10">Get Matches</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </Link>
                                <Link to="/register?role=org" className="group relative px-8 py-4 rounded-lg bg-transparent border-2 border-gray-600 text-white font-bold text-lg hover:border-green-500 hover:text-green-400 transition-all hover:scale-105 overflow-hidden">
                                    <span className="relative z-10">Post Opportunity</span>
                                    <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </Link>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6">
                                {[
                                    { label: 'Active internships', value: '120' },
                                    { label: 'Project listings', value: '85' },
                                    { label: 'Matches made', value: '2,500' },
                                ].map((stat, index) => (
                                    <div key={index} className="bg-[#112240] p-6 rounded-lg border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 animate-fade-in-up group cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <div className="text-3xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{stat.value}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Interactive Preview Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="bg-[#112240] rounded-xl border border-gray-700 p-8 shadow-2xl relative hover:shadow-green-500/20 transition-shadow duration-500 animate-float-slow"
                        >
                            <div className="absolute -top-4 -right-4 bg-green-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce-slow">
                                Preview
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                {/* Student Side */}
                                <div className="bg-[#0a192f] p-4 rounded-lg border border-gray-800">
                                    <div className="text-xs text-gray-500 mb-2">Student Profile</div>
                                    <div className="font-semibold text-white mb-2">Skills: React, Node, MongoDB</div>
                                    <div className="text-xs text-gray-400">Availability: 20 hrs/week • Remote</div>
                                </div>
                                {/* Opportunity Side */}
                                <div className="bg-[#0a192f] p-4 rounded-lg border border-gray-800">
                                    <div className="text-xs text-gray-500 mb-2">Opportunity</div>
                                    <div className="font-semibold text-white mb-2">Build internal dashboard</div>
                                    <div className="text-xs text-gray-400">Stack: React + Express • 8 weeks</div>
                                </div>
                            </div>

                            {/* Simulation Animation */}
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg flex items-center mb-6 animate-gradient-x relative overflow-hidden">
                                <div className="text-orange-800 text-sm font-medium animate-pulse relative z-10">
                                    Generating demo match...
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                            </div>

                            <button className="bg-green-600 text-white px-4 py-2 rounded text-sm font-bold">
                                Clicks 0
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trending Now */}
            <section className="bg-[#0f213e] py-20 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Trending Now</h2>
                            <p className="text-gray-400 text-sm">Latest high-demand opportunities</p>
                        </div>
                        <Link
                            to="/browse"
                            onClick={(e) => handleProtectedClick(e, "Sign in to browse all opportunities and get personalized matches")}
                            className="text-green-400 text-sm hover:underline"
                        >
                            View all
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Amazon Software Engineering Intern",
                                desc: "Contribute to scalable backend services and APIs.",
                                skills: "Node, Express, AWS",
                                tags: ["backend", "api"],
                                duration: "12 weeks",
                                type: "Onsite",
                                location: "Seattle"
                            },
                            {
                                title: "Microsoft Frontend Engineering Intern",
                                desc: "Build performant UI components and dashboards.",
                                skills: "JavaScript, React, CSS",
                                tags: ["frontend", "dashboard"],
                                duration: "10 weeks",
                                type: "Remote",
                                location: "Remote"
                            },
                            {
                                title: "Google Data Analyst Intern",
                                desc: "Analyze datasets and produce insights and visualizations.",
                                skills: "Python, SQL, Visualization",
                                tags: ["analytics", "data"],
                                duration: "12 weeks",
                                type: "Remote",
                                location: "Remote"
                            }
                        ].map((job, idx) => (
                            <div key={idx} className="bg-[#112240] p-6 rounded-lg border border-gray-800 hover:border-green-500 transition-all duration-300 group hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-2 cursor-pointer animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="text-xs text-gray-500">Internship • Just now</div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{job.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 min-h-[40px]">{job.desc}</p>

                                <div className="mb-4">
                                    <div className="text-xs text-gray-500 mb-1">Skills: {job.skills}</div>
                                    <div className="flex gap-2">
                                        {job.tags.map(tag => (
                                            <span key={tag} className="text-[10px] bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded border border-gray-700">{job.duration}</span>
                                    <span className={`text-xs px-2 py-1 rounded border ${job.type === 'Remote' ? 'bg-green-900/30 text-green-400 border-green-900' : 'bg-gray-800 text-white border-gray-700'}`}>
                                        {job.type}
                                    </span>
                                    <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded border border-gray-700">UTC</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Browse by Type Section */}
            <section className="bg-[#0a192f] py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-bold text-white mb-6">Browse by Type</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Internships Column */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-gray-400 text-sm font-semibold">Internships</h3>
                                <Link
                                    to="/browse?type=internship"
                                    onClick={(e) => handleProtectedClick(e, "Sign in to view all internship opportunities")}
                                    className="text-green-400 text-xs hover:underline"
                                >
                                    View all
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { title: 'Amazon Software Engineering Intern', duration: '12 weeks', type: 'Onsite' },
                                    { title: 'Google Data Analyst Intern', duration: '12 weeks', type: 'Remote' },
                                    { title: 'Microsoft Frontend Engineering Intern', duration: '10 weeks', type: 'Remote' }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-[#112240] p-4 rounded-lg border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 hover:-translate-y-1 cursor-pointer">
                                        <div className="font-bold text-white text-sm mb-1">{item.title}</div>
                                        <div className="text-xs text-gray-500">{item.duration} • {item.type}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Projects Column */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-gray-400 text-sm font-semibold">Projects</h3>
                                <Link
                                    to="/browse?type=project"
                                    onClick={(e) => handleProtectedClick(e, "Sign in to view all project opportunities")}
                                    className="text-green-400 text-xs hover:underline"
                                >
                                    View all
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { title: 'Internal Dashboard', duration: '8 weeks', stack: 'React, Express' },
                                    { title: 'Analytics Visualization', duration: '8 weeks', stack: 'React, D3' },
                                    { title: 'API Enhancements', duration: '10 weeks', stack: 'Node, Express' }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-[#112240] p-4 rounded-lg border border-gray-800 hover:border-green-500/50 transition-colors">
                                        <div className="font-bold text-white text-sm mb-1">{item.title}</div>
                                        <div className="text-xs text-gray-500">{item.duration} • {item.stack}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Explore Section */}
            <section className="bg-[#0a192f] py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-bold text-white mb-6">Explore Opportunities</h2>

                    <div className="bg-[#112240] p-1 rounded-lg border border-gray-700 flex items-center mb-12">
                        <Search className="text-gray-400 ml-4 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search title, skills, tags"
                            className="bg-transparent border-none outline-none text-white px-4 py-3 w-full placeholder-gray-500 focus:ring-0"
                        />
                        <div className="flex items-center px-4 border-l border-gray-700">
                            <input type="checkbox" id="remote-only" className="rounded bg-gray-800 border-gray-600 text-green-600 focus:ring-0 mr-2" />
                            <label htmlFor="remote-only" className="text-sm text-gray-300 whitespace-nowrap cursor-pointer">Remote only</label>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Zap, title: "Smart Matching", desc: "Match using skills, interests, timezone, availability and duration fit.", color: "text-pink-500" },
                            { icon: CheckCircle, title: "Clear Requirements", desc: "Standardized tags and skills improve clarity for both sides.", color: "text-blue-400" },
                            { icon: Clock, title: "Fast Onboarding", desc: "Post an opportunity or student profile in minutes.", color: "text-orange-500" }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-[#112240] p-8 rounded-xl border border-gray-800 relative overflow-hidden group hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-2 cursor-pointer animate-fade-in-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                                <div className={`mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="h-8 w-8 group-hover:animate-wiggle" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="bg-[#0f213e] py-20 border-y border-gray-800">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-white mb-12">What users say</h2>

                    <div className="relative">
                        <blockquote className="text-2xl md:text-3xl font-medium text-gray-300 italic mb-8 leading-relaxed">
                            "Loved the transparency of requirements and match score."
                        </blockquote>
                        <div className="flex flex-col items-center">
                            <cite className="not-italic font-bold text-white text-base">Sneha</cite>
                            <span className="text-sm text-gray-500 mt-1">Frontend Intern</span>
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center gap-2 mt-8">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Green Banner */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 rounded-2xl p-12 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden animate-gradient-xy hover:shadow-green-500/50 transition-shadow duration-500">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to find your perfect match?</h2>
                            <p className="text-green-50 text-lg opacity-90">Create a student profile or post an opportunity and get ranked results instantly.</p>
                        </div>
                        <div className="flex gap-4 mt-8 md:mt-0 relative z-10">
                            <Link to="/register" className="bg-white text-green-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 animate-fade-in-up">
                                Get Matches
                            </Link>
                            <Link to="/register?role=org" className="bg-green-700 border-2 border-green-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                Post Opportunity
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-[#0a192f]">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center text-white mb-10">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-[#112240] rounded-lg border border-gray-800 overflow-hidden group hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 animate-fade-in-up">
                            <button className="w-full px-6 py-5 text-left flex justify-between items-center text-gray-300 font-medium group-hover:text-white transition-colors">
                                How are matches calculated?
                                <span className="text-xl text-gray-500 group-hover:text-green-400 group-hover:rotate-90 transition-all duration-300">+</span>
                            </button>
                        </div>
                        <div className="bg-[#112240] rounded-lg border border-gray-800 overflow-hidden group hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <button className="w-full px-6 py-5 text-left flex justify-between items-center text-gray-300 font-medium group-hover:text-white transition-colors">
                                Is this platform free for students?
                                <span className="text-xl text-gray-500 group-hover:text-green-400 group-hover:rotate-90 transition-all duration-300">+</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <ContactUs />

            <Footer />

            {/* Auth Prompt Modal */}
            <AuthPromptModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                message={authMessage}
            />
        </div>
    );
};

export default Home;
