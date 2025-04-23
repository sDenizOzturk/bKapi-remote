import { useCallback } from "react";
import { useParams } from "react-router-dom";

//const root = "http://localhost:8082";
const root = "https://gateway.bkapi.com.tr";

const urls = {
  root: root,

  //TARGET URLS
  listTargets: root + "/target",

  //ADMIN URLS
  logInAdmin: root + "/:target" + "/admin" + "/log-in",

  //LINK URLS
  createTemporaryLink: root + "/:target" + "/link/temporary",
  getPermanentLink: root + "/:target" + "/link/permanent",
  changePermanentLink: root + "/:target" + "/link/permanent",
  getDoorNumber: root + "/:target" + "/link/door-number",

  //HOUSEHOLD URLS
  listHouseholds: root + "/:target" + "/household/list",
  postHousehold: root + "/:target" + "/household/",
  deleteHousehold: root + "/:target" + "/household/",
  clearHousehold: root + "/:target" + "/household/",

  //VEHICLESINSIDE URLS
  listVehiclesInside: root + "/:target" + "/vehicles-inside/list",
  postVehicleInside: root + "/:target" + "/vehicles-inside/",
  deleteVehicleInside: root + "/:target" + "/vehicles-inside/",
  clearVehicleInside: root + "/:target" + "/vehicles-inside/",

  //RECORD URLS
  listRecords: root + "/:target" + "/record/list",

  //OWN PLATE URLS
  listOwnPlates: root + "/:target" + "/own-plate",
  postOwnPlate: root + "/:target" + "/own-plate",
  updateOwnPlate: root + "/:target" + "/own-plate/",
  deleteOwnPlate: root + "/:target" + "/own-plate/",

  //GUEST PLATE URLS
  listGuestPlates: root + "/:target" + "/guest-plate",
  postGuestPlate: root + "/:target" + "/guest-plate",
  updateGuestPlate: root + "/:target" + "/guest-plate/",
  deleteGuestPlate: root + "/:target" + "/guest-plate/",

  //APP KEY URLS
  listAppKeys: root + "/:target" + "/app-key",
  postAppKey: root + "/:target" + "/app-key",
  updateAppKey: root + "/:target" + "/app-key/",
  deleteAppKey: root + "/:target" + "/app-key/",

  //TELEGRAM NUMBER URLS
  listTelegramNumbers: root + "/:target" + "/telegram-number",
  postTelegramNumber: root + "/:target" + "/telegram-number",
  updateTelegramNumber: root + "/:target" + "/telegram-number/",
  deleteTelegramNumber: root + "/:target" + "/telegram-number/",

  //SMS NUMBER URLS
  listSmsNumbers: root + "/:target" + "/sms-number",
  postSmsNumber: root + "/:target" + "/sms-number",
  updateSmsNumber: root + "/:target" + "/sms-number/",
  deleteSmsNumber: root + "/:target" + "/sms-number/",

  //INSTRUCTIONS URLS
  instructionsRoot: root + "/:target" + "/instructions",
};

const useUrls = () => {
  const { target } = useParams();

  const setParams = useCallback((route: string) => {
    return route.replace(":target", target as string);
  }, []);

  const url = useCallback(
    (key: keyof typeof urls, searchParams: {} | undefined = undefined) => {
      if (searchParams) {
        return setParams(urls[key]) + "?" + new URLSearchParams(searchParams);
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
