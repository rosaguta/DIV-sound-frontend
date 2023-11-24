'use client'
import React, { useState, useEffect } from 'react';

const DeleteBoard = ({ boardid }) => {
    const deleteboard = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_AUDIO_API}/Boards/${boardid}`, {
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
            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={deleteboard}>Delete dis Board</button>
        </div>
    );
};

export default DeleteBoard;
