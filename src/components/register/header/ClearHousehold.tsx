import { FC, useState } from "react";
import { BaseButton, BaseModal } from "binak-react-components";
import { HTMLMotionProps } from "framer-motion";
import { useTranslation } from "react-i18next";
import useLoading from "../../../hooks/useLoading";
import useError from "../../../hooks/useError";
import useUrls from "../../../hooks/useUrls";

interface ClearHouseholdProps extends HTMLMotionProps<"div"> {
  doorNumber: String;
  token: String;
}

const ClearHousehold: FC<ClearHouseholdProps> = ({ doorNumber, token }) => {
  const { t } = useTranslation();

  const { setLoading } = useLoading();
  const { setError, setErrors } = useError();
  const { url } = useUrls();

  const [askForClear, setAskForClear] = useState(false);
  const clearHousehold = async () => {
    setLoading(true);
    try {
      const response = await fetch(url("clearHousehold") + doorNumber, {
        method: "PATCH",
        headers: { Authorization: "Bearer " + token },
      });
      const responseData = await response.json();

      if (response.status === 200) {
        window.location.reload();
      } else {
        setErrors(responseData.data);
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      console.log(err);
      setError(err.message || "Failed, try later.");
    }
    setAskForClear(false);
    setLoading(false);
  };

  return (
    <>
      <BaseButton
        onClick={() => setAskForClear(true)}
        mode="outline"
        style={{ minWidth: "15rem" }}
      >
        {t("Clear Household")}
      </BaseButton>

      <BaseModal
        open={askForClear}
        title={t("Clearing Household...")}
        center
        baseDialog
        onClose={() => setAskForClear(false)}
        menuItems={
          <>
            <BaseButton mode="outline" onClick={() => setAskForClear(false)}>
              {t("No")}
            </BaseButton>
            <BaseButton onClick={clearHousehold}>{t("Yes")}</BaseButton>
          </>
        }
      >
        <h2>
          {t(
            "Are you sure to clear this household? All the plates and keys under this household will be deleted! Permanent key will be changed!"
          )}
        </h2>
      </BaseModal>
    </>
  );
};
export default ClearHousehold;
