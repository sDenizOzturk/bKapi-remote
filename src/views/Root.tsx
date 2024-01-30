import { FC, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import routes from '../utils/routes';
import Header from '../components/layout/Header';
import Error from '../components/layout/Error';
import Loading from '../components/layout/Loading';
import Footer from '../components/layout/Footer';
import { RootState } from '../store';
import { isTokenValid } from '../utils/utils';

const RootView: FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const tokenValid = isTokenValid(token);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.substring(0, 7) === '/admin/' || pathname === '/')
      if (tokenValid) {
        navigate(routes.admin.createLink, { replace: true });
      } else {
        navigate(routes.admin.logIn, { replace: true });
      }
  }, [navigate, pathname, tokenValid]);

  return (
    <>
      <Header />
      <Outlet />
      <Loading />
      <Error />
      <Footer />
    </>
  );
};
export default RootView;
