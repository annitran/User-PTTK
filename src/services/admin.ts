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

// Log in
export const login = (admin: IAdminParam) => {
  return api.post<IAdminResponse>("/login", admin);
};

// Log out
export const logout = () => {
  return api.post("/admin/logout");
};

// Get admin auth
export const getAdmin = () => {
  return api.get<{ admin: IAdmin }>('/admin/me')
}
