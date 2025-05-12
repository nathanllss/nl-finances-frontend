import {environment} from "../../../environments/environment";

export const API_CONFIG = {
    baseUrl: `${environment.apiBaseUrl}/${environment.apiVersion}`,
    auth: {
        login: "/auth/login",
        register: "/auth/register",
    },
    users: {
        me: "/users/me",
    },
    transactions: {
        getAll: "/transactions",
        getById: (id: string) => `/transactions/${id}`,
        create: "/transactions",
        update: (id: string) => `/transactions/${id}`,
        delete: (id: string) => `/transactions/${id}`,
    },
}
