import './../css/Card.css'
import { useState } from 'react';
import { baseURL } from '../../globals';
import axios from 'axios';

function Card({ id, board_id, message, gif, author, upvotes_on_load, pinned_on_load, onCardDeleted, onPin }) {

  const [upvotes, setUpvotes] = useState(upvotes_on_load);
  const [pinned, setPinned] = useState(pinned_on_load);

  // Delete card from DB and then fetch updated card data
  const deleteCard = async () => {
    try {
      await axios.delete(`${baseURL}/boards/${board_id}/cards/${id}/`);
      onCardDeleted();
    } catch (error) {
      alert(`Error deleting card: ${error.response.data}`);
    }
  };

  // Upvote card in DB and then increment upvote state variable
  const upvoteCard = async () => {
    try {
      await axios.patch(`${baseURL}/boards/${board_id}/cards/${id}/upvote/`);
      setUpvotes(prev => prev + 1);
    } catch (error) {
      alert(`Error upvoting card: ${error.response.data}`);
    }
  };

  // Pin card in DB and then update pinned state variable
  const handlePin = async () => {
    try {
      await axios.patch(`${baseURL}/boards/${board_id}/cards/${id}/pin/`);
      setPinned(prev => !prev);
      onPin();  
    } catch (error) {
      alert(`Error pinning card: ${error.response.data}`);
    }
  };

  return (
    <div className='card'>
      <p>{message}</p>
      <img src={gif}/>
      <div className='features'>
        <button onClick={upvoteCard}>Upvote: {upvotes}</button>
        <button onClick={deleteCard}>Delete</button>
      </div>
      <button style={{ color: pinned ? 'red' : 'black' }} onClick={handlePin}>
        Pin ★
      </button>
    </div>
  )
}

export default Card