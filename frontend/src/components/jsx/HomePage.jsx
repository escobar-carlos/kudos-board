import { useState, useEffect } from 'react'
import './../css/HomePage.css'
import { baseURL } from '../../globals';
import Banner from './Banner'
import SearchForm from './SearchForm'
import Filter from './Filter'
import NewBoardForm from './NewBoardForm'
import BoardList from './BoardList'
import Footer from './Footer'

function HomePage() {

  const [boardData, setBoardData] = useState([]);
  const [filteredBoardData, setFilteredBoardData] = useState([]);
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    renderBoards();
  }, [searchQuery, filter, boardData]);

  const fetchBoards = async () => {
    try {
      const response = await fetch(`${baseURL}/boards/`);
      const data = await response.json();
      setBoardData(data);
      setFilteredBoardData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderBoards = () => {
    let matchingBoards = boardData;
    if (searchQuery) {
      matchingBoards = matchingBoards.filter(board => board.title.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredBoardData(matchingBoards);
    }

    if (filter) {
      matchingBoards = matchingBoards.filter(board => board.category == filter);
    }

    setFilteredBoardData(matchingBoards);
  };

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  const handleFilterClick = (category) => {
    if (category == 'All') {
      setFilter('');
    } else {
      setFilter(category);
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClear =() => {
    setSearchQuery('');
    setFilter('');
  }

  return (
    <div className='home-page'>
      <Banner />
      <SearchForm handleSearch={handleSearch} handleClear={handleClear}/>
      <div className='filters'>
        <Filter category={'All'} handleFilterClick={handleFilterClick}/>
        <Filter category={'Recent'} handleFilterClick={handleFilterClick}/>
        <Filter category={'Celebration'} handleFilterClick={handleFilterClick}/>
        <Filter category={'Thank You'} handleFilterClick={handleFilterClick}/>
        <Filter category={'Inspiration'} handleFilterClick={handleFilterClick}/>
      </div>
      <button id="create-new-button" onClick={toggleForm}>Create a New Board</button>
      {showForm && <NewBoardForm onClose={toggleForm} onBoardAdded={fetchBoards}/>}
      {boardData && <BoardList boardData={filteredBoardData} onBoardDeleted={fetchBoards}/>}
      <Footer />
    </div>
  )
}

export default HomePage