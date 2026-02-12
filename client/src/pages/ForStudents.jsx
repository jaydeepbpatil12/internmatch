 import React from 'react';
import Navbar from '../components/Navbar';
import MatrixBackground from '../components/MatrixBackground';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Code, BookOpen, Users, Trophy } from 'lucide-react';

const ForStudents = () => {
    return (
        <div className="min-h-screen bg-[#0a192f] text-gray-300 font-sans selection:bg-green-500/30 selection:text-green-200">
            <Navbar />
            <MatrixBackground />

            <div className="pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
                {/* Hero */}
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Launch Your <span className="text-green-500">Tech Career</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        Stop Sending Resumes into the Void. Get matched with internships that actually fit your skills.
                    </p>
                    <Link to="/register" className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-green-500/20 inline-block text-lg">
                        Create Student Profile
                    </Link>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-[#112240] p-8 rounded-2xl border border-gray-800">
                        <Code className="h-10 w-10 text-green-400 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">Skill-Based Matching</h3>
                        <p className="text-gray-400">
                            We analyze your GitHub and portfolio to match you with roles that need your specific tech stack. No more generic applications.
                        </p>
                    </div>
                    <div className="bg-[#112240] p-8 rounded-2xl border border-gray-800">
                        <Trophy className="h-10 w-10 text-yellow-400 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">Showcase Your Work</h3>
                        <p className="text-gray-400">
                            Your projects matter more here than your GPA. Highlight your best repos and live demos directly on your profile.
                        </p>
                    </div>
                    <div className="bg-[#112240] p-8 rounded-2xl border border-gray-800">
                        <Users className="h-10 w-10 text-blue-400 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">Direct Connections</h3>
                        <p className="text-gray-400">
                            Chat directly with engineering managers and founders. Skip the HR filtering bots.
                        </p>
                    </div>
                    <div className="bg-[#112240] p-8 rounded-2xl border border-gray-800">
                        <BookOpen className="h-10 w-10 text-pink-400 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">Learn & Grow</h3>
                        <p className="text-gray-400">
                            Access resources, mentorship, and feedback to improve your code and interview skills.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ForStudents;
