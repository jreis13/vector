function Button({ onClick, href, children }) {
  if (onClick) {
    return (
      <button
        className="inline-flex justify-center w-full max-w-xs px-4 py-4 border border-white rounded-full text-blue-500 cursor-pointer uppercase transition-opacity duration-200 hover:opacity-50 hover:text-[#BB44F0]"
        onClick={onClick}
        type="button"
      >
        <p>{children}</p>
      </button>
    );
  }

  if (!href) return null;

  return (
    <a
      href={href}
      className="inline-flex justify-center w-full max-w-xs px-4 py-4 border border-current rounded-full text-current cursor-pointer uppercase transition-opacity duration-200 hover:opacity-50 hover:text-[#BB44F0]"
    >
      <p>{children}</p>
    </a>
  );
}

export default Button;
