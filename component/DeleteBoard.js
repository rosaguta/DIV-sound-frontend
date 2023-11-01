'use client'
import React, { useState, useEffect } from 'react';

const DeleteBoard = ({ boardid }) => {
    const deleteboard = async () => {
        try {
            const response = await fetch(`http://localhost:8080/Boards/${boardid}`, {
                method: 'DELETE', // Specify the HTTP method as DELETE
                headers: {
                    'Content-Type': 'application/json',
                    // Add any necessary headers here
                },
                // You can include a request body if needed
                // body: JSON.stringify(yourRequestBody),
            });

            if (response.ok) {
                // Handle success, if necessary
                console.log('Board deleted successfully');
                window.location.href = '/soundboard';

            } else {
                // Handle errors, if necessary
                console.error('Error deleting board:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting board:', error);
        }
    };

    useEffect(() => {
        // Call deleteboard function inside useEffect if needed on component mount
        // deleteboard();
    }, []); // Empty dependency array ensures effect runs once after initial render

    return (
        <div>
            <button onClick={deleteboard}>Delete dis Board</button>
        </div>
    );
};

export default DeleteBoard;