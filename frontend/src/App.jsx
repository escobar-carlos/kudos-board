import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/jsx/HomePage'
import BoardPage from './components/jsx/BoardPage';

function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/boards/:boardId" element={<BoardPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
