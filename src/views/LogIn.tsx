import { FC } from 'react';
import LogIn from '../components/admin/LogIn';
import BaseWrapper from '../components/ui/BaseWrapper';
import ViewWrapper from '../components/layout/ViewWrapper';

const LogInView: FC = () => {
  return (
    <ViewWrapper>
    <BaseWrapper style={{ minHeight: '60vh' }} mode="vertical-center">
      <LogIn />
    </BaseWrapper>
    </ViewWrapper>
  );
};
export default LogInView;
