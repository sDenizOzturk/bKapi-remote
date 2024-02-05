import { FC } from 'react';
import CreateLink from '../components/admin/CreateLink';
import { BaseWrapper } from 'binak-react-components';
import ViewWrapper from '../components/layout/ViewWrapper';

const CreateLinkView: FC = () => {
  return (
    <ViewWrapper>
      <BaseWrapper style={{ minHeight: '60vh' }} mode={['vertical-center']}>
        <CreateLink />
      </BaseWrapper>
    </ViewWrapper>
  );
};
export default CreateLinkView;
