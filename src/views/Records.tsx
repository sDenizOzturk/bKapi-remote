import { BaseWrapper } from 'binak-react-components';
import { FC } from 'react';
import ViewWrapper from '../components/layout/ViewWrapper';
import ListRecords from '../components/record/ListRecords';

const Records: FC = () => {
  return (
    <ViewWrapper>
      <BaseWrapper style={{ minHeight: '60vh' }} mode={['vertical']}>
        <ListRecords />
      </BaseWrapper>
    </ViewWrapper>
  );
};

export default Records;
