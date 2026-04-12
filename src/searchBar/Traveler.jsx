function Traveler({ travelerCount, setIsOpen }) {

  return ( 
      <div onClick={() => setIsOpen(prev => !prev)}>
          <div>여행자</div>
          <div>게스트 추가</div>
          {travelerCount.adults + travelerCount.children > 0 && (
              <p>
                  게스트 {travelerCount.adults + travelerCount.children}명
              </p>
          )}
          {travelerCount.infants > 0 && (
            <p>
                , 유아 {travelerCount.infants}명
            </p>
          )}
          {travelerCount.pets > 0 && (
            <p>
                , 반려동물 {travelerCount.pets}마리
            </p>
          )}
      </div>
  )
}

export default Traveler