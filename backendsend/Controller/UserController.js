const User = require('../Model/user');

// Signup Controller
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ email ,password });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }
    // Create a new user with a plain text password
    const newUser = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email ,password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signup,
  login,
};
