require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Internship = require('./models/Internship');
const connectDB = require('./config/db');

// Sample data generators
const companies = [
    // Tech Giants
    'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Tesla', 'SpaceX',
    'Uber', 'Airbnb', 'Stripe', 'Shopify', 'Adobe', 'Salesforce', 'Oracle', 'IBM',
    'Intel', 'NVIDIA', 'AMD', 'Qualcomm', 'Twitter', 'LinkedIn', 'Snap', 'Pinterest',

    // Collaboration & Productivity
    'Reddit', 'Discord', 'Slack', 'Zoom', 'Dropbox', 'Box', 'Atlassian', 'GitHub',
    'GitLab', 'Figma', 'Canva', 'Notion', 'Asana', 'Monday.com', 'Trello', 'Airtable',

    // Fintech
    'Coinbase', 'Robinhood', 'Square', 'PayPal', 'Venmo', 'Plaid', 'Brex', 'Ramp',
    'Razorpay', 'Paytm', 'PhonePe', 'CRED', 'Zerodha', 'Groww', 'Upstox',

    // Data & Cloud
    'Databricks', 'Snowflake', 'MongoDB', 'Redis', 'Elastic', 'Confluent', 'HashiCorp',
    'Docker', 'Kubernetes', 'Vercel', 'Netlify', 'Cloudflare', 'DigitalOcean', 'Heroku',

    // E-commerce & Retail
    'Flipkart', 'Myntra', 'Swiggy', 'Zomato', 'Meesho', 'Dunzo', 'BigBasket', 'Nykaa',
    'Walmart', 'Target', 'eBay', 'Etsy', 'Wayfair', 'Instacart', 'DoorDash',

    // Enterprise & SaaS
    'Freshworks', 'Zoho', 'HubSpot', 'Zendesk', 'Twilio', 'SendGrid', 'Mailchimp',
    'ServiceNow', 'Workday', 'SAP', 'Splunk', 'Datadog', 'New Relic', 'PagerDuty',

    // Gaming & Entertainment
    'Epic Games', 'Riot Games', 'Blizzard', 'EA Sports', 'Ubisoft', 'Spotify', 'SoundCloud',
    'Twitch', 'TikTok', 'YouTube', 'Vimeo', 'Hulu', 'Disney+', 'HBO Max',

    // EdTech & Learning
    'Coursera', 'Udemy', 'Khan Academy', 'Duolingo', 'BYJU\'S', 'Unacademy', 'Vedantu',
    'Skillshare', 'Pluralsight', 'LinkedIn Learning', 'Codecademy', 'FreeCodeCamp',

    // HealthTech & BioTech
    'Practo', '1mg', 'PharmEasy', 'HealthifyMe', 'Cure.fit', 'Medlife', 'Lybrate',
    'Teladoc', 'Oscar Health', 'Zocdoc', 'Moderna', 'Pfizer Digital',

    // Travel & Hospitality
    'Booking.com', 'Expedia', 'MakeMyTrip', 'OYO', 'Treebo', 'Ola', 'Lyft', 'Grab',

    // Cybersecurity
    'CrowdStrike', 'Palo Alto Networks', 'Fortinet', 'Check Point', 'Okta', 'Auth0',

    // AI & ML Companies
    'OpenAI', 'Anthropic', 'Hugging Face', 'Scale AI', 'Cohere', 'Stability AI',

    // Startups & Unicorns
    'Postman', 'Razorpay', 'Dream11', 'MPL', 'ShareChat', 'Glance', 'InMobi',
    'Ola Electric', 'Rivigo', 'BlackBuck', 'Licious', 'UrbanCompany', 'Rebel Foods'
];

const locations = [
    // India
    'Remote', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Chennai',
    'Gurugram', 'Noida', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Chandigarh', 'Kochi',

    // USA
    'San Francisco', 'New York', 'Seattle', 'Austin', 'Boston', 'Los Angeles',
    'Chicago', 'Denver', 'Portland', 'Miami', 'Atlanta', 'Dallas', 'San Diego',

    // Europe
    'London', 'Berlin', 'Amsterdam', 'Dublin', 'Paris', 'Barcelona', 'Stockholm',
    'Zurich', 'Copenhagen', 'Prague', 'Warsaw', 'Lisbon', 'Munich',

    // Asia-Pacific
    'Singapore', 'Tokyo', 'Sydney', 'Melbourne', 'Hong Kong', 'Seoul', 'Bangkok',
    'Shanghai', 'Beijing', 'Taipei', 'Kuala Lumpur', 'Jakarta',

    // Canada
    'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa',

    // Hybrid/Flexible
    'Hybrid', 'Flexible', 'Work from Anywhere'
];

const roles = [
    // Frontend (20+)
    'Frontend Developer', 'React Developer', 'Vue.js Developer', 'Angular Developer',
    'UI Developer', 'Web Developer', 'JavaScript Developer', 'TypeScript Developer',
    'Next.js Developer', 'Svelte Developer', 'Frontend Engineer', 'UI Engineer',
    'Web3 Frontend Developer', 'Micro-Frontend Developer', 'Jamstack Developer',
    'Progressive Web App Developer', 'Accessibility Engineer', 'Frontend Performance Engineer',

    // Backend (25+)
    'Backend Developer', 'Node.js Developer', 'Python Developer', 'Java Developer',
    'Go Developer', 'Ruby Developer', 'PHP Developer', 'C# Developer', '.NET Developer',
    'Rust Developer', 'Scala Developer', 'Elixir Developer', 'API Developer',
    'Microservices Developer', 'GraphQL Developer', 'Backend Engineer', 'Systems Engineer',
    'Distributed Systems Engineer', 'Database Developer', 'Backend Architect',

    // Full Stack (15+)
    'Full Stack Developer', 'MERN Stack Developer', 'MEAN Stack Developer',
    'Django Developer', 'Rails Developer', 'Spring Boot Developer', 'Laravel Developer',
    'Full Stack Engineer', 'T-Shaped Developer', 'Serverless Developer',
    'JAMstack Developer', 'Low-Code Developer', 'Full Stack Architect',

    // Mobile (15+)
    'Mobile Developer', 'iOS Developer', 'Android Developer', 'React Native Developer',
    'Flutter Developer', 'Swift Developer', 'Kotlin Developer', 'Xamarin Developer',
    'Ionic Developer', 'Mobile App Engineer', 'Cross-Platform Developer',
    'Mobile UI/UX Developer', 'Mobile Game Developer', 'Mobile Security Engineer',

    // Data & ML (25+)
    'Data Scientist', 'Machine Learning Engineer', 'AI Engineer', 'Data Analyst',
    'Data Engineer', 'ML Ops Engineer', 'NLP Engineer', 'Computer Vision Engineer',
    'Deep Learning Engineer', 'AI Research Scientist', 'Data Architect',
    'Business Intelligence Analyst', 'Analytics Engineer', 'Big Data Engineer',
    'Feature Engineering Specialist', 'ML Platform Engineer', 'AI Product Manager',
    'Prompt Engineer', 'LLM Engineer', 'Generative AI Engineer',

    // DevOps & Cloud (20+)
    'DevOps Engineer', 'Cloud Engineer', 'Site Reliability Engineer', 'Platform Engineer',
    'AWS Engineer', 'Azure Engineer', 'GCP Engineer', 'Kubernetes Engineer',
    'Infrastructure Engineer', 'Release Engineer', 'Build Engineer', 'CI/CD Engineer',
    'Cloud Architect', 'Cloud Security Engineer', 'CloudOps Engineer',
    'Infrastructure as Code Engineer', 'Container Engineer', 'Observability Engineer',

    // Security (15+)
    'Security Engineer', 'Cybersecurity Analyst', 'Penetration Tester', 'Security Researcher',
    'Application Security Engineer', 'Network Security Engineer', 'Cloud Security Specialist',
    'Security Operations Analyst', 'Incident Response Analyst', 'Threat Intelligence Analyst',
    'Compliance Engineer', 'Security Architect', 'Ethical Hacker', 'Bug Bounty Hunter',

    // Design (15+)
    'UI/UX Designer', 'Product Designer', 'Graphic Designer', 'UX Researcher',
    'Interaction Designer', 'Visual Designer', 'Motion Designer', 'Design Systems Designer',
    'Brand Designer', '3D Designer', 'Illustrator', 'User Researcher',
    'Service Designer', 'Design Ops Specialist', 'Creative Technologist',

    // QA & Testing (10+)
    'QA Engineer', 'Test Automation Engineer', 'Quality Analyst', 'SDET',
    'Performance Test Engineer', 'Security Test Engineer', 'Mobile QA Engineer',
    'API Test Engineer', 'Test Architect', 'QA Lead',

    // Emerging Tech (20+)
    'Blockchain Developer', 'Smart Contract Developer', 'Web3 Developer', 'DeFi Developer',
    'Game Developer', 'Unity Developer', 'Unreal Engine Developer', 'AR/VR Developer',
    'Metaverse Developer', 'IoT Developer', 'Embedded Systems Engineer', 'Robotics Engineer',
    'Quantum Computing Researcher', 'Edge Computing Engineer', '5G Network Engineer',
    'Drone Software Engineer', 'Autonomous Systems Engineer', 'Wearables Developer',

    // Product & Management (10+)
    'Technical Product Manager', 'Engineering Manager', 'Scrum Master', 'Agile Coach',
    'Technical Writer', 'Developer Advocate', 'Solutions Architect', 'Technical Consultant',
    'Integration Engineer', 'Support Engineer'
];

const skillSets = [
    // Frontend
    ['React', 'JavaScript', 'CSS', 'HTML', 'Redux', 'Webpack'],
    ['Vue.js', 'JavaScript', 'Vuex', 'Nuxt.js', 'TypeScript', 'Vite'],
    ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Material UI', 'Jasmine'],
    ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    ['Svelte', 'SvelteKit', 'TypeScript', 'Vite', 'CSS3'],
    ['HTML5', 'CSS3', 'Sass', 'JavaScript', 'Responsive Design', 'Accessibility'],
    ['React', 'GraphQL', 'Apollo Client', 'TypeScript', 'Styled Components'],

    // Backend
    ['Node.js', 'Express', 'MongoDB', 'REST API', 'JWT', 'Socket.io'],
    ['Python', 'Django', 'PostgreSQL', 'Redis', 'Celery', 'Docker'],
    ['Python', 'Flask', 'SQLAlchemy', 'Docker', 'AWS', 'Pytest'],
    ['Java', 'Spring Boot', 'MySQL', 'Hibernate', 'Maven', 'JUnit'],
    ['Go', 'Gin', 'PostgreSQL', 'gRPC', 'Docker', 'Microservices'],
    ['Ruby', 'Rails', 'PostgreSQL', 'Sidekiq', 'RSpec', 'Heroku'],
    ['PHP', 'Laravel', 'MySQL', 'Redis', 'Composer', 'PHPUnit'],
    ['C#', '.NET Core', 'SQL Server', 'Entity Framework', 'Azure'],
    ['Rust', 'Actix', 'PostgreSQL', 'Tokio', 'WebAssembly'],
    ['Scala', 'Play Framework', 'Akka', 'MongoDB', 'Kafka'],
    ['Elixir', 'Phoenix', 'PostgreSQL', 'Ecto', 'LiveView'],

    // Full Stack
    ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'AWS'],
    ['Vue.js', 'Node.js', 'PostgreSQL', 'Express', 'Docker', 'Nginx'],
    ['Angular', 'Java', 'Spring Boot', 'MySQL', 'Kubernetes'],
    ['Next.js', 'Prisma', 'PostgreSQL', 'TypeScript', 'tRPC'],
    ['Django', 'React', 'PostgreSQL', 'Docker', 'AWS', 'Celery'],

    // Mobile
    ['React Native', 'JavaScript', 'Redux', 'Firebase', 'iOS', 'Android'],
    ['Flutter', 'Dart', 'Firebase', 'REST API', 'Material Design', 'BLoC'],
    ['Swift', 'SwiftUI', 'Core Data', 'Combine', 'Xcode', 'TestFlight'],
    ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Room', 'Retrofit', 'Coroutines'],
    ['Xamarin', 'C#', 'XAML', 'Azure', 'SQLite'],
    ['Ionic', 'Angular', 'Capacitor', 'TypeScript', 'Cordova'],

    // Data Science & ML
    ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy'],
    ['Python', 'Keras', 'NumPy', 'Matplotlib', 'Jupyter', 'OpenCV'],
    ['R', 'SQL', 'Tableau', 'Power BI', 'Excel', 'Statistics'],
    ['Spark', 'Hadoop', 'Kafka', 'Airflow', 'Python', 'Scala'],
    ['Python', 'NLP', 'spaCy', 'NLTK', 'Transformers', 'Hugging Face'],
    ['Python', 'Computer Vision', 'OpenCV', 'YOLO', 'TensorFlow', 'PyTorch'],
    ['MLOps', 'Kubeflow', 'MLflow', 'Docker', 'Kubernetes', 'Python'],
    ['SQL', 'Python', 'dbt', 'Snowflake', 'Airflow', 'ETL'],
    ['Deep Learning', 'PyTorch', 'GANs', 'CNNs', 'RNNs', 'Python'],
    ['LLMs', 'LangChain', 'OpenAI API', 'Vector Databases', 'Python'],

    // DevOps & Cloud
    ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'AWS', 'Ansible'],
    ['AWS', 'CloudFormation', 'Lambda', 'EC2', 'S3', 'RDS'],
    ['Azure', 'ARM Templates', 'Azure Functions', 'DevOps', 'PowerShell'],
    ['GCP', 'Cloud Functions', 'BigQuery', 'Kubernetes', 'Terraform'],
    ['Linux', 'Bash', 'Ansible', 'Prometheus', 'Grafana', 'ELK Stack'],
    ['Kubernetes', 'Helm', 'Istio', 'Docker', 'CI/CD', 'ArgoCD'],
    ['Terraform', 'AWS', 'Infrastructure as Code', 'GitOps', 'Vault'],
    ['GitHub Actions', 'CI/CD', 'Docker', 'Kubernetes', 'Automation'],
    ['Monitoring', 'Datadog', 'New Relic', 'Splunk', 'APM', 'Logging'],

    // Security
    ['Penetration Testing', 'Burp Suite', 'Metasploit', 'Kali Linux', 'OWASP'],
    ['Security', 'SIEM', 'Firewall', 'IDS/IPS', 'Network Security'],
    ['Application Security', 'OWASP', 'Security Testing', 'Code Review'],
    ['Cloud Security', 'AWS Security', 'IAM', 'Compliance', 'Encryption'],
    ['Incident Response', 'Forensics', 'Threat Hunting', 'SIEM', 'SOC'],

    // Design
    ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Wireframing'],
    ['UI Design', 'Visual Design', 'Design Systems', 'Figma', 'Adobe Creative Suite'],
    ['UX Research', 'User Testing', 'Analytics', 'Surveys', 'Personas'],
    ['Motion Design', 'After Effects', 'Lottie', 'Animation', 'Principle'],
    ['3D Design', 'Blender', 'Cinema 4D', 'Three.js', 'WebGL'],

    // Testing
    ['Selenium', 'Jest', 'Cypress', 'JUnit', 'TestNG', 'Automation'],
    ['API Testing', 'Postman', 'REST Assured', 'JMeter', 'Performance Testing'],
    ['Mobile Testing', 'Appium', 'XCTest', 'Espresso', 'Detox'],

    // Emerging Tech
    ['Solidity', 'Ethereum', 'Web3.js', 'Smart Contracts', 'Truffle', 'Hardhat'],
    ['Unity', 'C#', 'Game Development', '3D Modeling', 'Shader Programming'],
    ['Unreal Engine', 'C++', 'Blueprints', 'Game Design', 'VR'],
    ['AR/VR', 'Unity', 'ARKit', 'ARCore', 'Oculus SDK', '3D Graphics'],
    ['C++', 'Embedded C', 'RTOS', 'ARM', 'Microcontrollers', 'IoT'],
    ['ROS', 'Python', 'C++', 'Computer Vision', 'Robotics', 'Sensors'],
    ['Rust', 'WebAssembly', 'System Programming', 'Performance', 'LLVM'],
    ['GraphQL', 'Apollo', 'Prisma', 'TypeScript', 'PostgreSQL', 'Hasura']
];

const durations = ['2 months', '3 months', '4 months', '6 months', '12 months'];
const types = ['Internship', 'Project'];

const descriptions = [
    'Work on cutting-edge technology and contribute to real-world projects that impact millions.',
    'Join our team to build scalable solutions using modern tech stack and best practices.',
    'Collaborate with experienced engineers on innovative products in a fast-paced environment.',
    'Help us revolutionize the industry with cutting-edge technology and creative solutions.',
    'Build features that impact users globally while learning from industry experts.',
    'Work on open-source projects and contribute to the developer community.',
    'Design and implement robust, scalable systems with high performance requirements.',
    'Optimize performance and enhance user experience across multiple platforms.',
    'Research and implement new technologies, frameworks, and architectural patterns.',
    'Develop tools that empower developers worldwide and improve productivity.',
    'Gain hands-on experience with cloud-native technologies and microservices architecture.',
    'Work with cross-functional teams to deliver high-quality software solutions.',
    'Participate in code reviews, pair programming, and agile development practices.',
    'Build and maintain CI/CD pipelines for automated testing and deployment.',
    'Contribute to product roadmap and technical decision-making processes.',
    'Learn industry best practices while working on challenging technical problems.',
    'Develop machine learning models and deploy them to production environments.',
    'Create intuitive user interfaces with focus on accessibility and performance.',
    'Work with big data technologies to process and analyze large datasets.',
    'Build secure, compliant systems following industry security standards.'
];

const importData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany();
        await Internship.deleteMany();

        console.log('Data Destroyed!');

        // Create sample users
        const hashedPassword = await bcrypt.hash('password123', 10);

        const orgUser = await User.create({
            name: 'Tech Corp',
            email: 'hr@techcorp.com',
            password: hashedPassword,
            role: 'organization'
        });

        const studentUser = await User.create({
            name: 'John Student',
            email: 'john@student.com',
            password: hashedPassword,
            role: 'student'
        });

        console.log('Users Created!');

        // Generate 250+ diverse opportunities
        const opportunities = [];

        for (let i = 0; i < 250; i++) {
            const company = companies[Math.floor(Math.random() * companies.length)];
            const role = roles[Math.floor(Math.random() * roles.length)];
            const location = locations[Math.floor(Math.random() * locations.length)];
            const skills = skillSets[Math.floor(Math.random() * skillSets.length)];
            const duration = durations[Math.floor(Math.random() * durations.length)];
            const type = types[Math.floor(Math.random() * types.length)];
            const description = descriptions[Math.floor(Math.random() * descriptions.length)];

            // Determine category based on role with comprehensive matching
            let category = 'Other';
            const roleLower = role.toLowerCase();

            if (roleLower.includes('frontend') || roleLower.includes('react') || roleLower.includes('vue') ||
                roleLower.includes('angular') || roleLower.includes('ui developer') || roleLower.includes('web developer') ||
                roleLower.includes('next.js') || roleLower.includes('svelte') || roleLower.includes('jamstack')) {
                category = 'Frontend';
            } else if (roleLower.includes('backend') || roleLower.includes('node') || roleLower.includes('python') ||
                roleLower.includes('java') || roleLower.includes('go ') || roleLower.includes('ruby') ||
                roleLower.includes('php') || roleLower.includes('c#') || roleLower.includes('.net') ||
                roleLower.includes('rust') || roleLower.includes('scala') || roleLower.includes('elixir') ||
                roleLower.includes('api') || roleLower.includes('microservices') || roleLower.includes('graphql')) {
                category = 'Backend';
            } else if (roleLower.includes('full stack') || roleLower.includes('mern') || roleLower.includes('mean') ||
                roleLower.includes('django') || roleLower.includes('rails') || roleLower.includes('spring boot') ||
                roleLower.includes('laravel') || roleLower.includes('serverless')) {
                category = 'Full Stack';
            } else if (roleLower.includes('mobile') || roleLower.includes('ios') || roleLower.includes('android') ||
                roleLower.includes('react native') || roleLower.includes('flutter') || roleLower.includes('swift') ||
                roleLower.includes('kotlin') || roleLower.includes('xamarin') || roleLower.includes('ionic')) {
                category = 'Mobile';
            } else if (roleLower.includes('data') || roleLower.includes('ml') || roleLower.includes('ai') ||
                roleLower.includes('machine learning') || roleLower.includes('deep learning') ||
                roleLower.includes('nlp') || roleLower.includes('computer vision') || roleLower.includes('analytics') ||
                roleLower.includes('business intelligence') || roleLower.includes('big data') || roleLower.includes('llm') ||
                roleLower.includes('generative ai') || roleLower.includes('prompt engineer')) {
                category = 'Data Science';
            } else if (roleLower.includes('devops') || roleLower.includes('cloud') || roleLower.includes('aws') ||
                roleLower.includes('azure') || roleLower.includes('gcp') || roleLower.includes('kubernetes') ||
                roleLower.includes('sre') || roleLower.includes('platform') || roleLower.includes('infrastructure') ||
                roleLower.includes('ci/cd') || roleLower.includes('observability')) {
                category = 'DevOps';
            } else if (roleLower.includes('design') || roleLower.includes('ui/ux') || roleLower.includes('ux') ||
                roleLower.includes('graphic') || roleLower.includes('visual') || roleLower.includes('motion') ||
                roleLower.includes('3d designer') || roleLower.includes('illustrator') || roleLower.includes('brand')) {
                category = 'Design';
            } else if (roleLower.includes('security') || roleLower.includes('cybersecurity') || roleLower.includes('penetration') ||
                roleLower.includes('ethical hacker') || roleLower.includes('bug bounty') || roleLower.includes('compliance') ||
                roleLower.includes('incident response') || roleLower.includes('threat')) {
                category = 'Security';
            } else if (roleLower.includes('qa') || roleLower.includes('test') || roleLower.includes('quality') || roleLower.includes('sdet')) {
                category = 'QA';
            } else if (roleLower.includes('blockchain') || roleLower.includes('web3') || roleLower.includes('smart contract') ||
                roleLower.includes('defi') || roleLower.includes('game') || roleLower.includes('unity') ||
                roleLower.includes('unreal') || roleLower.includes('ar/vr') || roleLower.includes('metaverse') ||
                roleLower.includes('iot') || roleLower.includes('embedded') || roleLower.includes('robotics') ||
                roleLower.includes('quantum') || roleLower.includes('edge computing') || roleLower.includes('5g') ||
                roleLower.includes('drone') || roleLower.includes('autonomous') || roleLower.includes('wearables')) {
                category = 'Emerging Tech';
            }

            opportunities.push({
                title: `${role} ${type === 'Internship' ? 'Intern' : 'Project'}`,
                company,
                location,
                type,
                category,
                duration,
                description,
                skills,
                postedBy: orgUser._id,
                status: 'Active'
            });
        }

        await Internship.insertMany(opportunities);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
