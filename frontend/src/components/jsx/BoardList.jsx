import './../css/BoardList.css'
import Board from './Board'

function BoardList({ boardData, onBoardDeleted }) {
  return (
    <div className="board-list">
    {
      boardData.map(board => {
        return <Board key={board.id} id={board.id} title={board.title} category={board.category} image={`https://picsum.photos/200/300?random=${board.id}`} onBoardDeleted={onBoardDeleted}/>
      })
    }
    </div>
  )
}

export default BoardList