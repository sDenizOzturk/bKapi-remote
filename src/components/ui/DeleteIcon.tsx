import { FC, useState } from 'react';

import deleteIcon from '../../assets/delete_icon.svg';
import { BaseButton } from 'binak-react-components';

interface DeleteIconProps {
  onClick: () => void;
}

const DeleteIcon: FC<DeleteIconProps> = ({ onClick }) => {
  const [isDeleteIconHovered, setIsDeleteIconHovered] = useState(false);
  return (
    <BaseButton
      style={{
        padding: '0rem 0.5rem',
        margin: '-1.5rem -1rem',
        right: '0',
        top: '0',
        position: 'absolute',
      }}
      mode="text"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <img
        src={deleteIcon}
        alt="delete"
        style={{
          height: isDeleteIconHovered ? '1.1rem' : '1rem',
        }}
        onMouseEnter={() => setIsDeleteIconHovered(true)}
        onMouseLeave={() => setIsDeleteIconHovered(false)}
      />
    </BaseButton>
  );
};

export default DeleteIcon;
