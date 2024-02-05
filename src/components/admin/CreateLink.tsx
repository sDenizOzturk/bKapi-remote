import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import { FC, useState } from 'react';

import routes from '../../utils/routes';
import urls from '../../utils/urls';
import useError from '../../hooks/useError';
import useLoading from '../../hooks/useLoading';
import { RootState } from '../../store';
import {
  BaseModal,
  BaseWrapper,
  BaseCard,
  BaseFormInput,
  BaseButton,
} from 'binak-react-components';

interface CreateLinkForm {
  doorNumber: string;
}

const CreateLink: FC = () => {
  const { t } = useTranslation();
  const token = useSelector((state: RootState) => state.auth.token);

  const { setError } = useError();
  const { setLoading } = useLoading();

  const [link, setLink] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLinkForm>({ mode: 'onTouched' });

  const onSubmit = async (data: CreateLinkForm) => {
    setLoading(true);
    try {
      const response = await fetch(urls.createLink, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token.token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doorNumber: data.doorNumber,
        }),
      });
      const responseData = await response.json();

      if (response.status === 200) {
        setLink(responseData.link);
        try {
          await navigator.clipboard.writeText(responseData.link);
          setDialogTitle(
            t('Link is copied to clipboard') + ' - ' + data.doorNumber
          );
        } catch (err) {
          console.log('Link can not be copied to clipboard', err);
          setDialogTitle(t('Link is created') + ' - ' + data.doorNumber);
        }
      } else {
        if (response.status === 401 || response.status === 500) {
          dispatch(authActions.logout());
          navigate(routes.admin.logIn);
        }
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate, try later.');
    }

    setLoading(false);
  };

  return (
    <>
      <BaseModal
        open={!!link}
        onClose={() => {
          setLink('');
          setDialogTitle('');
        }}
        center
        title={dialogTitle}
        content={link}
        baseDialog
        okayButton={t('Okay')}
      />
      <BaseCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>{t('Create Link')}</h2>
          <BaseFormInput
            id="doorNumber"
            label={t('Door Number')}
            error={errors.doorNumber}
            register={register('doorNumber', {
              required: true,
              maxLength: 20,
            })}
            errorMessage={t('Please enter a valid door number')}
          />
          <BaseWrapper mode={['align-right']}>
            <BaseButton type="submit">{t('Create')}</BaseButton>
          </BaseWrapper>
        </form>
      </BaseCard>
    </>
  );
};
export default CreateLink;
