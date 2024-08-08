import logoImage from '../../assets/logo.webp';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { authActions } from '../../store/auth';
import routes from '../../utils/routes';
import { FC } from 'react';
import { RootState } from '../../store';
import { isTokenValid } from '../../utils/utils';
import { BaseFooter } from 'binak-react-components';

const Footer: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);
  const tokenValid = isTokenValid(token);

  return (
    <BaseFooter
      leftContent={
        tokenValid && (
          <NavLink
            to={routes.admin.logIn}
            onClick={() => dispatch(authActions.logout())}
          >
            {t('Log Out')}
          </NavLink>
        )
      }
      rightContent={
        <a
          style={{ border: 'none' }}
          href="https://binakybs.com"
          target="_blank"
          rel="noreferrer"
        >
          <img src={logoImage} alt="" />
        </a>
      }
    />
  );
};
export default Footer;
