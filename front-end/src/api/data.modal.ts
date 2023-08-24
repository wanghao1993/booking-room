export interface UserInfo {
  id: number;
  username: string;
  nickName: string;
  email: string;
  phoneNumber?: any;
  headPic?: any;
  createTime: number;
  isFrozen: boolean;
  isAdmin: boolean;
  roles: any[];
  permissions: any[];
}

export interface LoginResModal {
  userInfo: UserInfo;
  accessToken: string;
  refreshToken: string;
}
