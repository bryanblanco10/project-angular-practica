import { Injectable } from '@angular/core';
import { environment as ENV } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { FeatureFlagStatus } from '@models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {

  private API = `${ENV.webApi}/v2/EnableFeatures`;

  constructor(private http: HttpClient) { }

  getAllFeaturesStatus(): Observable<FeatureFlagStatus[]> {
    return this.http.get<FeatureFlagStatus[]>(this.API + '/GetAllFeaturesStatus/')
    .pipe(shareReplay(1));
  }
}
