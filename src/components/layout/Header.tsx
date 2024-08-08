import { useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../utils/routes';
import { CSSProperties, FC } from 'react';
import { RootState } from '../../store';
import { isTokenValid } from '../../utils/utils';
import { useMediaQuery } from 'usehooks-ts';
import { BaseHeader, headerActiveStyle } from 'binak-react-components';

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

  const displayingRoutes: {
    to: string;
    text: string;
    onClick?: () => unknown;
  }[] = [];

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
    <BaseHeader
      leftContent={
        <>
          {displayingRoutes.map((route) => (
            <NavLink
              key={route.text}
              style={({ isActive }) => (isActive ? headerActiveStyle : {})}
              to={route.to}
              onClick={route.onClick}
            >
              {route.text}
            </NavLink>
          ))}
        </>
      }
      rightContent={languages.map((language) => {
        let style: CSSProperties = { fontSize: '0.8rem' };

        if (isPortrait) {
          style = { ...style, padding: '0.5rem', margin: '0' };
        }
        if (i18n.language === language.lang) {
          style = { ...style, ...headerActiveStyle };
        }
        return (
          <li key={language.lang}>
            <button
              style={style}
              onClick={() => {
                i18n.changeLanguage(language.lang);
                localStorage.setItem('language', language.lang);
                navigate(0);
              }}
            >
              {isPortrait ? language.lang : language.label}
            </button>
          </li>
        );
      })}
    />
  );
};
export default Header;
