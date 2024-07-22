const adminRoot = '/admin';
const registerRoot = '/register';
const instructionsRoot = '/instructions';

const admin = {
  root: adminRoot,
  logIn: adminRoot + '/log-in',
  createLink: adminRoot + '/links',
};
const resident = {
  root: registerRoot,
};

const link = {
  permanent: 'permanent/:token',
  temporary: 'temporary/:token',
};

const instructions = {
  root: instructionsRoot,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  admin,
  resident,
  instructions,
  link,
};
