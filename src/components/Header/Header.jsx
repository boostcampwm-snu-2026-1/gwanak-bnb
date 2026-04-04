import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <span className="logo-text">gwanak-bnb</span>
      </div>
      <nav className="header-nav">
        <button className="nav-item active">숙소</button>
        <button className="nav-item">체험</button>
      </nav>
      <div className="header-user">
        <button className="host-button">당신의 공간을 에어비앤비하세요</button>
        <button className="user-menu-button">
          <span className="menu-icon">☰</span>
          <span className="user-icon">👤</span>
        </button>
      </div>
    </header>
  )
}

export default Header
