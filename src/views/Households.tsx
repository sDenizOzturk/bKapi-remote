import { FC } from 'react';
import ListHouseholds from '../components/household/ListHouseholds';
import { BaseWrapper } from 'binak-react-components';
import ViewWrapper from '../components/layout/ViewWrapper';

const LogInView: FC = () => {
  return (
    <ViewWrapper>
      <BaseWrapper style={{ minHeight: '60vh' }} mode={['vertical']}>
        <ListHouseholds />
      </BaseWrapper>
    </ViewWrapper>
  );
};
export default LogInView;
