import './../css/CardList.css'
import Card from './Card'

function CardList({ cardData, onCardDeleted, onPin }) {
  return (
    <div className="card-list">
    {
      cardData.map(card => {
        return <Card key={card.id} id={card.id} board_id={card.board_id} message={card.message} gif={card.gif} upvotes_on_load={card.upvotes} pinned_on_load={card.pinned} onCardDeleted={onCardDeleted} onPin={onPin}/>
      })
    }
    </div>
  )
}

export default CardList