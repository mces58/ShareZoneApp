import React from 'react';

import Icon from 'src/assets/icons';
import { FormField } from 'src/components/forms/Base';
import { Theme } from 'src/constants/styles/themes';
import { TranslationOptions } from 'src/contexts/i18n-context';
import { scaleByAspectRatio } from 'src/utils/dimensions';
import { SigninValidation } from 'src/validations/signin';

interface SigninFormFields {
  t: (key: string, options?: TranslationOptions) => string;
  theme: Theme;
  validation: SigninValidation;
}

export const createSigninFormFields = ({
  t,
  theme,
  validation,
}: SigninFormFields): FormField[] => [
  {
    name: 'email',
    placeholder: t('form.input.email'),
    type: 'text' as const,
    icon: (
      <Icon
        name="mail"
        size={scaleByAspectRatio(20)}
        color={{ mono: theme.color.textMuted }}
        strokeWidth={1}
      />
    ),
    validation: validation.getEmailValidation(),
  },
  {
    name: 'password',
    placeholder: t('form.input.password'),
    type: 'password' as const,
    icon: (
      <Icon
        name="lock"
        size={scaleByAspectRatio(20)}
        color={{ mono: theme.color.textMuted }}
        strokeWidth={1}
      />
    ),
    validation: validation.getPasswordValidation(),
    extraIcon: (
      <Icon
        name="eyes"
        size={scaleByAspectRatio(20)}
        color={{ mono: theme.color.textMuted }}
        strokeWidth={1.25}
      />
    ),
  },
];
