import { User } from 'src/constants/types/user';
import { supabase } from 'src/supabase/supabase';

export const fetchUserById = async (
  id: string
): Promise<{ data: User | null; success: boolean; error?: Error }> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('User not found');
    }

    return {
      success: true,
      data,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error : new Error('Unknown error occurred');
    return {
      success: false,
      data: null,
      error: errorMessage,
    };
  }
};
