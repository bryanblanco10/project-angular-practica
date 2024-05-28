import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FeatureFlagService } from '@services/feature-flag.service';
import { FeatureFlagStatus } from '@models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsManagementService {

  private _featureFlagService = inject(FeatureFlagService);

  checkFeatureOn$(featureName: string): Observable<boolean> {
    return this._featureFlagService.getAllFeaturesStatus().pipe(
      map((features) => features.find((item) => item.feature === featureName)),
      map((feature: FeatureFlagStatus | undefined) => feature ? feature.status : false)
    )
  }

}
