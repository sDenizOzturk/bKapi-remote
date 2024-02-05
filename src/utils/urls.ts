//const root = 'http://localhost:4000';
const root = 'https://antasya-sunucu.bkapi.site:8081';

const adminRoot = root + '/admin';
const residentRoot = root + '/resident';
const instructionsRoot = root + '/instructions';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: root,
  //ADMIN URLS
  adminRoot: adminRoot,
  logInAdmin: adminRoot + '/log-in',
  createLink: adminRoot + '/create-link',

  //RESIDENT URLS
  listOwnPlates: residentRoot + '/own-plates',
  postOwnPlate: residentRoot + '/own-plate',
  updateOwnPlate: residentRoot + '/own-plate/',
  deleteOwnPlate: residentRoot + '/own-plate/',

  listGuestPlates: residentRoot + '/guest-plates',
  postGuestPlate: residentRoot + '/guest-plate',
  updateGuestPlate: residentRoot + '/guest-plate/',
  deleteGuestPlate: residentRoot + '/guest-plate/',

  listAppKeys: residentRoot + '/app-keys',
  postAppKey: residentRoot + '/app-key',
  updateAppKey: residentRoot + '/app-key/',
  deleteAppKey: residentRoot + '/app-key/',

  //INSTRUCTIONS URLS
  instructionsRoot: instructionsRoot,
};
