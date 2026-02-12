import React from 'react';
import Navbar from '../components/Navbar';
import MatrixBackground from '../components/MatrixBackground';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Target, Search, Clock, ShieldCheck } from 'lucide-react';

const ForOrganizations = () => {
    return (
        <div className="min-h-screen bg-[#0a192f] text-gray-300 font-sans selection:bg-green-500/30 selection:text-green-200">
            <Navbar />
            <MatrixBackground />

            <div className="pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
                {/* Hero */}
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Hire the <span className="text-blue-500">Future of Tech</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        Streamline your internship hiring. Find pre-vetted, skilled candidates ready to contribute from day one.
                    </p>
                    <Link to="/register?role=org" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20 inline-block text-lg">
                        Post an Opportunity
                    </Link>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-[#112240] p-8 rounded-2xl border border-gray-800">
                        <Target className="h-10 w-10 text-green-400 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">Precision Matching</h3>
                        <p className="text-gray-400">
                            Our algorithms match candidates based on actual code proficiency and project experience, not just keywords on a resume.
                        </p>
                    </div>
                    <div className="bg-[#112240] p-8 rounded-2xl border border-gray-800">
                        <Clock className="h-10 w-10 text-orange-400 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">Save Countless Hours</h3>
                        <p className="text-gray-400">
                            Stop sifting through hundreds of irrelevant applications. Get a curated list of top matches instantly.
                        </p>
                    </div>
                    <div className="bg-[#112240] p-8 rounded-2xl border border-gray-800">
                        <ShieldCheck className="h-10 w-10 text-blue-400 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">Verified Skills</h3>
                        <p className="text-gray-400">
                            We verify student skills through coding challenges and project analysis so you can hire with confidence.
                        </p>
                    </div>
                    <div className="bg-[#112240] p-8 rounded-2xl border border-gray-800">
                        <Search className="h-10 w-10 text-purple-400 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">Diverse Talent Pool</h3>
                        <p className="text-gray-400">
                            Access a global pool of motivated students from top universities and bootcamps.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ForOrganizations;
