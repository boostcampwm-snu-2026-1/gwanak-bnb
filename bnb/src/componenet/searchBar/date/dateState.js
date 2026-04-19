import { useState } from "react";

const useDateState = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const onDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const resetDate = () => {
        setStartDate(null);
        setEndDate(null);
    };

    return {
        startDate,
        endDate,
        onDateChange,
        resetDate
    };
};

export default useDateState;