import './../css/Card.css'
import { useState } from 'react';
import { baseURL } from '../../globals';
import axios from 'axios';

function Card({ id, board_id, message, gif, author, upvotes_on_load, pinned_on_load, onCardDeleted, onPin }) {

  const [upvotes, setUpvotes] = useState(upvotes_on_load);
  const [pinned, setPinned] = useState(pinned_on_load);

  const deleteCard = () => {
    axios.delete(`${baseURL}/boards/${board_id}/cards/${id}/`)
      .then((response) => {
        console.log(response);
        onCardDeleted();
      })
      .catch((error) => {
        console.error(error.response.data);
      });
    
  };

  const upvoteCard = () => {
    axios.patch(`${baseURL}/boards/${board_id}/cards/${id}/upvote/`)
      .then((response) => {
        console.log(response);
        setUpvotes(prev => prev + 1);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
    
  };

  const handlePin = () => {
    axios.patch(`${baseURL}/boards/${board_id}/cards/${id}/pin/`)
      .then((response) => {
        console.log(response);
        setPinned(prev => !prev);
        onPin();  
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  
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