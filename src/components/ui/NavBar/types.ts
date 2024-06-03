export type TNavBar = {
  children: React.ReactNode;
};

export type TNavBarItem = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  customClass?: string;
  link?: string
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>> | undefined
};
