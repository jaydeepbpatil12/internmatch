import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthPromptModal from './AuthPromptModal';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Load user info on mount and when location changes
    useEffect(() => {
        const loadUserInfo = () => {
            const storedUserInfo = localStorage.getItem('userInfo');
            if (storedUserInfo) {
                try {
                    setUserInfo(JSON.parse(storedUserInfo));
                } catch (error) {
                    console.error('Error parsing user info:', error);
                    setUserInfo(null);
                }
            } else {
                setUserInfo(null);
            }
        };

        loadUserInfo();

        // Listen for storage changes (when user logs in/out in another tab)
        window.addEventListener('storage', loadUserInfo);

        return () => window.removeEventListener('storage', loadUserInfo);
    }, [location]);

    // Check if user is authenticated
    const isAuthenticated = () => {
        return userInfo !== null;
    };

    // Handle logout
    const handleLogout = () => {
        // Get current user info before clearing
        const currentUserInfo = localStorage.getItem('userInfo');
        let userId = 'default';
        if (currentUserInfo) {
            try {
                const parsed = JSON.parse(currentUserInfo);
                userId = parsed.email || parsed.id || 'default';
            } catch (e) {
                console.error('Error parsing user info:', e);
            }
        }

        // Clear all user-related data from localStorage
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        localStorage.removeItem(`studentProfile_${userId}`);
        localStorage.removeItem(`studentApplications_${userId}`);
        localStorage.removeItem(`orgProfile_${userId}`);
        localStorage.removeItem(`orgListings_${userId}`);
        localStorage.removeItem(`orgApplicants_${userId}`);

        // Also clear old non-user-specific keys (for backwards compatibility)
        localStorage.removeItem('studentProfile');
        localStorage.removeItem('studentApplications');
        localStorage.removeItem('orgProfile');
        localStorage.removeItem('orgListings');
        localStorage.removeItem('orgApplicants');

        setUserInfo(null);
        setIsOpen(false);
        navigate('/');
    };

    // Handle protected link clicks
    const handleProtectedClick = (e, item) => {
        if (item === 'Browse' && !isAuthenticated()) {
            e.preventDefault();
            setShowAuthModal(true);
            setIsOpen(false);
        }
    };

    // Get dashboard link based on role
    const getDashboardLink = () => {
        if (!userInfo) return '/';
        return userInfo.role === 'student' ? '/student-dashboard' : '/org-dashboard';
    };

    return (
        <>
            <nav className="fixed w-full z-50 bg-[#0a192f]/90 backdrop-blur-md border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link to="/" className="text-2xl font-bold text-white tracking-tight hover:scale-105 transition-transform duration-300 group">
                            InternMatch<span className="text-green-500 group-hover:animate-pulse">+</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {['Home', 'About', 'Browse', 'For Students', 'For Organizations'].map((item) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                    onClick={(e) => handleProtectedClick(e, item)}
                                    className="text-sm font-medium text-gray-300 hover:text-green-400 transition-all duration-300 relative group"
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            ))}

                            <div className="flex items-center space-x-4 ml-4">
                                {isAuthenticated() ? (
                                    <>
                                        <Link
                                            to={getDashboardLink()}
                                            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition-all"
                                        >
                                            <User className="h-4 w-4" />
                                            {userInfo.name}
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 px-4 py-2 rounded-md border-2 border-red-600 text-red-400 text-sm font-medium hover:bg-red-600 hover:text-white transition-all"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="px-5 py-2 rounded-md bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-green-500/30 hover:scale-105 animate-glow-pulse">
                                            Sign In
                                        </Link>
                                        <Link to="/register" className="px-5 py-2 rounded-md border-2 border-gray-600 text-gray-300 text-sm font-medium hover:border-green-500 hover:text-green-500 transition-all hover:scale-105">
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-300 hover:text-green-500 focus:outline-none transition-colors duration-300"
                            >
                                {isOpen ? <X className="h-6 w-6 animate-spin-slow" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-[#0a192f] border-b border-gray-800 overflow-hidden"
                        >
                            <div className="px-4 pt-2 pb-6 space-y-2">
                                {['Home', 'About', 'Browse', 'For Students', 'For Organizations'].map((item) => (
                                    <Link
                                        key={item}
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                        onClick={(e) => {
                                            handleProtectedClick(e, item);
                                            if (item !== 'Browse' || isAuthenticated()) {
                                                setIsOpen(false);
                                            }
                                        }}
                                        className="block px-3 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-green-400 hover:bg-white/5 transition-all duration-300 hover:translate-x-2"
                                    >
                                        {item}
                                    </Link>
                                ))}
                                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-800">
                                    {isAuthenticated() ? (
                                        <>
                                            <Link
                                                to={getDashboardLink()}
                                                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-700 transition-all"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <User className="h-4 w-4" />
                                                {userInfo.name}
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border-2 border-red-600 text-red-400 font-medium hover:bg-red-600 hover:text-white transition-all"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className="block w-full text-center py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold hover:from-green-700 hover:to-emerald-700 transition-all"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Sign In
                                            </Link>
                                            <Link
                                                to="/register"
                                                className="block w-full text-center py-3 rounded-lg border-2 border-gray-700 text-gray-300 font-medium hover:border-green-500 hover:text-green-400 transition-all"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Auth Prompt Modal */}
            <AuthPromptModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                message="Sign in to browse all opportunities and get personalized matches"
            />
        </>
    );
};

export default Navbar;
