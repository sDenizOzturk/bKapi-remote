import { useSelector } from 'react-redux';
import BaseLoading from '../ui/BaseLoading';
import { RootState } from '../../store';
import { FC } from 'react';

const Loading: FC = () => {
  const loading = useSelector((state: RootState) => state.loading.loading);

  if (loading) {
    return <BaseLoading />;
  }
  return null;
};
export default Loading;
