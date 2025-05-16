const User = require('../models/User');

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const createUser = async (req, res) => {
  const { username, email , password } = req.body;
  const user = new User({ username, email , password });
  const savedUser = await user.save();
  res.status(201).json(savedUser);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }  
  res.json(user);
};

module.exports = { getUsers, createUser , login };
