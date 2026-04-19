import { useState } from "react"
import Destination from "./Destination"
import Date from "./Date"
import Traveler from "./Traveler"
import TravelerSetModal from "./detailModal/TravelerSetModal"
import DestinationSetModal from "./detailModal/DestinationSetModal"
import styles from "../css/BarContainer.module.css"

function BarContainer() {
  const [isTravelModalOpen, setIsTravelModalOpen] = useState(false);

  // Destination 관련 상태
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
  const [travelerCount, setTravelerCount] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });
  const [destination, setDestination] = useState("");
  const [queryDestination, setQueryDestination] = useState([{name: "", country: "", description: "", tags: [], popularity: 0}]); 
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  return ( 
    <div>
      <div className={styles.container}>
          <Destination 
            destination={destination} 
            setDestination={setDestination} 
            queryDestination={queryDestination}
            setQueryDestination={setQueryDestination} 
            setIsOpen={setIsDestinationModalOpen} 
            highlightedIndex={highlightedIndex}
            setHighlightedIndex={setHighlightedIndex}
          />
          <Date />
          <Traveler 
            travelerCount={travelerCount} 
            setIsOpen={setIsTravelModalOpen}
          />
      </div>
      {isDestinationModalOpen 
        && <DestinationSetModal 
          queryDestination={queryDestination} 
          setDestination={setDestination} 
          highlightedIndex={highlightedIndex}
          setIsOpen={setIsDestinationModalOpen}
        />
      }
      {isTravelModalOpen 
        && <TravelerSetModal 
          travelerCount={travelerCount} 
          setTravelerCount={setTravelerCount}
        />
      }
    </div>
  )
}

export default BarContainer