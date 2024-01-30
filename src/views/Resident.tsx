import BaseWrapper from '../components/ui/BaseWrapper';
import ListPlates from '../components/resident/plate/ListPlates';

import { useParams } from 'react-router';
import { FC, useState } from 'react';

import useLoading from '../hooks/useLoading';
import ListAppKeys from '../components/resident/appKeys/ListAppKeys';
import DisplayInstructions from '../components/instructions/DisplayInstructions';
import ViewWrapper from '../components/layout/ViewWrapper';

const ResidentView: FC = () => {
  const { token } = useParams();
  const [isOwnPlatesLoading, setOwnPlatesLoading] = useState(false);
  const [isGuestPlatesLoading, setGuestPlatesLoading] = useState(false);
  const [isAppKeysLoading, setAppKeysLoading] = useState(false);

  const { setLoading } = useLoading();
  setLoading(isOwnPlatesLoading || isGuestPlatesLoading || isAppKeysLoading);

  if (!token) Error('No token provided');

  return (
    <ViewWrapper>
      <BaseWrapper
        mode="vertical"
        style={{ padding: '1rem', minHeight: '60vh' }}
      >
        <ListPlates
          plateType="own"
          token={token!}
          setLoading={setOwnPlatesLoading}
        />
        <ListPlates
          plateType="guest"
          token={token!}
          setLoading={setGuestPlatesLoading}
        />
        <ListAppKeys token={token!} setLoading={setAppKeysLoading} />
        <DisplayInstructions />
      </BaseWrapper>
    </ViewWrapper>
  );
};
export default ResidentView;
