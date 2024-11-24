import { supabase } from 'src/supabase';

import { NotificationData } from 'src/constants/types';

export const sendNotification = async (
  data: string,
  receiverId: string,
  senderId: string,
  title: string
): Promise<{
  data: NotificationData | null;
  success: boolean;
  error?: Error;
}> => {
  try {
    const { data: response, error } = await supabase
      .from('notifications')
      .insert({
        sender_id: senderId,
        receiver_id: receiverId,
        title,
        data,
      })
      .select('*')
      .single();

    if (error) throw error instanceof Error ? error : new Error(String(error));

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error : new Error('Unknown error occurred');
    return {
      success: false,
      data: null,
      error: errorMessage,
    };
  }
};

export const getNotifications = async (
  receiverId: string
): Promise<{
  data: NotificationData[] | null;
  success: boolean;
  error?: Error;
}> => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*, sender:sender_id(*)')
      .eq('receiver_id', receiverId)
      .order('created_at', { ascending: false });

    if (error) throw error instanceof Error ? error : new Error(String(error));

    return {
      success: true,
      data,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error : new Error('Unknown error occurred');
    return {
      success: false,
      data: null,
      error: errorMessage,
    };
  }
};
