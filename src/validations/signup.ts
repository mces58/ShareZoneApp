import * as Yup from 'yup';

export class SignupValidation {
  private t: (key: string, options?: Record<string, unknown>) => string;

  constructor(t: (key: string, options?: Record<string, unknown>) => string) {
    this.t = t;
  }

  public getUserNameValidation(): Yup.StringSchema {
    return Yup.string()
      .required(this.t('form.required'))
      .min(3, this.t('form.userNameLength', { min: 3, max: 20 }))
      .max(20, this.t('form.userNameLength', { min: 3, max: 20 }))
      .matches(
        /^[a-zA-Z0-9_]+$/,
        this.t('form.userNamePattern', { pattern: 'a-z, A-Z, 0-9' })
      );
  }

  public getEmailValidation(): Yup.StringSchema {
    return Yup.string()
      .required(this.t('form.required'))
      .email(this.t('form.invalidEmail'));
  }

  public getPasswordValidation(): Yup.StringSchema {
    return Yup.string()
      .required(this.t('form.required'))
      .min(6, this.t('form.passwordLength', { min: 6, max: 20 }))
      .max(20, this.t('form.passwordLength', { min: 6, max: 20 }))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        this.t('form.passwordPattern')
      );
  }
}
