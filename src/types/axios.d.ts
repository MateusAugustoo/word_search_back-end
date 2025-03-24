import axios from "axios";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {
    response: T;
  }
}