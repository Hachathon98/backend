const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));

// Temporary Seeding Route for Production
app.get('/api/seed', async (req, res) => {
    try {
        const Job = require('./models/Job');
        const User = require('./models/User');
        
        // Find a recruiter
        let recruiter = await User.findOne({ role: 'recruiter' });
        if (!recruiter) {
            recruiter = await User.create({
                firstName: 'Demo', lastName: 'Recruiter', email: 'demo@placement.com', 
                password: 'password123', role: 'recruiter'
            });
        }

        const jobs = [
            {
                title: 'Banking Associate', company: 'State Bank of India',
                description: 'Handling customer queries and bank operations.', location: 'Mogaltur',
                jobType: 'Full-time', postedBy: recruiter._id, status: 'Open', salary: '35,000 - 50,000'
            },
            {
                title: 'Software Developer', company: 'Tech Solutions',
                description: 'Build modern web applications with React and Node.js.', location: 'Hyderabad',
                jobType: 'Full-time', postedBy: recruiter._id, status: 'Open', salary: '80,000 - 1,20,000'
            },
            {
                title: 'Data Analyst', company: 'Insight Analytics',
                description: 'Analyze large datasets to provide business insights.', location: 'Bangalore',
                jobType: 'Full-time', postedBy: recruiter._id, status: 'Open', salary: '60,000 - 90,000'
            },
            {
                title: 'Marketing Intern', company: 'Creative Agency',
                description: 'Assist in social media campaigns and market research.', location: 'Remote',
                jobType: 'Internship', postedBy: recruiter._id, status: 'Open', salary: '15,000 - 20,000'
            },
            {
                title: 'HR Manager', company: 'Global Corp',
                description: 'Manage recruitment and employee relations.', location: 'Mumbai',
                jobType: 'Full-time', postedBy: recruiter._id, status: 'Open', salary: '70,000 - 1,00,000'
            },
            {
                title: 'Frontend Developer', company: 'WebFlow',
                description: 'Expertise in React and Tailwind CSS required.', location: 'Pune',
                jobType: 'Contract', postedBy: recruiter._id, status: 'Open', salary: '50,000 - 70,000'
            },
            {
                title: 'Full Stack Engineer', company: 'StartUp Hub',
                description: 'Develop end-to-end solutions for a growing platform.', location: 'Bangalore',
                jobType: 'Full-time', postedBy: recruiter._id, status: 'Open', salary: '1,00,000 - 1,50,000'
            },
            {
                title: 'Graphic Designer', company: 'Visuals Co.',
                description: 'Create stunning visuals for branding and social media.', location: 'Delhi',
                jobType: 'Part-time', postedBy: recruiter._id, status: 'Open', salary: '25,000 - 40,000'
            },
            {
                title: 'Product Manager', company: 'E-Commerce Giant',
                description: 'Lead product development from ideation to launch.', location: 'Remote',
                jobType: 'Full-time', postedBy: recruiter._id, status: 'Open', salary: '1,20,000 - 1,80,000'
            },
            {
                title: 'Mobile App Developer', company: 'Appify',
                description: 'Build cross-platform apps using Flutter or React Native.', location: 'Chennai',
                jobType: 'Full-time', postedBy: recruiter._id, status: 'Open', salary: '60,000 - 95,000'
            },
            {
                title: 'UI/UX Designer', company: 'Design Studio',
                description: 'Focus on user research and intuitive interface design.', location: 'Mumbai',
                jobType: 'Internship', postedBy: recruiter._id, status: 'Open', salary: '20,000 - 25,000'
            },
            {
                title: 'Backend Engineer', company: 'Secure Systems',
                description: 'Develop scalable backend architectures using Node.js and MongoDB.', location: 'Hyderabad',
                jobType: 'Full-time', postedBy: recruiter._id, status: 'Open', salary: '85,000 - 1,30,000'
            }
        ];

        await Job.deleteMany({});
        await Job.insertMany(jobs);
        res.send('Production Database Seeded Successfully!');
    } catch (err) {
        res.status(500).send('Seeding failed: ' + err.message);
    }
});

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
