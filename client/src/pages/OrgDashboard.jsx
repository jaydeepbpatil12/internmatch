import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import MatrixBackground from '../components/MatrixBackground';
import {
    LayoutDashboard,
    PlusCircle,
    Users,
    Briefcase,
    Settings,
    Search,
    Code,
    Clock,
    MapPin,
    CheckCircle,
    XCircle,
    MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OrgDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [listings, setListings] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [approvedCandidates, setApprovedCandidates] = useState([]);
    const [editingListing, setEditingListing] = useState(null);

    // Messaging state
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [messageForm, setMessageForm] = useState({
        subject: '',
        message: ''
    });

    // Form state for posting/editing jobs
    const [jobForm, setJobForm] = useState({
        title: '',
        location: '',
        type: 'Internship',
        duration: '',
        category: 'Development',
        description: '',
        skills: [],
        skillInput: '',
        requirements: '',
        stipend: '',
        company: ''
    });

    // Organization profile state - will be loaded from userInfo
    const [orgProfile, setOrgProfile] = useState({
        name: '',
        email: '',
        website: '',
        description: '',
        industry: '',
        size: '',
        location: ''
    });

    // Load data on mount and initialize user-specific data
    React.useEffect(() => {
        // Get current user info
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        console.log('🔐 Current User Info:', userInfo);

        // Initialize org profile with user data if not already set
        const userId = userInfo.email || userInfo.id || 'default';
        const savedProfile = JSON.parse(localStorage.getItem(`orgProfile_${userId}`) || '{}');

        if (Object.keys(savedProfile).length > 0) {
            setOrgProfile(savedProfile);
        } else {
            // Set default profile from userInfo
            setOrgProfile({
                name: userInfo.name || 'Organization',
                email: userInfo.email || '',
                website: '',
                description: '',
                industry: '',
                size: '',
                location: ''
            });
        }

        loadListings();
        loadApplicants();
        loadApprovedCandidates();
        loadOrgProfile();
    }, []);

    // Update job form company name when org profile changes
    React.useEffect(() => {
        setJobForm(prev => ({
            ...prev,
            company: orgProfile.name
        }));
    }, [orgProfile.name]);

    // Reload applicants when switching to applicants tab
    React.useEffect(() => {
        if (activeTab === 'applicants') {
            loadApplicants();
        } else if (activeTab === 'approved') {
            loadApprovedCandidates();
        }
    }, [activeTab]);

    // Helper to get current user ID
    const getUserId = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        return userInfo.email || userInfo.id || 'default';
    };

    const loadListings = () => {
        console.log('📋 Loading listings...');
        const userId = getUserId();
        console.log('👤 User ID:', userId);

        // Load org-specific listings
        const savedListings = JSON.parse(localStorage.getItem(`orgListings_${userId}`) || '[]');
        console.log('💼 Org Listings:', savedListings);
        console.log('📊 Listings Count:', savedListings.length);

        // Also check shared internships posted by this org
        const sharedInternships = JSON.parse(localStorage.getItem('sharedInternships') || '[]');
        const orgSharedJobs = sharedInternships.filter(job =>
            job.postedBy === userId || job.company === orgProfile.name
        );
        console.log('🌐 Org Shared Internships:', orgSharedJobs);
        console.log('📈 Shared Count:', orgSharedJobs.length);

        // Merge both - show all jobs posted by this org
        const allListings = [...orgSharedJobs];
        savedListings.forEach(orgListing => {
            const existingIndex = allListings.findIndex(job =>
                (job._id && job._id === orgListing._id) || (job.id && job.id === orgListing.id)
            );
            if (existingIndex >= 0) {
                allListings[existingIndex] = orgListing; // Use org version (has updates)
            } else {
                allListings.push(orgListing); // Add if not in shared
            }
        });

        console.log('✅ Final Merged Listings:', allListings);
        console.log('📈 Total Count:', allListings.length);

        setListings(allListings);
    };

    const loadApplicants = () => {
        console.log('🔍 Loading applicants...');
        const userId = getUserId();

        // Load from shared applications (real student applications)
        const sharedApplications = JSON.parse(localStorage.getItem('sharedApplications') || '[]');
        console.log('📦 Shared Applications from localStorage:', sharedApplications);
        console.log('📊 Shared Applications Count:', sharedApplications.length);

        // Also load any org-specific saved applicants (for status updates)
        const savedApplicants = JSON.parse(localStorage.getItem(`orgApplicants_${userId}`) || '[]');
        console.log('💾 Org Saved Applicants:', savedApplicants);

        // Merge shared applications with saved applicants (prioritize saved for status updates)
        const mergedApplicants = sharedApplications.map(sharedApp => {
            const savedApp = savedApplicants.find(saved => saved.id === sharedApp.id);
            return savedApp || sharedApp; // Use saved version if exists (has updated status)
        });

        // Filter out rejected applicants - they should not be shown
        const activeApplicants = mergedApplicants.filter(app => app.status !== 'Rejected');

        console.log('✅ Final Merged Applicants:', activeApplicants);
        console.log('📈 Final Count:', activeApplicants.length);
        console.log('🚫 Rejected Count:', mergedApplicants.length - activeApplicants.length);

        setApplicants(activeApplicants);
    };

    const loadApprovedCandidates = () => {
        console.log('🎉 Loading approved candidates...');
        const userId = getUserId();

        // Load from shared applications
        const sharedApplications = JSON.parse(localStorage.getItem('sharedApplications') || '[]');

        // Also load any org-specific saved applicants
        const savedApplicants = JSON.parse(localStorage.getItem(`orgApplicants_${userId}`) || '[]');

        // Merge and get latest status
        const mergedApplicants = sharedApplications.map(sharedApp => {
            const savedApp = savedApplicants.find(saved => saved.id === sharedApp.id);
            return savedApp || sharedApp;
        });

        // Filter only approved/accepted/hired candidates
        const approved = mergedApplicants.filter(app =>
            app.status === 'Accepted' || app.status === 'Hired'
        );

        console.log('✅ Approved Candidates:', approved);
        console.log('📊 Approved Count:', approved.length);

        setApprovedCandidates(approved);
    };

    const loadOrgProfile = () => {
        const userId = getUserId();
        const savedProfile = JSON.parse(localStorage.getItem(`orgProfile_${userId}`) || '{}');
        if (Object.keys(savedProfile).length > 0) {
            setOrgProfile(savedProfile);
        }
    };

    const handleJobFormChange = (field, value) => {
        setJobForm(prev => ({ ...prev, [field]: value }));
    };

    const handleAddSkill = (e) => {
        if (e.key === 'Enter' && jobForm.skillInput.trim()) {
            e.preventDefault();
            setJobForm(prev => ({
                ...prev,
                skills: [...prev.skills, prev.skillInput.trim()],
                skillInput: ''
            }));
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setJobForm(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    const handleSubmitJob = async (e) => {
        e.preventDefault();

        if (!jobForm.title || !jobForm.location || !jobForm.description) {
            alert('Please fill in all required fields');
            return;
        }

        const newListing = {
            id: editingListing ? editingListing.id : Date.now(),
            _id: editingListing ? editingListing._id : Date.now().toString(),
            ...jobForm,
            title: jobForm.title,
            applicants: editingListing ? editingListing.applicants : 0,
            status: 'Active',
            posted: editingListing ? editingListing.posted : 'Just now',
            createdAt: editingListing ? editingListing.createdAt : new Date().toISOString(),
            postedBy: getUserId() // Add who posted it
        };

        try {
            // Save to MongoDB backend
            const response = await fetch('http://localhost:5000/api/internships', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: newListing.title,
                    company: newListing.company,
                    location: newListing.location,
                    type: newListing.type,
                    duration: newListing.duration,
                    category: newListing.category,
                    description: newListing.description,
                    requirements: newListing.requirements,
                    skills: newListing.skills,
                    stipend: newListing.stipend,
                    status: 'Active'
                })
            });

            const data = await response.json();
            console.log('✅ Saved to MongoDB:', data);

            // Update listing with MongoDB _id if available
            if (data._id) {
                newListing._id = data._id;
            }
        } catch (error) {
            console.error('❌ Failed to save to MongoDB:', error);
            // Continue with localStorage save even if backend fails
        }

        let updatedListings;
        if (editingListing) {
            updatedListings = listings.map(listing =>
                listing.id === editingListing.id ? newListing : listing
            );
            alert('Listing updated successfully!');
        } else {
            updatedListings = [newListing, ...listings];
            alert('Opportunity posted successfully!');
        }

        // Save to org-specific listings
        setListings(updatedListings);
        const userId = getUserId();
        localStorage.setItem(`orgListings_${userId}`, JSON.stringify(updatedListings));

        // ALSO save to global shared internships list for students to browse
        const globalInternships = JSON.parse(localStorage.getItem('sharedInternships') || '[]');

        if (editingListing) {
            // Update existing in global list
            const updatedGlobal = globalInternships.map(job =>
                job._id === newListing._id ? newListing : job
            );
            localStorage.setItem('sharedInternships', JSON.stringify(updatedGlobal));
        } else {
            // Add new to global list
            const updatedGlobal = [newListing, ...globalInternships];
            localStorage.setItem('sharedInternships', JSON.stringify(updatedGlobal));
        }

        // Reset form
        setJobForm({
            title: '',
            location: '',
            type: 'Internship',
            duration: '',
            category: 'Development',
            description: '',
            skills: [],
            skillInput: '',
            requirements: '',
            stipend: '',
            company: orgProfile.name
        });
        setEditingListing(null);
        setActiveTab('listings');
    };

    const handleEditListing = (listing) => {
        setJobForm({
            title: listing.title,
            location: listing.location,
            type: listing.type,
            duration: listing.duration,
            category: listing.category,
            description: listing.description,
            skills: listing.skills || [],
            skillInput: '',
            requirements: listing.requirements || '',
            stipend: listing.stipend || '',
            company: listing.company
        });
        setEditingListing(listing);
        setActiveTab('post-job');
    };

    const handleDeleteListing = (listingId) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            const listingToDelete = listings.find(l => l.id === listingId);
            const updatedListings = listings.filter(listing => listing.id !== listingId);
            setListings(updatedListings);
            const userId = getUserId();
            localStorage.setItem(`orgListings_${userId}`, JSON.stringify(updatedListings));

            // Also remove from shared internships
            if (listingToDelete) {
                const sharedJobs = JSON.parse(localStorage.getItem('sharedInternships') || '[]');
                const updatedShared = sharedJobs.filter(job => job._id !== listingToDelete._id);
                localStorage.setItem('sharedInternships', JSON.stringify(updatedShared));
            }

            alert('Listing deleted successfully!');
        }
    };

    const handleToggleListingStatus = (listingId) => {
        const updatedListings = listings.map(listing => {
            if (listing.id === listingId) {
                return {
                    ...listing,
                    status: listing.status === 'Active' ? 'Closed' : 'Active'
                };
            }
            return listing;
        });
        setListings(updatedListings);
        const userId = getUserId();
        localStorage.setItem(`orgListings_${userId}`, JSON.stringify(updatedListings));

        // Also update in shared internships
        const sharedJobs = JSON.parse(localStorage.getItem('sharedInternships') || '[]');
        const updatedShared = sharedJobs.map(job => {
            const updatedListing = updatedListings.find(l => l._id === job._id);
            return updatedListing ? updatedListing : job;
        });
        localStorage.setItem('sharedInternships', JSON.stringify(updatedShared));
    };

    const handleApplicantAction = (applicantId, newStatus) => {
        const updatedApplicants = applicants.map(applicant => {
            if (applicant.id === applicantId) {
                return { ...applicant, status: newStatus };
            }
            return applicant;
        });
        setApplicants(updatedApplicants);
        const userId = getUserId();
        localStorage.setItem(`orgApplicants_${userId}`, JSON.stringify(updatedApplicants));

        // Also update in shared applications
        const sharedApplications = JSON.parse(localStorage.getItem('sharedApplications') || '[]');
        const updatedShared = sharedApplications.map(app => {
            if (app.id === applicantId) {
                return { ...app, status: newStatus };
            }
            return app;
        });
        localStorage.setItem('sharedApplications', JSON.stringify(updatedShared));

        alert(`Applicant status updated to: ${newStatus}`);

        // Reload approved candidates if status is Accepted or Hired
        if (newStatus === 'Accepted' || newStatus === 'Hired') {
            loadApprovedCandidates();
        }
    };

    const handleSaveOrgProfile = () => {
        const userId = getUserId();
        localStorage.setItem(`orgProfile_${userId}`, JSON.stringify(orgProfile));
        alert('Organization profile updated successfully!');
    };

    const handleSendMessage = (candidate) => {
        setSelectedCandidate(candidate);
        setMessageForm({
            subject: `Message from ${orgProfile.name}`,
            message: ''
        });
        setShowMessageModal(true);
    };

    const handleSubmitMessage = async () => {
        if (!messageForm.message.trim()) {
            alert('Please enter a message');
            return;
        }

        try {
            // Send to backend API
            const response = await fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: orgProfile.name,
                    fromEmail: orgProfile.email,
                    fromType: 'Organization',
                    to: selectedCandidate.name,
                    toEmail: selectedCandidate.email,
                    toType: 'Student',
                    subject: messageForm.subject,
                    message: messageForm.message
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('✅ Message sent to database:', data);
                alert(`Message sent successfully to ${selectedCandidate.name}!`);
            } else {
                throw new Error(data.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('❌ Error sending message:', error);

            // Fallback to localStorage if API fails
            const message = {
                id: Date.now().toString(),
                from: orgProfile.name,
                fromEmail: orgProfile.email,
                fromType: 'Organization',
                to: selectedCandidate.name,
                toEmail: selectedCandidate.email,
                toType: 'Student',
                subject: messageForm.subject,
                message: messageForm.message,
                timestamp: new Date().toISOString(),
                read: false
            };

            const messages = JSON.parse(localStorage.getItem('organizationMessages') || '[]');
            messages.push(message);
            localStorage.setItem('organizationMessages', JSON.stringify(messages));

            alert(`Message sent successfully to ${selectedCandidate.name}! (Saved locally)`);
        }

        // Reset and close modal
        setShowMessageModal(false);
        setSelectedCandidate(null);
        setMessageForm({ subject: '', message: '' });
    };

    // Mock Data for stats
    const stats = [
        { label: 'Active Listings', value: listings.filter(l => l.status === 'Active').length.toString(), icon: Briefcase, color: 'text-blue-400' },
        { label: 'Total Applicants', value: applicants.length.toString(), icon: Users, color: 'text-green-400' },
        { label: 'Pending Review', value: applicants.filter(a => a.status === 'Pending' || a.status === 'Reviewing').length.toString(), icon: Clock, color: 'text-purple-400' },
        { label: 'Accepted', value: applicants.filter(a => a.status === 'Accepted' || a.status === 'Hired').length.toString(), icon: CheckCircle, color: 'text-pink-400' },
    ];

    return (
        <div className="min-h-screen bg-[#0a192f] text-gray-300 font-sans selection:bg-green-500/30 selection:text-green-200">
            <Navbar />
            <MatrixBackground />

            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 relative z-10">

                {/* Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-[#112240] rounded-xl border border-gray-800 p-6 sticky top-24">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="h-10 w-10 rounded-lg bg-green-600 flex items-center justify-center font-bold text-white text-xl">
                                {orgProfile.name ? orgProfile.name.charAt(0).toUpperCase() : 'O'}
                            </div>
                            <div>
                                <h3 className="font-bold text-white">{orgProfile.name || 'Organization'}</h3>
                                <p className="text-xs text-gray-400">Organization Account</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            {[
                                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                                { id: 'post-job', label: 'Post Opportunity', icon: PlusCircle },
                                { id: 'listings', label: 'Manage Listings', icon: Briefcase },
                                { id: 'applicants', label: 'Applicants', icon: Users },
                                { id: 'approved', label: 'Approved Candidates', icon: CheckCircle },
                                { id: 'settings', label: 'Settings', icon: Settings },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id
                                        ? 'bg-green-600/10 text-green-400 border border-green-600/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-8"
                            >
                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {stats.map((stat, idx) => (
                                        <div key={idx} className="bg-[#112240] p-6 rounded-xl border border-gray-800 hover:border-green-500/30 transition-all">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                                                    <stat.icon className="h-6 w-6" />
                                                </div>
                                                <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded">+12%</span>
                                            </div>
                                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                            <div className="text-sm text-gray-400">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Recent Applicants Preview */}
                                <div className="bg-[#112240] rounded-xl border border-gray-800 overflow-hidden">
                                    <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-white">Recent Applicants</h3>
                                        <button onClick={() => setActiveTab('applicants')} className="text-sm text-green-400 hover:underline">View All</button>
                                    </div>
                                    <div className="divide-y divide-gray-800">
                                        {applicants.map((candidate) => (
                                            <div key={candidate.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                                                <div className="flex items-center space-x-4">
                                                    <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                                                        {candidate.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-white">{candidate.name}</h4>
                                                        <p className="text-sm text-gray-400">{candidate.role}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-6">
                                                    <div className="text-right hidden sm:block">
                                                        <div className="text-sm font-bold text-green-400">{candidate.match} Match</div>
                                                        <div className="text-xs text-gray-500 flex gap-2 mt-1">
                                                            {candidate.skills.slice(0, 2).map(skill => (
                                                                <span key={skill}>{skill}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <button className="p-2 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white">
                                                        <MoreVertical className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'post-job' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-[#112240] rounded-xl border border-gray-800 p-8"
                            >
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    {editingListing ? 'Edit Opportunity' : 'Post a New Opportunity'}
                                </h2>
                                <p className="text-gray-400 mb-6">
                                    {editingListing ? 'Update the details below' : 'Fill in the details to post a new internship or project'}
                                </p>

                                <form onSubmit={handleSubmitJob} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                                Job Title <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={jobForm.title}
                                                onChange={(e) => handleJobFormChange('title', e.target.value)}
                                                className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                                placeholder="e.g. Frontend Developer Intern"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                                Location <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={jobForm.location}
                                                onChange={(e) => handleJobFormChange('location', e.target.value)}
                                                className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                                placeholder="e.g. Remote / New York"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                                            <select
                                                value={jobForm.type}
                                                onChange={(e) => handleJobFormChange('type', e.target.value)}
                                                className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                            >
                                                <option>Internship</option>
                                                <option>Project</option>
                                                <option>Freelance</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Duration</label>
                                            <input
                                                type="text"
                                                value={jobForm.duration}
                                                onChange={(e) => handleJobFormChange('duration', e.target.value)}
                                                className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                                placeholder="e.g. 12 Weeks"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                                            <select
                                                value={jobForm.category}
                                                onChange={(e) => handleJobFormChange('category', e.target.value)}
                                                className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                            >
                                                <option>Development</option>
                                                <option>Design</option>
                                                <option>Data Science</option>
                                                <option>Marketing</option>
                                                <option>DevOps</option>
                                                <option>Mobile</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Stipend (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={jobForm.stipend}
                                            onChange={(e) => handleJobFormChange('stipend', e.target.value)}
                                            className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                            placeholder="e.g. $1500/month or Unpaid"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Description <span className="text-red-400">*</span>
                                        </label>
                                        <textarea
                                            rows="4"
                                            value={jobForm.description}
                                            onChange={(e) => handleJobFormChange('description', e.target.value)}
                                            className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                            placeholder="Describe the role and responsibilities..."
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Requirements</label>
                                        <textarea
                                            rows="3"
                                            value={jobForm.requirements}
                                            onChange={(e) => handleJobFormChange('requirements', e.target.value)}
                                            className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                            placeholder="List the requirements and qualifications..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Required Skills</label>
                                        <div className="bg-[#0a192f] border border-gray-700 rounded-lg p-3 flex flex-wrap gap-2">
                                            {jobForm.skills.map(skill => (
                                                <span key={skill} className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm flex items-center">
                                                    {skill}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveSkill(skill)}
                                                        className="ml-2 hover:text-white"
                                                    >
                                                        <XCircle className="h-4 w-4" />
                                                    </button>
                                                </span>
                                            ))}
                                            <input
                                                type="text"
                                                value={jobForm.skillInput}
                                                onChange={(e) => handleJobFormChange('skillInput', e.target.value)}
                                                onKeyPress={handleAddSkill}
                                                className="bg-transparent border-none outline-none text-white text-sm min-w-[100px]"
                                                placeholder="Add a skill and press Enter..."
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Press Enter to add each skill</p>
                                    </div>

                                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-800">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setActiveTab('overview');
                                                setEditingListing(null);
                                                setJobForm({
                                                    title: '',
                                                    location: '',
                                                    type: 'Internship',
                                                    duration: '',
                                                    category: 'Development',
                                                    description: '',
                                                    skills: [],
                                                    skillInput: '',
                                                    requirements: '',
                                                    stipend: '',
                                                    company: orgProfile.name
                                                });
                                            }}
                                            className="px-6 py-3 rounded-lg border border-gray-600 text-white font-medium hover:bg-gray-800 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-3 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-900/20"
                                        >
                                            {editingListing ? 'Update Opportunity' : 'Post Opportunity'}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {/* Manage Listings Tab */}
                        {activeTab === 'listings' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Manage Listings</h2>
                                        <p className="text-gray-400 mt-1">View and manage all your job postings</p>
                                    </div>
                                    <button
                                        onClick={() => setActiveTab('post-job')}
                                        className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                                    >
                                        <PlusCircle className="h-5 w-5" />
                                        Post New
                                    </button>
                                </div>

                                {listings.length === 0 ? (
                                    <div className="bg-[#112240] rounded-xl border border-gray-800 p-12 text-center">
                                        <Briefcase className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">No listings yet</h3>
                                        <p className="text-gray-400 mb-6">Start by posting your first opportunity</p>
                                        <button
                                            onClick={() => setActiveTab('post-job')}
                                            className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            Post Opportunity
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {listings.map((listing) => (
                                            <div key={listing.id} className="bg-[#112240] p-6 rounded-xl border border-gray-800 hover:border-green-500/30 transition-all">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h3 className="text-xl font-bold text-white">{listing.title}</h3>
                                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${listing.status === 'Active'
                                                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                                : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                                                                }`}>
                                                                {listing.status}
                                                            </span>
                                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                                {listing.type}
                                                            </span>
                                                        </div>
                                                        <div className="flex gap-4 text-sm text-gray-400 mb-3">
                                                            <span className="flex items-center gap-1">
                                                                <MapPin className="h-4 w-4" />
                                                                {listing.location}
                                                            </span>
                                                            {listing.duration && (
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="h-4 w-4" />
                                                                    {listing.duration}
                                                                </span>
                                                            )}
                                                            <span className="text-gray-500">Posted {listing.posted}</span>
                                                        </div>
                                                        {listing.skills && listing.skills.length > 0 && (
                                                            <div className="flex flex-wrap gap-2 mb-3">
                                                                {listing.skills.slice(0, 5).map((skill, idx) => (
                                                                    <span key={idx} className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs">
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                                {listing.skills.length > 5 && (
                                                                    <span className="text-gray-500 text-xs py-1">
                                                                        +{listing.skills.length - 5} more
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-right ml-4">
                                                        <div className="text-2xl font-bold text-green-400">{listing.applicants || 0}</div>
                                                        <div className="text-xs text-gray-500">Applicants</div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 pt-4 border-t border-gray-800">
                                                    <button
                                                        onClick={() => handleEditListing(listing)}
                                                        className="px-4 py-2 bg-blue-600/10 text-blue-400 rounded-lg hover:bg-blue-600/20 transition-colors text-sm font-medium"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggleListingStatus(listing.id)}
                                                        className="px-4 py-2 bg-purple-600/10 text-purple-400 rounded-lg hover:bg-purple-600/20 transition-colors text-sm font-medium"
                                                    >
                                                        {listing.status === 'Active' ? 'Close' : 'Reopen'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteListing(listing.id)}
                                                        className="px-4 py-2 bg-red-600/10 text-red-400 rounded-lg hover:bg-red-600/20 transition-colors text-sm font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Applicants Tab */}
                        {activeTab === 'applicants' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Applicants</h2>
                                        <p className="text-gray-400 mt-1">Review and manage candidate applications</p>
                                    </div>
                                    <button
                                        onClick={loadApplicants}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Refresh
                                    </button>
                                </div>

                                {applicants.length === 0 ? (
                                    <div className="bg-[#112240] rounded-xl border border-gray-800 p-12 text-center">
                                        <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">No applicants yet</h3>
                                        <p className="text-gray-400 mb-4">Applications will appear here once students start applying</p>
                                        <button
                                            onClick={loadApplicants}
                                            className="px-6 py-2 bg-green-600/10 text-green-400 rounded-lg hover:bg-green-600/20 transition-colors"
                                        >
                                            Check for New Applications
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {applicants.map((applicant) => (
                                            <div key={applicant.id} className="bg-[#112240] p-6 rounded-xl border border-gray-800 hover:border-green-500/30 transition-all">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-4 flex-1">
                                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                                                            {applicant.name.charAt(0)}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-bold text-white">{applicant.name}</h3>
                                                            <p className="text-sm text-gray-400">{applicant.email}</p>
                                                            <p className="text-sm text-gray-500 mt-1">Applied for: {applicant.role}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-xl font-bold text-green-400 mb-1">{applicant.match}</div>
                                                        <div className="text-xs text-gray-500">Match Score</div>
                                                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${applicant.status === 'Pending'
                                                            ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                                            : applicant.status === 'Reviewing'
                                                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                                : applicant.status === 'Accepted' || applicant.status === 'Hired'
                                                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                                            }`}>
                                                            {applicant.status}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <p className="text-xs text-gray-500 mb-2">Skills:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {applicant.skills && applicant.skills.length > 0 ? (
                                                            applicant.skills.map((skill, idx) => (
                                                                <span key={idx} className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs">
                                                                    {skill}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-gray-500 text-xs italic">No skills listed</span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Education Info */}
                                                {(applicant.university || applicant.degree) && (
                                                    <div className="mb-4 pb-4 border-b border-gray-800">
                                                        <p className="text-xs text-gray-500 mb-1">Education:</p>
                                                        <p className="text-sm text-gray-300">
                                                            {applicant.degree && <span>{applicant.degree}</span>}
                                                            {applicant.degree && applicant.university && <span> at </span>}
                                                            {applicant.university && <span className="text-green-400">{applicant.university}</span>}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* CV/Resume Download */}
                                                {applicant.cvFileName && applicant.cvData && (
                                                    <div className="mb-4 pb-4 border-b border-gray-800">
                                                        <p className="text-xs text-gray-500 mb-2">Resume/CV:</p>
                                                        <button
                                                            onClick={() => {
                                                                // Download CV
                                                                const link = document.createElement('a');
                                                                link.href = applicant.cvData;
                                                                link.download = applicant.cvFileName;
                                                                link.click();
                                                            }}
                                                            className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-600/20 transition-colors"
                                                        >
                                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            <span className="font-medium">Download {applicant.cvFileName}</span>
                                                        </button>
                                                        <p className="text-xs text-gray-500 mt-2">
                                                            Click to download and review the candidate's resume
                                                        </p>
                                                    </div>
                                                )}

                                                <div className="flex gap-2 pt-4 border-t border-gray-800">
                                                    <button
                                                        onClick={() => handleApplicantAction(applicant.id, 'Reviewing')}
                                                        className="px-4 py-2 bg-blue-600/10 text-blue-400 rounded-lg hover:bg-blue-600/20 transition-colors text-sm font-medium"
                                                    >
                                                        Review
                                                    </button>
                                                    <button
                                                        onClick={() => handleApplicantAction(applicant.id, 'Accepted')}
                                                        className="px-4 py-2 bg-green-600/10 text-green-400 rounded-lg hover:bg-green-600/20 transition-colors text-sm font-medium"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleApplicantAction(applicant.id, 'Rejected')}
                                                        className="px-4 py-2 bg-red-600/10 text-red-400 rounded-lg hover:bg-red-600/20 transition-colors text-sm font-medium"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Approved Candidates Tab */}
                        {activeTab === 'approved' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Approved Candidates</h2>
                                        <p className="text-gray-400 mt-1">Manage and communicate with accepted candidates</p>
                                    </div>
                                    <button
                                        onClick={loadApprovedCandidates}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Refresh
                                    </button>
                                </div>

                                {approvedCandidates.length === 0 ? (
                                    <div className="bg-[#112240] rounded-xl border border-gray-800 p-12 text-center">
                                        <CheckCircle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">No Approved Candidates Yet</h3>
                                        <p className="text-gray-400 mb-4">Approved candidates will appear here</p>
                                        <button
                                            onClick={() => setActiveTab('applicants')}
                                            className="px-6 py-2 bg-green-600/10 text-green-400 rounded-lg hover:bg-green-600/20 transition-colors"
                                        >
                                            Review Applicants
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {approvedCandidates.map((candidate) => (
                                            <div key={candidate.id} className="bg-[#112240] p-6 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-4 flex-1">
                                                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold text-xl">
                                                            {candidate.name.charAt(0)}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-bold text-white">{candidate.name}</h3>
                                                            <p className="text-sm text-gray-400">{candidate.email}</p>
                                                            <p className="text-sm text-green-400 mt-1">✓ {candidate.role}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                                                            {candidate.status}
                                                        </span>
                                                        <p className="text-xs text-gray-500 mt-2">Applied: {candidate.appliedDate}</p>
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <p className="text-xs text-gray-500 mb-2">Skills:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {candidate.skills && candidate.skills.length > 0 ? (
                                                            candidate.skills.map((skill, idx) => (
                                                                <span key={idx} className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs">
                                                                    {skill}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-gray-500 text-xs italic">No skills listed</span>
                                                        )}
                                                    </div>
                                                </div>

                                                {(candidate.university || candidate.degree) && (
                                                    <div className="mb-4 pb-4 border-b border-gray-800">
                                                        <p className="text-xs text-gray-500 mb-1">Education:</p>
                                                        <p className="text-sm text-gray-300">
                                                            {candidate.degree && <span>{candidate.degree}</span>}
                                                            {candidate.degree && candidate.university && <span> at </span>}
                                                            {candidate.university && <span className="text-green-400">{candidate.university}</span>}
                                                        </p>
                                                    </div>
                                                )}

                                                {candidate.cvFileName && candidate.cvData && (
                                                    <div className="mb-4">
                                                        <button
                                                            onClick={() => {
                                                                const link = document.createElement('a');
                                                                link.href = candidate.cvData;
                                                                link.download = candidate.cvFileName;
                                                                link.click();
                                                            }}
                                                            className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-600/20 transition-colors text-sm"
                                                        >
                                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            <span className="font-medium">Download CV</span>
                                                        </button>
                                                    </div>
                                                )}

                                                <div className="flex gap-3 pt-4 border-t border-gray-800">
                                                    <button
                                                        onClick={() => handleSendMessage(candidate)}
                                                        className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                        Send Message
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Settings Tab */}
                        {activeTab === 'settings' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Organization Settings</h2>
                                    <p className="text-gray-400 mt-1">Manage your organization profile and preferences</p>
                                </div>

                                <div className="bg-[#112240] p-6 rounded-xl border border-gray-800">
                                    <h3 className="text-lg font-bold text-white mb-4">Company Information</h3>
                                    <div className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Company Name</label>
                                                <input
                                                    type="text"
                                                    value={orgProfile.name}
                                                    onChange={(e) => setOrgProfile({ ...orgProfile, name: e.target.value })}
                                                    className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                                <input
                                                    type="email"
                                                    value={orgProfile.email}
                                                    onChange={(e) => setOrgProfile({ ...orgProfile, email: e.target.value })}
                                                    className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Website</label>
                                                <input
                                                    type="url"
                                                    value={orgProfile.website}
                                                    onChange={(e) => setOrgProfile({ ...orgProfile, website: e.target.value })}
                                                    placeholder="https://yourcompany.com"
                                                    className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Industry</label>
                                                <input
                                                    type="text"
                                                    value={orgProfile.industry}
                                                    onChange={(e) => setOrgProfile({ ...orgProfile, industry: e.target.value })}
                                                    placeholder="e.g. Technology, Finance"
                                                    className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Company Size</label>
                                                <select
                                                    value={orgProfile.size}
                                                    onChange={(e) => setOrgProfile({ ...orgProfile, size: e.target.value })}
                                                    className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                                                >
                                                    <option value="">Select size</option>
                                                    <option>1-10 employees</option>
                                                    <option>11-50 employees</option>
                                                    <option>51-200 employees</option>
                                                    <option>201-500 employees</option>
                                                    <option>500+ employees</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                                                <input
                                                    type="text"
                                                    value={orgProfile.location}
                                                    onChange={(e) => setOrgProfile({ ...orgProfile, location: e.target.value })}
                                                    placeholder="e.g. San Francisco, CA"
                                                    className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Company Description</label>
                                            <textarea
                                                rows="4"
                                                value={orgProfile.description}
                                                onChange={(e) => setOrgProfile({ ...orgProfile, description: e.target.value })}
                                                placeholder="Tell us about your company..."
                                                className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                                            />
                                        </div>
                                        <div className="pt-4">
                                            <button
                                                onClick={handleSaveOrgProfile}
                                                className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* Message Modal */}
            {showMessageModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#112240] rounded-xl p-8 max-w-2xl w-full mx-4 border border-gray-800">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Send Message to {selectedCandidate?.name}
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Send a message to this approved candidate
                        </p>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    value={messageForm.subject}
                                    onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Enter subject"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    value={messageForm.message}
                                    onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                                    rows="6"
                                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                    placeholder="Type your message here..."
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleSubmitMessage}
                                disabled={!messageForm.message.trim()}
                                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${messageForm.message.trim()
                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Send Message
                            </button>
                            <button
                                onClick={() => {
                                    setShowMessageModal(false);
                                    setSelectedCandidate(null);
                                    setMessageForm({ subject: '', message: '' });
                                }}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrgDashboard;
