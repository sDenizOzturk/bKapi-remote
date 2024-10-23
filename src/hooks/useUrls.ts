import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

//const root = 'http://localhost:80';
const root = 'https://gateway.bkapi.com.tr';

const urls = {
  root: root,

  //TARGET URLS
  listTargets: root + '/target',

  //ADMIN URLS
  logInAdmin: root + '/:target' + '/admin' + '/log-in',

  //LINK URLS
  listLinks: root + '/:target' + '/link/list',
  createLink: root + '/:target' + '/link',
  deleteLink: root + '/:target' + '/link' + '/',

  //HOUSEHOLD URLS
  listHouseholds: root + '/:target' + '/household/list',
  deleteHousehold: root + '/:target' + '/household/',

  //HOUSEHOLD URLS
  listRecords: root + '/:target' + '/record/list',

  //OWN PLATE URLS
  listOwnPlates: root + '/:target' + '/own-plate',
  postOwnPlate: root + '/:target' + '/own-plate',
  updateOwnPlate: root + '/:target' + '/own-plate/',
  deleteOwnPlate: root + '/:target' + '/own-plate/',

  //GUEST PLATE URLS
  listGuestPlates: root + '/:target' + '/guest-plate',
  postGuestPlate: root + '/:target' + '/guest-plate',
  updateGuestPlate: root + '/:target' + '/guest-plate/',
  deleteGuestPlate: root + '/:target' + '/guest-plate/',

  //APP KEY URLS
  listAppKeys: root + '/:target' + '/app-key',
  postAppKey: root + '/:target' + '/app-key',
  updateAppKey: root + '/:target' + '/app-key/',
  deleteAppKey: root + '/:target' + '/app-key/',

  //INSTRUCTIONS URLS
  instructionsRoot: root + '/:target' + '/instructions',
};

const useUrls = () => {
  const { target } = useParams();

  const setParams = useCallback((route: string) => {
    return route.replace(':target', target as string);
  }, []);

  const url = useCallback(
    (key: keyof typeof urls, searchParams: {} | undefined = undefined) => {
      if (searchParams) {
        return setParams(urls[key]) + '?' + new URLSearchParams(searchParams);
      }
      return setParams(urls[key]);
    },
    []
  );

  return {
    url,
  };
};

export default useUrls;
