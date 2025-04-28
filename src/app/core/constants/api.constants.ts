import { environment } from "../../../environments/environment";

export const API_CONFIG = {
  baseUrl: `${environment.apiBaseUrl}/${environment.apiVersion}`,
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  }
}
