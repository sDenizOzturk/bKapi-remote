import { CSSProperties, FC, ReactNode } from 'react';
import classes from './BaseCard.module.css';
import { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

interface BaseCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  style?: CSSProperties;
}

const BaseCard: FC<BaseCardProps> = ({ children, style, ...props }) => {
  return (
    <motion.div className={classes.card} style={style} {...props}>
      {children}
    </motion.div>
  );
};
export default BaseCard;
