// Will need to do:
// 1. Install backend dependencies:
//    npm install express mongoose cors bcrypt
//    npm install --save-dev nodemon

// 2. Install frontend dependencies (for React app):
//    npm install react react-dom axios react-router-dom

// 3. Install Tailwind CSS (if using it for styling):
//    npm install tailwindcss postcss autoprefixer
//    npx tailwindcss init -p

// 4. For Unit Testing:
//    npm install --save-dev @testing-library/react @testing-library/jest-dom jest
//    npm audit fix --force 
//    npm install --save-dev @babel/preset-env @babel/preset-react
//    npm install --save-dev babel-jest 
//    npm install --save-dev jest-environment-jsdom
//    npm install --save @testing-library/jest-dom 

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
  rater: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  ratee: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Teams', required: true },
  
  // Optional fields for each evaluation dimension
  cooperation: { type: Number, min: 1, max: 5 },
  conceptualContribution: { type: Number, min: 1, max: 5 },
  practicalContribution: { type: Number, min: 1, max: 5 },
  workEthic: { type: Number, min: 1, max: 5 },

  comment: { type: String }
}, { timestamps: true });

// Create the PeerRating model
const peerRatingModel = mongoose.model('PeerRating', peerRatingSchema);

// Study Room Schema
const studyRoomSchema = new mongoose.Schema({
  roomName: String,
  capacity: Number,
  bookings: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
      date: String,
      startTime: String,
      endTime: String,
    },
  ],
});

const studyRoomModel = mongoose.model('StudyRoom', studyRoomSchema);



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

// Route to handle sign-up requests
app.post('/Signup', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Check if all required fields are present
  if (!firstName || !lastName || !email || !password || !role) {
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

    // Save user to MongoDB based on role
    if (role === 'teacher') {
      user = new teacherModel({ firstName, lastName, email, password: hashedPassword, role });
    } else {
      user = new studentModel({ firstName, lastName, email, password: hashedPassword, role });
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

// Route to check if the email exists in the database
app.post('/check-email', async (req, res) => {
  const { email } = req.body;

  try {
    // Search for the email in both student and teacher collections
    const user = await studentModel.findOne({ email }) || await teacherModel.findOne({ email });

    if (user) {
      // Email exists in the database
      res.status(200).json({ success: true, message: 'Email found' });
    } else {
      // Email does not exist in the database
      res.status(404).json({ success: false, message: 'Email does not exist' });
    }
  } catch (error) {
    console.error('Error checking email existence:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Route to change the user's password
app.post('/change-password', verifyToken, async (req, res) => {
  const { password } = req.body;
  const userId = req.user.id;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await studentModel.findById(userId) || await teacherModel.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password' });
  }
});

// Route to reset the user's password
app.post('/reset-password', async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await studentModel.findOne({ email }) || await teacherModel.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password' });
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

// Route to delete a team
app.delete('/teams/:teamId', verifyToken, async (req, res) => {
  const { teamId } = req.params;

  try {
    const team = await teamModel.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Verify that the requesting user is the teacher of the team
    if (!team.teacher.equals(req.user.id)) {
      return res.status(403).json({ message: 'You are not authorized to delete this team' });
    }

    // Delete the team
    await teamModel.findByIdAndDelete(teamId);
    res.status(200).json({ success: true, message: 'Team deleted successfully' });
  } catch (error) {
    console.error('Error deleting team:', error);
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

app.post('/teams/:teamId/ratings', verifyToken, async (req, res) => {
  const { teamId } = req.params;
  const { rateeId, cooperation, conceptualContribution, practicalContribution, workEthic, comment } = req.body;

  try {
    const team = await teamModel.findById(teamId).populate('students');
    if (!team) return res.status(404).json({ message: 'Team not found.' });

    const isRaterInTeam = team.students.some(student => student._id.equals(req.user.id));
    const isRateeInTeam = team.students.some(student => student._id.equals(rateeId));

    if (!isRaterInTeam || !isRateeInTeam) {
      return res.status(403).json({ message: 'Both the rater and ratee must be part of the same team.' });
    }

    const newRating = new peerRatingModel({
      rater: req.user.id,
      ratee: rateeId,
      team: teamId,
      cooperation,
      conceptualContribution,
      practicalContribution,
      workEthic,
      comment,
    });

    await newRating.save();
    res.status(200).json({ success: true, message: 'Rating submitted successfully!' });
  } catch (error) {
    console.error('Error submitting peer rating:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Endpoint to fetch ratings summary for a team
app.get('/teams/:teamId/ratings', verifyToken, async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await teamModel.findById(teamId).populate('students', 'firstName lastName studentID');
    if (!team) return res.status(404).json({ message: 'Team not found' });

    // Fetch ratings for each student in the team
    const ratings = await peerRatingModel.find({ team: teamId });
    
    const summary = team.students.map(student => {
      const studentRatings = ratings.filter(rating => rating.ratee.equals(student._id));
      const peersWhoResponded = studentRatings.length;
      
      if (peersWhoResponded === 0) return { ...student._doc, average: 0, peersWhoResponded: 0 };

      const cooperation = (studentRatings.reduce((sum, r) => sum + (r.cooperation || 0), 0) / peersWhoResponded) || 0;
      const conceptualContribution = (studentRatings.reduce((sum, r) => sum + (r.conceptualContribution || 0), 0) / peersWhoResponded) || 0;
      const practicalContribution = (studentRatings.reduce((sum, r) => sum + (r.practicalContribution || 0), 0) / peersWhoResponded) || 0;
      const workEthic = (studentRatings.reduce((sum, r) => sum + (r.workEthic || 0), 0) / peersWhoResponded) || 0;
      const average = (cooperation + conceptualContribution + practicalContribution + workEthic) / 4;

      return {
        studentID: student.studentID,
        lastName: student.lastName,
        firstName: student.firstName,
        team: team.name,
        cooperation,
        conceptualContribution,
        practicalContribution,
        workEthic,
        average,
        peersWhoResponded
      };
    });

    res.json(summary);
  } catch (error) {
    console.error('Error fetching team ratings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/study-rooms', verifyToken, async (req, res) => {
  try {
    const rooms = await studyRoomModel.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching study rooms:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint to fetch all rooms
app.post('/book-room', verifyToken, async (req, res) => {
  const { roomId, date, startTime, endTime, meetingName, attendees } = req.body;

  try {
    const room = await studyRoomModel.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Study room not found' });
    }

    // Check for overlapping bookings
    const isAvailable = room.bookings.every(
      (booking) =>
        booking.date !== date ||
        (endTime <= booking.startTime || startTime >= booking.endTime)
    );

    if (!isAvailable) {
      return res.status(400).json({ message: 'This time slot is already taken. Please choose another.' });
    }

    // Add booking with meeting details and attendees
    room.bookings.push({
      student: req.user.id,
      date,
      startTime,
      endTime,
      meetingName,
      attendees,
    });
    await room.save();

    res.status(200).json({ success: true, message: 'Room booked successfully!' });
  } catch (error) {
    console.error('Error booking room:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const initializeRooms = async () => {
  const existingRooms = await studyRoomModel.find();
  if (existingRooms.length === 0) { // Add rooms only if no rooms exist
    const defaultRooms = [
      { roomName: 'Room A', capacity: 10 },
      { roomName: 'Room B', capacity: 8 },
      { roomName: 'Room C', capacity: 3 },
      { roomName: 'Room D', capacity: 12 },
      { roomName: 'Room E', capacity: 6 },
      { roomName: 'Room F', capacity: 15 },
      { roomName: 'Room G', capacity: 5 }

    ];
    await studyRoomModel.insertMany(defaultRooms);
    console.log('Predefined rooms added to the database.');
  }
};

initializeRooms();

// Route to fetch detailed results for a specific team
app.get('/teams/:teamId/detailed-results', verifyToken, async (req, res) => {
  try {
    const { teamId } = req.params;

    // Find the team and populate student details
    const team = await teamModel.findById(teamId).populate('students', 'firstName lastName studentID');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Fetch all peer ratings for this team and populate rater's details including `studentID`
    const ratings = await peerRatingModel.find({ team: teamId }).populate('rater', 'firstName lastName studentID');

    // Prepare detailed results for each student in the team
    const studentsData = team.students.map((student) => {
      const studentRatings = ratings.filter((rating) => rating.ratee.equals(student._id));

      const peersWhoResponded = studentRatings.length;

      const cooperation = (studentRatings.reduce((sum, r) => sum + (r.cooperation || 0), 0) / peersWhoResponded) || 0;
      const conceptualContribution = (studentRatings.reduce((sum, r) => sum + (r.conceptualContribution || 0), 0) / peersWhoResponded) || 0;
      const practicalContribution = (studentRatings.reduce((sum, r) => sum + (r.practicalContribution || 0), 0) / peersWhoResponded) || 0;
      const workEthic = (studentRatings.reduce((sum, r) => sum + (r.workEthic || 0), 0) / peersWhoResponded) || 0;
      const average = (cooperation + conceptualContribution + practicalContribution + workEthic) / 4;

      return {
        studentID: student.studentID,
        name: `${student.firstName} ${student.lastName}`,
        cooperation,
        conceptual: conceptualContribution,
        practical: practicalContribution,
        workEthic,
        average,
        ratings: studentRatings.map(rating => ({
          raterName: `${rating.rater.firstName} ${rating.rater.lastName}`,
          raterID: rating.rater.studentID, // Include custom 8-digit ID for rater
          comment: rating.comment,
          score: {
            cooperation: rating.cooperation,
            conceptualContribution: rating.conceptualContribution,
            practicalContribution: rating.practicalContribution,
            workEthic: rating.workEthic,
          }
        }))
      };
    });

    res.json({
      teamName: team.name,
      students: studentsData,
    });
  } catch (error) {
    console.error('Error fetching detailed view data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Route to fetch the logged-in user's profile
app.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await studentModel.findById(req.user.id).select('-password') ||
                 await teacherModel.findById(req.user.id).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Route to update the logged-in user's profile
app.put('/profile', verifyToken, async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await studentModel.findById(req.user.id) ||
                 await teacherModel.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update allowed fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.status(200).json({ success: true, message: 'Profile updated successfully!' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Route to delete the logged-in user's account
app.delete('/profile', verifyToken, async (req, res) => {
  try {
    const user = await studentModel.findByIdAndDelete(req.user.id) ||
                 await teacherModel.findByIdAndDelete(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ success: true, message: 'Account deleted successfully!' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Start the server on port 5001
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});