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
import jwt from 'jsonwebtoken';

// Initialize the express app
const app = express();
app.use(express.json()); // Using built-in express middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://akshey54321:l9bJF0W0Q2T1mA35@cluster0.xvsl6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema and Model Definitions
const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: { type: String, default: 'student' },
  studentID: { type: Number, unique: true } // New field for the 8-digit student ID
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

// Team Schema
const teamSchema = new mongoose.Schema({
  name: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }
});

const teamModel = mongoose.model("Teams", teamSchema);

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
    req.user = { id: decoded.id }; // Assuming your token contains the user's ID
    next();
  });
};
// Peer Rating Schema
const peerRatingSchema = new mongoose.Schema({
  rater: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // The student who is giving the rating
  ratee: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // The student being rated
  cooperation: { type: Number, required: true, min: 1, max: 5 },   // Rating for cooperation (1-5)
  comment: { type: String },                                        // Optional comment
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Teams', required: true }      // The team for context
}, { timestamps: true });

// Create the PeerRating model
const peerRatingModel = mongoose.model('PeerRating', peerRatingSchema);


// To generate random ID
// Function to generate a unique 8-digit ID between 40000000 and 50000000
const generateUniqueStudentID = async () => {
  let studentID;
  let existingStudent;

  do {
    studentID = Math.floor(Math.random() * (50000000 - 40000000) + 40000000);
    existingStudent = await studentModel.findOne({ studentID });
  } while (existingStudent);

  return studentID;
};

app.post('/Signup', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    // Check if the email already exists
    let user = await studentModel.findOne({ email }) || await teacherModel.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'Email already exists. Please use a different email.' });
    }

    // Generate the unique student ID
    const studentID = await generateUniqueStudentID();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to MongoDB with student ID if they are a student
    if (role === 'teacher') {
      user = new teacherModel({ firstName, lastName, email, password: hashedPassword, role });
    } else {
      user = new studentModel({ firstName, lastName, email, password: hashedPassword, role, studentID });
    }

    await user.save();
    res.status(200).json({ success: true, message: 'User signed up and saved to the database!' });

  } catch (error) {
    console.error('Error during sign-up process:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



// Route to handle login requests
app.post('/Login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Look for user in both student and teacher collections
    let user = await studentModel.findOne({ email }) || await teacherModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Check the hashed password
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // Generate a token
      const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' }); // You can adjust the expiration time as needed
      res.status(200).json({ success: true, role: user.role, token }); // Return the token along with role
    } else {
      res.status(401).json({ success: false, message: 'Incorrect password.' });
    }
  } catch (error) {
    console.error('Error during login process:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Route to get the logged-in student's details
app.get('/student/me', verifyToken, async (req, res) => {
  try {
    const student = await studentModel.findById(req.user.id).select('-password'); // Exclude password field
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all students
app.get('/students', verifyToken, async (req, res) => {
  try {
    const students = await studentModel.find().select('-password'); // Exclude password field
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get the logged-in teacher's details
app.get('/teacher/me', verifyToken, async (req, res) => {
  try {
    const teacher = await teacherModel.findById(req.user.id); // Assuming req.user is set by your auth middleware
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.json(teacher);
  } catch (error) {
    console.error('Error fetching teacher data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get teams for a teacher
// app.get('/teacher/teams', verifyToken, async (req, res) => {
//   try {
//     const teacherId = req.user.id; // Assuming you're using middleware to get the logged-in user
//     const teams = await teamModel.find({ teacher: teacherId }); // Fetch teams associated with the teacher
//     const teamsResponse = teams.map(team => ({
//       id: team._id,
//       name: team.name
//     }));
//     res.json(teamsResponse);
//   } catch (error) {
//     console.error('Error fetching teams:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// Route to get teams for a teacher
app.get('/teacher/teams', verifyToken, async (req, res) => {
  try {
    const teacherId = req.user.id; // Assuming you're using middleware to get the logged-in user
    const teams = await teamModel.find({ teacher: teacherId })
      .populate('students', 'firstName lastName') // Populate the students' firstName and lastName
      .exec(); // Use exec() to execute the query
    
    const teamsResponse = teams.map(team => ({
      id: team._id,
      name: team.name,
      students: team.students, // Include the populated students
    }));
    
    res.json(teamsResponse);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route to create a team
app.post('/teams', verifyToken, async (req, res) => {
  const { name, students } = req.body; // students should be an array of student IDs
  try {
    const team = new teamModel({ name, students, teacher: req.user.id }); // Associate team with the teacher
    await team.save();
    
    // Optionally update teacher's teams
    await teacherModel.findByIdAndUpdate(req.user.id, { $push: { teams: team._id } });
    
    res.status(201).json({ success: true, team });
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


app.get('/student/teams', verifyToken, async (req, res) => {
  try {
    const studentId = req.user.id; 
    const teams = await teamModel.find({ students: studentId }) 
      .populate('students', 'firstName lastName') 
      .exec();

    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ message: 'Failed to fetch teams' });
  }
});
// Route to fetch a specific student's details
app.get('/students/:studentId', verifyToken, async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await studentModel.findById(studentId).select('-password'); // Exclude password
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    res.json(student);
  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Route to submit a peer rating with comment
// app.post('/teams/:teamId/ratings', verifyToken, async (req, res) => {
//   const { teamId } = req.params;
//   const { rateeId, cooperation, comment } = req.body;

//   // Validate cooperation rating
//   if (cooperation < 1 || cooperation > 5) {
//     return res.status(400).json({ message: 'Invalid rating value. It must be between 1 and 5.' });
//   }

//   try {
//     const team = await teamModel.findById(teamId).populate('students');
//     if (!team) {
//       return res.status(404).json({ message: 'Team not found.' });
//     }

//     const isRaterInTeam = team.students.some(student => student._id.equals(req.user.id));
//     const isRateeInTeam = team.students.some(student => student._id.equals(rateeId));

//     if (!isRaterInTeam || !isRateeInTeam) {
//       return res.status(403).json({ message: 'Both the rater and ratee must be part of the same team.' });
//     }

//     const newRating = new peerRatingModel({
//       rater: req.user.id,
//       ratee: rateeId,
//       cooperation,
//       comment,
//       team: teamId
//     });

//     await newRating.save();
//     res.status(200).json({ success: true, message: 'Rating submitted successfully!' });
//   } catch (error) {
//     console.error('Error submitting peer rating:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });

app.post('/teams/:teamId/ratings', verifyToken, async (req, res) => {
  const { teamId } = req.params; // Extract teamId from the request parameters
  const { rateeId, cooperation, comment } = req.body;

  // Add debugging logs
  console.log('Request Body:', req.body);
  console.log('User ID:', req.user.id);
  console.log('Team ID from params:', teamId); // Log the teamId
  console.log('Ratee ID:', rateeId);
  console.log('Cooperation:', cooperation);

  // Validate incoming teamId and rateeId
  if (!teamId) {
    return res.status(400).json({ message: 'Missing team ID' });
  }
  if (!rateeId) {
    return res.status(400).json({ message: 'Missing ratee ID' });
  }

  // Validate cooperation rating
  if (cooperation < 1 || cooperation > 5) {
    return res.status(400).json({ message: 'Invalid rating value. It must be between 1 and 5.' });
  }

  try {
    const team = await teamModel.findById(teamId).populate('students');
    if (!team) {
      return res.status(404).json({ message: 'Team not found.' });
    }

    const isRaterInTeam = team.students.some(student => student._id.equals(req.user.id));
    const isRateeInTeam = team.students.some(student => student._id.equals(rateeId));

    if (!isRaterInTeam || !isRateeInTeam) {
      return res.status(403).json({ message: 'Both the rater and ratee must be part of the same team.' });
    }

    const newRating = new peerRatingModel({
      rater: req.user.id,
      ratee: rateeId,
      cooperation,
      comment,
      team: teamId
    });

    await newRating.save();
    res.status(200).json({ success: true, message: 'Rating submitted successfully!' });
  } catch (error) {
    console.error('Error submitting peer rating:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// Start the server on port 5001
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});