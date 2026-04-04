import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>gwanak-bnb 지원</h4>
          <ul>
            <li><a href="#">도움말 센터</a></li>
            <li><a href="#">안전 정보</a></li>
            <li><a href="#">예약 취소 옵션</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>커뮤니티</h4>
          <ul>
            <li><a href="#">차별 반대</a></li>
            <li><a href="#">접근성</a></li>
            <li><a href="#">게스트 추천</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>호스팅</h4>
          <ul>
            <li><a href="#">당신의 공간을 에어비앤비하세요</a></li>
            <li><a href="#">호스트를 위한 보장</a></li>
            <li><a href="#">호스팅 자료</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 gwanak-bnb</span>
        <span>·</span>
        <a href="#">개인정보 처리방침</a>
        <span>·</span>
        <a href="#">이용약관</a>
      </div>
    </footer>
  )
}

export default Footer
