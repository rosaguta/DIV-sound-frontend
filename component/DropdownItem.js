import React from 'react';
import Cookies from 'js-cookie';

const handleMenuitemClick = async (id, fileid, userid) => {
    try {
        const response = await fetch(`http://localhost:8080/Boards/${id}/${fileid}?userid=${userid}`, {
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
};

const DropdownItem = ({ boardid, fileid, boardname }) => {
    const userData = Cookies.get('user');
    const parseddata = JSON.parse(userData);
    const userid = parseddata.id;


    
    return (
        <Menu.Item key={boardid}>
            <a
                className={classNames(
                    'bg-white-100 text-gray-900',
                    'block px-4 py-2 text-sm'
                )}
                onClick={() => {
                    if (boardid !== undefined) {
                        handleMenuitemClick(boardid, fileid, userid);
                        console.log(boardid);
                        console.log(boardname);
                    } else {
                        console.error('board.id is undefined:', boardid);
                    }
                }}
            >
                {boardname}
            </a>
        </Menu.Item>
    );
};
GridContainerBoard.defaultProps = {
    boards: {
      id:'',
      name: '',  // Default value for name property
      audioList: []  // Default value for audioList property
    }
  };
export default DropdownItem;
