interface PlaceInputProps {
    value: string;
    onChange: (value: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
}

const PlaceInput = ({ value, onChange, onKeyDown, inputRef }: PlaceInputProps) => {
    return (
        <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            className="w-full bg-transparent text-sm font-semibold border-none focus:outline-none text-gray-900 placeholder-gray-500 p-0 m-0 leading-tight"
            placeholder="여행지 검색"
        />
    );
};

export default PlaceInput;