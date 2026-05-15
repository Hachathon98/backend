const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');
const User = require('./models/User');

dotenv.config();

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Find or create a recruiter user to "post" the jobs
    let recruiter = await User.findOne({ role: 'recruiter' });
    if (!recruiter) {
      recruiter = await User.create({
        firstName: 'System',
        lastName: 'Admin',
        email: 'admin@placement.com',
        password: 'password123',
        role: 'recruiter'
      });
      console.log('Created a dummy recruiter user.');
    }

    // Delete existing jobs to avoid duplicates during testing
    await Job.deleteMany({});

    const jobs = [
      {
        title: 'Banking Associate',
        company: 'State Bank of India',
        description: 'Handling customer queries and bank operations.',
        requirements: ['Graduate', 'Good communication'],
        location: 'Mogaltur',
        salary: '30,000 - 45,000',
        jobType: 'Full-time',
        postedBy: recruiter._id,
        status: 'Open'
      },
      {
        title: 'Software Developer',
        company: 'Tech Solutions',
        description: 'Build modern web applications with React and Node.',
        requirements: ['JavaScript', 'React', 'Problem Solving'],
        location: 'Hyderabad',
        salary: '80,000 - 1,20,000',
        jobType: 'Full-time',
        postedBy: recruiter._id,
        status: 'Open'
      },
      {
        title: 'Bank Manager',
        company: 'HDFC Bank',
        description: 'Manage branch operations and staff.',
        requirements: ['MBA', '5+ years experience'],
        location: 'Mogaltur',
        salary: '60,000 - 90,000',
        jobType: 'Full-time',
        postedBy: recruiter._id,
        status: 'Open'
      }
    ];

    await Job.insertMany(jobs);
    console.log('Seed data inserted successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedJobs();
