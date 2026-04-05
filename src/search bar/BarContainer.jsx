import Destination from "./Destination"
import Date from "./Date"
import Traveler from "./Traveler"

function BarContainer() {
  return ( 
    <div className="bar-container">
        <Destination />
        <Date />
        <Traveler />
    </div>
  )
}

export default BarContainer