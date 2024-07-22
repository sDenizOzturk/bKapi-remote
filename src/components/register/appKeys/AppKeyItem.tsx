import { FC } from 'react';
import { BaseWrapper, BaseCard } from 'binak-react-components';
import { AppKey } from '../../../models/appKey';
import { HTMLMotionProps } from 'framer-motion';

interface AppKeyItemProps extends HTMLMotionProps<'div'> {
  appKey: AppKey;
  onAppKeyClicked: () => any;
}

const AppKeyItem: FC<AppKeyItemProps> = ({
  appKey,
  onAppKeyClicked,
  ...props
}) => {
  return (
    <BaseCard
      {...props}
      style={{ width: '14rem', cursor: 'pointer', margin: '0' }}
      onClick={onAppKeyClicked}
    >
      <BaseWrapper mode={['center', 'align-text-center']}>
        <h3 style={{ fontSize: '1.6rem' }}>{appKey.appKey}</h3>
        <p style={{ fontSize: '1.3rem' }}>{appKey.fullname}</p>
      </BaseWrapper>
    </BaseCard>
  );
};
export default AppKeyItem;
