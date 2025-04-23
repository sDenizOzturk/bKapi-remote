import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";
import { useSelector } from "react-redux";

import { BaseWrapper, BaseFormInput, BaseButton } from "binak-react-components";
import useRoute from "../../hooks/useRoutes";
import useUrls from "../../hooks/useUrls";
import { RootState } from "../../store";

interface CreateHouseholdForm {
  doorNumber: string;
}

const CreateHousehold: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { route } = useRoute();

  const { setError, setErrors } = useError();
  const { setLoading } = useLoading();

  const { url } = useUrls();

  const token = useSelector((state: RootState) => state.auth.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateHouseholdForm>({ mode: "onTouched" });

  const onSubmit = async (data: CreateHouseholdForm) => {
    setLoading(true);

    try {
      const body = JSON.stringify(data);
      const headers = {
        Authorization: "Bearer " + token.token,
        Accept: "application/json",
        "Content-Type": "application/json",
        UserType: "admin",
      };

      const response = await fetch(url("postHousehold"), {
        method: "POST",
        headers,
        body,
      });

      const responseData = await response.json();

      if (response.status === 200) {
        navigate(
          route("addUpdateHouseHold").replace(":doorNumber", data.doorNumber)
        );
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{t("Create Household")}</h2>
        <BaseFormInput
          id="doorNumber"
          label={t("Door Number")}
          error={errors.doorNumber}
          register={register("doorNumber", {
            required: true,
            maxLength: 20,
          })}
          errorMessage={t("Please enter a valid door number")}
        />
        <BaseWrapper mode={["align-right"]}>
          <BaseButton type="submit">{t("Create")}</BaseButton>
        </BaseWrapper>
      </form>
    </>
  );
};
export default CreateHousehold;
