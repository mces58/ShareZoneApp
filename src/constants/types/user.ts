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

export interface PostData {
  body: string;
  created_at: string;
  file: string;
  id: string;
  post_likes: {
    created_at: string;
    id: string;
    post_id: string;
    user_id: string;
  }[];
  user_id: string;
  user?: User;
}
