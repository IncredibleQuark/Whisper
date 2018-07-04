export interface IApiResponse<T> {
  readonly status: 'success' | 'error';
  readonly data: T;
}
