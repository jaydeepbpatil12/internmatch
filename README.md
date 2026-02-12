# 🎓 Online Internship Matching Platform

A comprehensive MERN stack platform connecting students with internship, project, and freelance opportunities. Features include intelligent matching, CV upload, messaging system, and separate dashboards for students and organizations.

## 🌟 Features

### For Students
- 📝 **Browse Opportunities** - Search and filter internships, projects, and freelance work
- 📄 **CV Upload** - Upload resume when applying (PDF, DOC, DOCX)
- 📊 **Application Tracking** - Track all applications and their status
- 💬 **Messages** - Receive messages from organizations
- 👤 **Profile Management** - Complete profile with skills, education, and social links
- 🤖 **Job Buddy AI** - AI-powered chatbot for career guidance

### For Organizations
- ➕ **Post Opportunities** - Create internship, project, and freelance listings
- 📋 **Manage Listings** - Edit, delete, and toggle status of postings
- 👥 **Review Applicants** - View applications with CV downloads
- ✅ **Approved Candidates** - Separate list of accepted candidates
- 💬 **Messaging System** - Send messages to approved candidates
- ⚙️ **Organization Profile** - Manage company information

### Additional Features
- 🎨 **Modern UI/UX** - Dark mode with glassmorphism design
- 📱 **Responsive Design** - Works on all devices
- 🔒 **Authentication** - Secure login for students and organizations
- 📞 **Contact Support** - Built-in support system
- 📈 **Real-time Updates** - Live application status updates

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - Authentication

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Clone Repository
```bash
git clone https://github.com/Aishwarya-Arya05/Online_InternshipMatching_platform.git
cd Online_InternshipMatching_platform
```

### Backend Setup
```bash
cd server
npm install

# Create .env file
echo "MONGO_URI=your_mongodb_connection_string" > .env
echo "JWT_SECRET=your_jwt_secret_key" >> .env
echo "PORT=5000" >> .env

# Start server
npm run dev
# or
nodemon server.js
```

### Frontend Setup
```bash
cd client
npm install

# Start development server
npm run dev
# or
npm start
```

The application will run on:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 📁 Project Structure

```
Internship_web/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── JobBuddy.jsx
│   │   │   └── ...
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── OrgDashboard.jsx
│   │   │   ├── Browse.jsx
│   │   │   └── ...
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
│
├── server/                # Backend Node.js application
│   ├── config/
│   │   └── db.js         # Database configuration
│   ├── controllers/      # Route controllers
│   │   ├── authController.js
│   │   ├── internshipController.js
│   │   ├── messageController.js
│   │   └── contactController.js
│   ├── models/           # Mongoose models
│   │   ├── User.js
│   │   ├── Internship.js
│   │   ├── Application.js
│   │   ├── Message.js
│   │   └── Contact.js
│   ├── routes/           # API routes
│   │   ├── authRoutes.js
│   │   ├── internshipRoutes.js
│   │   ├── messageRoutes.js
│   │   └── contactRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js         # Entry point
│   └── package.json
│
└── README.md
```

## 🔑 Environment Variables

Create a `.env` file in the `server` directory:

```env
MONGO_URI=mongodb://localhost:27017/internship_platform
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/internship_platform

JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

## 🚀 Usage

### Student Workflow
1. **Register/Login** as a student
2. **Complete Profile** with education, skills, and links
3. **Browse Opportunities** and filter by type/category
4. **Apply** by uploading CV
5. **Track Applications** in dashboard
6. **Receive Messages** from organizations

### Organization Workflow
1. **Register/Login** as an organization
2. **Set Up Profile** with company information
3. **Post Opportunities** with details and requirements
4. **Review Applicants** and download CVs
5. **Accept/Reject** applications
6. **Send Messages** to approved candidates

## 📊 Database Collections

### users
- Student and organization accounts
- Authentication credentials
- Profile information

### internships
- Job postings
- Requirements and skills
- Status (Active/Closed)

### applications
- Student applications
- CV data (base64)
- Status tracking

### messages
- Organization-student communication
- Read status
- Timestamps

### contacts
- Support requests
- Priority and category

## 🎨 Key Features Explained

### CV Upload System
- Students must upload CV when applying
- Supports PDF, DOC, DOCX formats
- Max file size: 5MB
- Stored as base64 in database
- Organizations can download CVs

### Messaging System
- Organizations send messages to approved candidates
- Students receive messages in inbox
- Unread message count badge
- Stored in MongoDB with full tracking

### Approved Candidates
- Separate tab for accepted applicants
- Send personalized messages
- Download CVs
- Track hiring progress

### Job Buddy AI
- AI-powered career chatbot
- Provides guidance and tips
- Answers common questions
- Available on all pages

## 🔒 Security Features

- Password hashing with bcrypt
- JWT authentication
- Protected routes
- Input validation
- CORS enabled
- Environment variables for secrets

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

- **Aishwarya Arya** - [GitHub](https://github.com/Aishwarya-Arya05)

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the database
- Tailwind CSS for styling utilities
- Lucide for beautiful icons
- All contributors and supporters

## 📧 Contact

For questions or support, please use the in-app contact form or reach out via GitHub issues.

---

**Made with ❤️ for connecting students with opportunities**
