import { BaseButton, BaseFormInput, BaseWrapper } from 'binak-react-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface FilterHouseholdProps {
  setFilter: (arg0: string) => void;
}

interface FilterHouseholdForm {
  filter: string;
}

const FilterHouseholds: FC<FilterHouseholdProps> = ({ setFilter }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterHouseholdForm>({ mode: 'onTouched' });

  const onSubmit = async (data: FilterHouseholdForm) => {
    setFilter(data.filter);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{t('Search Household')}</h2>
        <BaseFormInput
          id="filter"
          label={t('Door Number')}
          error={errors.filter}
          register={register('filter', {
            maxLength: 50,
          })}
          errorMessage={t('Please enter a valid filter text')}
        />
        <BaseWrapper mode={['align-right']}>
          <BaseButton type="submit">{t('Search')}</BaseButton>
        </BaseWrapper>
      </form>
    </>
  );
};

export default FilterHouseholds;
