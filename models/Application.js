const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resumeLink: {
    type: String,
    required: [true, 'Please provide a link to your resume'],
  },
  coverLetter: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Applied', 'Under Review', 'Interview Scheduled', 'Offered', 'Rejected'],
    default: 'Applied',
  },
}, {
  timestamps: true,
});

// Prevent a user from applying to the same job multiple times
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
