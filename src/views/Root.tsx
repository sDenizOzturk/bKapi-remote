import { FC, useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../components/layout/Header';
import Error from '../components/layout/Error';
import Loading from '../components/layout/Loading';
import Footer from '../components/layout/Footer';
import { RootState } from '../store';
import { isTokenValid } from '../utils/utils';
import useRoutes from '../hooks/useRoutes';

const RootView: FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { route } = useRoutes();

  const { target } = useParams();

  const tokenValid = isTokenValid(token) && token.target === target;

  useEffect(() => {
    if (pathname === '/' + target) {
      if (tokenValid) {
        navigate(route('listLinks'), { replace: true });
      } else {
        navigate(route('auth'), { replace: true });
      }
    }

    if (pathname.includes('/admin/') && !tokenValid)
      navigate(route('auth'), { replace: true });

    if (pathname.includes('/auth/') && tokenValid)
      navigate(route('listLinks'), { replace: true });
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
