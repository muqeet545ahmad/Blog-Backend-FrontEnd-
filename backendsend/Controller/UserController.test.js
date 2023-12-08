const mongoose = require('mongoose');
// const { signup, login } = require('../path/to/authController');
// const User = require('../path/to/Model/user');
const UserController =require('./UserController');
// Use an in-memory database for testing
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Signup Controller', () => {
  it('should create a new user', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const req = { body: mockUser };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ name: 'John Doe', email: 'john.doe@example.com' }));

    // Clean up the test user from the database
    await User.deleteOne({ email: 'john.doe@example.com' });
  });

  it('should return an error if the user already exists', async () => {
    const existingUser = new User({
      name: 'Existing User',
      email: 'existing.user@example.com',
      password: 'existingPassword',
    });
    await existingUser.save();

    const req = { body: { email: 'existing.user@example.com' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'User already exists with this email' });

    // Clean up the test user from the database
    await User.deleteOne({ email: 'existing.user@example.com' });
  });
});

describe('Login Controller', () => {
  it('should return user information if the user exists', async () => {
    const existingUser = new User({
      name: 'Existing User',
      email: 'existing.user@example.com',
      password: 'existingPassword',
    });
    await existingUser.save();

    const req = { body: { email: 'existing.user@example.com', password: 'existingPassword' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ name: 'Existing User', email: 'existing.user@example.com' }));

    // Clean up the test user from the database
    await User.deleteOne({ email: 'existing.user@example.com' });
  });

  it('should return an error if the user does not exist', async () => {
    const req = { body: { email: 'nonexistent.user@example.com', password: 'nonexistentPassword' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email or password' });
  });
});
