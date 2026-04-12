import { useState } from "react"
import Destination from "./Destination"
import Date from "./Date"
import Traveler from "./Traveler"
import TravelerSetModal from "./detailModal/TravelerSetModal"
import styles from "../css/BarContainer.module.css"

function BarContainer() {
  const [isTravelModalOpen, setIsTravelModalOpen] = useState(false);
  const [travelerCount, setTravelerCount] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });
  return ( 
    <div>
      <div className={styles.container}>
          <Destination />
          <Date />
          <Traveler travelerCount={travelerCount} setIsOpen={setIsTravelModalOpen}/>
      </div>
      {isTravelModalOpen && <TravelerSetModal travelerCount={travelerCount} setTravelerCount={setTravelerCount} />}
    </div>
  )
}

export default BarContainer