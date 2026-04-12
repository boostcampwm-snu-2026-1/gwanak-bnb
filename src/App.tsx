import "./App.css";
import GuestFilterSelectPopover from "./components/GuestFilterSelectPopover";
import LocationSearchBar from "./components/LocationSearchBar";

function App() {
  return (
    <section id="center">
      <LocationSearchBar />
      <GuestFilterSelectPopover />
    </section>
  );
}

export default App;
