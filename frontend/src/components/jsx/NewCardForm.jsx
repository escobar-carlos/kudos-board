import './../css/NewCardForm.css'

function NewCardForm({ onClose }) {

  const handleClickOutside = (event) => {
    if (event.target.id === 'new-card-overlay') {
      onClose();
    }
  }

  const handleClickClose = (event) => {
    event.stopPropagation();
    onClose();
  }

  return (
    <div id="new-card-overlay" onClick={handleClickOutside}>
      <div id="new-card-content">
        <span id="close-new-card" onClick={handleClickClose}>&times;</span>
        <h2>Create a New Card</h2>
        <form id="card-form">
          <input type="text" placeholder='Enter card title' />
          <input type="text" placeholder='Enter card description' />
          <input type="Search GIFs..." />
          <button type='submit'>Search</button>
          <input type="text" placeholder='Enter GIF URL'/>
          <button type='submit'>Copy GIF URL</button>
          <input type="text" placeholder='Enter owner (optional)'/>
          <button type='submit'>Create Card</button>
        </form>
      </div>
    </div>
  )
}

export default NewCardForm