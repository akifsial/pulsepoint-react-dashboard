export interface PrimaryBtnProps {
    btnText: string;
    btnTextClass?: string;
    btnClass?: string;
    img?: string;
    showImg?: boolean;
    imgClass?: string;
    onClick?: () => void;
    Link?: string;
    imgPosition?: "left" | "right";
  }
  