import { FC, InputHTMLAttributes } from 'react';
import classes from './BaseInput.module.css';
import { UseFormRegisterReturn } from 'react-hook-form';

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn<any>;
  autoComplete?: string | undefined;
}

const BaseInput: FC<BaseInputProps> = ({
  register,
  autoComplete = 'off',
  ...props
}) => {
  return (
    <input
      className={classes.BaseInput}
      {...register}
      autoComplete={autoComplete}
      {...props}
    />
  );
};
export default BaseInput;
