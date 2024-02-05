import { useSelector } from 'react-redux';
import useError from '../../hooks/useError';
import { FC } from 'react';
import { RootState } from '../../store';
import { BaseErrorModal } from 'binak-react-components';
import { useTranslation } from 'react-i18next';

const Error: FC = () => {
  const { clearErrors } = useError();
  const { t } = useTranslation();

  const error = useSelector((state: RootState) => state.error.error);
  const errors = useSelector((state: RootState) => state.error.errors);

  if (error) {
    return (
      <BaseErrorModal
        error={t(error)}
        errors={errors}
        onClose={() => clearErrors()}
        title={t('An Error Occurred')}
      />
    );
  }

  return null;
};
export default Error;
