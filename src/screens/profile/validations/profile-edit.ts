import * as Yup from 'yup';

import { TranslationOptions } from 'src/contexts/i18n-context';

class ProfileEditValidation {
  private t: (key: string, options?: TranslationOptions) => string;

  constructor(t: (key: string, options?: TranslationOptions) => string) {
    this.t = t;
  }

  public getUserNameValidation(min: number, max: number): Yup.StringSchema {
    return Yup.string()
      .min(min, this.t('form.userNameLength', { min, max }))
      .max(max, this.t('form.userNameLength', { min, max }))
      .matches(
        /^[a-zA-Z0-9_]+$/,
        this.t('form.userNamePattern', { pattern: 'a-z, A-Z, 0-9' })
      );
  }

  public getPhoneNumberValidation(): Yup.StringSchema {
    return Yup.string().matches(
      /^\(\d{3}\)\s\d{3}\s\d{4}$/,
      this.t('form.phoneNumberPattern', { pattern: '(XXX) XXX XXXX' })
    );
  }

  public getMaxLimitValidation(limit: number): Yup.StringSchema {
    return Yup.string().max(limit, this.t('form.maxLimit', { limit }));
  }
}

export default ProfileEditValidation;
