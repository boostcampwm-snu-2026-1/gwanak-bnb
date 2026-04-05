import { useState } from "react";

function TravelerSetModal() {

    const [countAdults, setCountAdults] = useState(0);
    const [countChildren, setCountChildren] = useState(0);
    const [countInfants, setCountInfants] = useState(0);
    const [countPets, setCountPets] = useState(0);

    const guestTypes = [
        { label: "성인", desc: "13세 이상", state: countAdults, setState: setCountAdults },
        { label: "어린이", desc: "2~12세", state: countChildren, setState: setCountChildren },
        { label: "유아", desc: "2세 미만", state: countInfants, setState: setCountInfants },
        { label: "반려동물", desc: "보조동물을 동반하시나요?", state: countPets, setState: setCountPets },
    ];

    return ( 
        <div>
            {guestTypes.map((g) => (
                <div key={g.label}>
                    <div>{g.label}</div>
                    <div>{g.desc}</div>
                    <button onClick={() => g.setState(prev => Math.max(prev - 1, 0))} disabled={g.state === 0}>
                        -
                    </button>
                    <span>{g.state}</span>
                    <button onClick={() => g.setState(prev => prev + 1)} disabled={g.state >= 9}>
                        +
                    </button>
                </div>
            ))}
        </div>
    )
}

export default TravelerSetModal