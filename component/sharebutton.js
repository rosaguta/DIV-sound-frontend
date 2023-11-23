'use client'
import React, { useState, useEffect } from 'react';
const ShareButton = ({boardid}) => {
let sessionid = null
    const share = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_AUDIO_API}/Boards/${boardid}/CreateRoomSessionId`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                sessionid = await response.text()
                window.location.href = `/shared/${sessionid}`

            } else {
                console.error('Error creating session:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating session:', error);
        }
    };

    useEffect(() => {

    }, []); 

    return(
        <div>
            <button onClick={share} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Share this Board</button>
        </div>
    )
}

export default ShareButton