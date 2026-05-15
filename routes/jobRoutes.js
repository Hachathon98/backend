const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');
const { protect, isRecruiter } = require('../middleware/authMiddleware');

router.route('/')
  .get(getJobs)
  .post(protect, isRecruiter, createJob);

router.route('/:id')
  .get(getJobById)
  .put(protect, isRecruiter, updateJob)
  .delete(protect, isRecruiter, deleteJob);

module.exports = router;
