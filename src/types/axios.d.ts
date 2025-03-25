import axios from "axios";

interface response {
  response: string;
}

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {
    response: response;
  }
}