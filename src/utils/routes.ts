const admin = {
  root: '/admin',
  logIn: '/admin' + '/log-in',
};

const household = {
  list: '/households',
  addUpdate: '/household/:doorNumber',
};

const link = {
  listLinks: '/links',
  permanent: '/permanent/:token',
  temporary: '/temporary/:token',
};

const records = {
  root: '/records',
};

const instructions = {
  root: '/instructions',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  admin,
  household,
  instructions,
  records,
  link,
};
