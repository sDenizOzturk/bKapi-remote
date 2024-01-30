import { useTranslation } from 'react-i18next';
import classes from './BaseFormItem.module.css';
import { FC, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

interface BaseFormItemProps {
  label: string;
  error: FieldError | undefined;
  id: string;
  children: ReactNode;
}

const BaseFormItem: FC<BaseFormItemProps> = ({
  label,
  error,
  id,
  children,
}) => {
  const { t } = useTranslation();
  const ErrorMessage = t('Please enter a valid value');
  return (
    <div className={classes['form-control']}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <label htmlFor={id} className={classes['label-error']}>
          {ErrorMessage}
        </label>
      )}
    </div>
  );
};
export default BaseFormItem;
