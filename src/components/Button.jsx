function Button({ onClick, href, children }) {
  if (onClick) {
    return (
      <button
        className="inline-flex w-full max-w-xs cursor-pointer justify-center rounded-full border py-4 uppercase transition-colors duration-200 hover:bg-[#BB44F0] hover:font-medium"
        onClick={onClick}
        type="button"
      >
        <p>{children}</p>
      </button>
    )
  }

  if (!href) return null

  return (
    <a
      href={href}
      className="inline-flex w-full max-w-xs cursor-pointer justify-center rounded-full border border-current py-4 uppercase transition-colors duration-200 hover:bg-[#BB44F0] hover:font-medium"
    >
      <p>{children}</p>
    </a>
  )
}

export default Button
