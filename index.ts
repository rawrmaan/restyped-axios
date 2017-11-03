import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelStatic,
  CancelTokenStatic
} from 'axios'

import {RestypedBase, RestypedRoute} from 'restyped'

export interface TypedAxiosRequestConfig<
  API extends RestypedBase,
  Path extends keyof API,
  Method extends keyof API[Path],
  RouteDef extends RestypedRoute = API[Path][Method]
> extends AxiosRequestConfig {
  url?: Path
  method?: Method
  params?: RouteDef['query']
  data?: RouteDef['body']
}

export interface TypedAxiosResponse<
  API extends RestypedBase,
  Path extends keyof API,
  Method extends keyof API[Path],
  RouteDef extends RestypedRoute = API[Path][Method]
> extends AxiosResponse {
  data: RouteDef['response']
  config: TypedAxiosRequestConfig<API, Path, Method>
}

export interface TypedAxiosInstance<API extends RestypedBase = any>
  extends AxiosInstance {
  request<Path extends keyof API, Method extends keyof API[Path] = 'GET'>(
    config: TypedAxiosRequestConfig<API, Path, Method>
  ): Promise<TypedAxiosResponse<API, Path, Method>>

  get<Path extends keyof API>(
    url: Path | string,
    config?: TypedAxiosRequestConfig<API, Path, 'GET'>
  ): Promise<TypedAxiosResponse<API, Path, 'GET'>>

  delete<Path extends keyof API>(
    url: Path | string,
    config?: TypedAxiosRequestConfig<API, Path, 'DELETE'>
  ): Promise<TypedAxiosResponse<API, Path, 'DELETE'>>

  head<Path extends keyof API>(
    url: Path | string,
    config?: TypedAxiosRequestConfig<API, Path, 'HEAD'>
  ): Promise<TypedAxiosResponse<API, Path, 'HEAD'>>

  post<Path extends keyof API>(
    url: Path | string,
    data?: API[Path]['POST']['body'],
    config?: TypedAxiosRequestConfig<API, Path, 'POST'>
  ): Promise<TypedAxiosResponse<API, Path, 'POST'>>

  put<Path extends keyof API>(
    url: Path | string,
    data?: API[Path]['PUT']['body'],
    config?: TypedAxiosRequestConfig<API, Path, 'PUT'>
  ): Promise<TypedAxiosResponse<API, Path, 'PUT'>>

  patch<Path extends keyof API>(
    url: Path | string,
    data?: API[Path]['PATCH']['body'],
    config?: TypedAxiosRequestConfig<API, Path, 'PATCH'>
  ): Promise<TypedAxiosResponse<API, Path, 'PATCH'>>
}

export interface TypedAxiosStatic<API extends RestypedBase = any>
  extends TypedAxiosInstance<API> {
  <Path extends keyof API, Method extends keyof API[Path] = 'GET'>(
    config: TypedAxiosRequestConfig<API, Path, Method>
  ): Promise<TypedAxiosResponse<API, Path, Method>>

  <Path extends keyof API, Method extends keyof API[Path]>(
    url: Path | string,
    config?: TypedAxiosRequestConfig<API, Path, Method>
  ): Promise<TypedAxiosResponse<API, Path, Method>>

  create<T extends API>(config?: AxiosRequestConfig): TypedAxiosInstance<T>

  Cancel: CancelStatic
  CancelToken: CancelTokenStatic
  isCancel(value: any): boolean
  all<T>(values: (T | Promise<T>)[]): Promise<T[]>
  spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R
}

const TypedAxios: TypedAxiosStatic = axios as any

export default TypedAxios
