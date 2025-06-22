import { useState, useEffect } from 'react'
import './../css/HomePage.css'
import { baseURL } from '../../globals';
import axios from 'axios';
import Banner from './Banner'
import SearchForm from './SearchForm'
import FilterList from './FilterList';
import NewBoardForm from './NewBoardForm'
import BoardList from './BoardList'
import Footer from './Footer'

function HomePage() {

  const [boardData, setBoardData] = useState([]);
  const [filteredBoardData, setFilteredBoardData] = useState([]);
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial fetch of card data
  useEffect(() => {
    fetchBoards();
  }, []);

  // Rerender boards when query, filter, or boardData change
  useEffect(() => {
    renderBoards();
  }, [searchQuery, filter, boardData]);

  // Fetch boards from DB
  const fetchBoards = async () => {
    try {
      const response = await axios.get(`${baseURL}/boards/`);
      setBoardData(response.data);
      setFilteredBoardData(response.data);
    } catch (error) {
      alert(`Error fetching boards: ${error.response.data}`);
    }
  };

  // Filter boardData based on search and/or filter
  const renderBoards = () => {
    let matchingBoards = boardData;
    if (searchQuery) {
      matchingBoards = matchingBoards.filter(board => board.title.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredBoardData(matchingBoards);
    }

    if (filter == 'Recent') {
      matchingBoards = matchingBoards.sort((a, b) => b.id - a.id).slice(0, 6);
    } else if (filter) {
      matchingBoards = matchingBoards.filter(board => board.category == filter);
    }

    setFilteredBoardData(matchingBoards);
  };

  // Control whether to display new board form or not
  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  // Handle user click on a filter
  const handleFilterClick = (category) => {
    // Reset filter
    if (category == 'All') {
      setFilter('');
    } else {
      setFilter(category);
    }
  };

  // Handle user search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Reset query and filter state variables
  const handleClear =() => {
    setSearchQuery('');
    setFilter('');
  };

  // Filter options
  const filters = ['All', 'Recent', 'Celebration', 'Thank You', 'Inspiration'];

  return (
    <div className='home-page'>
      <Banner />
      <SearchForm handleSearch={handleSearch} handleClear={handleClear}/>
      <FilterList filters={filters} handleFilterClick={handleFilterClick}/>
      <button id="create-new-button" onClick={toggleForm}>Create a New Board</button>
      {showForm && <NewBoardForm onClose={toggleForm} onBoardAdded={fetchBoards}/>}
      {boardData && <BoardList boardData={filteredBoardData} onBoardDeleted={fetchBoards}/>}
      <Footer />
    </div>
  )
}

export default HomePage