'use client'
import { Menu, Transition } from '@headlessui/react'
import Cookies from 'js-cookie'
import React, { Fragment } from 'react';
import dropdownitem from './dropdownitem.js'

const DropDown = ({ boards, audiofileid }) => {
    const userData = Cookies.get('user')

    const parseddata = JSON.parse(userData)
    const userid = parseddata.id;
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    
    const handleMenuitemClick = async ({ boardid }) => {
        console.log(boardid)
        try {
            const response = await fetch(`http://localhost:8080/Boards/${boardid}/${audiofileid}?userid=${userid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Handle success, e.g., show a success message
                console.log('file added to board');


            } else {
                // Handle errors, e.g., show an error message
                console.error('Failed to add item');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error occurred while adding item:', error);
        }

        
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Add To:
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {boards.map((board) => (
                            <dropdownitem boardid={board.id} fileid={audiofileid} boardname={board.name}/>
                            
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
export default DropDown