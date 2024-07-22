const root = 'http://localhost:4000';
//const root = 'https://antasya-sunucu.bkapi.site:8081';

const adminRoot = root + '/admin';
const linkRoot = root + '/link';
const instructionsRoot = root + '/instructions';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: root,
  //ADMIN URLS
  adminRoot: adminRoot,
  logInAdmin: adminRoot + '/log-in',

  //LINK URLS
  createLink: linkRoot,
  listLinks: linkRoot,
  deleteLink: linkRoot + '/',

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
  instructionsRoot: instructionsRoot,
};
