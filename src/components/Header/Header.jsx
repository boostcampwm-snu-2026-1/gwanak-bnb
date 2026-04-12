import './Header.css';
import pic1 from '../../assets/img/snubnb.png'

// 좌상단 아이콘
function Header() {
  return (
    <div className="header">
      <img src={pic1} alt="SNU-BNB" />
    </div>
  )
}

export default Header;