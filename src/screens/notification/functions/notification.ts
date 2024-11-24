import { Dispatch, SetStateAction } from 'react';

import { getNotifications } from 'src/services';

import { NotificationData } from 'src/constants/types';

interface NotificationFunctionParams {
  setNotifications: Dispatch<SetStateAction<NotificationData[]>>;
  user: { id: string };
}

const FetchNotificationsFunction = async ({
  setNotifications,
  user,
}: NotificationFunctionParams): Promise<void> => {
  try {
    const res = await getNotifications(user.id);
    if (res.success && res.data) {
      setNotifications(res.data);
    }
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error fetching notifications');
  }
};

export default FetchNotificationsFunction;
