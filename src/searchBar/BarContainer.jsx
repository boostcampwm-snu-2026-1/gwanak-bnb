import { useEffect, useState } from "react"
import { fetchDestinations } from "../api/destination"
import Destination from "./Destination"
import Date from "./Date"
import Traveler from "./Traveler"
import TravelerSetModal from "./detailModal/TravelerSetModal"
import DestinationSetModal from "./detailModal/DestinationSetModal"
import styles from "../css/BarContainer.module.css"

function BarContainer({ setSearchResults }) {
  // 최종 검색 상태
  const [finalDestination, setFinalDestination] = useState("");
  const [finalDate, setFinalDate] = useState({ checkIn: null, checkOut: null });
  const [finalTravelerCount, setFinalTravelerCount] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });

  // Traveler 관련 상태
  const [isTravelModalOpen, setIsTravelModalOpen] = useState(false);
  const [travelerCount, setTravelerCount] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });


  // Destination 관련 상태
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [queryDestination, setQueryDestination] = useState([{name: "", country: "", description: "", tags: [], popularity: 0}]); 
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await fetchDestinations({ query: finalDestination, capacity: Object.values(finalTravelerCount).reduce((a, b) => a + b, 0) });
        setSearchResults(data);
      } catch (err) {
        console.error("검색 결과 불러오기 실패:", err);
        setSearchResults([]);
      }
    };

    if (finalDestination || Object.values(finalTravelerCount).some(count => count > 0)) {
      fetchResults();
    }
  }, [finalDestination, finalTravelerCount, setSearchResults]);

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
          <button className={styles.searchButton} onClick={() => {
            setFinalDestination(destination);
            setFinalTravelerCount(travelerCount);
            fetchDestinations({ query: destination, capacity: Object.values(travelerCount).reduce((a, b) => a + b, 0) })
              .then(data => setSearchResults(data))
              .catch(err => {
                console.error("검색 결과 불러오기 실패:", err);
                setSearchResults([]);
              });
            setIsDestinationModalOpen(false);
            setIsTravelModalOpen(false);
          }}>
            검색
          </button>
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