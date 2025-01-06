interface RestResponse<T> {
  ok: boolean;
  error: string | null;
  data: T;
}

export type { RestResponse };
