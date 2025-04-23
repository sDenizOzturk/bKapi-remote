import { FC, useState } from "react";
import { BaseButton, BaseModal } from "binak-react-components";
import { HTMLMotionProps } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useLoading from "../../../hooks/useLoading";
import useError from "../../../hooks/useError";
import useUrls from "../../../hooks/useUrls";
import routes from "../../../utils/routes";

interface DeleteHouseholdProps extends HTMLMotionProps<"div"> {
  doorNumber: String;
  token: String;
}

const DeleteHousehold: FC<DeleteHouseholdProps> = ({ doorNumber, token }) => {
  const { t } = useTranslation();

  const { setLoading } = useLoading();
  const { setError, setErrors } = useError();
  const { url } = useUrls();

  const { target } = useParams();

  const [askForDelete, setAskForDelete] = useState(false);
  const navigate = useNavigate();
  const deleteHousehold = async () => {
    setLoading(true);
    try {
      const response = await fetch(url("deleteHousehold") + doorNumber, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      const responseData = await response.json();

      if (response.status === 200) {
        const path = routes.listHouseholds.replace(":target", target as string);
        navigate(path);
      } else {
        setErrors(responseData.data);
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      console.log(err);
      setError(err.message || "Failed, try later.");
    }
    setAskForDelete(false);
    setLoading(false);
  };

  return (
    <>
      <BaseButton
        onClick={() => setAskForDelete(true)}
        mode="outline"
        style={{ minWidth: "15rem" }}
      >
        {t("Delete Household")}
      </BaseButton>

      <BaseModal
        open={askForDelete}
        title={t("Deleting Household...")}
        center
        baseDialog
        onClose={() => setAskForDelete(false)}
        menuItems={
          <>
            <BaseButton mode="outline" onClick={() => setAskForDelete(false)}>
              {t("No")}
            </BaseButton>
            <BaseButton onClick={deleteHousehold}>{t("Yes")}</BaseButton>
          </>
        }
      >
        <h2>
          {t(
            "Are you sure to delete this household? All the plates and keys under this household will be deleted!"
          )}
        </h2>
      </BaseModal>
    </>
  );
};
export default DeleteHousehold;
