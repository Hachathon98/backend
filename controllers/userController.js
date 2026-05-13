const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        bio: user.bio,
        phone: user.phone,
        skills: user.skills,
        education: user.education,
        experience: user.experience,
        resumeUrl: user.resumeUrl,
        website: user.website,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.bio = req.body.bio || user.bio;
      user.phone = req.body.phone || user.phone;
      user.skills = req.body.skills || user.skills;
      user.education = req.body.education || user.education;
      user.experience = req.body.experience || user.experience;
      user.resumeUrl = req.body.resumeUrl || user.resumeUrl;
      user.website = req.body.website || user.website;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        role: updatedUser.role,
        bio: updatedUser.bio,
        phone: updatedUser.phone,
        skills: updatedUser.skills,
        education: updatedUser.education,
        experience: updatedUser.experience,
        resumeUrl: updatedUser.resumeUrl,
        website: updatedUser.website,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
