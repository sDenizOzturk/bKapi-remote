import { BaseButton, BaseFormInput, BaseWrapper } from 'binak-react-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const getCurrentDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  return dd + '.' + mm + '.' + yyyy;
};

interface FilterRecordProps {
  initialDate: string;
  setFilter: (data: FilterRecordForm) => void;
}

interface FilterRecordForm {
  filter: string;
  date: string;
}

const FilterRecords: FC<FilterRecordProps> = ({ initialDate, setFilter }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FilterRecordForm>({
    mode: 'onTouched',
    defaultValues: { filter: '', date: initialDate },
  });

  const onSubmit = async (data: FilterRecordForm) => {
    setFilter(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{t('Search Record')}</h2>
        <BaseFormInput
          id="filter"
          label={t('Fullname or Plate Number')}
          error={errors.filter}
          register={register('filter', {
            maxLength: 50,
          })}
          errorMessage={t('Please enter a valid filter text')}
        />

        <BaseFormInput
          id="date"
          label={t('Date')}
          error={errors.date}
          register={register('date', {
            pattern: {
              value:
                /^^(?=\d{2}([.])\d{2}\1\d{4}$)(?:0[1-9]|1\d|[2][0-8]|29(?!.02.(?!(?!(?:[02468][1-35-79]|[13579][0-13-57-9])00)\d{2}(?:[02468][048]|[13579][26])))|30(?!.02)|31(?=.(?:0[13578]|10|12))).(?:0[1-9]|1[012]).\d{4}$/i,
              message: t('Please enter a valid date (e.g 01.02.2024)'),
            },
          })}
          errorMessage={t('Please enter a valid date (e.g 01.02.2024)')}
        />

        <BaseWrapper mode={['align-right']}>
          <BaseButton type="submit">{t('Search')}</BaseButton>
        </BaseWrapper>
        <BaseWrapper>
          <BaseButton
            type="button"
            mode="text"
            onClick={() => setValue('date', getCurrentDate())}
          >
            {t('Set the date as today')}
          </BaseButton>
        </BaseWrapper>
      </form>
    </>
  );
};

export default FilterRecords;
