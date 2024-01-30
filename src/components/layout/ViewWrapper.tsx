import { FC, ReactNode } from 'react';
import { bounce } from '../../utils/animationVariants';
import { motion } from 'framer-motion';

interface ViewWrapperProps {
  children: ReactNode;
}

const ViewWrapper: FC<ViewWrapperProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0.8, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={bounce.s.transition}
    >
      {children}
    </motion.div>
  );
};

export default ViewWrapper;
