import { IComments } from "../../redux/slices/types";

export type TCommentsBlock = {
  items: IComments[];
  children: React.ReactNode;
  isLoading: boolean
};
