import React from 'react';
import { Sparkles, Zap, Heart, Star, TrendingUp } from 'lucide-react';

/**
 * Animation Examples Component
 * This component showcases various Tailwind CSS animations you can use
 * Copy and paste these examples into your components!
 */

const AnimationExamples = () => {
    return (
        <div className="min-h-screen bg-[#0a192f] text-white p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Tailwind Animation Examples
                </h1>

                {/* Buttons Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-green-400">Animated Buttons</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Glow Pulse Button */}
                        <div className="bg-[#112240] p-6 rounded-lg">
                            <h3 className="text-sm font-semibold mb-4 text-gray-400">Glow Pulse</h3>
                            <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-bold animate-glow-pulse hover:scale-105 transition-transform">
                                Premium CTA
                            </button>
                        </div>

                        {/* Scale on Hover */}
                        <div className="bg-[#112240] p-6 rounded-lg">
                            <h3 className="text-sm font-semibold mb-4 text-gray-400">Scale + Gradient</h3>
                            <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:scale-110 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300">
                                Hover Me
                            </button>
                        </div>

                        {/* Shimmer Effect */}
                        <div className="bg-[#112240] p-6 rounded-lg">
                            <h3 className="text-sm font-semibold mb-4 text-gray-400">Shimmer Effect</h3>
                            <button className="w-full relative overflow-hidden bg-green-600 text-white px-6 py-3 rounded-lg font-bold group">
                                <span className="relative z-10">Shimmer</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shine"></div>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Cards Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-green-400">Animated Cards</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Floating Card */}
                        <div className="bg-[#112240] p-6 rounded-lg border border-gray-800 animate-float-slow hover:border-green-500/50 transition-colors">
                            <Sparkles className="h-8 w-8 text-green-500 mb-4" />
                            <h3 className="text-lg font-bold mb-2">Floating Card</h3>
                            <p className="text-gray-400 text-sm">This card floats gently up and down</p>
                        </div>

                        {/* Hover Lift Card */}
                        <div className="bg-[#112240] p-6 rounded-lg border border-gray-800 hover:border-green-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 cursor-pointer">
                            <Zap className="h-8 w-8 text-green-500 mb-4" />
                            <h3 className="text-lg font-bold mb-2">Hover Lift</h3>
                            <p className="text-gray-400 text-sm">Lifts up on hover with shadow</p>
                        </div>

                        {/* Fade In Card */}
                        <div className="bg-[#112240] p-6 rounded-lg border border-gray-800 animate-fade-in-up hover:border-green-500/50 transition-colors">
                            <Heart className="h-8 w-8 text-green-500 mb-4" />
                            <h3 className="text-lg font-bold mb-2">Fade In Up</h3>
                            <p className="text-gray-400 text-sm">Fades in from bottom on load</p>
                        </div>
                    </div>
                </section>

                {/* Icons Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-green-400">Animated Icons</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {/* Wiggle on Hover */}
                        <div className="bg-[#112240] p-6 rounded-lg text-center group cursor-pointer">
                            <div className="inline-block bg-green-500/10 p-4 rounded-full mb-3 group-hover:animate-wiggle">
                                <Star className="h-8 w-8 text-green-500" />
                            </div>
                            <p className="text-sm text-gray-400">Wiggle</p>
                        </div>

                        {/* Bounce */}
                        <div className="bg-[#112240] p-6 rounded-lg text-center group cursor-pointer">
                            <div className="inline-block bg-green-500/10 p-4 rounded-full mb-3 group-hover:animate-bounce-slow">
                                <TrendingUp className="h-8 w-8 text-green-500" />
                            </div>
                            <p className="text-sm text-gray-400">Bounce</p>
                        </div>

                        {/* Spin */}
                        <div className="bg-[#112240] p-6 rounded-lg text-center group cursor-pointer">
                            <div className="inline-block bg-green-500/10 p-4 rounded-full mb-3 group-hover:animate-spin-slow">
                                <Sparkles className="h-8 w-8 text-green-500" />
                            </div>
                            <p className="text-sm text-gray-400">Spin</p>
                        </div>

                        {/* Float */}
                        <div className="bg-[#112240] p-6 rounded-lg text-center">
                            <div className="inline-block bg-green-500/10 p-4 rounded-full mb-3 animate-float">
                                <Zap className="h-8 w-8 text-green-500" />
                            </div>
                            <p className="text-sm text-gray-400">Float</p>
                        </div>
                    </div>
                </section>

                {/* Backgrounds Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-green-400">Animated Backgrounds</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Gradient Animation */}
                        <div className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 p-8 rounded-lg animate-gradient-xy">
                            <h3 className="text-xl font-bold mb-2">Gradient XY</h3>
                            <p className="text-green-50">Animated diagonal gradient background</p>
                        </div>

                        {/* Shimmer Background */}
                        <div className="relative overflow-hidden bg-[#112240] p-8 rounded-lg border border-gray-800">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent animate-shimmer"></div>
                            <h3 className="text-xl font-bold mb-2 relative z-10">Shimmer</h3>
                            <p className="text-gray-400 relative z-10">Continuous shimmer effect</p>
                        </div>
                    </div>
                </section>

                {/* List Items Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-green-400">Staggered List Animation</h2>
                    <div className="bg-[#112240] p-6 rounded-lg">
                        {['First Item', 'Second Item', 'Third Item', 'Fourth Item'].map((item, idx) => (
                            <div
                                key={idx}
                                className="p-4 mb-2 bg-[#0a192f] rounded-lg border border-gray-800 hover:border-green-500/50 transition-all duration-300 animate-fade-in-up cursor-pointer"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Text Effects Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-green-400">Text Effects</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Shimmer Text */}
                        <div className="bg-[#112240] p-8 rounded-lg">
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent animate-text-shimmer">
                                Shimmering Text
                            </h3>
                        </div>

                        {/* Gradient Text */}
                        <div className="bg-[#112240] p-8 rounded-lg">
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                Gradient Text
                            </h3>
                        </div>
                    </div>
                </section>

                {/* Loading States Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-green-400">Loading States</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Pulse */}
                        <div className="bg-[#112240] p-6 rounded-lg">
                            <div className="h-4 bg-gray-700 rounded animate-pulse mb-3"></div>
                            <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
                        </div>

                        {/* Shimmer Skeleton */}
                        <div className="bg-[#112240] p-6 rounded-lg">
                            <div className="relative overflow-hidden h-4 bg-gray-700 rounded mb-3">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
                            </div>
                            <div className="relative overflow-hidden h-4 bg-gray-700 rounded w-3/4">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
                            </div>
                        </div>

                        {/* Slow Pulse */}
                        <div className="bg-[#112240] p-6 rounded-lg">
                            <div className="h-4 bg-gray-700 rounded animate-pulse-slow mb-3"></div>
                            <div className="h-4 bg-gray-700 rounded animate-pulse-slow w-3/4"></div>
                        </div>
                    </div>
                </section>

                {/* Code Examples */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-green-400">Quick Copy Examples</h2>
                    <div className="space-y-4">
                        <div className="bg-[#112240] p-4 rounded-lg border border-gray-800">
                            <p className="text-xs text-gray-500 mb-2">Premium Button</p>
                            <code className="text-sm text-green-400">
                                className="bg-gradient-to-r from-green-600 to-emerald-600 animate-glow-pulse hover:scale-105 transition-transform"
                            </code>
                        </div>
                        <div className="bg-[#112240] p-4 rounded-lg border border-gray-800">
                            <p className="text-xs text-gray-500 mb-2">Floating Card</p>
                            <code className="text-sm text-green-400">
                                className="animate-float-slow hover:shadow-green-500/20 transition-shadow"
                            </code>
                        </div>
                        <div className="bg-[#112240] p-4 rounded-lg border border-gray-800">
                            <p className="text-xs text-gray-500 mb-2">Hover Lift Card</p>
                            <code className="text-sm text-green-400">
                                className="hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300"
                            </code>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AnimationExamples;
