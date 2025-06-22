import './../css/Gif.css'

function Gif({ gifURL, handleClick }) {

  // Handle click on GIF
  const onGifClick = () => {
    handleClick(gifURL);
  };

  return (
    <img src={gifURL} alt="GIF" className="gif" onClick={onGifClick}/>
  )
}

export default Gif