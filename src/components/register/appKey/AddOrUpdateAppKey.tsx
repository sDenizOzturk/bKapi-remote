import { useTranslation } from "react-i18next";

import {
  BaseWrapper,
  BaseCard,
  BaseButton,
  BaseFormInput,
} from "binak-react-components";
import { useForm } from "react-hook-form";

import { ChangeEvent, FC } from "react";

import useError from "../../../hooks/useError";
import useLoading from "../../../hooks/useLoading";
import { AppKey } from "../../../models/appKey";
import { UserType } from "../../../models/userType";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store";
import useUrls from "../../../hooks/useUrls";

interface AddOrUpdateAppKeyProps {
  update?: boolean;
  targetAppKey?: AppKey;
  refetch: () => void;
  userType: UserType;
  setAskedForDelete?: () => void;
}

const AddOrUpdateAppKey: FC<AddOrUpdateAppKeyProps> = ({
  update,
  targetAppKey,
  refetch,
  userType,
  setAskedForDelete,
}) => {
  const { t } = useTranslation();

  let token = "";
  let doorNumber = "";
  if (userType === "admin") {
    token = useSelector((state: RootState) => state.auth.token).token;
    doorNumber = useParams().doorNumber as string;
  } else {
    token = useParams().token as string;
  }

  const { setError, setErrors } = useError();
  const { setLoading } = useLoading();

  const { url } = useUrls();

  const defaultVaules = () => {
    if (!update) return {};
    return targetAppKey;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppKey>({
    mode: "onTouched",
    defaultValues: defaultVaules(),
  });

  const onSubmit = async (data: AppKey) => {
    setLoading(true);
    try {
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
        UserType: userType,
      };
      const body = JSON.stringify(data);

      const _url = update
        ? url("updateAppKey") + targetAppKey!.fullname
        : url("postAppKey") +
          (doorNumber
            ? "?" +
              new URLSearchParams({
                doorNumber,
              })
            : "");

      const response = await fetch(_url, {
        method: update ? "PUT" : "POST",
        headers,
        body,
      });
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
    setLoading(false);
  };

  return (
    <BaseWrapper mode={["vertical"]}>
      <BaseCard style={{ maxWidth: "18rem", margin: "0" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <BaseFormInput
            id="fullname"
            label={t("Users Fullname")}
            error={errors.fullname}
            register={register("fullname", {
              required: true,
              minLength: 6,
            })}
            errorMessage={t("Please enter a valid fullname")}
          />
          <BaseFormInput
            id="appKey"
            label={t("Application Key")}
            error={errors.appKey}
            register={register("appKey", {
              required: true,
              minLength: 6,
              maxLength: 6,
            })}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              (e.target.value = ("" + e.target.value)
                .toLowerCase()
                .replace(" ", ""))
            }
            errorMessage={t("Please enter a valid application key")}
          />
          <BaseFormInput
            id="info"
            label={t("Additional Information")}
            register={register("info")}
          />
          <BaseWrapper mode={["align-right"]}>
            <BaseButton type="submit">
              {update ? t("Edit") : t("Add")}
            </BaseButton>
            {update && setAskedForDelete && (
              <BaseButton
                type="button"
                mode="outline"
                onClick={setAskedForDelete}
              >
                {t("Delete")}
              </BaseButton>
            )}
          </BaseWrapper>
        </form>
      </BaseCard>
    </BaseWrapper>
  );
};
export default AddOrUpdateAppKey;
