import { useState, useEffect } from 'react'
import './../css/BoardPage.css'
import { useParams, Link } from "react-router-dom";
import { baseURL } from '../../globals';
import axios from 'axios';
import Banner from './Banner'
import NewCardForm from './NewCardForm'
import CardList from './CardList'
import Footer from './Footer'

function BoardPage() {
  const { boardId } = useParams();

  const [cardData, setCardData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Initial fetch of card data
  useEffect(() => {
    fetchCards();
  }, []);

  // Fetch cards from DB
  const fetchCards = async () => {
    try {
      const response = await axios.get(`${baseURL}/boards/${boardId}/cards`);
      setCardData(response.data);
    } catch (error) {
      alert(`Error fetching cards: ${error.response.data}`);
    }
  };

  // Control whether to display new card form or not
  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  return (
    <div className='board-page'>
      <div>
        <Link to={'/'}>
          <span id="close-board">&larr;</span>
        </Link>
        <Banner />
      </div>
      <button id="create-new-button" onClick={toggleForm}>Create a New Card</button>
      {showForm && <NewCardForm boardId={boardId} onClose={toggleForm} onCardAdded={fetchCards}/>}
      {cardData && <CardList cardData={cardData} onCardDeleted={fetchCards} onPin={fetchCards}/>}
      <Footer />
    </div>
  )
}

export default BoardPage