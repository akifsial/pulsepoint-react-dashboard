export interface PrimaryBtnProps {
  btnText: string;
  btnTextClass?: string;
  btnClass?: string;
  img?: string;
  imgalt?:string;
  showImg?: boolean;
  imgClass?: string;
  onClick?: () => void;
  linkTo?: string;
  imgPosition?: 'left' | 'right';
  disabled?: boolean;
}
