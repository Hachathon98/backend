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
                description: 'Handling bank operations.', location: 'Mogaltur',
                jobType: 'Full-time', postedBy: recruiter._id, status: 'Open'
            },
            {
                title: 'Software Developer', company: 'Tech Solutions',
                description: 'Build web apps.', location: 'Hyderabad',
                jobType: 'Full-time', postedBy: recruiter._id, status: 'Open'
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
