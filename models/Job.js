const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a job title'],
  },
  company: {
    type: String,
    required: [true, 'Please add a company name'],
  },
  description: {
    type: String,
    required: [true, 'Please add a job description'],
  },
  requirements: {
    type: [String],
    default: [],
  },
  location: {
    type: String,
    default: 'Remote',
  },
  salary: {
    type: String,
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Contract'],
    required: [true, 'Please specify the job type'],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  applicationDeadline: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open',
  },
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
