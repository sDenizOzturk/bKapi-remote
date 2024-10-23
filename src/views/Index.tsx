import { FC } from 'react';
import { BaseWrapper } from 'binak-react-components';
import { motion } from 'framer-motion';
import ListTargets from '../components/target/ListTargets';

const IndexView: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 2 }}
      style={{
        height: '100vh',
        backgroundImage: 'url(/background.webp)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <BaseWrapper
        style={{
          height: '100%',
          background: 'var(--color2_4)',
          alignContent: 'center',
        }}
      >
        <BaseWrapper>
          <ListTargets />
        </BaseWrapper>
      </BaseWrapper>
    </motion.div>
  );
};
export default IndexView;
