'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
const BoardsComponent = ({ Boards }) => {

    return (
        <div>
            <ul>
                {Boards.map(board => (
                    <li key={board.id} className='hover:underline'>
                        <Link href="/soundboard/[id]" as={`/soundboard/${board.id}`}>
                            {board.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BoardsComponent;
