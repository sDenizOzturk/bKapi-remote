import BaseFormItem from './BaseFormItem';
import BaseInput from '../BaseInput';
import { FC, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface BaseFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  label: string;
  id: string;
  register: UseFormRegisterReturn<any>;
}

const BaseFormInput: FC<BaseFormInputProps> = ({
  error,
  label,
  id,
  register,
  ...props
}) => {
  return (
    <>
      <BaseFormItem id={id} label={label} error={error}>
        <BaseInput register={register} {...props} />
      </BaseFormItem>
    </>
  );
};
export default BaseFormInput;
