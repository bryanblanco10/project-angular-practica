import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '@environments/environment';
import { Observable } from 'rxjs';
import { Country, Department, DialCode, District, State, StateSOA } from '@models/interfaces';
import { ResponseSoaApi } from '@interfaces/soa-api.interface';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private API = `${ENV.webApi}/v2/country`;
  private SOA_API = `${ENV.soaApiBaseUrl}`;

  constructor(private http: HttpClient) { }

  getCountriesLite(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.API}/list/lite`);
  }

  getStates(countryCode = 'us'): Observable<State[]> {
    return this.http.get<State[]>(`${this.API}/${countryCode}/states?orderBy=nameEnglish`);
  }

  getDepartments(stateCode = 'us'): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.API}/${stateCode}/departments?orderBy=nameEnglish`);
  }

  getDistricts(departmentCode: string): Observable<District[]> {
    return this.http.get<District[]>(`${this.API}/${departmentCode}/districts?orderBy=nameEnglish`);
  }

  getStateByCountry(countryId: string): Observable<ResponseSoaApi<StateSOA[]>> {
    const url = `${this.SOA_API}Country/getStatesByCountry/${countryId}`;
    return this.http.get<ResponseSoaApi<StateSOA[]>>(url);
  }

  getDialCodeByCountryId(countryId: string): Observable<ResponseSoaApi<DialCode>> {
    const url = `${this.SOA_API}Country/getDialCode/${countryId}`;
    return this.http.get<ResponseSoaApi<DialCode>>(url);
  }

  getDialCodes(): Observable<ResponseSoaApi<DialCode[]>> {
    const url = `${this.SOA_API}Country/dialcodes/`;
    return this.http.get<ResponseSoaApi<DialCode[]>>(url);
  }

}
