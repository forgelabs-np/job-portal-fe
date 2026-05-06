export type ApiResponse<T> = {
  success: boolean;
  message: string;
  responseCode: number;
  data: T;
};
