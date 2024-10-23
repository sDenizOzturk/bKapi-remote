import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

import useError from '../../hooks/useError';
import useLoading from '../../hooks/useLoading';
import { RootState } from '../../store';
import { BaseWrapper, BaseFormInput, BaseButton } from 'binak-react-components';
import useRoutes from '../../hooks/useRoutes';
import useUrls from '../../hooks/useUrls';

interface CreateLinkProps {
  refetch: () => void;
  setCurrentPage: (arg0: number) => void;
  setDisplayingLink: (link: string, doorNumber: string) => void;
  mode: 'createPermanent' | 'createTemporary' | 'search';
}

interface CreateLinkForm {
  doorNumber: string;
}

const CreateLink: FC<CreateLinkProps> = ({
  refetch,
  setCurrentPage,
  setDisplayingLink,
  mode,
}) => {
  if (mode !== 'createPermanent' && mode !== 'createTemporary') {
    return <></>;
  }
  const { t } = useTranslation();
  const token = useSelector((state: RootState) => state.auth.token);

  const { setError } = useError();
  const { setLoading } = useLoading();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { route } = useRoutes();

  const { url } = useUrls();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLinkForm>({ mode: 'onTouched' });

  const onSubmit = async (data: CreateLinkForm) => {
    setLoading(true);
    try {
      const response = await fetch(url('createLink'), {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token.token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doorNumber: data.doorNumber,
          type: mode === 'createPermanent' ? 'permanent' : 'temporary',
        }),
      });
      const responseData = await response.json();

      setDisplayingLink(responseData.link, responseData.doorNumber);
      if (response.status === 200) {
        if (mode === 'createPermanent') {
          setCurrentPage(responseData.currentPage);
          refetch();
        }
      } else {
        if (response.status === 401) {
          dispatch(authActions.logout());
          navigate(route('auth'));
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
          {mode === 'createTemporary' && t('Create Temporary Link')}
          {mode === 'createPermanent' && t('Create Permanent Link')}
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
        </BaseWrapper>
      </form>
    </>
  );
};
export default CreateLink;
