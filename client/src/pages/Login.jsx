import React from 'react';
import Navbar from '../components/Navbar';
import MatrixBackground from '../components/MatrixBackground';
import { Link } from 'react-router-dom';
import { GraduationCap, Briefcase } from 'lucide-react';

const Login = () => {
    return (
        <div className="min-h-screen bg-[#0a192f] text-gray-300 font-sans selection:bg-green-500/30 selection:text-green-200">
            <Navbar />
            <MatrixBackground />

            <div className="flex items-center justify-center min-h-screen pt-16 relative z-10 px-4">
                <div className="max-w-4xl w-full">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Welcome Back!
                        </h1>
                        <p className="text-xl text-gray-400">
                            Choose your account type to continue
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Student Login Card */}
                        <Link
                            to="/student-login"
                            className="group bg-[#112240] p-8 rounded-2xl border-2 border-gray-800 hover:border-green-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-green-500/10 p-6 rounded-full mb-6 group-hover:bg-green-500/20 transition-all">
                                    <GraduationCap className="h-16 w-16 text-green-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                                    Student Login
                                </h2>
                                <p className="text-gray-400 mb-6">
                                    Find and apply for internships that match your skills and interests
                                </p>
                                <div className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg group-hover:from-green-700 group-hover:to-emerald-700 transition-all">
                                    Sign In as Student →
                                </div>
                            </div>
                        </Link>

                        {/* Organization Login Card */}
                        <Link
                            to="/org-login"
                            className="group bg-[#112240] p-8 rounded-2xl border-2 border-gray-800 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-blue-500/10 p-6 rounded-full mb-6 group-hover:bg-blue-500/20 transition-all">
                                    <Briefcase className="h-16 w-16 text-blue-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                    Organization Login
                                </h2>
                                <p className="text-gray-400 mb-6">
                                    Post internships and find talented students for your organization
                                </p>
                                <div className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg group-hover:from-blue-700 group-hover:to-indigo-700 transition-all">
                                    Sign In as Organization →
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-gray-400 text-sm">
                            Don't have an account? <Link to="/register" className="text-green-400 font-bold hover:underline hover:text-green-300 transition-colors">Sign up here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
