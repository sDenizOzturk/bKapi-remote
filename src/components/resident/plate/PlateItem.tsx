import { FC } from 'react';
import { Plate } from '../../../models/plate';
import BaseCard from '../../ui/BaseCard';
import BaseWrapper from '../../ui/BaseWrapper';
import { HTMLMotionProps } from 'framer-motion';

interface PlateItemProps extends HTMLMotionProps<'div'> {
  plate: Plate;
  onPlateClicked: () => void;
}

const PlateItem: FC<PlateItemProps> = ({ plate, onPlateClicked, ...props }) => {
  return (
    <BaseCard
      {...props}
      style={{ width: '14rem', cursor: 'pointer' }}
      onClick={onPlateClicked}
    >
      <BaseWrapper mode="center align-text-center ">
        <h3 style={{ fontSize: '1.6rem' }}>{plate.plateNumber}</h3>
        <p style={{ fontSize: '1.3rem' }}>{plate.fullname}</p>
      </BaseWrapper>
    </BaseCard>
  );
};
export default PlateItem;
