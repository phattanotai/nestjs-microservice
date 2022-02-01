import { type } from "os";

export type USER_TYPE = {
  id: number;
  name: string;
  email: string;
  useranme: string;
  role: string;
  imagePath: string;
};

export type USER_LOGIN = {
  username: string;
  password: string;
  remember: boolean;
};
