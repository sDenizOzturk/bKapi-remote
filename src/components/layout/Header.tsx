import { useSelector } from "react-redux";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { CSSProperties, FC } from "react";
import { RootState } from "../../store";
import { isTokenValid } from "../../utils/utils";
import { useMediaQuery } from "usehooks-ts";
import { BaseHeader, headerActiveStyle } from "binak-react-components";
import useRoutes from "../../hooks/useRoutes";

const languages = [
  { lang: "tr", label: "Türkçe" },
  { lang: "en", label: "English" },
  { lang: "ru", label: "Русский" },
];

const Header: FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.auth.token);

  const { target } = useParams();
  const tokenValid = isTokenValid(token) && token.target === target;

  const { route } = useRoutes();

  const displayingRoutes: {
    to: string;
    text: string;
    onClick?: () => unknown;
  }[] = [];

  if (tokenValid) {
    displayingRoutes.push({
      to: route("listVehiclesInside"),
      text: t("Vehicles Inside"),
    });
    displayingRoutes.push({
      to: route("listHouseholds"),
      text: t("Households"),
    });
    displayingRoutes.push({
      to: route("records"),
      text: t("Records"),
    });
  } else {
    displayingRoutes.push({
      to: route("auth"),
      text: t("Log In"),
    });
  }

  const isPortrait = useMediaQuery("(orientation: portrait)");

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
        let style: CSSProperties = { fontSize: "0.8rem" };

        if (isPortrait) {
          style = { ...style, padding: "0.5rem", margin: "0" };
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
                localStorage.setItem("language", language.lang);
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
