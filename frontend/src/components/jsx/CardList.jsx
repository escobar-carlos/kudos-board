import './../css/CardList.css'
import Card from './Card'

function CardList({ cardData, onCardDeleted }) {
  return (
    <div className="card-list">
    {
      cardData.map(card => {
        return <Card id={card.id} board_id={card.board_id} message={card.message} gif={card.gif} upvotes_on_load={card.upvotes} onCardDeleted={onCardDeleted}/>
      })
    }
    </div>
  )
}

export default CardList

// TODO: add author to database table