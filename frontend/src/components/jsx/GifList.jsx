import './../css/GifList.css'
import Gif from './Gif'

function GifList({ gifs, handleClick }) {
  return (
    <div className='gif-list'>
      {
        gifs.map(gif => {
          return <Gif gifURL={gif} handleClick={handleClick}/>
        })
      }
    </div>
  )
}

export default GifList