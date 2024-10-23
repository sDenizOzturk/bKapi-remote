const routes = {
  auth: '/:target/auth',
  listHouseholds: '/:target/admin/households',
  addUpdateHouseHold: '/:target/admin/household/:doorNumber',
  listLinks: '/:target/admin/links',
  permanentLinks: '/:target/permanent/:token',
  temporaryLinks: '/:target/temporary/:token',
  records: '/:target/admin/records',
  instructions: '/:target/instructions',
};

export default routes;
