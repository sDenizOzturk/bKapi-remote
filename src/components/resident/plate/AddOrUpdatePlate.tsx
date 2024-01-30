import { useTranslation } from 'react-i18next';

import BaseWrapper from '../../ui/BaseWrapper';
import BaseCard from '../../ui/BaseCard';
import BaseFormInput from '../../ui/form/BaseFormInput';
import BaseButton from '../../ui/BaseButton';

import { useForm } from 'react-hook-form';

import urls from '../../../utils/urls';
import { ChangeEvent, FC, useState } from 'react';
import BaseModal from '../../ui/BaseModal';

import useError from '../../../hooks/useError';
import useLoading from '../../../hooks/useLoading';
import { Plate } from '../../../models/plate';

interface AddOrUpdatePlateProps {
  plateType: 'own' | 'guest';
  update?: boolean;
  targetPlate?: Plate;
  refetch: () => any;
  token: string;
}

const AddOrUpdatePlate: FC<AddOrUpdatePlateProps> = ({
  plateType,
  update,
  targetPlate,
  refetch,
  token,
}) => {
  const { t } = useTranslation();

  const { setError, setErrors } = useError();
  const { setLoading } = useLoading();

  const defaultVaules = () => {
    if (!update) return {};
    return targetPlate;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Plate>({
    mode: 'onTouched',
    defaultValues: defaultVaules(),
  });

  const targetUrl = () => {
    if (plateType === 'own') {
      return update
        ? urls.updateOwnPlate + targetPlate!.plateNumber
        : urls.postOwnPlate;
    } else if (plateType === 'guest') {
      return update
        ? urls.updateGuestPlate + targetPlate!.plateNumber
        : urls.postGuestPlate;
    }
    new Error('unkown plate type!');
    return '';
  };

  const onSubmit = async (data: Plate) => {
    setLoading(true);
    try {
      const headers = {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      const body = JSON.stringify(data);

      const response = await fetch(targetUrl(), {
        method: update ? 'PUT' : 'POST',
        headers,
        body,
      });
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
    setLoading(false);
  };

  const [askForDelete, setAskForDelete] = useState(false);

  const deletePlate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        (plateType === 'own' ? urls.deleteOwnPlate : urls.deleteGuestPlate) +
          targetPlate?.plateNumber,
        {
          method: 'DELETE',
          headers: { Authorization: 'Bearer ' + token },
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
    <BaseWrapper mode="vertical">
      <BaseModal
        open={askForDelete}
        title={t('Deleting Plate...')}
        center
        baseDialog
        onClose={() => setAskForDelete(false)}
        menuItems={
          <>
            <BaseButton mode="outline" onClick={() => setAskForDelete(false)}>
              {t('No')}
            </BaseButton>
            <BaseButton onClick={deletePlate}>{t('Yes')}</BaseButton>
          </>
        }
      >
        <h2>{t('Are you sure to delete this plate?')}</h2>
        <BaseWrapper mode="align-right"></BaseWrapper>
      </BaseModal>

      <BaseCard style={{ maxWidth: '18rem', margin: '0' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <BaseFormInput
            id="fullname"
            label={t('Drivers Fullname')}
            error={errors.fullname}
            register={register('fullname', {
              required: true,
              minLength: 6,
            })}
          />
          <BaseFormInput
            id="plateNumber"
            label={t('Plate Number')}
            error={errors.plateNumber}
            register={register('plateNumber', {
              required: true,
              minLength: 5,
            })}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              (e.target.value = ('' + e.target.value).toUpperCase())
            }
          />
          <BaseFormInput
            id="info"
            label={t('Vehicle Information')}
            register={register('info')}
          />
          <BaseFormInput
            id="phoneNumber"
            label={t('Contact Number')}
            register={register('phoneNumber')}
          />
          <BaseFormInput
            id="smsNumber"
            label={
              t('Mobile Numbers To Send SMS') +
              ' (' +
              t(
                "If there is more than one value, put commas (',') between the numbers."
              ) +
              ')'
            }
            register={register('smsNumber')}
          />
          <BaseFormInput
            id="telegramId"
            label={
              t('Telegram IDs') +
              ' (' +
              t(
                "If there is more than one value, put commas (',') between the numbers."
              ) +
              ')'
            }
            register={register('telegramId')}
          />
          <BaseWrapper mode="align-right">
            <BaseButton type="submit">
              {update ? t('Edit') : t('Add')}
            </BaseButton>
            <BaseButton
              type="button"
              mode="outline"
              onClick={() => setAskForDelete(true)}
            >
              {t('Delete')}
            </BaseButton>
          </BaseWrapper>
        </form>
      </BaseCard>
    </BaseWrapper>
  );
};
export default AddOrUpdatePlate;
