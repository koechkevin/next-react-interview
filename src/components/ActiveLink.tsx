import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';
import React, { Children, FC } from 'react';

export const ActiveLink: FC<LinkProps | any> = ({ children, activeClassName, ...props }) => {
  const { pathname } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  const className = pathname === props.href ? [childClassName, activeClassName].join(' ') : childClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
        style: { cursor: 'pointer', ...child.props.style },
      })}
    </Link>
  );
};
