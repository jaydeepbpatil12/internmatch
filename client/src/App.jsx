import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import StudentLogin from './pages/StudentLogin';
import OrgLogin from './pages/OrgLogin';
import Register from './pages/Register';
import OrgDashboard from './pages/OrgDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Browse from './pages/Browse';
import ContactSupport from './pages/ContactSupport';
import JobBuddy from './components/JobBuddy';

import ForStudents from './pages/ForStudents';
import ForOrganizations from './pages/ForOrganizations';
import StudentDashboard from './pages/StudentDashboard';
import AnimationExamples from './components/AnimationExamples';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact-support" element={<ContactSupport />} />
                <Route path="/login" element={<Login />} />
                <Route path="/student-login" element={<StudentLogin />} />
                <Route path="/org-login" element={<OrgLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/for-students" element={<ForStudents />} />
                <Route path="/for-organizations" element={<ForOrganizations />} />
                <Route path="/animation-examples" element={<AnimationExamples />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/org-dashboard" element={<OrgDashboard />} />
                    <Route path="/student-dashboard" element={<StudentDashboard />} />
                    <Route path="/browse" element={<Browse />} />
                </Route>
            </Routes>

            {/* Job Buddy AI Assistant - Available on all pages */}
            <JobBuddy />
        </>
    );
}

export default App;
