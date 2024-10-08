import { Dispatch, MutableRefObject, SetStateAction } from 'react';

import { TranslationOptions } from 'src/contexts';
import { supabase } from 'src/supabase';

import { ToastTypes } from 'src/components/toasts';
import { SigninData } from 'src/constants/types';

interface SigninParams {
  data: unknown;
  formRef: MutableRefObject<{ reset: () => void } | null>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setToast: Dispatch<SetStateAction<{ message: string; type: ToastTypes } | null>>;
  t: (key: string, options?: TranslationOptions) => string;
}
const SigninFunction = async ({
  data,
  formRef,
  setLoading,
  setToast,
  t,
}: SigninParams): Promise<void> => {
  const { email, password } = data as SigninData;
  setLoading(true);
  setToast(null);
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
  } catch (err: unknown) {
    if (err instanceof Error)
      setToast({
        message: t('toast.error.invalidLoginCredentials'),
        type: ToastTypes.Error,
      });
    else setToast({ message: t('error.default'), type: ToastTypes.Error });
  } finally {
    if (formRef.current) formRef.current.reset();
    setLoading(false);
  }
};

export default SigninFunction;
