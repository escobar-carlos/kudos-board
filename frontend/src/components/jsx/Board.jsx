import './../css/Board.css'
import { Link } from "react-router-dom";

function Board({ id, title, category, image }) {
  return (
    <div className='board'>
      <img src={image} alt={`Image of ${title}`} />
      <h3>{title}</h3>
      <p>{category}</p>
      <div className='features'>
        <Link to={`/boards/${id}`}>
        <button>View Board</button>
        </Link>
        <button>Delete Board</button>
      </div>
    </div>
  )
}

export default Board