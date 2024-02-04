import classes from './Header.module.css';

import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../utils/routes';
import { FC } from 'react';
import { RootState } from '../../store';
import { isTokenValid } from '../../utils/utils';

const languages = [
  { lang: 'tr', label: 'Türkçe' },
  { lang: 'en', label: 'English' },
  { lang: 'ru', label: 'Русский' },
];

const Header: FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.auth.token);
  const tokenValid = isTokenValid(token);

  const adminRoutes = [{ to: routes.admin.createLink, text: t('Create Link') }];
  const defaultRoutes = [
    { to: routes.instructions.root, text: t('Instructions') },
  ];
  return (
    <header>
      <nav>
        <ul>
          <li>
            {!tokenValid && (
              <NavLink
                className={({ isActive }) => (isActive ? classes.active : '')}
                to={routes.admin.logIn}
              >
                {t('Log In')}
              </NavLink>
            )}
            {tokenValid &&
              adminRoutes.map((route) => (
                <NavLink
                  key={route.text}
                  className={({ isActive }) => (isActive ? classes.active : '')}
                  to={route.to}
                >
                  {route.text}
                </NavLink>
              ))}
            {defaultRoutes.map((route) => (
              <NavLink
                key={route.text}
                className={({ isActive }) => (isActive ? classes.active : '')}
                to={route.to}
              >
                {route.text}
              </NavLink>
            ))}
          </li>
        </ul>
        <ul>
          {languages.map((language) => (
            <li key={language.lang}>
              <button
                className={
                  i18n.language === language.lang ? classes.active : ''
                }
                onClick={() => {
                  i18n.changeLanguage(language.lang);
                  localStorage.setItem('language', language.lang);
                  navigate(0);
                }}
              >
                {language.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
