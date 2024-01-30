import { FC, useCallback, useEffect, useState } from 'react';
import BaseButton from '../../ui/BaseButton';
import BaseModal from '../../ui/BaseModal';
import BaseWrapper from '../../ui/BaseWrapper';
import AddOrUpdateAppKey from './AddOrUpdateAppKey';
import { useTranslation } from 'react-i18next';

import urls from '../../../utils/urls';
import AppKeyItem from './AppKeyItem';
import useError from '../../../hooks/useError';
import { AppKey } from '../../../models/appKey';
import { bounce } from '../../../utils/animationVariants';

interface ListAppKeysProps {
  token: string;
  setLoading: (arg0: boolean) => any;
}

const ListAppKeys: FC<ListAppKeysProps> = ({ token, setLoading }) => {
  const { t } = useTranslation();

  const { setError } = useError();

  const [showAddAppKey, setShowAddAppKey] = useState(false);
  const [updatingAppKey, setUpdatingAppKey] = useState<AppKey | undefined>(
    undefined
  );

  const [appKeys, setAppKeys] = useState<AppKey[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(urls.listAppKeys, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const responseData = await response.json();

      if (response.status === 200) {
        setAppKeys(responseData.appKeys);
      } else {
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch, try later.');
    }
    setLoading(false);
  }, [setError, setLoading, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <BaseModal open={showAddAppKey} onClose={() => setShowAddAppKey(false)}>
        <AddOrUpdateAppKey
          refetch={() => {
            setShowAddAppKey(false);
            fetchData();
          }}
          token={token}
        />
      </BaseModal>

      <BaseModal
        open={!!updatingAppKey}
        onClose={() => setUpdatingAppKey(undefined)}
      >
        <AddOrUpdateAppKey
          update
          targetAppKey={updatingAppKey}
          refetch={() => {
            setUpdatingAppKey(undefined);
            fetchData();
          }}
          token={token}
        />
      </BaseModal>

      <BaseWrapper mode="vertical center">
        <BaseWrapper mode="horizontal">
          <h1>{t('Application Keys')}</h1>
          <BaseButton mode="outline" onClick={() => setShowAddAppKey(true)}>
            {t('Add')}
          </BaseButton>
        </BaseWrapper>
      </BaseWrapper>

      <BaseWrapper mode="grid-2 center gap-2rem">
        {appKeys.map((appKey: AppKey) => (
          <AppKeyItem
            whileHover={bounce.s.scale}
            transition={bounce.m.transition}
            key={appKey.appKey}
            appKey={appKey}
            onAppKeyClicked={() => setUpdatingAppKey(appKey)}
          />
        ))}
      </BaseWrapper>
    </>
  );
};
export default ListAppKeys;
