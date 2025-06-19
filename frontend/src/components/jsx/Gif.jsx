import './../css/Gif.css'

function Gif({ gifURL, handleClick }) {

  const onGifClick = () => {
    handleClick(gifURL);
  }

  return (
    <img src={gifURL} alt="GIF" className="gif" onClick={onGifClick}/>
  )
}

export default Gif