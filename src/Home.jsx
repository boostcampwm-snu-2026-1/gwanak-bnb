import { useState } from "react";
import BarContainer from "./searchBar/BarContainer";
import CardList from "./card/CardList";

function Home() {

    const [searchResults, setSearchResults] = useState([{ title: "", description: "", imgURL: "" }]);
    return (
        <div>
            <BarContainer setSearchResults={setSearchResults} />
            <CardList cards={searchResults} />
        </div>
    );
}

export default Home;