import { FC } from 'react';
import BaseWrapper from '../components/ui/BaseWrapper';
import ViewWrapper from '../components/layout/ViewWrapper';
import DisplayInstructions from '../components/instructions/DisplayInstructions';

const LogInView: FC = () => {
  return (
    <ViewWrapper>
      <BaseWrapper style={{ minHeight: '60vh' }} mode="vertical-center">
        <DisplayInstructions />
      </BaseWrapper>
    </ViewWrapper>
  );
};
export default LogInView;
