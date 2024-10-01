import { Dispatch, MutableRefObject, SetStateAction } from 'react';

import { TranslationOptions } from 'src/contexts';
import { supabase } from 'src/supabase';

import { ToastTypes } from 'src/components/toasts';
import { SignupData } from 'src/constants/types';

interface SignupParams {
  data: unknown;
  formRef: MutableRefObject<{ reset: () => void } | null>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setToast: Dispatch<SetStateAction<{ message: string; type: ToastTypes } | null>>;
  t: (key: string, options?: TranslationOptions) => string;
}

const SignupFunction = async ({
  data,
  formRef,
  setLoading,
  setToast,
  t,
}: SignupParams): Promise<void> => {
  const { email, password, user_name } = data as SignupData;
  setLoading(true);
  setToast(null);
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { user_name, email, isNewUser: true } },
    });
    if (error) throw new Error(error.message);
    setToast({ message: t('toast.success.accountCreated'), type: ToastTypes.Success });
  } catch (err: unknown) {
    if (err instanceof Error)
      setToast({
        message: t('toast.error.userAlreadyRegistered', { email }),
        type: ToastTypes.Error,
      });
    else setToast({ message: t('error.default'), type: ToastTypes.Error });
  } finally {
    if (formRef.current) formRef.current.reset();
    setLoading(false);
  }
};

export default SignupFunction;
