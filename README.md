# Log in and sign up modified
The log in and sign up pages were updated with a fixed bug.
Before, if the user has a student account and tries to log in after pressing Teacher role button, it takes him to the teacher dashbord, which must throw an error message.
Now, the server will show an error message if the user tries to log in with the wrong role.

If the teacher's log in procedure passes, it will takes to teacher's dashboard (see Teacher's-dashboard branch for more details)
and if the same log in procedure passes as student role, it will takes to student's dashboard (see Student's-dashboard branch for more details)
