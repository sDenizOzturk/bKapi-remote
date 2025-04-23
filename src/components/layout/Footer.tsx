import logoImage from "../../assets/logo.webp";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { authActions } from "../../store/auth";
import { FC } from "react";
import { RootState } from "../../store";
import { isTokenValid } from "../../utils/utils";
import { BaseFooter } from "binak-react-components";
import useRoutes from "../../hooks/useRoutes";

const Footer: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);

  const { target } = useParams();
  const tokenValid = isTokenValid(token) && token.target === target;

  const { route } = useRoutes();

  return (
    <BaseFooter
      leftContent={
        <>
          {tokenValid && (
            <NavLink
              to={route("auth")}
              onClick={() => dispatch(authActions.logout())}
            >
              {t("Log Out")}
            </NavLink>
          )}
          <NavLink to="/" onClick={() => dispatch(authActions.logout())}>
            {t("Home Page")}
          </NavLink>
        </>
      }
      rightContent={
        <a
          style={{ border: "none" }}
          href="https://binak.com.tr"
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
