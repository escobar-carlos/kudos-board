import './../css/NewCardForm.css'
import { baseURL } from '../../globals';
import { useState } from 'react';
import axios from 'axios';
import GifList from './GifList';


function NewCardForm({ boardId, onClose, onCardAdded }) {

  const [gifSearch, setGifSearch] = useState('');
  const [gifs, setGifs] = useState([]);
  const [selectedGif, setSelectedGif] = useState('');

  const apiKey = import.meta.env.VITE_GIPHY_API_KEY;

  // Close modal when click is registered outside of it
  const handleClickOutside = (event) => {
    if (event.target.id === 'new-card-overlay') {
      onClose();
    }
  };

  // Close modal when 'X' icon is clicked
  const handleClickClose = (event) => {
    event.stopPropagation();
    onClose();
  };

  // Handle GIF input change
  const handleInputChange = (event) => {
    setGifSearch(event.target.value);
  };

  // Search GIFs using GIPHY API
  const searchGifs = async () => {
    try {
      const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: apiKey,
          q: gifSearch,
          limit: 6
        }
      });

      const gifArray = response.data.data;
      const gifLinks = gifArray.map(gif => gif.images.original.url);

      setGifs(gifLinks);

    } catch (error) {
      console.error("Error fetching GIFs: ", error);
    }
  };

  // Handle GIF selection
  const handleGifSelect = (gifLink) => {
    setSelectedGif(gifLink);
  };

  // Handle form submission; user input is retrieved and sent to DB to create new card
  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = event.target.message.value;
    const gif = event.target.gif.value;
    const author = event.target.author.value;

    const newCard = {
      message,
      gif,
      author
    }

    try {
      await axios.post(`${baseURL}/boards/${boardId}/cards/`, newCard);
      onClose();
      onCardAdded();
    } catch (error) {
      alert(`Error adding new card: ${error.response.data}`);
    }
  };

  return (
    <div id="new-card-overlay" onClick={handleClickOutside}>
      <div id="new-card-content">
        <span id="close-new-card" onClick={handleClickClose}>&times;</span>
        <h2>Create a New Card</h2>
        <form id="card-form" onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter card message' name="message"/>
          <input type="text" placeholder='Search GIFs...' value={gifSearch} onChange={handleInputChange}/>
          <button type='button' onClick={searchGifs}>Search</button>
          {gifs.length > 0 && <GifList gifs={gifs} handleClick={handleGifSelect}/>}
          <input type="text" placeholder='Enter GIF URL' name="gif" value={selectedGif} onChange={(e) => setSelectedGif(e.target.value)}/>
          <input type="text" placeholder='Enter author (optional)' name='author'/>
          <button type='submit'>Create Card</button>
        </form>
      </div>
    </div>
  )
}

export default NewCardForm