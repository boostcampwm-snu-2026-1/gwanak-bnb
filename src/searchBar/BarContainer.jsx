import { useState } from "react"
import Destination from "./Destination"
import Date from "./Date"
import Traveler from "./Traveler"
import TravelerSetModal from "./detailModal/TravelerSetModal"
import DestinationSetModal from "./detailModal/DestinationSetModal"
import styles from "../css/BarContainer.module.css"

function BarContainer() {
  const [isTravelModalOpen, setIsTravelModalOpen] = useState(false);
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
  const [travelerCount, setTravelerCount] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });
  const [destination, setDestination] = useState("");
  const [queryDestination, setQueryDestination] = useState([{name: "", country: "", description: "", tags: [], popularity: 0}]); 
  return ( 
    <div>
      <div className={styles.container}>
          <Destination destination={destination} setQueryDestination={setQueryDestination} setIsOpen={setIsDestinationModalOpen} />
          <Date />
          <Traveler travelerCount={travelerCount} setIsOpen={setIsTravelModalOpen}/>
      </div>
      {isDestinationModalOpen && <DestinationSetModal queryDestination={queryDestination} setDestination={setDestination} />}
      {isTravelModalOpen && <TravelerSetModal travelerCount={travelerCount} setTravelerCount={setTravelerCount} />}
    </div>
  )
}

export default BarContainer