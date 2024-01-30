import { useDispatch } from 'react-redux';
import { loadingActions } from '../store/loading';
import { useCallback } from 'react';

const useError = () => {
  const dispatch = useDispatch();

  const setLoading = useCallback(
    (loading: boolean) => {
      dispatch(loadingActions.setLoading(loading));
    },
    [dispatch]
  );

  return { setLoading };
};
export default useError;
