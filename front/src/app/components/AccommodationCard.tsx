import { IAccommodation } from "@/types/accommodation";

export default function AccommodationCard({ data }: { data: IAccommodation }) {
  return (
    <div className="flex flex-col gap-2 cursor-pointer group">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <img 
          src={data.image_url} 
          alt={data.name} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex justify-between items-start mt-2">
        <h3 className="font-semibold text-lg truncate pr-4">{data.location}의 숙소</h3>
        <div className="flex items-center gap-1 text-sm">
          <span>★</span>
          <span>{data.rating.toFixed(1)}</span>
        </div>
      </div>
      <p className="text-muted text-sm truncate">{data.name}</p>
      <p className="text-muted text-sm">최대 인원 {data.max_guests}명</p>
      <div className="flex items-center gap-1 mt-1">
        <span className="font-semibold">₩{data.price_per_night.toLocaleString()}</span>
        <span className="text-muted text-sm">/ 박</span>
      </div>
    </div>
  );
}
