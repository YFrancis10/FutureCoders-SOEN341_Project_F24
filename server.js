import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 5001;

const app = express();

// CORS config
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
}))

app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true }))

// To parse incoming JSON  requests
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/School', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.once('open', () => {
    console.log("MongoDB connection successful")
})

const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: { type: String, default: 'student' }
})

const studentModel = mongoose.model("Student", studentSchema)

const teacherSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: { type: String, default: 'teacher' },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]
})

const teacherModel = mongoose.model("Teacher", teacherSchema)

const teamSchema = new mongoose.Schema({
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    teamName: String
})

const teamModel = mongoose.model("Team", teamSchema)

app.post('/Signup', async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    console.log('Received sign-up request with data:', req.body);

    if(!firstName || !lastName || !email || !password || !role){
        console.log('Missing required fields:', {firstName, lastName, email, password, role });
        return res.status(400).json({success: false, message: 'All fields are required.'});
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let user;

        if (role === 'teacher') {
            user = new teacherModel({ firstName, lastName, email, password: hashedPassword, role });
        } else {
            user = new studentModel({ firstName, lastName, email, password: hashedPassword, role });
        }

        await user.save();
        console.log('User data successfully save to database')
        res.status(200).send({success: true, message:'User signed up and saved to databse'});
    } catch (error) {
        console.error('Error during sign-up',error);
        res.status(500).send({success: false, message: 'Failed to save user data'});
    }
})

app.post('/teams', async (req, res) => {
    try {
        const { teacherId, studentIds, teamName } = req.body;

        const team = new teamModel({ teacherId, studentIds, teamName });
        await team.save();

        // Optionally, update the teacher's teams
        await teacherModel.findByIdAndUpdate(teacherId, { $push: { teams: team._id } });

        res.status(201).send("Team created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while creating the team");
    }
})

app.post('/Login', async(req, res)=> {
    try{
        const {email, password } = req.body;

        let user = await studentModel.findOne({email});
        if(!user){
            user = await teacherModel.findOne({email});
        }

        if(!user){
            return res.status(404).send("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).send("Invalid password");
        }

        res.send("Login successful")
    } catch(error){
        console.error(error);
        res.status(500).send("An error occurred during login");
    }
} )

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})


app.listen(port, () => {
    console.log("Server is running")
})