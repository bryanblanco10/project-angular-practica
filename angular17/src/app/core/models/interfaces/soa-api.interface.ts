export interface ResponseSoaApi<T> {
  success: boolean;
  errors: string[] | null;
  value: T;
}
