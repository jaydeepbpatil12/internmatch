import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Briefcase, FileText, User, LogOut, BookmarkPlus, MapPin, Clock, Mail } from 'lucide-react';

const StudentDashboard = () => {
    const [activeTab, setActiveTab] = useState('browse');
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortBy, setSortBy] = useState('match'); // match, recent, company
    const [applications, setApplications] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState(new Set());
    const [messages, setMessages] = useState([]);

    // CV Upload state
    const [showCVModal, setShowCVModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [cvFile, setCvFile] = useState(null);
    const [cvFileName, setCvFileName] = useState('');

    // Profile state
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        university: '',
        degree: '',
        graduationYear: '',
        gpa: '',
        skills: '',
        bio: '',
        github: '',
        linkedin: '',
        portfolio: ''
    });
    const [profileSaved, setProfileSaved] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchOpportunities();
        loadApplications();
        loadProfile();
        loadMessages();
    }, []);

    // Reload applications when switching to applications tab to get latest status
    useEffect(() => {
        if (activeTab === 'applications') {
            loadApplications();
        } else if (activeTab === 'messages') {
            loadMessages();
        }
    }, [activeTab]);

    const fetchOpportunities = async () => {
        try {
            // Fetch from backend
            let backendJobs = [];
            try {
                const res = await axios.get('http://localhost:5000/api/internships');
                backendJobs = res.data || [];
            } catch (apiError) {
                console.log('Backend fetch failed, loading from local storage only:', apiError);
            }

            // Also load from shared localStorage (jobs posted by organizations locally)
            const sharedJobs = JSON.parse(localStorage.getItem('sharedInternships') || '[]');

            // Merge both sources, removing duplicates by _id
            const allJobs = [...backendJobs];
            sharedJobs.forEach(sharedJob => {
                const exists = allJobs.find(job => job._id === sharedJob._id);
                if (!exists) {
                    allJobs.push(sharedJob);
                }
            });

            setOpportunities(allJobs);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching opportunities:', error);
            setLoading(false);
        }
    };

    const loadApplications = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const userId = userInfo.email || userInfo.id || 'default';
        const savedApplications = JSON.parse(localStorage.getItem(`studentApplications_${userId}`) || '[]');

        // Sync with shared applications to get latest status updates from organizations
        const sharedApplications = JSON.parse(localStorage.getItem('sharedApplications') || '[]');

        // Update status from shared applications
        const updatedApplications = savedApplications.map(app => {
            const sharedApp = sharedApplications.find(shared => shared.id === app.id);
            if (sharedApp && sharedApp.status) {
                return { ...app, status: sharedApp.status }; // Use latest status from org
            }
            return app;
        });

        // Save back the updated applications
        localStorage.setItem(`studentApplications_${userId}`, JSON.stringify(updatedApplications));

        setApplications(updatedApplications);
        const appliedJobIds = new Set(updatedApplications.map(app => app.jobId));
        setAppliedJobs(appliedJobIds);
    };

    const loadProfile = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const userId = userInfo.email || userInfo.id || 'default';
        const savedProfile = JSON.parse(localStorage.getItem(`studentProfile_${userId}`) || '{}');

        setProfile({
            name: savedProfile.name || userInfo.name || '',
            email: savedProfile.email || userInfo.email || '',
            phone: savedProfile.phone || '',
            university: savedProfile.university || '',
            degree: savedProfile.degree || '',
            graduationYear: savedProfile.graduationYear || '',
            gpa: savedProfile.gpa || '',
            skills: savedProfile.skills || '',
            bio: savedProfile.bio || '',
            github: savedProfile.github || '',
            linkedin: savedProfile.linkedin || '',
            portfolio: savedProfile.portfolio || ''
        });
    };


    const loadMessages = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const userEmail = userInfo.email || '';

        if (!userEmail) {
            console.log('⚠️ No user email found');
            return;
        }

        try {
            // Load from backend API
            const response = await fetch(`http://localhost:5000/api/messages?email=${encodeURIComponent(userEmail)}`);

            if (response.ok) {
                const data = await response.json();
                console.log('📧 Loaded messages from database:', data);
                setMessages(data);
            } else {
                throw new Error('Failed to load messages from API');
            }
        } catch (error) {
            console.error('❌ Error loading messages from API:', error);

            // Fallback to localStorage
            const allMessages = JSON.parse(localStorage.getItem('organizationMessages') || '[]');
            const studentMessages = allMessages.filter(msg => msg.toEmail === userEmail);
            studentMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            console.log('📧 Loaded messages from localStorage:', studentMessages);
            setMessages(studentMessages);
        }
    };

    const handleProfileChange = (field, value) => {
        setProfile(prev => ({
            ...prev,
            [field]: value
        }));
        setProfileSaved(false);
    };

    const handleSaveProfile = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const userId = userInfo.email || userInfo.id || 'default';

            // Save to user-specific localStorage
            localStorage.setItem(`studentProfile_${userId}`, JSON.stringify(profile));

            // Try to save to backend
            try {
                const token = localStorage.getItem('token');

                await axios.put(`http://localhost:5000/api/users/profile/${userInfo.id || userInfo._id}`, profile, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } catch (apiError) {
                console.log('Backend save failed, saved locally:', apiError);
            }

            setProfileSaved(true);
            alert('Profile updated successfully! ✅');

            // Reset saved indicator after 3 seconds
            setTimeout(() => setProfileSaved(false), 3000);

        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile. Please try again.');
        }
    };

    const handleApply = async (job) => {
        // Check if already applied
        if (appliedJobs.has(job._id)) {
            alert('You have already applied for this position!');
            return;
        }

        // Show CV upload modal
        setSelectedJob(job);
        setShowCVModal(true);
    };

    const handleCVFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(file.type)) {
                alert('Please upload a PDF or Word document');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }

            setCvFile(file);
            setCvFileName(file.name);
        }
    };

    const handleSubmitApplication = async () => {
        if (!cvFile) {
            alert('Please upload your CV/Resume before applying');
            return;
        }

        try {
            const job = selectedJob;

            // Get user info
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const currentProfile = JSON.parse(localStorage.getItem(`studentProfile_${userInfo.email || userInfo.id || 'default'}`) || '{}');

            // Convert CV to base64 for storage
            const reader = new FileReader();
            reader.onloadend = async () => {
                const cvBase64 = reader.result;

                // Create application object with student details and CV
                const newApplication = {
                    id: Date.now().toString(),
                    jobId: job._id,
                    company: job.company,
                    role: job.title,
                    type: job.type,
                    status: 'Pending',
                    date: new Date().toISOString(),
                    appliedDate: new Date().toLocaleDateString(),
                    location: job.location,
                    duration: job.duration,
                    category: job.category,
                    // Student details for organization to see
                    studentName: currentProfile.name || userInfo.name || 'Student',
                    studentEmail: currentProfile.email || userInfo.email || '',
                    studentSkills: currentProfile.skills ? currentProfile.skills.split(',').map(s => s.trim()) : [],
                    studentUniversity: currentProfile.university || '',
                    studentDegree: currentProfile.degree || '',
                    cvFileName: cvFileName,
                    cvData: cvBase64, // Store CV as base64
                    match: Math.floor(Math.random() * 20) + 80 + '%' // Mock match score
                };

                // Try to submit to backend
                try {
                    const token = localStorage.getItem('token');
                    await axios.post('http://localhost:5000/api/internships/apply', {
                        internshipId: job._id,
                        studentId: userInfo.id || userInfo._id,
                        cvData: cvBase64,
                        cvFileName: cvFileName
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                } catch (apiError) {
                    console.log('Backend submission failed, saving locally:', apiError);
                }

                // Save to user-specific localStorage (for student's "My Applications")
                const userId = userInfo.email || userInfo.id || 'default';
                const updatedApplications = [...applications, newApplication];
                setApplications(updatedApplications);
                localStorage.setItem(`studentApplications_${userId}`, JSON.stringify(updatedApplications));

                // ALSO save to shared applications list (for organizations to see)
                const sharedApplications = JSON.parse(localStorage.getItem('sharedApplications') || '[]');
                const applicantForOrg = {
                    id: newApplication.id,
                    name: newApplication.studentName,
                    email: newApplication.studentEmail,
                    role: job.title,
                    company: job.company,
                    jobId: job._id,
                    match: newApplication.match,
                    skills: newApplication.studentSkills,
                    status: 'Pending',
                    appliedDate: newApplication.appliedDate,
                    university: newApplication.studentUniversity,
                    degree: newApplication.studentDegree,
                    cvFileName: cvFileName,
                    cvData: cvBase64 // Include CV in shared applications
                };
                sharedApplications.push(applicantForOrg);
                localStorage.setItem('sharedApplications', JSON.stringify(sharedApplications));

                console.log('✅ Application saved to sharedApplications!');
                console.log('📦 Applicant data:', applicantForOrg);
                console.log('📊 Total shared applications:', sharedApplications.length);

                // Update applied jobs set
                const updatedAppliedJobs = new Set(appliedJobs);
                updatedAppliedJobs.add(job._id);
                setAppliedJobs(updatedAppliedJobs);

                // Show success message
                alert(`Application submitted successfully for ${job.title}! ✅\n\nYour CV has been sent to ${job.company}.`);

                // Close modal and reset
                setShowCVModal(false);
                setSelectedJob(null);
                setCvFile(null);
                setCvFileName('');
            };

            reader.readAsDataURL(cvFile);

        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Failed to submit application. Please try again.');
        }
    };

    // Calculate profile completion percentage
    const calculateProfileCompletion = () => {
        const fields = Object.values(profile);
        const filledFields = fields.filter(field => field && field.toString().trim() !== '').length;
        return Math.round((filledFields / fields.length) * 100);
    };
    const profileCompletion = calculateProfileCompletion();

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#0a192f] text-gray-300 font-sans">
            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-[#112240] to-[#0a192f] border-r border-gray-800/50 shadow-2xl">
                {/* Logo Section */}
                <div className="p-6 border-b border-gray-800/50">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">I</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">InternMatch<span className="text-green-500">+</span></h1>
                            <p className="text-xs text-gray-400">Student Portal</p>
                        </div>
                    </div>

                    {/* User Profile Card */}
                    <div className="bg-[#0a192f]/50 rounded-lg p-3 border border-gray-800/50">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold">
                                {profile.name ? profile.name.charAt(0).toUpperCase() : 'S'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate">{profile.name || 'Student'}</p>
                                <p className="text-xs text-gray-400 truncate">{profile.email || 'student@example.com'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {[
                        { id: 'browse', icon: Search, label: 'Browse Opportunities', badge: opportunities.length },
                        { id: 'applications', icon: FileText, label: 'My Applications', badge: applications.length },
                        { id: 'messages', icon: Mail, label: 'Messages', badge: messages.filter(m => !m.read).length },
                        { id: 'profile', icon: User, label: 'Profile' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === item.id
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                                : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                                }`}
                        >
                            {/* Active Indicator */}
                            {activeTab === item.id && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                            )}

                            <item.icon className={`h-5 w-5 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'
                                }`} />

                            <span className="font-medium flex-1 text-left">{item.label}</span>

                            {/* Badge */}
                            {item.badge !== undefined && item.badge > 0 && (
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === item.id
                                    ? 'bg-white/20 text-white'
                                    : 'bg-green-500/10 text-green-400'
                                    }`}>
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Stats Section */}
                <div className="px-4 py-4 mx-4 my-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">Profile Completion</span>
                        <span className="text-xs font-bold text-green-400">{profileCompletion}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                            style={{ width: `${profileCompletion}%` }}
                        />
                    </div>
                </div>

                {/* Logout Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800/50 bg-[#0a192f]/80 backdrop-blur-sm">
                    <button
                        onClick={handleLogout}
                        className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 border border-transparent hover:border-red-500/20"
                    >
                        <LogOut className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-72 p-8">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        {activeTab === 'browse' && 'Browse Opportunities'}
                        {activeTab === 'applications' && 'My Applications'}
                        {activeTab === 'profile' && 'My Profile'}
                    </h2>
                    <p className="text-gray-400">
                        {activeTab === 'browse' && 'Find internships that match your skills'}
                        {activeTab === 'applications' && 'Track your application status'}
                        {activeTab === 'profile' && 'Manage your profile and preferences'}
                    </p>
                </div>

                {/* Browse Tab */}
                {activeTab === 'browse' && (
                    <div>
                        {/* Search Bar */}
                        <div className="bg-[#112240] p-4 rounded-lg border border-gray-800 mb-6 flex items-center">
                            <Search className="text-gray-400 h-5 w-5 mr-3" />
                            <input
                                type="text"
                                placeholder="Search by role, company, or skills..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500"
                            />
                        </div>

                        {/* Filters Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            {/* Type Filter */}
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="bg-[#112240] px-4 py-3 rounded-lg border border-gray-800 text-white outline-none focus:ring-1 focus:ring-green-500"
                            >
                                <option value="all">All Types</option>
                                <option value="Internship">Internships Only</option>
                                <option value="Project">Projects Only</option>
                            </select>

                            {/* Category Filter */}
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="bg-[#112240] px-4 py-3 rounded-lg border border-gray-800 text-white outline-none focus:ring-1 focus:ring-green-500"
                            >
                                <option value="all">All Categories</option>
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="Full Stack">Full Stack</option>
                                <option value="Mobile">Mobile</option>
                                <option value="Data Science">Data Science</option>
                                <option value="DevOps">DevOps</option>
                                <option value="Design">Design</option>
                                <option value="Security">Security</option>
                                <option value="QA">QA & Testing</option>
                                <option value="Emerging Tech">Emerging Tech</option>
                            </select>

                            {/* Sort By */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-[#112240] px-4 py-3 rounded-lg border border-gray-800 text-white outline-none focus:ring-1 focus:ring-green-500"
                            >
                                <option value="match">Best Match</option>
                                <option value="recent">Most Recent</option>
                                <option value="company">Company A-Z</option>
                            </select>
                        </div>

                        {/* Results Count */}
                        <div className="mb-6 text-gray-400 text-sm">
                            Showing {opportunities.filter(job => {
                                const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
                                const matchesType = filterType === 'all' || job.type === filterType;
                                const matchesCategory = filterCategory === 'all' || job.category === filterCategory;
                                return matchesSearch && matchesType && matchesCategory;
                            }).length} opportunities
                        </div>

                        {/* Opportunities List */}
                        {loading ? (
                            <div className="text-center text-gray-400 py-10">Loading opportunities...</div>
                        ) : opportunities.length === 0 ? (
                            <div className="bg-[#112240] rounded-xl border border-gray-800 p-12 text-center">
                                <Briefcase className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">No Internships Available Yet</h3>
                                <p className="text-gray-400 mb-4">
                                    There are currently no internships posted. Check back soon!
                                </p>
                                <p className="text-sm text-gray-500">
                                    Organizations can post internships from their portal, and they'll appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {opportunities
                                    .filter(job => {
                                        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
                                        const matchesType = filterType === 'all' || job.type === filterType;
                                        const matchesCategory = filterCategory === 'all' || job.category === filterCategory;
                                        return matchesSearch && matchesType && matchesCategory;
                                    })
                                    .sort((a, b) => {
                                        if (sortBy === 'company') {
                                            return a.company.localeCompare(b.company);
                                        } else if (sortBy === 'recent') {
                                            return new Date(b.createdAt) - new Date(a.createdAt);
                                        }
                                        return 0; // Best match (default)
                                    })
                                    .map((job, idx) => (
                                        <div
                                            key={job._id || idx}
                                            className="bg-[#112240] p-6 rounded-xl border border-gray-800 hover:border-green-500 transition-all group"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                                                            {job.title}
                                                        </h3>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${job.type === 'Internship'
                                                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                            : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                                            }`}>
                                                            {job.type}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-400 mb-3 font-medium">{job.company}</p>
                                                    <div className="flex gap-4 text-sm text-gray-500 flex-wrap">
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="h-4 w-4" />
                                                            {job.location}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            {job.duration}
                                                        </span>
                                                        {job.category && (
                                                            <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
                                                                {job.category}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-right ml-4">
                                                    <div className="text-3xl font-bold text-green-400 mb-1">
                                                        {Math.floor(Math.random() * 20) + 80}%
                                                    </div>
                                                    <div className="text-xs text-gray-500">Match</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 mb-4 flex-wrap">
                                                {job.skills.slice(0, 6).map((skill, i) => (
                                                    <span
                                                        key={i}
                                                        className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-500/20"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                                {job.skills.length > 6 && (
                                                    <span className="text-gray-500 text-xs py-1">
                                                        +{job.skills.length - 6} more
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleApply(job)}
                                                    disabled={appliedJobs.has(job._id)}
                                                    className={`flex-1 px-6 py-2.5 font-bold rounded-lg transition-colors shadow-lg ${appliedJobs.has(job._id)
                                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                                        : 'bg-green-600 text-white hover:bg-green-700 shadow-green-900/20'
                                                        }`}
                                                >
                                                    {appliedJobs.has(job._id) ? 'Already Applied' : 'Apply Now'}
                                                </button>
                                                <button className="px-4 py-2.5 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                                                    <BookmarkPlus className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                {opportunities.filter(job => {
                                    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
                                    const matchesType = filterType === 'all' || job.type === filterType;
                                    const matchesCategory = filterCategory === 'all' || job.category === filterCategory;
                                    return matchesSearch && matchesType && matchesCategory;
                                }).length === 0 && (
                                        <div className="text-center py-16">
                                            <div className="text-gray-500 text-lg mb-2">No opportunities found</div>
                                            <p className="text-gray-600 text-sm">Try adjusting your filters or search term</p>
                                        </div>
                                    )}
                            </div>
                        )}
                    </div>
                )}

                {/* Applications Tab */}
                {activeTab === 'applications' && (
                    <div className="space-y-4">
                        {applications.length === 0 ? (
                            <div className="text-center py-16 bg-[#112240] rounded-xl border border-gray-800">
                                <Briefcase className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                                <div className="text-gray-400 text-lg mb-2">No applications yet</div>
                                <p className="text-gray-600 text-sm mb-4">Start applying to opportunities to see them here</p>
                                <button
                                    onClick={() => setActiveTab('browse')}
                                    className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Browse Opportunities
                                </button>
                            </div>
                        ) : (
                            applications.map((app, idx) => (
                                <div key={app.id || idx} className="bg-[#112240] p-6 rounded-xl border border-gray-800 hover:border-green-500/30 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-bold text-white">{app.role}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.type === 'Internship'
                                                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                    : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                                    }`}>
                                                    {app.type}
                                                </span>
                                            </div>
                                            <p className="text-gray-400 mb-2 font-medium">{app.company}</p>
                                            <div className="flex gap-4 text-sm text-gray-500 flex-wrap">
                                                {app.location && (
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="h-4 w-4" />
                                                        {app.location}
                                                    </span>
                                                )}
                                                {app.duration && (
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {app.duration}
                                                    </span>
                                                )}
                                                {app.category && (
                                                    <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
                                                        {app.category}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right ml-4">
                                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${app.status === 'Under Review'
                                                ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                                : app.status === 'Interview Scheduled'
                                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                    : app.status === 'Accepted'
                                                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                                }`}>
                                                {app.status}
                                            </span>
                                            <p className="text-sm text-gray-500 mt-2">Applied {app.appliedDate}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        {/* Profile Header */}
                        <div className="bg-[#112240] p-6 rounded-xl border border-gray-800">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-20 w-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                                    {profile.name ? profile.name.charAt(0).toUpperCase() : 'S'}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{profile.name || 'Student Name'}</h3>
                                    <p className="text-gray-400">{profile.email || 'student@example.com'}</p>
                                    {profile.university && (
                                        <p className="text-sm text-gray-500 mt-1">{profile.university}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="bg-[#112240] p-6 rounded-xl border border-gray-800">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <User className="h-5 w-5 text-green-400" />
                                Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Full Name <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.name}
                                        onChange={(e) => handleProfileChange('name', e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full bg-[#0a192f] px-4 py-3 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Email <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => handleProfileChange('email', e.target.value)}
                                        placeholder="john@example.com"
                                        className="w-full bg-[#0a192f] px-4 py-3 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={profile.phone}
                                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                                        placeholder="+1 (555) 123-4567"
                                        className="w-full bg-[#0a192f] px-4 py-3 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Education */}
                        <div className="bg-[#112240] p-6 rounded-xl border border-gray-800">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-green-400" />
                                Education
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        University/College
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.university}
                                        onChange={(e) => handleProfileChange('university', e.target.value)}
                                        placeholder="Stanford University"
                                        className="w-full bg-[#0a192f] px-4 py-3 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Degree
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.degree}
                                        onChange={(e) => handleProfileChange('degree', e.target.value)}
                                        placeholder="Bachelor of Science in Computer Science"
                                        className="w-full bg-[#0a192f] px-4 py-3 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Expected Graduation Year
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.graduationYear}
                                        onChange={(e) => handleProfileChange('graduationYear', e.target.value)}
                                        placeholder="2025"
                                        className="w-full bg-[#0a192f] px-4 py-3 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        GPA (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.gpa}
                                        onChange={(e) => handleProfileChange('gpa', e.target.value)}
                                        placeholder="3.8/4.0"
                                        className="w-full bg-[#0a192f] px-4 py-3 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Skills & Bio */}
                        <div className="bg-[#112240] p-6 rounded-xl border border-gray-800">
                            <h3 className="text-xl font-bold text-white mb-4">Skills & About</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Skills (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.skills}
                                        onChange={(e) => handleProfileChange('skills', e.target.value)}
                                        placeholder="React, Node.js, Python, Machine Learning, Git"
                                        className="w-full bg-[#0a192f] px-4 py-3 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
                                </div>
                                {profile.skills && (
                                    <div className="flex flex-wrap gap-2">
                                        {profile.skills.split(',').map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-500/20"
                                            >
                                                {skill.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Bio
                                    </label>
                                    <textarea
                                        value={profile.bio}
                                        onChange={(e) => handleProfileChange('bio', e.target.value)}
                                        placeholder="Tell us about yourself, your interests, and career goals..."
                                        rows="4"
                                        className="w-full bg-[#0a192f] px-4 py-3 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{profile.bio.length}/500 characters</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-[#112240] p-6 rounded-xl border border-gray-800">
                            <h3 className="text-xl font-bold text-white mb-4">Social Links</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        GitHub Profile
                                    </label>
                                    <input
                                        type="url"
                                        value={profile.github}
                                        onChange={(e) => handleProfileChange('github', e.target.value)}
                                        placeholder="https://github.com/yourusername"
                                        className="w-full bg-[#0a192f] px-4 py-3 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        LinkedIn Profile
                                    </label>
                                    <input
                                        type="url"
                                        value={profile.linkedin}
                                        onChange={(e) => handleProfileChange('linkedin', e.target.value)}
                                        placeholder="https://linkedin.com/in/yourusername"
                                        className="w-full bg-[#0a192f] px-4 py-3 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Portfolio Website
                                    </label>
                                    <input
                                        type="url"
                                        value={profile.portfolio}
                                        onChange={(e) => handleProfileChange('portfolio', e.target.value)}
                                        placeholder="https://yourportfolio.com"
                                        className="w-full bg-[#0a192f] px-4 py-3 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleSaveProfile}
                                className={`flex-1 px-6 py-3 font-bold rounded-lg transition-all ${profileSaved
                                    ? 'bg-green-600 text-white'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                    } shadow-lg shadow-green-900/20`}
                            >
                                {profileSaved ? '✓ Profile Saved!' : 'Save Changes'}
                            </button>
                            <button
                                onClick={loadProfile}
                                className="px-6 py-3 bg-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Profile Completion */}
                        <div className="bg-[#112240] p-6 rounded-xl border border-gray-800">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-400">Profile Completion</span>
                                <span className="text-sm font-bold text-green-400">
                                    {Math.round((Object.values(profile).filter(v => v !== '').length / Object.keys(profile).length) * 100)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${(Object.values(profile).filter(v => v !== '').length / Object.keys(profile).length) * 100}%` }}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Complete your profile to increase your chances of getting noticed by recruiters!
                            </p>
                        </div>
                    </div>
                )}

                {/* Messages Tab */}
                {activeTab === 'messages' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-white">Messages</h2>
                                <p className="text-gray-400 mt-1">Messages from organizations</p>
                            </div>
                            <button
                                onClick={loadMessages}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh
                            </button>
                        </div>

                        {messages.length === 0 ? (
                            <div className="bg-[#112240] rounded-xl border border-gray-800 p-12 text-center">
                                <Mail className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">No Messages Yet</h3>
                                <p className="text-gray-400">Messages from organizations will appear here</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div key={message.id} className="bg-[#112240] p-6 rounded-xl border border-gray-800 hover:border-green-500/30 transition-all">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                                                    {message.from.charAt(0)}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-white">{message.from}</h3>
                                                    <p className="text-sm text-gray-400">{message.fromEmail}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500">
                                                    {new Date(message.timestamp).toLocaleDateString()}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(message.timestamp).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mb-4 pb-4 border-b border-gray-800">
                                            <h4 className="text-md font-semibold text-green-400 mb-2">
                                                {message.subject}
                                            </h4>
                                        </div>

                                        <div className="bg-[#0a192f] p-4 rounded-lg border border-gray-700">
                                            <p className="text-gray-300 whitespace-pre-wrap">
                                                {message.message}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* CV Upload Modal */}
                {showCVModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Upload Your CV/Resume
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Please upload your CV/Resume to apply for <strong>{selectedJob?.title}</strong> at <strong>{selectedJob?.company}</strong>
                            </p>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select CV/Resume (PDF or Word)
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleCVFileChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                {cvFileName && (
                                    <p className="text-sm text-green-600 mt-2">
                                        ✓ Selected: {cvFileName}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500 mt-2">
                                    Max file size: 5MB | Accepted formats: PDF, DOC, DOCX
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleSubmitApplication}
                                    disabled={!cvFile}
                                    className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${cvFile
                                        ? 'bg-green-600 hover:bg-green-700 text-white'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    Submit Application
                                </button>
                                <button
                                    onClick={() => {
                                        setShowCVModal(false);
                                        setSelectedJob(null);
                                        setCvFile(null);
                                        setCvFileName('');
                                    }}
                                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
