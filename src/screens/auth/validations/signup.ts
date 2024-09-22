import { TranslationOptions } from 'src/contexts';
import * as Yup from 'yup';

class SignupValidation {
  private t: (key: string, options?: TranslationOptions) => string;

  constructor(t: (key: string, options?: TranslationOptions) => string) {
    this.t = t;
  }

  public getUserNameValidation(min: number, max: number): Yup.StringSchema {
    return Yup.string()
      .required(this.t('form.required'))
      .min(min, this.t('form.userNameLength', { min, max }))
      .max(max, this.t('form.userNameLength', { min, max }))
      .matches(
        /^[a-zA-Z0-9_]+$/,
        this.t('form.userNamePattern', { pattern: 'a-z, A-Z, 0-9' })
      );
  }

  public getEmailValidation(limit: number): Yup.StringSchema {
    return Yup.string()
      .required(this.t('form.required'))
      .email(this.t('form.invalidEmail'))
      .max(limit, this.t('form.maxLimit', { limit }));
  }

  public getPasswordValidation(min: number, max: number): Yup.StringSchema {
    return Yup.string()
      .required(this.t('form.required'))
      .min(min, this.t('form.passwordLength', { min, max }))
      .max(max, this.t('form.passwordLength', { min, max }))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        this.t('form.passwordPattern')
      );
  }
}

export default SignupValidation;
