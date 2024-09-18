let teams = [];
let students = [];

// Function to handle CSV upload and parsing
function uploadCSV() {
    const csvFile = document.getElementById('csvFile').files[0];
    if (!csvFile) {
        alert('Please upload a CSV file!');
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        const csvData = e.target.result;
        parseCSV(csvData);
    };
    reader.readAsText(csvFile);
}

// Function to parse CSV content
function parseCSV(data) {
    const rows = data.split("\n");
    students = [];

    rows.forEach((row) => {
        const [studentID, studentName] = row.split(",");
        if (studentID && studentName) { // Only add valid rows
            students.push({ studentID: studentID.trim(), studentName: studentName.trim() });
        }
    });

    // Populate dropdowns after CSV is uploaded
    populateStudentDropdowns();
}

// Function to populate student dropdowns in all teams
function populateStudentDropdowns() {
    const dropdowns = document.querySelectorAll('.student-select');
    dropdowns.forEach(dropdown => {
        // Clear any previous options
        dropdown.innerHTML = '';

        students.forEach(student => {
            const option = document.createElement('option');
            option.value = student.studentID;
            option.textContent = student.studentName;
            dropdown.appendChild(option);
        });
    });
}

// Function to create a new team
function createTeam() {
    const teamID = teams.length + 1;
    teams.push({ id: teamID, members: [] });

    const teamDiv = document.createElement('div');
    teamDiv.className = 'team';
    teamDiv.id = `team-${teamID}`;
    teamDiv.innerHTML = `<h3>Team ${teamID}</h3>`;

    // Create student dropdown for each team
    const studentSelect = document.createElement('select');
    studentSelect.className = 'student-select';  // This is needed to target the dropdown later
    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.studentID;
        option.textContent = student.studentName;
        studentSelect.appendChild(option);
    });

    // Create "Add Student" button
    const addButton = document.createElement('button');
    addButton.textContent = 'Add student to team';
    addButton.classList.add('button2');
    addButton.onclick = function () {
        addStudentToTeam(teamID);
    };

    // List to show students added to the team
    const studentList = document.createElement('ul');
    studentList.id = `team-${teamID}-students`;

    teamDiv.appendChild(studentSelect);
    teamDiv.appendChild(addButton);
    teamDiv.appendChild(studentList);

    document.getElementById('teams-container').appendChild(teamDiv);
}

// Function to add a student to a team
function addStudentToTeam(teamID) {
    const teamDiv = document.getElementById(`team-${teamID}`);
    const select = teamDiv.querySelector('.student-select');
    const studentID = select.value;
    const studentName = select.options[select.selectedIndex].text;

    const team = teams.find(t => t.id === teamID);
    if (team && studentID && studentName) {
        // Check if student is already in the team
        if (team.members.some(member => member.studentID === studentID)) {
            alert("This student is already in the team.");
            return;
        }
        
        // Add student to the team
        team.members.push({ studentID, studentName });

        // Update the UI to show the student in the team
        const studentList = document.getElementById(`team-${teamID}-students`);
        const listItem = document.createElement('li');
        listItem.textContent = studentName;
        studentList.appendChild(listItem);
    }
}