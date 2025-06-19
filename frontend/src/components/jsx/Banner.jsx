import './../css/Banner.css'
import bannerImg from '../../assets/banner.png';
import Header from './Header';

function Banner() {
  return (
  <div className='banner'>
    <Header />
    <img id="banner-image" src={bannerImg} alt="Banner Image" />
  </div>
  )
}

export default Banner