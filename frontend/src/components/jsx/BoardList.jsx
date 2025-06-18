import './../css/BoardList.css'
import Board from './Board'

function BoardList({ boardData }) {
  return (
    <div className="board-list">
    {
      boardData.map(board => {
        return <Board id={board.id} title={board.title} category={board.category} image={`https://picsum.photos/200/300?random=${board.id}`}/>
      })
    }
    </div>
  )
}

export default BoardList