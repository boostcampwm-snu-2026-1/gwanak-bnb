function Traveler({ setIsOpen }) {
  return ( 
      <div onClick={() => setIsOpen(prev => !prev)}>
          <div>여행자</div>
          <div>게스트 추가</div>
      </div>
  )
}

export default Traveler