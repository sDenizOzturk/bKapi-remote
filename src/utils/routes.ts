const routes = {
  auth: "/:target/auth",
  listHouseholds: "/:target/admin/households",
  addUpdateHouseHold: "/:target/admin/household/:doorNumber",
  listVehiclesInside: "/:target/admin/vehicles-inside",
  permanentLinks: "/:target/permanent/:token",
  temporaryLinks: "/:target/temporary/:token",
  records: "/:target/admin/records",
};

export default routes;
