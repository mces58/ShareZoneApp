import * as Yup from 'yup';

import { TranslationOptions } from 'src/contexts/i18n-context';

export class SigninValidation {
  private t: (key: string, options?: TranslationOptions) => string;

  constructor(t: (key: string, options?: TranslationOptions) => string) {
    this.t = t;
  }

  public getEmailValidation(): Yup.StringSchema {
    return Yup.string()
      .required(this.t('form.required'))
      .email(this.t('form.invalidEmail'));
  }

  public getPasswordValidation(): Yup.StringSchema {
    return Yup.string().required(this.t('form.required'));
  }
}
