import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomManipulateService } from '@utils/dom-manipulate.service';
import { BodyClassName } from '@models/enums';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqComponent implements OnInit, OnDestroy {

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
