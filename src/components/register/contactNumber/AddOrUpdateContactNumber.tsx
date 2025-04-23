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
import { ContactNumber } from "../../../models/contactNumber";
import { UserType } from "../../../models/userType";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useParams } from "react-router-dom";
import useUrls from "../../../hooks/useUrls";

interface AddOrUpdateContactNumberProps {
  numberType: "telegram" | "sms";
  update?: boolean;
  targetContact?: ContactNumber;
  refetch: () => void;
  userType: UserType;
  setAskedForDelete?: () => void;
}

const AddOrUpdateContactNumber: FC<AddOrUpdateContactNumberProps> = ({
  numberType,
  update,
  targetContact,
  refetch,
  userType,
  setAskedForDelete,
}) => {
  const { t } = useTranslation();
  const { url } = useUrls();

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

  const defaultValues = () => {
    if (!update) return {};
    return targetContact;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactNumber>({
    mode: "onTouched",
    defaultValues: defaultValues(),
  });

  const targetUrl = () => {
    if (numberType === "telegram") {
      return update
        ? url("updateTelegramNumber") + targetContact!.number
        : url("postTelegramNumber");
    } else {
      return update
        ? url("updateSmsNumber") + targetContact!.number
        : url("postSmsNumber");
    }
  };

  const onSubmit = async (data: ContactNumber) => {
    setLoading(true);
    try {
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
        UserType: userType,
      };

      const body = JSON.stringify(data);
      const requestUrl =
        targetUrl() +
        (doorNumber ? "?" + new URLSearchParams({ doorNumber }) : "");

      const response = await fetch(requestUrl, {
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
            id="number"
            label={
              numberType === "telegram" ? t("Telegram ID") : t("SMS Number")
            }
            error={errors.number}
            register={register("number", {
              required: true,
              minLength: 5,
            })}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              (e.target.value = e.target.value.toUpperCase())
            }
            errorMessage={
              numberType === "telegram"
                ? t("Please enter a valid ID")
                : t("Please enter a valid number")
            }
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

export default AddOrUpdateContactNumber;
