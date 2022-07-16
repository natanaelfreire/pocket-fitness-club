import axios, { AxiosError, AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  timeout: 1000 * 5
})

const resInterceptor = (response: AxiosResponse | any) => {
  return response;
}

const errInterceptor = async (error: AxiosError | Error | any) => {
  // console.log(error)
  if (axios.isAxiosError(error)) {
    // Desloga o usuário caso a resposta seja unauthorized
    if (error.response?.status == 401) {
      // signOut();
      throw new Error("Tempo de sessão acabou.");
    }
    else {
      throw new Error(error.response?.data as string);
    }
  }
}

api.interceptors.response.use(resInterceptor, errInterceptor);
