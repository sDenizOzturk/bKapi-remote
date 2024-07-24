import { BaseButton, BaseFormInput, BaseWrapper } from 'binak-react-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface FilterLinkProps {
  setFilter: (arg0: string) => void;
}

interface FilterLinkForm {
  filter: string;
}

const FilterLinks: FC<FilterLinkProps> = ({ setFilter }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterLinkForm>({ mode: 'onTouched' });

  const onSubmit = async (data: FilterLinkForm) => {
    setFilter(data.filter);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{t('Search Permanent Links')}</h2>
        <BaseFormInput
          id="filter"
          label={t('Door Number')}
          error={errors.filter}
          register={register('filter', {
            maxLength: 50,
          })}
          errorMessage={t('Please enter a filter text')}
        />
        <BaseWrapper mode={['align-right']}>
          <BaseButton type="submit">{t('Search')}</BaseButton>
        </BaseWrapper>
      </form>
    </>
  );
};

export default FilterLinks;
