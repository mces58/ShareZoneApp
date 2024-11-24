import { User } from './user';

export interface NotificationData {
  created_at: string;
  data: string;
  id: string;
  receiver_id: string;
  sender: User;
  sender_id: string;
  title: string;
}
