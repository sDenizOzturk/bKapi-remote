import { FC, useCallback, useEffect, useState } from 'react';
import { BaseWrapper, BaseButton, BaseModal } from 'binak-react-components';
import AddOrUpdatePlate from './AddOrUpdatePlate';
import { useTranslation } from 'react-i18next';

import urls from '../../../utils/urls';
import PlateItem from './PlateItem';
import useError from '../../../hooks/useError';
import { Plate } from '../../../models/plate';
import { bounce } from '../../../utils/animationVariants';

interface ListPlatesProps {
  token: string;
  plateType: 'own' | 'guest';
  setLoading: (arg0: boolean) => any;
}

const ListPlates: FC<ListPlatesProps> = ({ token, plateType, setLoading }) => {
  const { t } = useTranslation();

  const { setError } = useError();

  const [showAddPlate, setShowAddPlate] = useState(false);
  const [updatingPlate, setUpdatingPlate] = useState<Plate>();

  const [plates, setPlates] = useState<Plate[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const url =
        plateType === 'own' ? urls.listOwnPlates : urls.listGuestPlates;

      const response = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const responseData = await response.json();

      if (response.status === 200) {
        setPlates(responseData.plates);
      } else {
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch, try later.');
    }
    setLoading(false);
  }, [plateType, setError, setLoading, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <BaseModal open={showAddPlate} onClose={() => setShowAddPlate(false)}>
        <AddOrUpdatePlate
          plateType={plateType}
          refetch={() => {
            setShowAddPlate(false);
            fetchData();
          }}
          token={token}
        />
      </BaseModal>

      <BaseModal
        open={!!updatingPlate}
        onClose={() => setUpdatingPlate(undefined)}
      >
        <AddOrUpdatePlate
          plateType={plateType}
          update
          targetPlate={updatingPlate}
          refetch={() => {
            setUpdatingPlate(undefined);
            fetchData();
          }}
          token={token}
        />
      </BaseModal>

      <BaseWrapper mode={['vertical', 'center']}>
        <BaseWrapper mode={['horizontal']}>
          <h1>
            {plateType === 'own'
              ? t("Residents' Vehicles")
              : t("Guests' Vehicles")}
          </h1>
          <BaseButton mode="outline" onClick={() => setShowAddPlate(true)}>
            {t('Add')}
          </BaseButton>
        </BaseWrapper>
      </BaseWrapper>

      <BaseWrapper mode={['grid-2', 'center', 'gap-2rem']}>
        {plates.map((plate: Plate) => (
          <PlateItem
            whileHover={bounce.s.scale}
            transition={bounce.m.transition}
            key={plate.plateNumber}
            plate={plate}
            onPlateClicked={() => setUpdatingPlate(plate)}
          />
        ))}
      </BaseWrapper>
    </>
  );
};
export default ListPlates;
