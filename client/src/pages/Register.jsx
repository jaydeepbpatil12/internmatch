import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MatrixBackground from '../components/MatrixBackground';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, Briefcase, GraduationCap, Eye, EyeOff } from 'lucide-react';

const Register = () => {
    const [searchParams] = useSearchParams();
    const initialRole = searchParams.get('role') === 'org' ? 'organization' : 'student';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: initialRole
    });

    const [showPassword, setShowPassword] = useState(false);

    // Update role if URL param changes
    useEffect(() => {
        const roleParam = searchParams.get('role');
        if (roleParam === 'org') setFormData(prev => ({ ...prev, role: 'organization' }));
        else setFormData(prev => ({ ...prev, role: 'student' }));
    }, [searchParams]);

    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/register', formData);
            // Auto login after register
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            if (res.data.role === 'student') navigate('/student-dashboard');
            else navigate('/org-dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen bg-[#0a192f] text-gray-300 font-sans selection:bg-green-500/30 selection:text-green-200">
            <Navbar />
            <MatrixBackground />

            <div className="flex items-center justify-center min-h-screen pt-20 px-4 relative z-10">
                <div className="bg-[#112240] p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800 backdrop-blur-sm">
                    <div className="flex justify-center mb-6">
                        <div className="bg-green-500/10 p-4 rounded-full">
                            <UserPlus className="h-8 w-8 text-green-500" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-center mb-2 text-white">Create Account</h2>
                    <p className="text-center text-gray-400 mb-8">Join the internship revolution</p>

                    {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm text-center">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Role Selection Tabs */}
                        <div className="flex bg-[#0a192f] p-1 rounded-lg mb-6 border border-gray-700">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'student' })}
                                className={`flex-1 flex items-center justify-center py-2 rounded-md text-sm font-medium transition-all ${formData.role === 'student'
                                    ? 'bg-green-600 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <GraduationCap className="w-4 h-4 mr-2" />
                                Student
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'organization' })}
                                className={`flex-1 flex items-center justify-center py-2 rounded-md text-sm font-medium transition-all ${formData.role === 'organization'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <Briefcase className="w-4 h-4 mr-2" />
                                Organization
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full bg-[#0a192f] px-4 py-3 rounded-lg border border-gray-700 text-white focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder-gray-600"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full bg-[#0a192f] px-4 py-3 rounded-lg border border-gray-700 text-white focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder-gray-600"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="w-full bg-[#0a192f] px-4 py-3 pr-12 rounded-lg border border-gray-700 text-white focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder-gray-600"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
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

                        <button
                            type="submit"
                            className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-lg transform hover:-translate-y-0.5 ${formData.role === 'student' ? 'bg-green-600 hover:bg-green-700 shadow-green-900/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/20'
                                }`}
                        >
                            {formData.role === 'student' ? 'Sign Up as Student' : 'Sign Up as Organization'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-gray-400 text-sm">
                        Already have an account? <Link to="/login" className="text-green-400 font-bold hover:underline hover:text-green-300">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
