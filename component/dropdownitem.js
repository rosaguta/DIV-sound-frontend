const dropdownitem = ({ boardid, fileid , boardname}) => {

    return (
        <Menu.Item key={boardid}>
            <a
                // href="#"
                className={classNames(
                    'bg-white-100 text-gray-900',
                    'block px-4 py-2 text-sm'
                )}
                onClick={() => {
                    if (board.id !== undefined) {
                        const bid = Number(board.id)
                        handleMenuitemClick(board.name);
                    } else {
                        console.error('board.id is undefined:', board);
                    }
                }}
            >
                {board.id}
            </a>
        </Menu.Item>
    )
}

export default dropdownitem