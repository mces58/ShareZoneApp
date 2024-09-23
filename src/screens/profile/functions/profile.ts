import { Alert } from 'react-native';

import { TranslationOptions } from 'src/contexts';
import { supabase } from 'src/supabase';

import { User } from 'src/constants/types';

interface FunctionParams {
  setAuthData: (user: User | null) => void;
  t: (key: string, options?: TranslationOptions) => string;
}

const onSignout = async ({ setAuthData, t }: FunctionParams): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) Alert.alert(t('error.default'), error.message);
  else setAuthData(null);
};

const SignoutFunction = ({ setAuthData, t }: FunctionParams): void => {
  Alert.alert(t('global.confirm'), t('profile.signout?'), [
    {
      text: t('global.cancel'),
      style: 'cancel',
    },
    {
      text: t('global.ok'),
      onPress: async (): Promise<void> => await onSignout({ setAuthData, t }),
      style: 'destructive',
    },
  ]);
};

export default SignoutFunction;
