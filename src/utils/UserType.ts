export type UserType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  //Transform Response
  name?: string;
  avatar: string;
};

export type RequestUserType = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserType[];
};

export const UserState = {
  userList: {} as RequestUserType,
};

export type UserDetailType = {
  data: UserType;
};

export type AuthType = {
  data: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;
    fullname?: string;
  };
};
