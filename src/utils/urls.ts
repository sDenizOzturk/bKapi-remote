//const root = 'http://localhost:4000';
const root = 'http://192.168.1.189:4000';
//const root = 'https://antasya-sunucu.bkapi.site:8081';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: root,
  //ADMIN URLS
  logInAdmin: root + '/admin' + '/log-in',

  //LINK URLS
  listLinks: root + '/link/list',
  createLink: root + '/link',
  deleteLink: root + '/link' + '/',

  //HOUSEHOLD URLS
  listHouseholds: root + '/household/list',
  deleteHousehold: root + '/household/',

  //OWN PLATE URLS
  listOwnPlates: root + '/own-plate',
  postOwnPlate: root + '/own-plate',
  updateOwnPlate: root + '/own-plate/',
  deleteOwnPlate: root + '/own-plate/',

  //GUEST PLATE URLS
  listGuestPlates: root + '/guest-plate',
  postGuestPlate: root + '/guest-plate',
  updateGuestPlate: root + '/guest-plate/',
  deleteGuestPlate: root + '/guest-plate/',

  //APP KEY URLS
  listAppKeys: root + '/app-key',
  postAppKey: root + '/app-key',
  updateAppKey: root + '/app-key/',
  deleteAppKey: root + '/app-key/', 

  //INSTRUCTIONS URLS
  instructionsRoot: root + '/instructions',
};
