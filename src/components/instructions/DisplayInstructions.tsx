import { FC, useCallback, useEffect, useState } from 'react';
import useError from '../../hooks/useError';
import useLoading from '../../hooks/useLoading';

import urls from '../../utils/urls';
import BaseWrapper from '../ui/BaseWrapper';
import AppInstructions from './AppInstructions';
import TelegramInstructions from './TelegramInstructions';
import Rules from './Rules';
import { Instructions } from '../../models/instructions';

const DisplayInstructions: FC = () => {
  const { setError } = useError();
  const { setLoading } = useLoading();

  const [instructions, setInstructions] = useState<Instructions>();

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(urls.instructionsRoot);
      const responseData = await response.json();

      if (response.status === 200) {
        setInstructions(responseData.instructions);
      } else {
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch, try later.');
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
    <BaseWrapper mode="vertical center" style={{ width: '30rem' }}>
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
