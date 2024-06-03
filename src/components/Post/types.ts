import { IUser } from "../../redux/slices/types";

export type TPost = {
  id?: string;
  title?: string;
  createdAt?: Date;
  imageUrl?: string;
  user?: IUser;
  viewsCount?: number;
  commentsCount?: number;
  tags?: string[];
  children?: React.ReactNode;
  isFullPost?: boolean;
  isLoading?: boolean;
  isEditable?: boolean;
};
