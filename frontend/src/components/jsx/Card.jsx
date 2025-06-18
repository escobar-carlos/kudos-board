import './../css/Card.css'

function Card({ id, board_id, message, gif, author, upvotes }) {
  return (
    <div className='card'>
      <p>{message}</p>
      <img src={gif}/>
      <div className='features'>
        <button>Upvote: {upvotes}</button>
        <button>Delete</button>
      </div>
    </div>
  )
}

export default Card