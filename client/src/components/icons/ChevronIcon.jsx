function ChevronIcon({ direction = 'right', className = 'h-4 w-4' }) {
  const rotationClass =
    direction === 'left'
      ? 'rotate-180'
      : direction === 'down'
        ? 'rotate-90'
        : ''

  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={[className, rotationClass].join(' ')}
    >
      <path
        d="M7 4.5 12.5 10 7 15.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ChevronIcon
