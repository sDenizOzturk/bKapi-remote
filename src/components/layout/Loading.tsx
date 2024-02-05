import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FC } from 'react';
import { BaseLoading } from 'binak-react-components';

const Loading: FC = () => {
  const loading = useSelector((state: RootState) => state.loading.loading);

  if (loading) {
    return <BaseLoading />;
  }
  return null;
};
export default Loading;
