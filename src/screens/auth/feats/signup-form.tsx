import React from 'react';

import { TranslationOptions } from 'src/contexts';
import { scaleByAspectRatio } from 'src/utils';

import Icon from 'src/assets/icons';
import { FormField } from 'src/components/forms/Base';
import { Theme } from 'src/constants/styles/themes';

import { SignupValidation } from '../validations';

interface SignupFormFields {
  t: (key: string, options?: TranslationOptions) => string;
  theme: Theme;
  validation: SignupValidation;
}

const createSignupFormFields = ({
  t,
  theme,
  validation,
}: SignupFormFields): FormField[] => [
  {
    name: 'user_name',
    placeholder: t('form.input.userName'),
    type: 'text' as const,
    icon: (
      <Icon
        name="user"
        size={scaleByAspectRatio(20)}
        color={{ mono: theme.color.textMuted }}
        strokeWidth={1}
      />
    ),
    maxLength: 20,
    validation: validation.getUserNameValidation(3, 20),
  },
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
    inputMode: 'email',
    maxLength: 50,
    validation: validation.getEmailValidation(50),
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
    maxLength: 20,
    validation: validation.getPasswordValidation(6, 20),
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

export default createSignupFormFields;
