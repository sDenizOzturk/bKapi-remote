import { FC, useState } from 'react';
import { Household } from '../../models/household';
import { HTMLMotionProps } from 'framer-motion';
import {
  BaseButton,
  BaseCard,
  BaseModal,
  BaseWrapper,
} from 'binak-react-components';
import { useTranslation } from 'react-i18next';

import useError from '../../hooks/useError';
import useLoading from '../../hooks/useLoading';
import urls from '../../utils/urls';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import routes from '../../utils/routes';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../ui/DeleteIcon';

interface HouseholdItemProps extends HTMLMotionProps<'div'> {
  household: Household;
  refetch: () => void;
}

const HouseholdItem: FC<HouseholdItemProps> = ({
  household,
  refetch,
  ...props
}) => {
  const { t } = useTranslation();

  const { setError, setErrors } = useError();
  const { setLoading } = useLoading();

  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.auth.token);

  const [askForDelete, setAskForDelete] = useState(false);
  const deleteHousehold = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        urls.deleteHousehold + household!.doorNumber,
        {
          method: 'DELETE',
          headers: { Authorization: 'Bearer ' + token.token },
        }
      );
      const responseData = await response.json();

      if (response.status === 200) {
        refetch();
      } else {
        setErrors(responseData.data);
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      console.log(err);
      setError(err.message || 'Failed, try later.');
    }
    setAskForDelete(false);
    setLoading(false);
  };

  return (
    <>
      <BaseCard
        {...props}
        style={{ width: '14rem', cursor: 'pointer', margin: '0' }}
        onClick={() =>
          navigate(
            routes.household.addUpdate.replace(
              ':doorNumber',
              household.doorNumber
            )
          )
        }
      >
        <BaseWrapper style={{ position: 'relative' }}>
          <DeleteIcon onClick={() => setAskForDelete(true)} />
          <h3 style={{ fontSize: '1.6rem', textAlign: 'center' }}>
            {household.doorNumber}
          </h3>
        </BaseWrapper>
      </BaseCard>

      <BaseModal
        open={askForDelete}
        title={t('Deleting Household...')}
        center
        baseDialog
        onClose={() => setAskForDelete(false)}
        menuItems={
          <>
            <BaseButton mode="outline" onClick={() => setAskForDelete(false)}>
              {t('No')}
            </BaseButton>
            <BaseButton onClick={deleteHousehold}>{t('Yes')}</BaseButton>
          </>
        }
      >
        <h2>
          {t(
            'Are you sure to delete this household? All the plates and keys under this household will be deleted!'
          )}
        </h2>
        <BaseWrapper mode={['align-right']}></BaseWrapper>
      </BaseModal>
    </>
  );
};

export default HouseholdItem;
