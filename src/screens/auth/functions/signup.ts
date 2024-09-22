import { supabase } from 'src/supabase';

import { ToastType } from 'src/components/toasts/Base';
import { SignupData } from 'src/constants/types/user';
import { TranslationOptions } from 'src/contexts/i18n-context';

interface SignupParams {
  data: unknown;
  formRef: React.MutableRefObject<{ reset: () => void } | null>;
  setLoading: (loading: boolean) => void;
  setToast: (toast: { message: string; type: ToastType } | null) => void;
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
    setToast({ message: t('toast.success.accountCreated'), type: ToastType.Success });
  } catch (err: unknown) {
    if (err instanceof Error)
      setToast({
        message: t('toast.error.userAlreadyRegistered', { email }),
        type: ToastType.Error,
      });
    else setToast({ message: t('error.default'), type: ToastType.Error });
  } finally {
    if (formRef.current) formRef.current.reset();
    setLoading(false);
  }
};

export default SignupFunction;
