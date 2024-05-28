export interface User {
  name: string;
  isPremium: boolean;
  userName: string;
  email: string;
  country: string;
  city: string;
  address: string;
  zipCode: string;
  state: string;
  profileImage: string;
  contentUserPlayed: ContentUserPlayed[];
  id: string;
  isSuscriptionPlanEnabled: boolean;
  suscriptionPlanId: string;
  planId: string;
  planName: string;
  videoUserViews: VideoUserView[];
  yearOfBirth: number;
  birthdayDate?: Date;
  gender: string;
  surname: string;
  givenName: string;
  createdDate: Date;
  imageAvatar?: ImageAvatar;
  imageAvatarId?: string;
}

interface ImageAvatar {
  id: string;
  imageType: ImageType;
  imageTypeId: string;
  url: string;
}

interface ImageType {
  id: string;
  name: string;
}

interface ContentUserPlayed {
  userId: string;
  contentId: string;
  playedDate: Date;
  percentage: number;
}

interface VideoUserView {
  userId: string;
  videoId: string;
  viewDate: Date;
  secondEnd: number;
  totalSeconds: number;
}
