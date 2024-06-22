import { Link as NextLink } from "next/link";

import classNames from "classnames";

function Link({ blank, children, download, faded, internal, title, to }) {
  const className = classNames(
    "cursor-pointer text-current no-underline transition-opacity duration-200",
    {
      "opacity-50 hover:opacity-100": faded,
      "hover:opacity-50": !faded,
    }
  );

  const attrs = {
    download,
    title,
  };

  if (blank) {
    attrs.target = "_blank";
    attrs.rel = "noopener noreferrer";
  }

  if (internal) {
    return (
      <p>
        <NextLink href={to} {...attrs} className={className}>
          {children}
        </NextLink>
      </p>
    );
  }

  return (
    <p>
      <a href={to} {...attrs} className={className}>
        {children}
      </a>
    </p>
  );
}

export default Link;
