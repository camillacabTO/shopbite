import express from 'express';
import {
  loginUser,
  getProfile,
  signupUser,
  updateProfile,
} from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.route('/').post(signupUser);
router.post('/login', loginUser);
//protected route
router.route('/profile').get(auth, getProfile).put(auth, updateProfile);

export default router;
