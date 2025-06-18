import './../css/NewBoardForm.css'

function NewBoardForm({ onClose }) {

  const handleClickOutside = (event) => {
    if (event.target.id === 'overlay') {
      onClose();
    }
  }

  const handleClickClose = (event) => {
    event.stopPropagation();
    onClose();
  }

  return (
    <div id="new-board-overlay" onClick={handleClickOutside}>
      <div id="new-board-content">
        <span id="close-new-board" onClick={handleClickClose}>&times;</span>
        <h2>Create a New Board</h2>
        <label>Title: </label>
        <input type="text" />
        <label>Category: </label>
        <select id="category-options">
          <option selected disabled>Select a Category</option>
          <option value="Celebration">Celebration</option>
          <option value="Thank You">Thank You</option>
          <option value="Inspiration">Inspiration</option>
        </select>
        <label >Author:</label>
        <input type="text" />
        <button type='submit'>Create Board</button>
      </div>
    </div>
  )
}

export default NewBoardForm