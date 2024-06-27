function Button({ onClick, href, children }) {
  if (onClick) {
    return (
      <button
        className="inline-flex justify-center w-full max-w-xs py-4 border rounded-full cursor-pointer uppercase transition-colors duration-200 hover:font-medium hover:bg-[#BB44F0]"
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
      className="inline-flex justify-center w-full max-w-xs py-4 border border-current rounded-full cursor-pointer uppercase transition-colors duration-200 hover:font-medium hover:bg-[#BB44F0]"
    >
      <p>{children}</p>
    </a>
  );
}

export default Button;
