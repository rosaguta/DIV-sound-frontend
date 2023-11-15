const ShareButton = () => {
    const ShareButton = ({ roomIdCallback }) => {
        const handleShareClick = async () => {
          // Emit a 'createRoom' event to the server
          const response = await fetch('http://localhost:3000/createRoom', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: /* pass user id here */ }),
          });
      
          const data = await response.json();
      
          // Callback to pass the room ID to the parent component
          roomIdCallback(data.roomId);
        };
    return(
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Share this Board </button>
        </div>
    )
}

export default ShareButton