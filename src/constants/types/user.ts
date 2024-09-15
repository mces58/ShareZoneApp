export interface SignupData {
  email: string;
  password: string;
  userName: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface User {
  address?: string;
  bio?: string;
  createdAt?: Date;
  email?: string;
  id?: string;
  image?: string;
  phoneNumber?: string;
  userName?: string;
}
