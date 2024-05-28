import { QueryUrlResolve, UrlTreeResolve } from "@interfaces/urls.interface";


export const resolveUrl = (url: string): UrlTreeResolve => {
    const urlSplit = url.split('?');
    return {
      route: urlSplit[0],
      querys: urlSplit[1] ? buildQueryParams(urlSplit[1]) : {},
    };
  };
  
  const buildQueryParams = (query: string): QueryUrlResolve => {
    const querys = query.split('&');
    let listParameters = {};
    querys.forEach((item) => {
      const parameter = item.split('=');
      listParameters = {
        ...listParameters,
        [parameter[0]]: decodeURI(parameter[1]),
      };
    });
    return listParameters;
  };