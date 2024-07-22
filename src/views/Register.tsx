import { BaseButton, BaseWrapper } from 'binak-react-components';
import ListPlates from '../components/register/plate/ListPlates';

import { useParams } from 'react-router';
import { FC, useState } from 'react';

import useLoading from '../hooks/useLoading';
import ListAppKeys from '../components/register/appKeys/ListAppKeys';
import DisplayInstructions from '../components/instructions/DisplayInstructions';
import ViewWrapper from '../components/layout/ViewWrapper';
import { useTranslation } from 'react-i18next';

interface LinkViewProps {
  mode: 'permanent' | 'temporary';
}

const LinkView: FC<LinkViewProps> = ({ mode }) => {
  const { token } = useParams();
  const [isOwnPlatesLoading, setOwnPlatesLoading] = useState(false);
  const [isGuestPlatesLoading, setGuestPlatesLoading] = useState(false);
  const [isAppKeysLoading, setAppKeysLoading] = useState(false);

  const { setLoading } = useLoading();
  setLoading(isOwnPlatesLoading || isGuestPlatesLoading || isAppKeysLoading);

  const [showInstructions, setShowInstructions] = useState(false);

  const { t } = useTranslation();

  return (
    <ViewWrapper>
      <BaseWrapper
        mode={['vertical']}
        style={{ padding: '1rem', minHeight: '60vh' }}
      >
        <ListPlates
          plateType="own"
          token={token!}
          setLoading={setOwnPlatesLoading}
          mode={mode}
        />
        <ListPlates
          plateType="guest"
          token={token!}
          setLoading={setGuestPlatesLoading}
          mode={mode}
        />
        <ListAppKeys
          token={token!}
          setLoading={setAppKeysLoading}
          mode={mode}
        />

        <BaseWrapper mode={['center']} style={{ marginTop: '1rem' }}>
          <BaseButton onClick={() => setShowInstructions(!showInstructions)}>
            {showInstructions ? t('Hide instructions') : t('Show instructions')}
          </BaseButton>
        </BaseWrapper>
        {showInstructions && <DisplayInstructions />}
      </BaseWrapper>
    </ViewWrapper>
  );
};
export default LinkView;
