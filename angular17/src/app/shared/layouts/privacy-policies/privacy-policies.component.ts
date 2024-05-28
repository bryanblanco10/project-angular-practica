import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomManipulateService } from '@utils/dom-manipulate.service';
import { BodyClassName } from '@models/enums';

@Component({
  selector: 'app-privacy-policies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policies.component.html',
  styleUrls: ['./privacy-policies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyPoliciesComponent implements OnInit, OnDestroy {

  @Input() hasBackground = true;

  private _domManipulateService = inject(DomManipulateService);

  ngOnInit(): void {
    if (this.hasBackground)
      this._domManipulateService.addBodyClass(BodyClassName.FAQ_BODY);
  }

  ngOnDestroy(): void {
    this._domManipulateService.removeBodyClass(BodyClassName.FAQ_BODY);
  }
}
