export type TDropDownItem = {
  avatarUrl?: string;
  onClick?: () => void;
  setActiveMenu?: React.Dispatch<React.SetStateAction<string>>;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  children?: React.ReactNode;
  goToMenu?: string;
  link?: string;
};
