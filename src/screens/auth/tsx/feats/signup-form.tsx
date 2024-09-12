import React from 'react';

import Icon from 'src/assets/icons';
import { FormField } from 'src/components/forms/Base';
import { Theme } from 'src/constants/styles/themes';
import { scaleByAspectRatio } from 'src/utils/dimensions';
import { SignupValidation } from 'src/validations/signup';

interface SignupFormFields {
  t: (key: string, options?: Record<string, unknown>) => string;
  theme: Theme;
  validation: SignupValidation;
}

export const createSignupFormFields = ({
  t,
  theme,
  validation,
}: SignupFormFields): FormField[] => [
  {
    name: 'userName',
    placeholder: t('form.input.userName'),
    type: 'text' as const,
    icon: (
      <Icon
        name="user"
        size={scaleByAspectRatio(20)}
        color={{ mono: theme.color.textMuted }}
      />
    ),
    validation: validation.getUserNameValidation(),
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
      />
    ),
    validation: validation.getPasswordValidation(),
    extraIcon: (
      <Icon
        name="eyes"
        size={scaleByAspectRatio(20)}
        color={{ mono: theme.color.textMuted }}
      />
    ),
  },
];
