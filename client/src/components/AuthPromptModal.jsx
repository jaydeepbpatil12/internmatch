import React from 'react';
import { Link } from 'react-router-dom';
import { X, LogIn, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthPromptModal = ({ isOpen, onClose, message = "Please sign in to continue" }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-[#112240] border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>

                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="bg-green-500/10 p-4 rounded-full">
                                    <LogIn className="h-12 w-12 text-green-400" />
                                </div>
                            </div>

                            {/* Content */}
                            <h2 className="text-2xl font-bold text-white text-center mb-3">
                                Authentication Required
                            </h2>
                            <p className="text-gray-400 text-center mb-8">
                                {message}
                            </p>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Link
                                    to="/login"
                                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-green-500/20"
                                >
                                    <LogIn className="h-5 w-5" />
                                    Sign In
                                </Link>

                                <Link
                                    to="/register"
                                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-transparent border border-gray-600 text-white font-bold rounded-lg hover:border-green-500 hover:text-green-400 transition-all"
                                >
                                    <UserPlus className="h-5 w-5" />
                                    Create Account
                                </Link>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-6 pt-6 border-t border-gray-700">
                                <p className="text-xs text-gray-500 text-center">
                                    By signing in, you'll get access to personalized matches,
                                    save opportunities, and track your applications.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AuthPromptModal;
