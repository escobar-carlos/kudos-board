import './../css/Board.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import { baseURL } from '../../globals';

function Board({ id, title, category, image, onBoardDeleted }) {

  // Delete board from DB and then fetches updated board data
  const deleteBoard = async () => {
    try {
      await axios.delete(`${baseURL}/boards/${id}/`);
      onBoardDeleted();
    } catch (error) {
      alert(`Error deleting board: ${error.response.data}`);
    }
  };

  return (
    <div className='board'>
      <img src={image} alt={`Image of ${title}`} />
      <h3>{title}</h3>
      <p>{category}</p>
      <div className='features'>
        <Link to={`/boards/${id}`}>
          <button>View Board</button>
        </Link>
        <button onClick={deleteBoard}>Delete Board</button>
      </div>
    </div>
  )
}

export default Board