import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const tags = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  body: "p",
  "body-small": "p",
  span: "span",
};

const sizes = {
  h1: "lg:text-5xl text-4xl",
  h2: "lg:text-4xl text-3xl",
  h3: "lg:text-3xl text-2xl",
  h4: "lg:text-2xl text-1xl",
  h5: "lg:text-xl text-lg",
  body: "lg:text-lg text-md",
  "body-small": "lg:text-md text-sm",
  span: "lg:text-sm text-xs",
};

const Typography = ({ variant, children, className, size, as }) => {
  const sizeClasses = twMerge(sizes[variant], size);
  const Tag = as || tags[variant];

  return <Tag className={`${sizeClasses} ${className}`}>{children}</Tag>;
};

Typography.propTypes = {
  variant: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "body",
    "body-small",
    "span",
  ]).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
  as: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "p", "span"]),
};

export default Typography;
