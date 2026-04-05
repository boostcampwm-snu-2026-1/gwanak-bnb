import { useState } from "react";
import TravelerSetModal from "./TravelerSetModal";

function Traveler() {
    const [isOpen, setIsOpen] = useState(false);
  return ( 
    <>
        <div onClick={() => setIsOpen(prev => !prev)}>
            <div>여행자</div>
            <div>게스트 추가</div>
        </div>
        {isOpen && <TravelerSetModal />}
    </>
  )
}

export default Traveler