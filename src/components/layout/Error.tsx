import { useSelector } from 'react-redux';
import BaseErrorModal from '../ui/BaseErrorModal';
import useError from '../../hooks/useError';
import { FC } from 'react';
import { RootState } from '../../store';

const Error: FC = () => {
  const { clearErrors } = useError();

  const error = useSelector((state: RootState) => state.error.error);
  const errors = useSelector((state: RootState) => state.error.errors);

  if (error) {
    return (
      <BaseErrorModal
        error={error}
        errors={errors}
        onClose={() => clearErrors()}
      />
    );
  }

  return null;
};
export default Error;
