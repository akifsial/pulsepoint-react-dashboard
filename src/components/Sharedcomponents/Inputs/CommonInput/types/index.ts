import { InputHTMLAttributes } from 'react';

export interface CommonInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  showImg?: boolean;
  imgSrc?: string;
  imgLeft?: boolean;
  inputClassName?: string;
  containerClassName?: string;
}
