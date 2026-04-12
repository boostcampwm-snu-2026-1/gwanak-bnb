function DestinationRow({ title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-start gap-4 rounded-3xl p-4 text-left hover:bg-gray-100 transition-colors"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>
      <div className="min-w-0">
        <div className="font-semibold text-gray-900">{title}</div>
        <div className="text-sm text-gray-500 mt-1 truncate">{description}</div>
      </div>
    </button>
  );
}

export default DestinationRow;
