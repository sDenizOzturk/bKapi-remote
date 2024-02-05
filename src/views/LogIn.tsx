import { FC } from 'react';
import LogIn from '../components/admin/LogIn';
import { BaseWrapper } from 'binak-react-components';
import ViewWrapper from '../components/layout/ViewWrapper';

const LogInView: FC = () => {
  return (
    <ViewWrapper>
      <BaseWrapper style={{ minHeight: '60vh' }} mode={['vertical-center']}>
        <LogIn />
      </BaseWrapper>
    </ViewWrapper>
  );
};
export default LogInView;
