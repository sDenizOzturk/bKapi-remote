import { useParams } from 'react-router-dom';
import { useCallback } from 'react';

import routes from '../utils/routes';

const useRoutes = () => {
  const { target } = useParams();

  const setParams = useCallback((route: string) => {
    return route.replace(':target', target as string);
  }, []);

  const route = useCallback((key: keyof typeof routes) => {
    return setParams(routes[key]);
  }, []);

  return {
    route,
  };
};
export default useRoutes;
