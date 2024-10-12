import { User } from './user';

export interface Comment {
  created_at: string;
  id: string;
  post_id: string;
  text: string;
  user: User;
  user_id: string;
}

export interface Like {
  created_at: string;
  id: string;
  post_id: string;
  user_id: string;
}

export interface PostData {
  body: string;
  created_at: string;
  file: string;
  id: string;
  user_id: string;
  comments?: Comment[];
  post_likes?: Like[];
  user?: User;
}
