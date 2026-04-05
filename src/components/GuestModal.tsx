//components/GuestModal.tsx
import GuestCounter from "./GuestCounter";


export default function GuestModal() {


    return (
        <div>
            <GuestCounter name="성인" description="만 13세 이상" />
            <GuestCounter name="어린이" description="2~12세" />
            <GuestCounter name="유아" description="2세 미만" />
            <GuestCounter name="반려동물 " description="보조동물 포함" />
        </div>
    );
}