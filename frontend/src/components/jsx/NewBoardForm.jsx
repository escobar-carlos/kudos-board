import { baseURL } from '../../globals';
import './../css/NewBoardForm.css'
import axios from 'axios';

function NewBoardForm({ onClose, onBoardAdded }) {

  const handleClickOutside = (event) => {
    if (event.target.id === 'overlay') {
      onClose();
    }
  }

  const handleClickClose = (event) => {
    event.stopPropagation();
    onClose();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const category = event.target.category.value;
    const author = event.target.author.value;

    const newBoard = {
      title,
      category,
      author
    }

    axios.post(`${baseURL}/boards/`, newBoard)
      .then((response) => {
        onClose();
        onBoardAdded();
      })
      .catch((error) => {
        alert(error.response.data);
      });
    
  };

  return (
    <div id="new-board-overlay" onClick={handleClickOutside}>
      <div id="new-board-content">
        <span id="close-new-board" onClick={handleClickClose}>&times;</span>
        <h2>Create a New Board</h2>
        <form onSubmit={handleSubmit} id="board-form">
          <label>Title: </label>
          <input type="text" name="title"/>
          <label>Category: </label>
          <select id="category-options" name="category" required>
            <option value="" selected disabled>Select a Category</option>
            <option value="Celebration">Celebration</option>
            <option value="Thank You">Thank You</option>
            <option value="Inspiration">Inspiration</option>
          </select>
          <label >Author:</label>
          <input type="text" name="author"/>
          <button type='submit'>Create Board</button>
        </form>
      </div>
    </div>
  )
}

export default NewBoardForm