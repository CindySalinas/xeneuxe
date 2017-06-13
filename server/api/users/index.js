
const UserController = require('./users');
const express = require('express');
const router = express.Router();

// export routes
module.exports = router;

/**
 * Get users Profile
 */
router.get('/', UserController.getUsers);

/**
 * Create user
 */
router.post('/', UserController.createUser);

/**
 * Find single user  profile
 */
router.get('/:userId', UserController.findUser);

/**
 * Update user profile
 */
router.put('/:userId', UserController.updateUser);

/**
 * Delete User profile
 */
router.delete('/:userId', UserController.deleteUser);
