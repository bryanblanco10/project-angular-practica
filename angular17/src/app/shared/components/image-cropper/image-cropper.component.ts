import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropped, SettingImageCropper } from '@models/interfaces';
import { ErrorModalService } from '@utils/error-modal.service';

@Component({
  selector: 'app-image-cropper',
  standalone: true,
  imports: [CommonModule, ImageCropperModule],
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCropperComponent {
  @Input() imageChangedEvent!: Event | null;
  @Input() showCropper!: boolean;
  @Input() settingImageCropper!: SettingImageCropper;
  @Output() sendImageCropped = new EventEmitter<ImageCropped>();
  @Output() cancelCropEvent = new EventEmitter<void>();

  croppedImage!: ImageCroppedEvent | null;
  private errorMessage = 'Algo ha ocurrido en la carga de la imagen.'
  private _errorModalService = inject(ErrorModalService);

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event;
  }

  cancelCrop(): void {
    this.croppedImage = null;
    this.cancelCropEvent.emit();
  }

  finishCrop(): void {
    const imageCropped = {
      objectUrl: this.croppedImage?.objectUrl as string,
      base64: this.croppedImage?.base64 as string,
      blob: this.croppedImage?.blob as Blob
    }
    this.sendImageCropped.emit(imageCropped);
  }

  loadImageFailed(): void {
    this._errorModalService.showModalError(this.errorMessage);
    this.cancelCrop();
  }

}
