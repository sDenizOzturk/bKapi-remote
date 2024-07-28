import { FC } from 'react';
import { Plate } from '../../../models/plate';
import { BaseWrapper, BaseCard } from 'binak-react-components';
import { HTMLMotionProps } from 'framer-motion';
import DeleteIcon from '../../ui/DeleteIcon';

interface PlateItemProps extends HTMLMotionProps<'div'> {
  plate: Plate;
  onPlateClicked: () => void;
  onDeleteKeyClicked: () => void;
}

const PlateItem: FC<PlateItemProps> = ({
  plate,
  onPlateClicked,
  onDeleteKeyClicked,
  ...props
}) => {
  return (
    <BaseCard
      {...props}
      style={{ width: '14rem', cursor: 'pointer', margin: '0' }}
      onClick={onPlateClicked}
    >
      <BaseWrapper
        mode={['center', 'align-text-center']}
        style={{ position: 'relative' }}
      >
        <DeleteIcon onClick={() => onDeleteKeyClicked()} />
        <h3 style={{ fontSize: '1.6rem' }}>{plate.plateNumber}</h3>
        <p style={{ fontSize: '1.3rem' }}>{plate.fullname}</p>
      </BaseWrapper>
    </BaseCard>
  );
};
export default PlateItem;
