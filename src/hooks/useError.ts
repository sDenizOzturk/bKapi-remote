import { useDispatch } from 'react-redux';
import { errorActions } from '../store/error';
import { useCallback } from 'react';

const useError = () => {
  const dispatch = useDispatch();

  const setError = useCallback(
    (error: string) => {
      dispatch(errorActions.setError(error));
    },
    [dispatch]
  );

  const setErrors = useCallback(
    (errors: string[]) => {
      dispatch(errorActions.setErrors(errors));
    },
    [dispatch]
  );

  const clearErrors = useCallback(() => {
    dispatch(errorActions.clearErrors());
  }, [dispatch]);

  return { setError, setErrors, clearErrors };
};
export default useError;
