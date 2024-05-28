import { Injectable } from '@angular/core';
import { handledAsyncFunction } from '@helpers/handle-try-catch.helper';
import { ERROR_LOAD_IMAGE_MEESSAGE, MIN_HEIGHT, MIN_WIDTH } from '@models/constants';

interface ImageDimensionCheckResult {
  hasError: boolean;
  errorMessage?: string;
  isValid?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ImageValidationService {

  getFileFromEvent(event: Event): File | null {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return null;
    }

    return input.files[0];
  }

  validateImageSize(file: File, maxSize: number): boolean {
    return file.size <= maxSize;
  }

  async checkImageDimensions(file: File): Promise<ImageDimensionCheckResult> {
    const imgSrc = window.URL.createObjectURL(file);
    const promiseImageValidation = this.validateImageDimensions(imgSrc, MIN_WIDTH, MIN_HEIGHT);
    const [isValid, error] = await handledAsyncFunction<boolean, string>(promiseImageValidation);

    if (error) {
      return {
        hasError: true,
        errorMessage: error,
      };
    }

    return {
      hasError: false,
      isValid: Boolean(isValid),
    };
  }

  private validateImageDimensions(src: string, minWidth: number, minHeight: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        resolve(img.width >= minWidth && img.height >= minHeight);
      };

      img.onerror = () => {
        reject(new Error(ERROR_LOAD_IMAGE_MEESSAGE));
      };
    });
  }

}
