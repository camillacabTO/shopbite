import express from 'express';
import {
  loginUser,
  getProfile,
  signupUser,
} from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.route('/').post(signupUser);
router.post('/login', loginUser);
//protected route
router.route('/profile').get(auth, getProfile);

export default router;
