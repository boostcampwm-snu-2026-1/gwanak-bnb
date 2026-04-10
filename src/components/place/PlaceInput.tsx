interface PlaceInputProps {
    value: string;
    onChange: (value: string) => void;
    onKeyDown: () => void;
    inputRef: React.RefObject<HTMLInputElement>;
}

const PlaceInput = ({ value, onChange, onKeyDown, inputRef }: PlaceInputProps) => {
    return (
        <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            className="w-full px-4 py-2 text-lg border-none focus:outline-none"
            placeholder="여행지 검색"
        />
    );
};

export default PlaceInput;