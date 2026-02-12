import React from 'react';
import Navbar from '../components/Navbar';
import MatrixBackground from '../components/MatrixBackground';
import { Search } from 'lucide-react';

const Browse = () => {
    return (
        <div className="min-h-screen bg-[#0a192f] text-gray-300 font-sans selection:bg-green-500/30 selection:text-green-200">
            <Navbar />
            <MatrixBackground />

            <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Browse Opportunities</h1>
                    <div className="bg-[#112240] p-1 rounded-lg border border-gray-700 flex items-center w-full md:w-96">
                        <Search className="text-gray-400 ml-4 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-white px-4 py-2 w-full placeholder-gray-500 focus:ring-0"
                        />
                    </div>
                </div>

                <div className="grid gap-6">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="bg-[#112240] p-6 rounded-xl border border-gray-800 hover:border-green-500 transition-all group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Software Engineer Intern</h3>
                                    <p className="text-gray-400 mb-4">TechCorp Inc. • Remote • 12 Weeks</p>
                                    <div className="flex gap-2">
                                        <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs">React</span>
                                        <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs">Node.js</span>
                                    </div>
                                </div>
                                <button className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
                                    Apply
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Browse;
