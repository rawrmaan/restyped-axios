import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelStatic,
  CancelTokenStatic
} from 'axios'

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD'

// interface NeverTypes {
//   GET: ReqResVoid
//   POST: ReqResVoid
//   PUT: ReqResVoid
//   PATCH: ReqResVoid
//   DELETE: ReqResVoid
//   HEAD: ReqResVoid
// }

// interface ReqResVoid {
//   Request: void
//   Response: void
// }

interface ReqResInterface {
  Request: any
  Response: any
}

interface BaseAPIDef {
  [route: string]: any
}

interface TypedAPIRequest<
  APIDef extends BaseAPIDef = BaseAPIDef,
  Path extends keyof APIDef = string,
  Method extends keyof APIDef[Path] = HTTPMethod,
  RouteDef extends ReqResInterface = APIDef[Path][Method]
> {
  Path: Path | string
  Method: Method
  Request: RouteDef['Request']
  Response: RouteDef['Response']
}

export interface TypedAxiosPromise<T extends TypedAPIRequest>
  extends Promise<TypedAxiosResponse<T>> {}

export interface TypedAxiosRequestConfig<T extends TypedAPIRequest>
  extends AxiosRequestConfig {
  url?: T['Path']
  method?: T['Method']
  params?: T['Request']
  data?: T['Request']
}

export interface TypedAxiosResponse<
  T extends TypedAPIRequest,
  Data extends Object = T['Response']
> extends AxiosResponse {
  data: Data
  config: TypedAxiosRequestConfig<T>
}

export interface TypedAxiosInstance<APIDef extends BaseAPIDef = any>
  extends AxiosInstance {
  request<T extends TypedAPIRequest>(
    config: TypedAxiosRequestConfig<T>
  ): TypedAxiosPromise<T>

  get<Path extends keyof APIDef>(
    url: Path | string,
    config?: TypedAxiosRequestConfig<TypedAPIRequest<APIDef, Path, 'GET'>>
  ): TypedAxiosPromise<TypedAPIRequest<APIDef, Path, 'GET'>>

  delete<Path extends keyof APIDef>(
    url: Path | string,
    config?: TypedAxiosRequestConfig<TypedAPIRequest<APIDef, Path, 'DELETE'>>
  ): TypedAxiosPromise<TypedAPIRequest<APIDef, Path, 'DELETE'>>

  head<Path extends keyof APIDef>(
    url: Path | string,
    config?: TypedAxiosRequestConfig<TypedAPIRequest<APIDef, Path, 'HEAD'>>
  ): TypedAxiosPromise<TypedAPIRequest<APIDef, Path, 'HEAD'>>

  post<Path extends keyof APIDef>(
    url: Path | string,
    data?: APIDef[Path]['POST']['Request'],
    config?: TypedAxiosRequestConfig<TypedAPIRequest<APIDef, Path, 'POST'>>
  ): TypedAxiosPromise<TypedAPIRequest<APIDef, Path, 'POST'>>

  put<Path extends keyof APIDef>(
    url: Path | string,
    data?: APIDef[Path]['PUT']['Request'],
    config?: TypedAxiosRequestConfig<TypedAPIRequest<APIDef, Path, 'PUT'>>
  ): TypedAxiosPromise<TypedAPIRequest<APIDef, Path, 'PUT'>>

  patch<Path extends keyof APIDef>(
    url: Path | string,
    data?: APIDef[Path]['PATCH']['Request'],
    config?: TypedAxiosRequestConfig<TypedAPIRequest<APIDef, Path, 'PATCH'>>
  ): TypedAxiosPromise<TypedAPIRequest<APIDef, Path, 'PATCH'>>
}

export interface TypedAxiosStatic<APIDef extends BaseAPIDef = any>
  extends TypedAxiosInstance<APIDef> {
  <T extends TypedAPIRequest>(
    config: TypedAxiosRequestConfig<T>
  ): TypedAxiosPromise<T>

  <T extends TypedAPIRequest>(
    url: string,
    config?: TypedAxiosRequestConfig<T>
  ): TypedAxiosPromise<T>

  create<T extends APIDef>(
    config?: TypedAxiosRequestConfig<TypedAPIRequest<T>>
  ): TypedAxiosInstance<T>

  Cancel: CancelStatic
  CancelToken: CancelTokenStatic
  isCancel(value: any): boolean
  all<T>(values: (T | Promise<T>)[]): Promise<T[]>
  spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R
}

const TypedAxios: TypedAxiosStatic = axios as any

export default TypedAxios

