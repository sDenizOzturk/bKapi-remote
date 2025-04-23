import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";
import { RootState } from "../../store";
import { BaseWrapper, BaseFormInput, BaseButton } from "binak-react-components";
import useRoutes from "../../hooks/useRoutes";
import useUrls from "../../hooks/useUrls";

interface CheckInVehicleProps {
  refetch: () => void;
  setCurrentPage: (arg0: number) => void;
  mode: "checkIn" | "search";
}

interface CheckInVehicleForm {
  plateNumber: string;
}

const CheckInVehicle: FC<CheckInVehicleProps> = ({
  refetch,
  setCurrentPage,
  mode,
}) => {
  if (mode !== "checkIn") {
    return <></>;
  }
  const { t } = useTranslation();
  const token = useSelector((state: RootState) => state.auth.token);

  const { setError } = useError();
  const { setLoading } = useLoading();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { route } = useRoutes();

  const { url } = useUrls();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CheckInVehicleForm>({ mode: "onTouched" });

  const onSubmit = async (data: CheckInVehicleForm) => {
    setLoading(true);
    try {
      const response = await fetch(url("postVehicleInside"), {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plateNumber: data.plateNumber,
        }),
      });
      const responseData = await response.json();

      if (response.status === 200) {
        setCurrentPage(responseData.currentPage);
        refetch();
      } else {
        if (response.status === 401) {
          dispatch(authActions.logout());
          navigate(route("auth"));
        }
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message || "Failed to authenticate, try later.");
    }
    reset();
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{mode === "checkIn" && t("Check In Vehicle")}</h2>
        <BaseFormInput
          id="plateNumber"
          label={t("Plate Number")}
          error={errors.plateNumber}
          register={register("plateNumber", {
            required: true,
            minLength: 5,
            maxLength: 20,
            validate: (value) => !value.includes(" "),
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
export default CheckInVehicle;
