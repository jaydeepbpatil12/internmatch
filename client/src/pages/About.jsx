import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MatrixBackground from '../components/MatrixBackground';
import { motion } from 'framer-motion';
import { Rocket, Target, Users, Globe, Shield, Zap } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-[#0a192f] text-gray-300 font-sans selection:bg-green-500/30 selection:text-green-200">
            <Navbar />
            <MatrixBackground />

            {/* Header Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Empowering the Next <br />
                            <span className="text-green-500">Generation of Tech</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            We are bridging the gap between ambitious students and world-class organizations through intelligent, skills-based matching.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-[#112240]/50 border-y border-gray-800 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '10K+', label: 'Active Students' },
                            { value: '500+', label: 'Partner Companies' },
                            { value: '98%', label: 'Match Success' },
                            { value: '24/7', label: 'Support Available' },
                        ].map((stat, idx) => (
                            <div key={idx}>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-sm text-green-400 font-medium uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Mission */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                            <p className="text-gray-400 mb-6 leading-relaxed text-lg">
                                Finding an internship shouldn't happen by chance. We believe in a transparent, merit-based ecosystem where skills matter more than connections.
                            </p>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                By leveraging advanced matching algorithms, we help students showcase their true potential and assist organizations in building diverse, high-performing teams efficiently.
                            </p>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                {[
                                    { icon: Target, text: "Precision Matching" },
                                    { icon: Shield, text: "Verified Listings" },
                                    { icon: Globe, text: "Global Reach" },
                                    { icon: Zap, text: "Fast Hiring" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center space-x-3 text-white font-medium">
                                        <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-green-500/20 rounded-xl blur-xl filter"></div>
                            <div className="relative bg-[#112240] p-8 rounded-xl border border-gray-700">
                                <h3 className="text-xl font-bold text-white mb-6">Why InternMatch+?</h3>
                                <ul className="space-y-4">
                                    {[
                                        "Standardized skill assessments for fair evaluation.",
                                        "Real-world project listings, not just coffee runs.",
                                        "Direct communication channels with recruiters.",
                                        "Career mentorship and resources included."
                                    ].map((point, idx) => (
                                        <li key={idx} className="flex items-start text-gray-300">
                                            <span className="h-6 w-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mr-3 flex-shrink-0 text-xs font-bold">✓</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-[#0f213e]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Core Values</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">The principles that drive every decision we make.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Users,
                                title: "Student First",
                                desc: "We prioritize the growth and well-being of students, ensuring every opportunity creates learning value."
                            },
                            {
                                icon: Rocket,
                                title: "Continuous Innovation",
                                desc: "We constantly evolve our platform to meet the changing needs of the tech industry."
                            },
                            {
                                icon: Shield,
                                title: "Trust & Transparency",
                                desc: "We maintain high standards for all listings and profiles to ensure a safe and honest community."
                            }
                        ].map((card, idx) => (
                            <div key={idx} className="bg-[#112240] p-8 rounded-xl border border-gray-800 hover:border-green-500 transition-all hover:-translate-y-1">
                                <div className="h-12 w-12 bg-gray-800 rounded-lg flex items-center justify-center text-green-400 mb-6">
                                    <card.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {card.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-[#0a192f]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">The passionate individuals behind InternMatch+</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Aishwarya - Lead Developer */}
                        <div className="bg-[#112240] p-8 rounded-xl border-2 border-green-500 hover:border-green-400 transition-all hover:-translate-y-2 relative overflow-hidden group">
                            {/* Lead Badge */}
                            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                LEAD
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="h-24 w-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6 group-hover:scale-110 transition-transform">
                                    A
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Aishwarya</h3>
                                <p className="text-green-400 font-semibold mb-4">Lead Developer & Architect</p>

                                <div className="w-full text-left space-y-3 mt-4">
                                    <p className="text-sm text-gray-400 font-medium mb-2">Key Contributions:</p>
                                    {[
                                        'Full-stack architecture design',
                                        'Frontend development (React)',
                                        'Backend API development',
                                        'Database design & implementation',
                                        'Authentication system',
                                        'UI/UX implementation',
                                        'Project management'
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start text-gray-300 text-sm">
                                            <span className="h-5 w-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mr-2 flex-shrink-0 text-xs">✓</span>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Kundan - Backend Developer */}
                        <div className="bg-[#112240] p-8 rounded-xl border border-gray-800 hover:border-green-500 transition-all hover:-translate-y-2 group">
                            <div className="flex flex-col items-center text-center">
                                <div className="h-24 w-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6 group-hover:scale-110 transition-transform">
                                    K
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Kundan</h3>
                                <p className="text-blue-400 font-semibold mb-4">Backend Developer</p>

                                <div className="w-full text-left space-y-3 mt-4">
                                    <p className="text-sm text-gray-400 font-medium mb-2">Key Contributions:</p>
                                    {[
                                        'Server-side logic',
                                        'API endpoint development',
                                        'Database optimization',
                                        'Security implementation',
                                        'Testing & debugging'
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start text-gray-300 text-sm">
                                            <span className="h-5 w-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mr-2 flex-shrink-0 text-xs">✓</span>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Jaydeep - UI/UX Designer */}
                        <div className="bg-[#112240] p-8 rounded-xl border border-gray-800 hover:border-green-500 transition-all hover:-translate-y-2 group">
                            <div className="flex flex-col items-center text-center">
                                <div className="h-24 w-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6 group-hover:scale-110 transition-transform">
                                    J
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Jaydeep</h3>
                                <p className="text-purple-400 font-semibold mb-4">UI/UX Designer</p>

                                <div className="w-full text-left space-y-3 mt-4">
                                    <p className="text-sm text-gray-400 font-medium mb-2">Key Contributions:</p>
                                    {[
                                        'User interface design',
                                        'User experience research',
                                        'Design system creation',
                                        'Prototyping & wireframes',
                                        'Visual design elements'
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start text-gray-300 text-sm">
                                            <span className="h-5 w-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mr-2 flex-shrink-0 text-xs">✓</span>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team Stats */}
                    <div className="mt-16 bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-8 rounded-xl border border-green-500/30">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-3xl font-bold text-white mb-2">3</div>
                                <div className="text-gray-400">Team Members</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white mb-2">1000+</div>
                                <div className="text-gray-400">Hours of Development</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white mb-2">100%</div>
                                <div className="text-gray-400">Dedication</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
