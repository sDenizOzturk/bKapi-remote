import {
  BaseWrapper,
  BaseCard,
  BaseButton,
  BaseFormInput,
} from 'binak-react-components';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import urls from '../../utils/urls';
import routes from '../../utils/routes';

import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import useError from '../../hooks/useError';
import useLoading from '../../hooks/useLoading';
import { FC } from 'react';

interface LogInForm {
  password: string;
}

const LogIn: FC = () => {
  const { setError } = useError();
  const { setLoading } = useLoading();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInForm>({ mode: 'onTouched' });

  const onSubmit = async (data: LogInForm) => {
    setLoading(true);

    try {
      const response = await fetch(urls.logInAdmin, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: data.password,
        }),
      });
      const responseData = await response.json();

      if (response.status === 200) {
        dispatch(authActions.login(responseData.token));
        navigate(routes.admin.createLink);
      } else {
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate, try later.');
      dispatch(authActions.logout());
    }

    setLoading(false);
  };

  return (
    <>
      <BaseCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>{t('Admin Log In')}</h2>
          <BaseFormInput
            id="password"
            label={t('Password')}
            type="password"
            error={errors.password}
            register={register('password', {
              required: true,
              minLength: 6,
              maxLength: 80,
            })}
            errorMessage={t('Please enter a valid password')}
          />
          <BaseWrapper mode={['align-right']}>
            <BaseButton type="submit">{t('Log In')}</BaseButton>
          </BaseWrapper>
        </form>
      </BaseCard>
    </>
  );
};
export default LogIn;
