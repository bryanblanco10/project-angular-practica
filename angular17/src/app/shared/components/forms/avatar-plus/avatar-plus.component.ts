import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { INVALID_DIMENSIONS_MESSAGE, INVALID_SIZE_MESSAGE, MAX_SIZE } from '@models/constants';
import { ImageCropped, SettingImageCropper } from '@models/interfaces';
import { ImageValidationService } from '@utils/image-validation.service';
import { ErrorModalService } from '@utils/error-modal.service';
import { ImageCropperComponent } from '@components/image-cropper/image-cropper.component';

@Component({
  selector: 'app-avatar-plus',
  standalone: true,
  imports: [CommonModule, ImageCropperComponent],
  templateUrl: './avatar-plus.component.html',
  styleUrls: ['./avatar-plus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarPlusComponent {

  @Input() index = 0;
  @Output() setImageAvatar = new EventEmitter<Blob | null>();
  @ViewChild('imageInput') imageInputElement!: ElementRef;

  image: Blob | string | SafeUrl = '';
  isCropping = false;
  settingImageCropper: SettingImageCropper = {
    cropperMinHeight: 300,
    cropperMinWidth: 300,
    format: 'png',
    maintainAspectRatio: true,
    roundCropper: true,
    aspectRatio: 1/1
  }
  imageChangedEvent: Event | null = null;
  private _imageValidation = inject(ImageValidationService);
  private _sanitizer = inject(DomSanitizer);
  private _errorModalService = inject(ErrorModalService);
  private _cdr = inject(ChangeDetectorRef);

  async readFile(event: Event): Promise<void> {
  
    const file = this._imageValidation.getFileFromEvent(event);

    if (!file) return;

    if (!this.isValidFileSize(file, MAX_SIZE)) {
      this.showModalError(INVALID_SIZE_MESSAGE);
      return;
    }

    const dimensionCheck = await this._imageValidation.checkImageDimensions(file);

    if (dimensionCheck.hasError) {
      this.showModalError(dimensionCheck.errorMessage as string);
      return;
    }

    if (dimensionCheck.isValid) {
      this.showCropper(event);
    } else {
      this.showModalError(INVALID_DIMENSIONS_MESSAGE);
    }

  }

  showCropper(event: Event): void {
    this.imageChangedEvent = event;
    this.isCropping = true;
    this._cdr.markForCheck();
  }

  cancelCrop(): void {
    this.isCropping = false;
    this.imageChangedEvent = null;
    this.imageInputElement.nativeElement.value = '';
    this.setImageAvatar.emit(null);
  }

  imageCropped(event: ImageCropped): void {
    this.image = this._sanitizer.bypassSecurityTrustUrl(event.objectUrl as string);
    this.isCropping = false;
    this.setImageAvatar.emit(event.blob);
  }

  private isValidFileSize(file: File, maxSize: number): boolean {
    return this._imageValidation.validateImageSize(file, maxSize);
  }

  private showModalError(message: string): void {
    this._errorModalService.showModalError(message);
  }
}
