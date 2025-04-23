import { FC, useState } from "react";
import { VehicleInside } from "../../models/vehicleInside";
import { HTMLMotionProps } from "framer-motion";
import {
  BaseButton,
  BaseCard,
  BaseModal,
  BaseWrapper,
} from "binak-react-components";
import { useTranslation } from "react-i18next";

import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import DeleteIcon from "../ui/DeleteIcon";
import useUrls from "../../hooks/useUrls";

interface VehiclesInsideItemProps extends HTMLMotionProps<"div"> {
  vehicleInside: VehicleInside;
  refetch: () => void;
}

const VehiclesInsideItem: FC<VehiclesInsideItemProps> = ({
  vehicleInside,
  refetch,
  ...props
}) => {
  const { t } = useTranslation();

  const { setError, setErrors } = useError();
  const { setLoading } = useLoading();

  const token = useSelector((state: RootState) => state.auth.token);

  const { url } = useUrls();

  const [askForDelete, setAskForDelete] = useState(false);
  const checkOutVehicle = async () => {
    setLoading(true);
    console.log(url("deleteVehicleInside") + vehicleInside!.plateNumber);

    try {
      const response = await fetch(
        url("deleteVehicleInside") + vehicleInside!.plateNumber,
        {
          method: "DELETE",
          headers: { Authorization: "Bearer " + token.token },
        }
      );
      const responseData = await response.json();

      if (response.status === 200) {
        refetch();
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
      <BaseCard
        {...props}
        style={{ width: "14rem", cursor: "pointer", margin: "0" }}
      >
        <BaseWrapper mode={[]} style={{ position: "relative" }}>
          <DeleteIcon onClick={() => setAskForDelete(true)} />
          <h3
            style={{
              fontSize: "1.6rem",
              textAlign: "center",
              marginBottom: "0",
            }}
          >
            {vehicleInside.plateNumber}
          </h3>
          <p style={{ fontSize: "1.3rem", textAlign: "center", margin: "0" }}>
            {vehicleInside.userName}
          </p>
          <p
            style={{
              fontSize: "1.1rem",
              textAlign: "center",
              fontWeight: "500",
              margin: "0",
            }}
          >
            {vehicleInside.doorNumber}
          </p>
        </BaseWrapper>
      </BaseCard>

      <BaseModal
        open={askForDelete}
        title={t("Checking Out Vehicle...")}
        center
        baseDialog
        onClose={() => setAskForDelete(false)}
        menuItems={
          <>
            <BaseButton mode="outline" onClick={() => setAskForDelete(false)}>
              {t("No")}
            </BaseButton>
            <BaseButton onClick={checkOutVehicle}>{t("Yes")}</BaseButton>
          </>
        }
      >
        <h2>{t("Are you sure to check out this vehicle?")}</h2>
        <BaseWrapper mode={["align-right"]}></BaseWrapper>
      </BaseModal>
    </>
  );
};

export default VehiclesInsideItem;
