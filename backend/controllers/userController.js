import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const signupUser = async (req, res) => {
  const { email, password, name } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error('User already in our database');
  }

  const newUser = await User.create({
    email,
    password,
    name,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid data provided');
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(`authenticateUser ${email} ${password}`);

  const foundUser = await User.findOne({ email });

  if (foundUser && foundUser.checkPassword(password)) {
    res.json({
      _id: foundUser._id,
      email: foundUser.email,
      name: foundUser.name,
      isAdmin: foundUser.isAdmin,
      token: generateToken(foundUser._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User does not exist');
  }
};
