export interface UrlTreeResolve {
  route: string;
  querys?: QueryUrlResolve;
}

export interface QueryUrlResolve {
  [key: string]: string;
}
