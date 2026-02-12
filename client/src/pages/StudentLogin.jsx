import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import MatrixBackground from '../components/MatrixBackground';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';

const StudentLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', formData);

            // Check if user is actually a student
            if (res.data.role !== 'student') {
                setError('This account is not registered as a student. Please use the organization login.');
                return;
            }

            localStorage.setItem('userInfo', JSON.stringify(res.data));

            // Redirect to student dashboard
            const from = location.state?.from?.pathname || '/student-dashboard';
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-[#0a192f] text-gray-300 font-sans selection:bg-green-500/30 selection:text-green-200">
            <Navbar />
            <MatrixBackground />

            <div className="flex items-center justify-center min-h-screen pt-16 relative z-10 px-4">
                <div className="bg-[#112240] p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800 backdrop-blur-sm animate-scale-in hover:shadow-green-500/20 transition-shadow duration-500">
                    <div className="flex justify-center mb-6">
                        <div className="bg-green-500/10 p-4 rounded-full animate-float">
                            <GraduationCap className="h-8 w-8 text-green-500" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-center mb-2 text-white">Student Login</h2>
                    <p className="text-center text-gray-400 mb-8">Sign in to find your dream internship</p>

                    {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm text-center animate-fade-in-down">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                            <input
                                type="email"
                                className="w-full bg-[#0a192f] px-4 py-3 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder-gray-600 hover:border-gray-600"
                                placeholder="student@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full bg-[#0a192f] px-4 py-3 pr-12 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder-gray-600 hover:border-gray-600"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-900/20 transform hover:-translate-y-1 hover:scale-105 animate-glow-pulse animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            Sign In as Student
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm mb-4">
                            Don't have an account? <Link to="/register?role=student" className="text-green-400 font-bold hover:underline hover:text-green-300 transition-colors">Sign up as Student</Link>
                        </p>
                        <p className="text-gray-500 text-xs">
                            Are you an organization? <Link to="/org-login" className="text-blue-400 hover:underline">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentLogin;
