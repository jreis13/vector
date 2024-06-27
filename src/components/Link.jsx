function Link({ blank, children, to }) {
  if (blank) {
    attrs.target = "_blank";
    attrs.rel = "noopener noreferrer";
  }

  return (
    <p>
      <a href={to} className="cursor-pointer no-underline">
        {children}
      </a>
    </p>
  );
}

export default Link;
