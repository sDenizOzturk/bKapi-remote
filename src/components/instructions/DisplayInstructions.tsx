import { FC, useCallback, useEffect, useState } from 'react';
import useError from '../../hooks/useError';
import useLoading from '../../hooks/useLoading';

import { BaseWrapper } from 'binak-react-components';
import AppInstructions from './AppInstructions';
import TelegramInstructions from './TelegramInstructions';
import Rules from './Rules';
import { Instructions } from '../../models/instructions';
import useUrls from '../../hooks/useUrls';

const DisplayInstructions: FC = () => {
  const { setError } = useError();
  const { setLoading } = useLoading();

  const [instructions, setInstructions] = useState<Instructions>();

  const { url } = useUrls();

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(url('instructionsRoot'));
      const responseData = await response.json();

      if (response.status === 200) {
        setInstructions(responseData.instructions);
      } else {
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }, [setError, setLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!instructions) {
    return null;
  }

  return (
    <BaseWrapper mode={['vertical', 'center']} style={{ width: '30rem' }}>
      {instructions.mobileAppEnabled && (
        <AppInstructions instructions={instructions} />
      )}
      {instructions.telegramEnabled && (
        <TelegramInstructions instructions={instructions} />
      )}
      {instructions.rules && <Rules instructions={instructions} />}
    </BaseWrapper>
  );
};
export default DisplayInstructions;
