// In YourComments.jsx
import React, { useEffect, useState } from "react";

function YourComments() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Fetch comments from the backend
        fetch("/api/getComments")
            .then((res) => res.json())
            .then((data) => setComments(data))
            .catch((err) => console.error("Error fetching comments:", err));
    }, []);

    return (
        <div>
            <h1>Your Comments</h1>
            {comments.length > 0 ? (
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
            ) : (
                <p>No comments available.</p>
            )}
        </div>
    );
}

export default YourComments;
