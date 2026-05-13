const Job = require('../models/Job');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public or Protected
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).populate('postedBy', 'firstName lastName email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public or Protected
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'firstName lastName email');

    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private/Recruiter
const createJob = async (req, res) => {
  try {
    const { title, company, description, requirements, location, salary, jobType, applicationDeadline } = req.body;

    const job = new Job({
      title,
      company,
      description,
      requirements,
      location,
      salary,
      jobType,
      applicationDeadline,
      postedBy: req.user._id,
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(400).json({ message: 'Invalid job data', error: error.message });
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private/Recruiter
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (job) {
      // Check if the user is the owner of the job
      if (job.postedBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this job' });
      }

      job.title = req.body.title || job.title;
      job.company = req.body.company || job.company;
      job.description = req.body.description || job.description;
      job.requirements = req.body.requirements || job.requirements;
      job.location = req.body.location || job.location;
      job.salary = req.body.salary || job.salary;
      job.jobType = req.body.jobType || job.jobType;
      job.applicationDeadline = req.body.applicationDeadline || job.applicationDeadline;
      job.status = req.body.status || job.status;

      const updatedJob = await job.save();
      res.json(updatedJob);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private/Recruiter
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (job) {
      // Check if the user is the owner of the job
      if (job.postedBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this job' });
      }

      await job.deleteOne();
      res.json({ message: 'Job removed' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
