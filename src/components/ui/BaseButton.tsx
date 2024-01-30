import { ReactNode, FC } from 'react';
import classes from './BaseButton.module.css';
import { HTMLMotionProps, motion } from 'framer-motion';
import { bounce } from '../../utils/animationVariants';

interface BaseButtonProps extends HTMLMotionProps<'button'> {
  children?: ReactNode;
  mode?: string;
}

const BaseButton: FC<BaseButtonProps> = ({ children, mode = '', ...props }) => {
  const classNames = mode
    .split(' ')
    .map((_mode) => classes[_mode])
    .join(' ');
  return (
    <motion.button
      whileHover={bounce.m.scale}
      transition={bounce.m.transition}
      className={classNames + ' ' + classes.button}
      {...props}
    >
      {children}
    </motion.button>
  );
};
export default BaseButton;
