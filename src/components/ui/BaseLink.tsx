import { ReactNode, FC, LinkHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import classes from './BaseButton.module.css';

interface BaseLinkProps extends LinkHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
  mode?: string;
  to: string;
}

const BaseLink: FC<BaseLinkProps> = ({ children, mode = '', to, ...props }) => {
  const classNames = mode
    .split(' ')
    .map((_mode) => classes[_mode])
    .join(' ');
  return (
    <Link className={classNames + ' ' + classes.a} to={to} {...props}>
      {children}
    </Link>
  );
};
export default BaseLink;
