import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

import routes from '../../utils/routes';
import { BaseWrapper, BaseFormInput, BaseButton } from 'binak-react-components';

interface CreateHouseholdForm {
  doorNumber: string;
}

const CreateHousehold: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateHouseholdForm>({ mode: 'onTouched' });

  const onSubmit = async (data: CreateHouseholdForm) => {
    navigate(
      routes.household.addUpdate.replace(':doorNumber', data.doorNumber)
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{t('Create or Open Household')}</h2>
        <BaseFormInput
          id="doorNumber"
          label={t('Door Number')}
          error={errors.doorNumber}
          register={register('doorNumber', {
            required: true,
            maxLength: 20,
          })}
          errorMessage={t('Please enter a valid door number')}
        />
        <BaseWrapper mode={['align-right']}>
          <BaseButton type="submit">{t('Create or Open')}</BaseButton>
        </BaseWrapper>
      </form>
    </>
  );
};
export default CreateHousehold;
