import BaseSpinner from './BaseSpinner';
import modalClasses from './BaseModal.module.css';
import { FC } from 'react';

const BaseLoading: FC = () => {
  return (
    <div className={modalClasses.backdrop} style={{ zIndex: '1000' }}>
      <BaseSpinner />
    </div>
  );
};
export default BaseLoading;
