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
import { BaseWrapper, BaseFormInput, BaseButton } from 'binak-react-components';

interface CreateLinkProps {
  refetch: () => void;
  setCurrentPage: (arg0: number) => void;
  setDisplayingLink: (link: string, doorNumber: string) => void;
}

interface CreateLinkForm {
  doorNumber: string;
}

const CreateLink: FC<CreateLinkProps> = ({
  refetch,
  setCurrentPage,
  setDisplayingLink,
}) => {
  const { t } = useTranslation();
  const token = useSelector((state: RootState) => state.auth.token);

  const { setError } = useError();
  const { setLoading } = useLoading();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'permanent' | 'temporary'>('permanent');

  const {
    register,
    handleSubmit,
    reset,
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
          type: mode,
        }),
      });
      const responseData = await response.json();

      setDisplayingLink(responseData.link, responseData.doorNumber);
      if (response.status === 200) {
        if (mode === 'permanent') {
          setCurrentPage(responseData.currentPage);
          refetch();
        }
      } else {
        if (response.status === 401) {
          dispatch(authActions.logout());
          navigate(routes.admin.logIn);
        }
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate, try later.');
    }
    reset();
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>
          {mode === 'temporary' && t('Create Temporary Link')}
          {mode === 'permanent' && t('Create Permanent Link')}
        </h2>
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
          <BaseButton
            mode="flat"
            type="button"
            onClick={() =>
              setMode(mode === 'permanent' ? 'temporary' : 'permanent')
            }
          >
            {t(mode === 'permanent' ? 'Create Temporary' : 'Create Permanent')}
          </BaseButton>
        </BaseWrapper>
      </form>
    </>
  );
};
export default CreateLink;
