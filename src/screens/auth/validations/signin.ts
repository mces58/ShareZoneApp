import { TranslationOptions } from 'src/contexts';
import * as Yup from 'yup';

class SigninValidation {
  private t: (key: string, options?: TranslationOptions) => string;

  constructor(t: (key: string, options?: TranslationOptions) => string) {
    this.t = t;
  }

  public getEmailValidation(limit: number): Yup.StringSchema {
    return Yup.string()
      .required(this.t('form.required'))
      .email(this.t('form.invalidEmail'))
      .max(limit, this.t('form.maxLimit', { limit }));
  }

  public getPasswordValidation(limit: number): Yup.StringSchema {
    return Yup.string()
      .required(this.t('form.required'))
      .max(limit, this.t('form.maxLimit', { limit }));
  }
}

export default SigninValidation;
