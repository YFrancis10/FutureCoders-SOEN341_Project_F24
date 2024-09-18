// login.js

// Get the role from the URL parameters
const params = new URLSearchParams(window.location.search);
const role = params.get('role');

// Set the login title based on the role
const loginTitle = document.getElementById("loginTitle");
loginTitle.textContent = role === 'teacher' ? 'Teacher Login' : 'Student Login';

// Email list to ensure no duplicates (In a real system, this check happens in the backend)
const existingEmails = ["student1@example.com", "teacher1@example.com"];  // Replace this with a backend check

// Password validation regex
const passwordCriteria = {
  uppercase: /[A-Z]/,
  specialChar: /[!@#$%^&*(),.?":{}|<>]/,
  number: /[0-9]/,
};

// Form submit event
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");
  
  // Clear previous errors
  errorMessage.textContent = '';

  // Check if the email is already taken
  if (existingEmails.includes(email)) {
    errorMessage.textContent = 'This email is already in use. Please use a different email.';
    return;
  }
  
  // Check password criteria (this part of code could be moved later on to create an account page and check the validity of the password requirements)
  let errorMessages = [];
  if (!passwordCriteria.uppercase.test(password)) {
    errorMessages.push('Password must contain at least one uppercase letter.');
  }
  if (!passwordCriteria.specialChar.test(password)) {
    errorMessages.push('Password must contain at least one special character.');
  }
  if (!passwordCriteria.number.test(password)) {
    errorMessages.push('Password must contain at least one number.');
  }
  
  // If there are errors, display them
  if (errorMessages.length > 0) {
    errorMessage.textContent = errorMessages.join(' ');
    return;
  }

  // Send login request to the backend with the role included
  fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password, role })  // Send role as part of the request
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = role === "student" ? "student-dashboard.html" : "instructor-dashboard.html";
      } else {
        errorMessage.textContent = "Login failed. Please check your credentials.";
      }
    })
    .catch(err => {
      errorMessage.textContent = "Error connecting to the server. Please try again.";
      console.error(err);
    });
});
