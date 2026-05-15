const express = require('express');
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
} = require('../controllers/applicationController');
const { protect, isRecruiter } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, applyForJob);

router.route('/my-applications')
  .get(protect, getMyApplications);

router.route('/job/:jobId')
  .get(protect, isRecruiter, getJobApplications);

router.route('/:id/status')
  .put(protect, isRecruiter, updateApplicationStatus);

module.exports = router;
