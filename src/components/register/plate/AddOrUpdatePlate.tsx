import { useTranslation } from 'react-i18next';

import {
  BaseWrapper,
  BaseCard,
  BaseButton,
  BaseFormInput,
  BaseModal,
} from 'binak-react-components';

import { useForm } from 'react-hook-form';

import urls from '../../../utils/urls';
import { ChangeEvent, FC, useState } from 'react';

import useError from '../../../hooks/useError';
import useLoading from '../../../hooks/useLoading';
import { Plate } from '../../../models/plate';
import { UserType } from '../../../models/userType';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useParams } from 'react-router-dom';

interface AddOrUpdatePlateProps {
  plateType: 'own' | 'guest';
  update?: boolean;
  targetPlate?: Plate;
  refetch: () => void;
  userType: UserType;
  setAskedForDelete?: () => void;
}

const AddOrUpdatePlate: FC<AddOrUpdatePlateProps> = ({
  plateType,
  update,
  targetPlate,
  refetch,
  userType,
  setAskedForDelete,
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
        UserType: userType,
      };

      const body = JSON.stringify(data);
      const url =
        targetUrl() +
        (doorNumber
          ? '?' +
            new URLSearchParams({
              doorNumber,
            })
          : '');

      const response = await fetch(url, {
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

  return (
    <BaseWrapper mode={['vertical']}>
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
            errorMessage={t('Please enter a valid fullname')}
          />
          <BaseFormInput
            id="plateNumber"
            label={t('Plate Number')}
            error={errors.plateNumber}
            register={register('plateNumber', {
              required: true,
              minLength: 5,
              validate: (value) => !value.includes(' '),
            })}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              (e.target.value = ('' + e.target.value).toUpperCase())
            }
            errorMessage={t('Please enter a valid plate number')}
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
          <BaseWrapper mode={['align-right']}>
            <BaseButton type="submit">
              {update ? t('Edit') : t('Add')}
            </BaseButton>
            {update && setAskedForDelete && (
              <BaseButton
                type="button"
                mode="outline"
                onClick={setAskedForDelete}
              >
                {t('Delete')}
              </BaseButton>
            )}
          </BaseWrapper>
        </form>
      </BaseCard>
    </BaseWrapper>
  );
};
export default AddOrUpdatePlate;
