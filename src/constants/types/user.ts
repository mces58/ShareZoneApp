export interface SignupData {
  email: string;
  password: string;
  user_name: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface User {
  address?: string;
  bio?: string;
  created_at?: string;
  email?: string;
  id?: string;
  image?: string;
  phone_number?: string;
  user_name?: string;
}
