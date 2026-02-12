import React from 'react';
import { Briefcase, Twitter, Linkedin, Instagram, Github, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
return (
<footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div>
                        <Link to="/" className="flex items-center space-x-2 mb-6 group">
                            <div className="bg-green-600 p-2 rounded-lg group-hover:animate-wiggle transition-all">
                                <Briefcase className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                InternMatch+
                            </span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Empowering the next generation of tech talent. We connect ambitious students with world-class organizations for meaningful internships and projects.
                        </p>
                        <div className="flex space-x-4">
                            {[Twitter, Linkedin, Instagram, Github].map((Icon, index) => (
                                <a key={index} href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 group">
                                <Icon className="h-5 w-5 group-hover:animate-wiggle" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Platform</h4>
                        <ul className="space-y-4">
                            {['Browse Internships', 'Post a Job', 'Student Success', 'Employer Guide'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-slate-400 hover:text-green-400 transition-all duration-300 flex items-center group hover:translate-x-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-600 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Resources</h4>
                        <ul className="space-y-4">
                            {['About Us', 'Contact Support', 'Privacy Policy', 'Terms of Service'].map((item) => (
                                <li key={item}>
                                    <Link to={item === 'About Us' ? '/about' : item === 'Contact Support' ? '/contact-support' : '#'} className="text-slate-400 hover:text-green-400 transition-all duration-300 flex items-center group hover:translate-x-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-600 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Get in Touch</h4>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3 text-slate-400 group hover:text-green-400 transition-colors">
                                <MapPin className="h-5 w-5 text-green-500 mt-1 flex-shrink-0 group-hover:animate-bounce-slow" />
                                <span>Phagwara, Punjab<br />India</span>
                            </div>
                            <a href="mailto:jaydeeppatil@gmail.com" className="flex items-center space-x-3 text-slate-400 group hover:text-green-400 transition-colors">
                                <Mail className="h-5 w-5 text-green-500 flex-shrink-0 group-hover:animate-wiggle" />
                                <span>jaydeeppatil@gmail.com</span>
                            </a>
                            <a href="tel:+911234567890" className="flex items-center space-x-3 text-slate-400 group hover:text-green-400 transition-colors">
                                <Phone className="h-5 w-5 text-green-500 flex-shrink-0 group-hover:animate-wiggle" />
                                <span>+91 1234567890</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} InternMatch+. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-green-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-green-400 transition-colors">Terms</a>
                        <a href="#" className="hover:text-green-400 transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;