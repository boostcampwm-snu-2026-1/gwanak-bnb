import { useState } from "react"
import Destination from "./Destination"
import Date from "./Date"
import Traveler from "./Traveler"
import TravelerSetModal from "./TravelerSetModal"
import styles from "../css/BarContainer.module.css"

function BarContainer() {
  const [isTravelModalOpen, setIsTravelModalOpen] = useState(false);
  return ( 
    <div>
      <div className={styles.container}>
          <Destination />
          <Date />
          <Traveler setIsOpen={setIsTravelModalOpen}/>
      </div>
      {isTravelModalOpen && <TravelerSetModal />}
    </div>
  )
}

export default BarContainer