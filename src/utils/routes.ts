const adminRoot = '/admin';
const residentRoot = '/resident';
const instructionsRoot = '/instructions';

const admin = {
  root: adminRoot,
  logIn: adminRoot + '/log-in',
  createLink: adminRoot + '/create-link',
};
const resident = {
  root: residentRoot,
  list: residentRoot + '/:token',
};
const instructions = {
  root: instructionsRoot,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  admin,
  resident,
  instructions,
};
