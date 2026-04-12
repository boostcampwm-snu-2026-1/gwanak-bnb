export default function Button({ children, onClick, variant = 'primary', size = 'md', disabled = false, className = '' }) {
  const baseStyles = 'font-semibold rounded-xl transition focus:outline-none'

  const variants = {
    primary: 'bg-[#FF385C] hover:bg-[#E31C5F] text-white',
    ghost: 'text-gray-700 underline hover:text-gray-900',
    icon: 'p-2 rounded-full hover:bg-gray-100 text-gray-600',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-sm',
    lg: 'px-10 py-4 text-base',
  }

  const variantClass = variants[variant] ?? variants.primary
  const sizeClass = variant === 'icon' ? '' : (sizes[size] ?? sizes.md)

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`.trim()}
    >
      {children}
    </button>
  )
}
