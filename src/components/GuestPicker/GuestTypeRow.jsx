import Counter from './Counter';
import './GuestTypeRow.css';

function GuestTypeRow({ label, description, count, onIncrement, onDecrement, minDisabled, maxDisbaled }){
    return (
    <div className="guest-type-row">
        <div className="guset-type-info">
            <span className="guest-type-label"> {label} </span>
            <span className="guest-type-description"> {description} </span>
        </div>
        <Counter count = {count} onIncrement = {onIncrement} onDecrement = {onDecrement} maxDisbaled = {maxDisbaled} minDisabled = {minDisabled}/>
    </div>
    );
}
export default GuestTypeRow;