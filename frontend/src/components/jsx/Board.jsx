import './../css/Board.css'
import { Link } from "react-router-dom";
import axios from 'axios';

function Board({ id, title, category, image, onBoardDeleted }) {

  const deleteBoard = () => {
    axios.delete(`http://localhost:3000/boards/${id}`)
      .then((response) => {
        console.log(response);
        onBoardDeleted();
      })
      .catch((error) => {
        console.error(error.response.data);
      });
    
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