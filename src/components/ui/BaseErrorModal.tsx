import { useTranslation } from 'react-i18next';
import BaseModal from './BaseModal';
import { FC } from 'react';

interface BaseErrorModalProps {
  error: string;
  errors?: string[];
  onClose: () => any;
}

const BaseErrorModal: FC<BaseErrorModalProps> = ({
  error,
  errors,
  onClose,
}) => {
  const { t } = useTranslation();
  return (
    <BaseModal
      open={!!error}
      onClose={onClose}
      center
      title={t('An Error Occurred')}
      content={t(error)}
      baseDialog
      okayButton
      backdropStyle={{ zIndex: 1000 }}
      dialogStyle={{ zIndex: 1001, padding: '0' }}
    >
      <ul>{errors && errors.map((err) => <li key={err}>err</li>)}</ul>
    </BaseModal>
  );
};

export default BaseErrorModal;
