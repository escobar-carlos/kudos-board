import './../css/Card.css'
import { useState } from 'react';
import { baseURL } from '../../globals';
import axios from 'axios';

function Card({ id, board_id, message, gif, author, upvotes_on_load, onCardDeleted }) {

  const [upvotes, setUpvotes] = useState(upvotes_on_load);

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

  return (
    <div className='card'>
      <p>{message}</p>
      <img src={gif}/>
      <div className='features'>
        <button onClick={upvoteCard}>Upvote: {upvotes}</button>
        <button onClick={deleteCard}>Delete</button>
      </div>
    </div>
  )
}

export default Card