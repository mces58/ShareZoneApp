import { supabase } from 'src/supabase';

import { User } from 'src/constants/types/user';

export const getUserById = async (
  id: string
): Promise<{ data: User | null; success: boolean; error?: Error }> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);

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

export const updateUserById = async (
  id: string,
  newUser: Partial<User>
): Promise<{ data: User | null; success: boolean; error?: Error }> => {
  try {
    const { data: oldUser, success, error: fetchError } = await getUserById(id);

    if (!success || !oldUser) throw new Error(fetchError?.message || 'User not found');

    const mergedUserData = { ...oldUser, ...newUser };

    const { data, error } = await supabase
      .from('users')
      .update(mergedUserData)
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw new Error(error.message);

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
