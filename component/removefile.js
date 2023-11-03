import styles from './GridItem.module.css';
import Cookies from 'js-cookie'
const RemoveFromBoardButton = ({ audiofileid, boardid}) => {
    const deleteItem = async () => {

        const userData = Cookies.get('user')

        const parseddata = JSON.parse(userData)
        const userid = parseddata.id

        try {
            const response = await fetch(`http://localhost:8080/Boards/${boardid}/${audiofileid}?userid=${userid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Handle success, e.g., show a success message
                console.log('Item deleted successfully');
                location.reload()

            } else {
                // Handle errors, e.g., show an error message
                console.error('Failed to delete item');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error occurred while deleting item:', error);
        }
    };
    const handleDeleteClick = () => {
        deleteItem(); // Call the deleteItem function when the button is clicked
    };
    return (
        <button className={styles.deleteButton} onClick={handleDeleteClick}>
            <div className={styles.buttonContainer}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 10.586l4.293-4.293 1.414 1.414-4.293 4.293 4.293 4.293-1.414 1.414-4.293-4.293-4.293 4.293-1.414-1.414 4.293-4.293-4.293-4.293 1.414-1.414z" />
                </svg>
                <span className={styles.buttonText}>REMOVE ME FROM BOARD</span>
            </div>
        </button>
    )
}
export default RemoveFromBoardButton