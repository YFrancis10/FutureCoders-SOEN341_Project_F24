// You should install csv writer by doing npm install csv-writer (it will allow us to store the data into a csv file for now)
// Also instal bcrypt by doing npm instal bcrypt to allow us to see the password in the csv file.
// install cors by doing npm install cors (to make sure that React and Node.js are on the same localhost)
// to run the server do cd Soen-341/backend
// then do node server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { createObjectCsvWriter } = require('csv-writer');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Initialize the express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Define the CSV writer and log the file path
const csvFilePath = path.join(__dirname, 'signups.csv');
console.log('CSV will be created at:', csvFilePath);

const csvWriter = createObjectCsvWriter({
  path: csvFilePath,
  header: [
    { id: 'firstName', title: 'First Name' },
    { id: 'lastName', title: 'Last Name' },
    { id: 'email', title: 'Email' },
    { id: 'role', title: 'Role' },
    { id: 'hashedPassword', title: 'Password' },
  ],
  append: true, // Append data to the CSV file
});

// Route to handle sign-up requests
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Log incoming request
  console.log('Received sign-up request with data:', req.body);

  // Check if all required fields are present
  if (!firstName || !lastName || !email || !password || !role) {
    console.log('Missing required fields:', { firstName, lastName, email, password, role });
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Writing data to CSV:', { firstName, lastName, email, role, hashedPassword });

    await csvWriter.writeRecords([{ firstName, lastName, email, role, hashedPassword }]);

    console.log('Data successfully written to CSV');
    res.status(200).json({ success: true, message: 'User signed up and saved to CSV!' });
  } catch (error) {
    console.error('Error during sign-up:', error);
    res.status(500).json({ success: false, message: 'Failed to write to CSV' });
  }
});

// Start the server on port 5173
app.listen(5173, () => {
  console.log('Server running on http://localhost:5173');
});

