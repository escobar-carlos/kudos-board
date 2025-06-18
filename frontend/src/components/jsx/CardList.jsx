import './../css/CardList.css'
import Card from './Card'

function CardList({ cardData }) {
  return (
    <div className="card-list">
    {
      cardData.map(card => {
        return <Card id={card.id} board_id={card.board_id} message={card.message} gif={card.gif} owner={'Carlos'} upvotes={card.upvotes}/>
      })
    }
    </div>
  )
}

export default CardList

// TODO: add author to database table