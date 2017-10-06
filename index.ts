import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelStatic,
  CancelTokenStatic
} from 'axios'

interface RouteInterface {
  params: any
  query: any
  body: any
  response: any
}

interface BaseAPIDef {
  [route: string]: any
}

export interface TypedAxiosRequestConfig<
  APIDef extends BaseAPIDef,
  Path extends keyof APIDef,
  Method extends keyof APIDef[Path],
  RouteDef extends RouteInterface = APIDef[Path][Method]
> extends AxiosRequestConfig {
  url?: Path
  method?: Method
  params?: RouteDef['query']
  data?: RouteDef['body']
}

export interface TypedAxiosResponse<
  APIDef extends BaseAPIDef,
  Path extends keyof APIDef,
  Method extends keyof APIDef[Path],
  RouteDef extends RouteInterface = APIDef[Path][Method]
> extends AxiosResponse {
  data: RouteDef['response']
  config: TypedAxiosRequestConfig<APIDef, Path, Method>
}

export interface TypedAxiosInstance<APIDef extends BaseAPIDef = any>
  extends AxiosInstance {
  request<
    Path extends keyof APIDef,
    Method extends keyof APIDef['Path'] = 'GET'
  >(
    config: TypedAxiosRequestConfig<APIDef, Path, Method>
  ): Promise<TypedAxiosResponse<APIDef, Path, Method>>

  get<Path extends keyof APIDef>(
    url: Path | string,
    config?: TypedAxiosRequestConfig<APIDef, Path, 'GET'>
  ): Promise<TypedAxiosResponse<APIDef, Path, 'GET'>>

  delete<Path extends keyof APIDef>(
    url: Path | string,
    config?: TypedAxiosRequestConfig<APIDef, Path, 'DELETE'>
  ): Promise<TypedAxiosResponse<APIDef, Path, 'DELETE'>>

  head<Path extends keyof APIDef>(
    url: Path | string,
    config?: TypedAxiosRequestConfig<APIDef, Path, 'HEAD'>
  ): Promise<TypedAxiosResponse<APIDef, Path, 'HEAD'>>

  post<Path extends keyof APIDef>(
    url: Path | string,
    data?: APIDef[Path]['POST']['Request'],
    config?: TypedAxiosRequestConfig<APIDef, Path, 'POST'>
  ): Promise<TypedAxiosResponse<APIDef, Path, 'POST'>>

  put<Path extends keyof APIDef>(
    url: Path | string,
    data?: APIDef[Path]['PUT']['Request'],
    config?: TypedAxiosRequestConfig<APIDef, Path, 'PUT'>
  ): Promise<TypedAxiosResponse<APIDef, Path, 'PUT'>>

  patch<Path extends keyof APIDef>(
    url: Path | string,
    data?: APIDef[Path]['PATCH']['Request'],
    config?: TypedAxiosRequestConfig<APIDef, Path, 'PATCH'>
  ): Promise<TypedAxiosResponse<APIDef, Path, 'PATCH'>>
}

export interface TypedAxiosStatic<APIDef extends BaseAPIDef = any>
  extends TypedAxiosInstance<APIDef> {
  <Path extends keyof APIDef, Method extends keyof APIDef['Path'] = 'GET'>(
    config: TypedAxiosRequestConfig<APIDef, Path, Method>
  ): Promise<TypedAxiosResponse<APIDef, Path, Method>>

  <Path extends keyof APIDef, Method extends keyof APIDef['Path']>(
    url: Path | string,
    config?: TypedAxiosRequestConfig<APIDef, Path, Method>
  ): Promise<TypedAxiosResponse<APIDef, Path, Method>>

  create<T extends APIDef>(config?: AxiosRequestConfig): TypedAxiosInstance<T>

  Cancel: CancelStatic
  CancelToken: CancelTokenStatic
  isCancel(value: any): boolean
  all<T>(values: (T | Promise<T>)[]): Promise<T[]>
  spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R
}

const TypedAxios: TypedAxiosStatic = axios as any

export default TypedAxios
