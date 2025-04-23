import { BaseButton, BaseFormInput, BaseWrapper } from "binak-react-components";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface FilterVehicleInsideProps {
  setFilter: (arg0: string) => void;
}

interface FilterVehicleInsideForm {
  filter: string;
}

const FilterVehiclesInside: FC<FilterVehicleInsideProps> = ({ setFilter }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterVehicleInsideForm>({ mode: "onTouched" });

  const onSubmit = async (data: FilterVehicleInsideForm) => {
    setFilter(data.filter);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{t("Search Vehicles Inside")}</h2>
        <BaseFormInput
          id="filter"
          label={t("Door Number / Fullname / Plate Number")}
          error={errors.filter}
          register={register("filter", {
            maxLength: 50,
          })}
          errorMessage={t("Please enter a valid filter text")}
        />
        <BaseWrapper mode={["align-right"]}>
          <BaseButton type="submit">{t("Search")}</BaseButton>
        </BaseWrapper>
      </form>
    </>
  );
};

export default FilterVehiclesInside;
