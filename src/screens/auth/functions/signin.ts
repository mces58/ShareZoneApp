import { ToastType } from 'src/components/toasts/Base';
import { SigninData } from 'src/constants/types/user';
import { TranslationOptions } from 'src/contexts/i18n-context';
import { supabase } from 'src/supabase/supabase';

interface SigninParams {
  data: unknown;
  formRef: React.MutableRefObject<{ reset: () => void } | null>;
  setLoading: (loading: boolean) => void;
  setToast: (toast: { message: string; type: ToastType } | null) => void;
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
        type: ToastType.Error,
      });
    else setToast({ message: t('error.default'), type: ToastType.Error });
  } finally {
    if (formRef.current) formRef.current.reset();
    setLoading(false);
  }
};

export default SigninFunction;