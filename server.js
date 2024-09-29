<<<<<<< HEAD
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { createObjectCsvWriter } = require('csv-writer');
const bcrypt = require('bcrypt');
const cors = require('cors');
const csvParser = require('csv-parser');

// Initialize the express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Define the CSV writer to write to the existing 'users.csv' file
const csvWriter = createObjectCsvWriter({
  path: path.join(__dirname, 'users.csv'),
  header: [
    { id: 'firstName', title: 'First Name' },
    { id: 'lastName', title: 'Last Name' },
    { id: 'email', title: 'Email' },
    { id: 'role', title: 'Role' },
    { id: 'hashedPassword', title: 'Hashed Password' }
  ],
  append: true
});

// Helper function to read from the CSV file
const readUsersFromCSV = () => {
  return new Promise((resolve, reject) => {
    const users = [];
    fs.createReadStream(path.join(__dirname, 'users.csv'))
      .pipe(csvParser())
      .on('data', (row) => users.push(row))
      .on('end', () => resolve(users))
      .on('error', (error) => reject(error));
  });
};

// Route to handle sign-up requests
app.post('/sign-up', async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
  
    // Log that the route was hit
    console.log('Received POST request at /sign-up');
  
    // Check if all required fields are present
    if (!firstName || !lastName || !email || !password || !role) {
      console.log('Missing required fields:', { firstName, lastName, email, password, role });
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
  
    try {
      // Read existing users from CSV
      const users = await readUsersFromCSV();
  
      // Check if the email already exists
      const existingUser = users.find(user => user.Email.trim().toLowerCase() === email.trim().toLowerCase());
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already exists. Please use a different email.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Password hashed successfully');
  
      // Write the user data to the existing 'users.csv' file
      await csvWriter.writeRecords([{ firstName, lastName, email, role, hashedPassword }]);
  
      console.log('Data successfully written to users.csv');
      res.status(200).json({ success: true, message: 'User signed up and saved to users.csv!' });
  
    } catch (error) {
      console.error('Error during sign-up process:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

// Route to handle login requests
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    console.log('Received POST request at /login');
  
    try {
      const users = await readUsersFromCSV();
      console.log('Users in CSV:', users);
  
      // Use the correct property names from the CSV
      const user = users.find((u) => u.Email.trim().toLowerCase() === email.trim().toLowerCase());
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
  
      // Check the hashed password
      const match = await bcrypt.compare(password, user.HashedPassword);
  
      if (match) {
        console.log('test');
      }
      // Conditions 
      if (match) {
        res.status(200).json({ success: true, role: user.Role });
      } else {
        res.status(401).json({ success: false, message: 'Incorrect password.' });
      }
    } catch (error) {
      console.error('Error during login process:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  
// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
=======
// Will need to do:
// 1. Install backend dependencies:
//    npm install express mongoose cors bcrypt
//    npm install --save-dev nodemon

// 2. Install frontend dependencies (for React app):
//    npm install react react-dom axios react-router-dom

// 3. Install Tailwind CSS (if using it for styling):
//    npm install tailwindcss postcss autoprefixer
//    npx tailwindcss init -p

// 4. IMPORTANT: Install MongoDB Compass or another MongoDB GUI to manage your database easily
import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import mongoose from 'mongoose';

// Initialize the express app
const app = express();
app.use(express.json()); // Using built-in express middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/School', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema and Model Definitions
const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: { type: String, default: 'student' }
});

const studentModel = mongoose.model("Student", studentSchema);

const teacherSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: { type: String, default: 'teacher' },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]
});

const teacherModel = mongoose.model("Teacher", teacherSchema);

// Route to handle sign-up requests
app.post('/Signup', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Log that the route was hit
  console.log('Received POST request at /sign-up');

  // Check if all required fields are present
  if (!firstName || !lastName || !email || !password || !role) {
    console.log('Missing required fields:', { firstName, lastName, email, password, role });
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    // Check if the email already exists in the database
    let user = await studentModel.findOne({ email }) || await teacherModel.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'Email already exists. Please use a different email.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    // Save user to MongoDB based on role
    if (role === 'teacher') {
      user = new teacherModel({ firstName, lastName, email, password: hashedPassword, role });
    } else {
      user = new studentModel({ firstName, lastName, email, password: hashedPassword, role });
    }

    await user.save();
    console.log('User saved to MongoDB');
    res.status(200).json({ success: true, message: 'User signed up and saved to the database!' });

  } catch (error) {
    console.error('Error during sign-up process:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Route to handle login requests
app.post('/Login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Received POST request at /login');

  try {
    // Look for user in both student and teacher collections
    let user = await studentModel.findOne({ email }) || await teacherModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Check the hashed password
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.status(200).json({ success: true, role: user.role });
    } else {
      res.status(401).json({ success: false, message: 'Incorrect password.' });
    }
  } catch (error) {
    console.error('Error during login process:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Start the server on port 5001
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

>>>>>>> 86831075d3cbb65949882f216c716bf5feb7968e
