"use client";
import { getTokenCookieName } from "lib/auth-cookies";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { createContext, useContext, useState } from "react";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export interface ApiContextProps {
  PostAPI: (
    url: string,
    data: unknown,
    auth: boolean
  ) => Promise<{ status: number; body: any }>;
  GetAPI: (
    url: string,
    auth: boolean
  ) => Promise<{ status: number; body: any }>;
  PutAPI: (
    url: string,
    data: unknown,
    auth: boolean
  ) => Promise<{ status: number; body: any }>;
  DeleteAPI: (
    url: string,
    auth: boolean
  ) => Promise<{ status: number; body: any }>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  clearToken: () => void;
  addressApi: (url: string) => Promise<{ status: number; body: any }>;
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
}

export const ApiContextProvider = ({ children }: ProviderProps) => {
  const cookies = useCookies();

  const Address = axios.create({
    baseURL: "https://viacep.com.br/ws/",
  });

  const tokenCookieName = getTokenCookieName();
  const [token, setToken] = useState<string>(cookies.get(tokenCookieName) || "");
  function clearToken() {
    cookies.remove(tokenCookieName);
  }
  const api = axios.create({
    baseURL,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        clearToken();
        setToken("");
        if (typeof window !== "undefined") {
          window.location.href = "https://app.juridia.com.br/sign-in?register";
        }
      }
      return Promise.reject(error);
    }
  );

  function config(auth: boolean) {
    return {
      headers: {
        Authorization: auth ? `Bearer ${token}` : "",
        "ngrok-skip-browser-warning": "any",
      },
    };
  }

  const AddressApi = async (url: string) => {
    const connect = await Address.get(url)
      .then(({ data }) => {
        return {
          status: 200,
          body: data,
        };
      })
      .catch((err) => {
        const message = err.response.data;
        const status = err.response.status;
        return { status, body: message };
      });

    return connect.status === 500
      ? {
          status: connect.status,
          body: "Ops! algo deu errado, tente novamente",
        }
      : connect.status === 413
      ? {
          status: connect.status,
          body: "Ops! algo deu errado, tente novamente ou escolha outra imagem",
        }
      : connect;
  };

  function treatResponseData(data: any) {
    if (data && Array.isArray(data.message) && data.message.length > 0) {
      return { ...data, message: data.message[data.message.length - 1] };
    }
    return data;
  }

  async function PostAPI(url: string, data: unknown, auth: boolean) {
    const connect = await api
      .post(url, data, config(auth))
      .then(({ data }) => {
        return {
          status: 200,
          body: data,
        };
      })
      .catch((err) => {
        const message = treatResponseData(err.response?.data);
        const status = err.response?.status || 500;
        return { status, body: message };
      });

    return connect.status === 500 && typeof connect.body === "string" // Verifica se já não foi tratado
      ? {
          status: connect.status,
          body: { message: "Ops! algo deu errado, tente novamente" }, // Padronizei para objeto
        }
      : connect;
  }

  async function GetAPI(url: string, auth: boolean) {
    const connect = await api
      .get(url, config(auth))
      .then(({ data }) => {
        return {
          status: 200,
          body: data,
        };
      })
      .catch((err) => {
        const message = treatResponseData(err.response?.data);
        const status = err.response?.status || 500;
        return { status, body: message };
      });

    return connect.status === 500 && typeof connect.body === "string"
      ? {
          status: connect.status,
          body: { message: "Ops! algo deu errado, tente novamente" },
        }
      : connect;
  }

  async function PutAPI(url: string, data: unknown, auth: boolean) {
    const connect = await api
      .put(url, data, config(auth))
      .then(({ data }) => {
        return {
          status: 200,
          body: data,
        };
      })
      .catch((err) => {
        const message = treatResponseData(err.response?.data);
        const status = err.response?.status || 500;
        return { status, body: message };
      });

    return connect.status === 500 && typeof connect.body === "string"
      ? {
          status: connect.status,
          body: { message: "Ops! algo deu errado, tente novamente" },
        }
      : connect;
  }

  async function DeleteAPI(url: string, auth: boolean) {
    const connect = await api
      .delete(url, config(auth))
      .then(({ data }) => {
        return {
          status: 200,
          body: data,
        };
      })
      .catch((err) => {
        const message = treatResponseData(err.response?.data);
        const status = err.response?.status || 500;
        return { status, body: message };
      });

    return connect.status === 500 && typeof connect.body === "string"
      ? {
          status: connect.status,
          body: { message: "Ops! algo deu errado, tente novamente" },
        }
      : connect;
  }
  return (
    <ApiContext.Provider
      value={{
        token: token ? token : "",
        setToken,
        PostAPI,
        GetAPI,
        clearToken,
        PutAPI,
        DeleteAPI,
        addressApi: AddressApi,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export function useApiContext() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error(
      "useApiContext deve ser usado dentro de um ApiContextProvider"
    );
  }
  return context;
}
