import { useEffect, useState } from "react";
import styles from "../../css/SetModal.module.css";

function TravelerSetModal( { travelerCount, setTravelerCount } ) {

    const [countAdults, setCountAdults] = useState(0);
    const [countChildren, setCountChildren] = useState(0);
    const [countInfants, setCountInfants] = useState(0);
    const [countPets, setCountPets] = useState(0);

    const guestTypes = [
        { name: "adults", label: "성인", desc: "13세 이상", state: countAdults, setState: setCountAdults },
        { name: "children", label: "어린이", desc: "2~12세", state: countChildren, setState: setCountChildren },
        { name: "infants", label: "유아", desc: "2세 미만", state: countInfants, setState: setCountInfants },
        { name: "pets", label: "반려동물", desc: "보조동물을 동반하시나요?", state: countPets, setState: setCountPets },
    ];

    useEffect(() => {
        setTravelerCount({
            adults: countAdults,
            children: countChildren,
            infants: countInfants,
            pets: countPets
        });
    }, [countAdults, countChildren, countInfants, countPets, setTravelerCount]);

    useEffect(() => {
        if (travelerCount.infants > 0 && travelerCount.adults === 0) {
            setCountAdults(1);
        }
        if (travelerCount.pets > 0 && travelerCount.adults === 0) {
            setCountAdults(1);
        }
    }, [travelerCount]);

    const disable = (type) => {
        if (type == "adults") {
            return travelerCount.adults <= 0 
            || ( travelerCount.infants > 0 && travelerCount.adults === 1 )
            || (travelerCount.pets > 0 && travelerCount.adults === 1);
        } else {
            return travelerCount[type] <= 0;
        }
    }

    return ( 
        <div className={styles.container}>
            {guestTypes.map((g) => (
                <div key={g.label} className={styles.unit}>
                    <div className={styles.content}>
                        <div className={styles.title}>{g.label}</div>
                        <div className={styles.desc}>{g.desc}</div>
                    </div>
                    <button 
                        onClick={() => g.setState(prev => Math.max(prev - 1, 0))} 
                        disabled={disable(g.name)}
                        className={styles.button}
                    >
                        -
                    </button>
                    <span className={styles.count}>{g.state}</span>
                    <button 
                        onClick={() => g.setState(prev => prev + 1)} 
                        className={styles.button}
                    >
                        +
                    </button>
                </div>
            ))}
        </div>
    )
}

export default TravelerSetModal