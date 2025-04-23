import { FC, useCallback, useEffect, useState } from "react";
import {
  BaseWrapper,
  BaseButton,
  BaseModal,
  BaseCard,
} from "binak-react-components";
import AddOrUpdateAppKey from "./AddOrUpdateAppKey";
import { useTranslation } from "react-i18next";

import AppKeyItem from "./AppKeyItem";
import useError from "../../../hooks/useError";
import { AppKey } from "../../../models/appKey";
import { bounce } from "../../../utils/animationVariants";
import { UserType } from "../../../models/userType";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useParams } from "react-router-dom";
import useUrls from "../../../hooks/useUrls";

interface ListAppKeysProps {
  userType: UserType;
  setLoading: (arg0: boolean) => any;
}

const ListAppKeys: FC<ListAppKeysProps> = ({ userType, setLoading }) => {
  const { t } = useTranslation();
  const loading = useSelector((state: RootState) => state.loading.loading);

  let token = "";
  let doorNumber = "";
  if (userType === "admin") {
    token = useSelector((state: RootState) => state.auth.token).token;
    doorNumber = useParams().doorNumber as string;
  } else {
    token = useParams().token as string;
  }

  const { setError, setErrors } = useError();

  const [showAddAppKey, setShowAddAppKey] = useState(false);
  const [updatingAppKey, setUpdatingAppKey] = useState<AppKey | undefined>(
    undefined
  );

  const [appKeys, setAppKeys] = useState<AppKey[]>([]);

  const { url } = useUrls();

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const _url = url(
        "listAppKeys",
        doorNumber
          ? {
              doorNumber,
            }
          : undefined
      );

      const response = await fetch(_url, {
        headers: {
          Authorization: "Bearer " + token,
          UserType: userType,
        },
      });
      const responseData = await response.json();

      if (response.status === 200) {
        setAppKeys(responseData.appKeys);
      } else {
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }, [setError, setLoading, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [askedForDelete, setAskedForDelete] = useState<AppKey | undefined>(
    undefined
  );

  const deleteAppKey = async () => {
    if (!askedForDelete) return;
    setLoading(true);
    try {
      const _url =
        url("deleteAppKey") +
        askedForDelete!.fullname +
        (doorNumber
          ? "?" +
            new URLSearchParams({
              doorNumber,
            })
          : "");
      const response = await fetch(_url, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token, UserType: userType },
      });
      const responseData = await response.json();

      if (response.status === 200) {
        fetchData();
      } else {
        setErrors(responseData.data);
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      console.log(err);
      setError(err.message || "Failed, try later.");
    }
    setAskedForDelete(undefined);
    setLoading(false);
  };

  return (
    <>
      <BaseModal
        center
        open={showAddAppKey}
        onClose={() => setShowAddAppKey(false)}
      >
        <AddOrUpdateAppKey
          refetch={() => {
            setShowAddAppKey(false);
            fetchData();
          }}
          userType={userType}
        />
      </BaseModal>

      <BaseModal
        center
        open={!!updatingAppKey}
        onClose={() => setUpdatingAppKey(undefined)}
      >
        <AddOrUpdateAppKey
          update
          targetAppKey={updatingAppKey}
          refetch={() => {
            setUpdatingAppKey(undefined);
            fetchData();
          }}
          userType={userType}
          setAskedForDelete={() => {
            setAskedForDelete(updatingAppKey);
            setUpdatingAppKey(undefined);
          }}
        />
      </BaseModal>

      <BaseWrapper mode={["vertical", "center"]}>
        <BaseWrapper mode={["horizontal"]}>
          <h1>{t("Application Keys")}</h1>
          <BaseButton mode="outline" onClick={() => setShowAddAppKey(true)}>
            {t("Add")}
          </BaseButton>
        </BaseWrapper>
      </BaseWrapper>

      <BaseWrapper
        mode={["center"]}
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: "40rem",
        }}
      >
        {appKeys.map((appKey: AppKey) => (
          <AppKeyItem
            whileHover={bounce.s.scale}
            transition={bounce.m.transition}
            key={appKey.appKey}
            appKey={appKey}
            onAppKeyClicked={() => setUpdatingAppKey(appKey)}
            onDeleteKeyClicked={() => setAskedForDelete(appKey)}
          />
        ))}
        {!loading && appKeys.length === 0 && (
          <BaseCard style={{ margin: "-0.5rem" }}>
            {t("No keys added")}
          </BaseCard>
        )}
      </BaseWrapper>

      <BaseModal
        open={!!askedForDelete}
        title={t("Deleting Application Key...")}
        center
        baseDialog
        onClose={() => setAskedForDelete(undefined)}
        menuItems={
          <>
            <BaseButton
              mode="outline"
              onClick={() => setAskedForDelete(undefined)}
            >
              {t("No")}
            </BaseButton>
            <BaseButton onClick={deleteAppKey}>{t("Yes")}</BaseButton>
          </>
        }
      >
        <h2>{t("Are you sure to delete this application key?")}</h2>
        <BaseWrapper mode={["align-right"]}></BaseWrapper>
      </BaseModal>
    </>
  );
};
export default ListAppKeys;
