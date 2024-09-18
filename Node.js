// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Mock users (replace this with a real database)
const users = [
  { id: 1, email: "student1@example.com", password: "Password1!", role: "student" },
  { id: 2, email: "teacher1@example.com", password: "Password1!", role: "teacher" }
];

// Helper function to check if the password meets the criteria
function validatePassword(password) {
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasUppercase && hasSpecialChar && hasNumber;
}

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password, role } = req.body;
  
  // Check if the email already exists in the system
  const userExists = users.some(user => user.email === email);
  if (!userExists) {
    return res.json({ success: false, message: "Email not found." });
  }
  
  // Validate the password (In a real app, you would also hash and compare the password)
  const user = users.find(user => user.email === email && user.password === password && user.role === role);
  
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Invalid credentials." });
  }
});

// Run the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
