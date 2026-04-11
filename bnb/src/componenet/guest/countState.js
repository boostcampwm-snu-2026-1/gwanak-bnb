import { useState } from "react";

const countState = () => {
    const [counts, setCounts] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0
    });

    return {
        counts,
        setCounts
    };
};

export default countState;