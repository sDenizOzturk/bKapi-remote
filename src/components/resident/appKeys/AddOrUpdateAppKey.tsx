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
import { AppKey } from '../../../models/appKey';

interface AddOrUpdateAppKeyProps {
  update?: boolean;
  targetAppKey?: AppKey;
  refetch: () => any;
  token: string;
}

const AddOrUpdateAppKey: FC<AddOrUpdateAppKeyProps> = ({
  update,
  targetAppKey,
  refetch,
  token,
}) => {
  const { t } = useTranslation();

  const { setError, setErrors } = useError();
  const { setLoading } = useLoading();

  const defaultVaules = () => {
    if (!update) return {};
    return targetAppKey;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppKey>({
    mode: 'onTouched',
    defaultValues: defaultVaules(),
  });

  const onSubmit = async (data: AppKey) => {
    setLoading(true);
    try {
      const headers = {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      const body = JSON.stringify(data);

      const response = await fetch(
        update ? urls.updateAppKey + targetAppKey!.fullname : urls.postAppKey,
        {
          method: update ? 'PUT' : 'POST',
          headers,
          body,
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
    setLoading(false);
  };

  const [askForDelete, setAskForDelete] = useState(false);

  const deleteAppKey = async () => {
    setLoading(true);
    try {
      const response = await fetch(urls.deleteAppKey + targetAppKey!.fullname, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token },
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
    setAskForDelete(false);
    setLoading(false);
  };

  return (
    <BaseWrapper mode="vertical">
      <BaseModal
        open={askForDelete}
        title={t('Deleting Application Key...')}
        center
        baseDialog
        onClose={() => setAskForDelete(false)}
        menuItems={
          <>
            <BaseButton mode="outline" onClick={() => setAskForDelete(false)}>
              {t('No')}
            </BaseButton>
            <BaseButton onClick={deleteAppKey}>{t('Yes')}</BaseButton>
          </>
        }
      >
        <h2>{t('Are you sure to delete this application key?')}</h2>
        <BaseWrapper mode="align-right"></BaseWrapper>
      </BaseModal>

      <BaseCard style={{ maxWidth: '18rem', margin: '0' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <BaseFormInput
            id="fullname"
            label={t('Users Fullname')}
            error={errors.fullname}
            register={register('fullname', {
              required: true,
              minLength: 6,
            })}
          />
          <BaseFormInput
            id="appKey"
            label={t('Application Key')}
            error={errors.appKey}
            register={register('appKey', {
              required: true,
              minLength: 6,
              maxLength: 6,
            })}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              (e.target.value = ('' + e.target.value)
                .toLowerCase()
                .replace(' ', ''))
            }
          />
          <BaseFormInput
            id="phoneNumber"
            label={t('Contact Number')}
            register={register('phoneNumber')}
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
export default AddOrUpdateAppKey;
