import { FC } from 'react';
import { BaseWrapper } from 'binak-react-components';
import ViewWrapper from '../components/layout/ViewWrapper';
import ListPermantLinks from '../components/link/ListPermanentLinks';

const CreateLinkView: FC = () => {
  return (
    <ViewWrapper>
      <BaseWrapper style={{ minHeight: '60vh' }} mode={['vertical']}>
        <ListPermantLinks />
      </BaseWrapper>
    </ViewWrapper>
  );
};
export default CreateLinkView;
