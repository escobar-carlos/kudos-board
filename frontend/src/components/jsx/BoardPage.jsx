import { useState, useEffect } from 'react'
import './../css/BoardPage.css'
import { useParams, Link } from "react-router-dom";
import { baseURL } from '../../globals';
import Header from './Header'
import NewCardForm from './NewCardForm'
import CardList from './CardList'
import Footer from './Footer'

function BoardPage() {
  const { boardId } = useParams();

  const [cardData, setCardData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch(`${baseURL}/boards/${boardId}/cards`);
      const data = await response.json();
      setCardData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  return (
    <div className='board-page'>
      <Link to={'/'}>
        <span id="close-board">&larr;</span>
      </Link>
      <Header />
      {/* TODO: Board Title Here*/}
      <button id="create-new-button" onClick={toggleForm}>Create a New Card</button>
      {/* NewBoardForm should only popup when the button above is clicked*/}
      {showForm && <NewCardForm onClose={toggleForm}/>}
      {cardData && <CardList cardData={cardData}/>}
      <Footer />
    </div>
  )
}

export default BoardPage