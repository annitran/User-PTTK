import api from "./api";

export interface IAdmin {
  id: number;
  username: string;
}
export interface IAdminParam {
  username: string
  password: string
}

export interface IAdminResponse {
  token: string
}

export const login = (admin: IAdminParam) => {
  return api.post<IAdminResponse>("/login", admin);
};
