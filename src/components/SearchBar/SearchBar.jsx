import DestinationField from './DestinationField'
import DateField from './DateField'
import GuestField from './GuestField/GuestField'

export default function SearchBar() {
  return (
    <div className="flex items-center bg-white rounded-full border border-gray-200 shadow-md h-16 w-full max-w-3xl">
      <DestinationField />
      <div className="w-px h-8 bg-gray-200" />
      <DateField />
      <div className="w-px h-8 bg-gray-200" />
      <GuestField />
    </div>
  )
}
