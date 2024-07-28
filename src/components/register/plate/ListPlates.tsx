import { FC, useCallback, useEffect, useState } from 'react';
import {
  BaseWrapper,
  BaseButton,
  BaseModal,
  BaseCard,
} from 'binak-react-components';
import AddOrUpdatePlate from './AddOrUpdatePlate';
import { useTranslation } from 'react-i18next';

import urls from '../../../utils/urls';
import PlateItem from './PlateItem';
import useError from '../../../hooks/useError';
import { Plate } from '../../../models/plate';
import { bounce } from '../../../utils/animationVariants';
import routes from '../../../utils/routes';
import { useNavigate, useParams } from 'react-router-dom';
import { UserType } from '../../../models/userType';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface ListPlatesProps {
  plateType: 'own' | 'guest';
  userType: UserType;
  setLoading: (arg0: boolean) => any;
}

const ListPlates: FC<ListPlatesProps> = ({
  plateType,
  userType,
  setLoading,
}) => {
  const { t } = useTranslation();

  let token = '';
  let doorNumber = '';
  if (userType === 'admin') {
    token = useSelector((state: RootState) => state.auth.token).token;
    doorNumber = useParams().doorNumber as string;
  } else {
    token = useParams().token as string;
  }

  const { setError, setErrors } = useError();

  const [showAddPlate, setShowAddPlate] = useState(false);
  const [updatingPlate, setUpdatingPlate] = useState<Plate>();

  const [plates, setPlates] = useState<Plate[]>([]);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const url =
        (plateType === 'own' ? urls.listOwnPlates : urls.listGuestPlates) +
        (doorNumber
          ? '?' +
            new URLSearchParams({
              doorNumber,
            })
          : '');

      console.log(url);

      const response = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + token,
          UserType: userType,
        },
      });
      const responseData = await response.json();

      if (response.status === 200) {
        setPlates(responseData.plates);
      } else {
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message);
      navigate(routes.instructions.root);
    }
    setLoading(false);
  }, [plateType, setError, setLoading, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [askedForDelete, setAskedForDelete] = useState<Plate | undefined>(
    undefined
  );

  const deletePlate = async () => {
    setLoading(true);
    try {
      const url =
        (plateType === 'own' ? urls.deleteOwnPlate : urls.deleteGuestPlate) +
        askedForDelete?.plateNumber +
        (doorNumber
          ? '?' +
            new URLSearchParams({
              doorNumber,
            })
          : '');
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token, UserType: userType },
      });
      const responseData = await response.json();

      if (response.status === 200) {
        fetchData();
      } else {
        setErrors(responseData.data);
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      console.log(err);
      setError(err.message || 'Failed, try later.');
    }
    setAskedForDelete(undefined);
    setLoading(false);
  };

  return (
    <>
      <BaseModal open={showAddPlate} onClose={() => setShowAddPlate(false)}>
        <AddOrUpdatePlate
          plateType={plateType}
          refetch={() => {
            setShowAddPlate(false);
            fetchData();
          }}
          userType={userType}
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
          userType={userType}
          setAskedForDelete={() => {
            setAskedForDelete(updatingPlate);
            setUpdatingPlate(undefined);
          }}
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

      <BaseWrapper
        mode={['center']}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          maxWidth: '40rem',
        }}
      >
        {plates.map((plate: Plate) => (
          <PlateItem
            whileHover={bounce.s.scale}
            transition={bounce.m.transition}
            key={plate.plateNumber}
            plate={plate}
            onPlateClicked={() => setUpdatingPlate(plate)}
            onDeleteKeyClicked={() => setAskedForDelete(plate)}
          />
        ))}

        {plates.length === 0 && (
          <BaseCard style={{ margin: '-0.5rem' }}>
            {t('No vehicles added')}
          </BaseCard>
        )}
      </BaseWrapper>

      <BaseModal
        open={!!askedForDelete}
        title={t('Deleting Plate...')}
        center
        baseDialog
        onClose={() => setAskedForDelete(undefined)}
        menuItems={
          <>
            <BaseButton
              mode="outline"
              onClick={() => setAskedForDelete(undefined)}
            >
              {t('No')}
            </BaseButton>
            <BaseButton onClick={deletePlate}>{t('Yes')}</BaseButton>
          </>
        }
      >
        <h2>{t('Are you sure to delete this plate?')}</h2>
        <BaseWrapper mode={['align-right']}></BaseWrapper>
      </BaseModal>
    </>
  );
};
export default ListPlates;
