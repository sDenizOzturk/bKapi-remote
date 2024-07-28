import classes from './Header.module.css';

import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../utils/routes';
import { FC } from 'react';
import { RootState } from '../../store';
import { isTokenValid } from '../../utils/utils';
import { useMediaQuery } from 'usehooks-ts';

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

  const displayingRoutes: { to: string; text: string }[] = [];

  if (tokenValid) {
    displayingRoutes.push({ to: routes.link.listLinks, text: t('Links') });
    displayingRoutes.push({ to: routes.household.list, text: t('Households') });
    displayingRoutes.push({ to: routes.records.root, text: t('Records') });
  } else {
    displayingRoutes.push({ to: routes.admin.logIn, text: t('Log In') });
    displayingRoutes.push({
      to: routes.instructions.root,
      text: t('Instructions'),
    });
  }

  const isPortrait = useMediaQuery('(orientation: portrait)');

  return (
    <header>
      <nav style={isPortrait ? { width: '100%' } : {}}>
        <ul>
          <li>
            {displayingRoutes.map((route) => (
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
                style={isPortrait ? { padding: '0.5rem', margin: '0' } : {}}
                onClick={() => {
                  i18n.changeLanguage(language.lang);
                  localStorage.setItem('language', language.lang);
                  navigate(0);
                }}
              >
                {isPortrait ? language.lang : language.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
