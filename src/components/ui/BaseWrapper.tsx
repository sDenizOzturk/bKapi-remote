import { HTMLMotionProps } from 'framer-motion';
import classes from './BaseWrapper.module.css';
import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface BaseWrapperProps extends HTMLMotionProps<'div'> {
  children?: ReactNode;
  mode?: string;
}

const BaseWrapper: FC<BaseWrapperProps> = ({
  children,
  mode = '',
  ...props
}) => {
  const classNames = mode
    .split(' ')
    .map((_mode) => classes[_mode])
    .join(' ');
  return (
    <motion.div className={classNames} {...props}>
      {children}
    </motion.div>
  );
};
export default BaseWrapper;
