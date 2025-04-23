import { BaseButton, BaseWrapper } from "binak-react-components";
import ListPlates from "../components/register/plate/ListPlates";

import { FC, useState } from "react";

import useLoading from "../hooks/useLoading";
import ListAppKeys from "../components/register/appKey/ListAppKeys";
import DisplayInstructions from "../components/instructions/DisplayInstructions";
import ViewWrapper from "../components/layout/ViewWrapper";
import { useTranslation } from "react-i18next";
import { UserType } from "../models/userType";
import ListContactNumbers from "../components/register/contactNumber/ListContactNumbers";
import RegisterHeader from "../components/register/header/RegisterHeader";
interface LinkViewProps {
  userType: UserType;
}

const LinkView: FC<LinkViewProps> = ({ userType }) => {
  const [isOwnPlatesLoading, setOwnPlatesLoading] = useState(false);
  const [isGuestPlatesLoading, setGuestPlatesLoading] = useState(false);
  const [isAppKeysLoading, setAppKeysLoading] = useState(false);

  const { setLoading } = useLoading();
  setLoading(isOwnPlatesLoading || isGuestPlatesLoading || isAppKeysLoading);

  const [showInstructions, setShowInstructions] = useState(false);

  const { t } = useTranslation();

  return (
    <ViewWrapper>
      <BaseWrapper
        mode={["vertical"]}
        style={{ padding: "1rem", minHeight: "60vh" }}
      >
        <RegisterHeader userType={userType} />

        <ListPlates
          plateType="own"
          setLoading={setOwnPlatesLoading}
          userType={userType}
        />
        <ListPlates
          plateType="guest"
          setLoading={setGuestPlatesLoading}
          userType={userType}
        />
        <ListAppKeys setLoading={setAppKeysLoading} userType={userType} />

        <ListContactNumbers
          numberType="telegram"
          setLoading={setGuestPlatesLoading}
          userType={userType}
        />

        <ListContactNumbers
          numberType="sms"
          setLoading={setGuestPlatesLoading}
          userType={userType}
        />

        <BaseWrapper mode={["center"]} style={{ marginTop: "1rem" }}>
          <BaseButton onClick={() => setShowInstructions(!showInstructions)}>
            {showInstructions ? t("Hide instructions") : t("Show instructions")}
          </BaseButton>
        </BaseWrapper>
        {showInstructions && <DisplayInstructions />}
      </BaseWrapper>
    </ViewWrapper>
  );
};
export default LinkView;
