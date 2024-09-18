// role-selection.js
document.getElementById('studentBtn').addEventListener('click', function() {
    window.location.href = 'login.html?role=student';  // Redirect to the login screen for students
  });
  
  document.getElementById('teacherBtn').addEventListener('click', function() {
    window.location.href = 'login.html?role=teacher';  // Redirect to the login screen for teachers
  });
  