export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  about: string;
}

export interface UserState {
  data: IUser | null;
  status: string;
}

export interface IComments {
  _id: string;
  comment: string;
  user: number | IUser;
  createdAt: Date;
  updatedAt: Date;
  _v: number;
}

export interface CommentsState {
  comments: IComments[];
  lastComments: IComments[];
  loading: boolean;
}

export interface IPost {
    _id: string;
    title: string;
    text: string;
    tags: string[];
    viewsCount: number;
    comments: string[];
    user: IUser | string;
    commentsCount: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    _v: number;
}

export interface PostsState {
    posts: {
        items: IPost[],
        status: string,
      },
      tags: {
        items: string[],
        status: string,
      },
      tagPosts: {
        items: IPost[],
        status: string,
      },
  }