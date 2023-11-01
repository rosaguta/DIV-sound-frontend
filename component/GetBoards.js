'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
const BoardsComponent = ({ Boards }) => {

    return (
        <div>
            <ul>
                {Boards.map(board => (
                    <li key={board.id}>
                        <Link href="/soundboard/[id]" as={`/soundboard/${board.id}`}>
                            Board ID: {board.id}, Board Name: {board.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BoardsComponent;