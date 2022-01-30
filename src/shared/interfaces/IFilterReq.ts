interface IFilterReq<T> {
  filters?: {
    [P in keyof T]?: T[P] extends (infer U)[]
      ? IFilterReq<U>[]
      : T[P] extends object
      ? IFilterReq<T[P]>
      : T[P];
  };
}

export { IFilterReq };
