export interface SettingImageCropper {
  maintainAspectRatio: boolean;
  roundCropper: boolean;
  format: string;
  cropperMinWidth: number;
  cropperMinHeight: number;
  aspectRatio: number;
}

export interface ImageCropped {
  objectUrl: string;
  base64: string;
  blob: Blob;
}
