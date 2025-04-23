import { FC } from "react";
import { BaseWrapper } from "binak-react-components";
import { HTMLMotionProps } from "framer-motion";
import { UserType } from "../../../models/userType";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import CopyPermanentLink from "./CopyPermanentLink";
import ChangePermanentLink from "./ChangePermanentLink";
import DoorNumber from "./DoorNumber";
import CreateTemporaryLink from "./CreateTemporaryLink";
import DeleteHousehold from "./DeleteHousehold";
import ClearHousehold from "./ClearHousehold";

interface RegisterHeaderProps extends HTMLMotionProps<"div"> {
  userType: UserType;
}

const RegisterHeader: FC<RegisterHeaderProps> = ({ userType }) => {
  if (userType !== "admin") return <DoorNumber userType={userType} />;

  let token = "";
  let doorNumber = "";
  token = useSelector((state: RootState) => state.auth.token).token;
  doorNumber = useParams().doorNumber as string;

  return (
    <BaseWrapper mode={["vertical", "center"]}>
      <h1
        style={{
          margin: "auto",
          color: "var(--color3)",
          background: "var(--color2_9)",
          borderRadius: "1rem",
          padding: "0.3rem 2rem",
          minWidth: "30.5rem",
          textAlign: "center",
        }}
      >
        {doorNumber}
      </h1>

      <BaseWrapper
        mode={["center"]}
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: "30.5rem",
          gap: "0.5rem",
        }}
      >
        <CopyPermanentLink doorNumber={doorNumber} token={token} />
        <ChangePermanentLink doorNumber={doorNumber} token={token} />
        <CreateTemporaryLink doorNumber={doorNumber} token={token} />
        <ClearHousehold doorNumber={doorNumber} token={token} />
        <DeleteHousehold doorNumber={doorNumber} token={token} />
      </BaseWrapper>
    </BaseWrapper>
  );
};
export default RegisterHeader;
