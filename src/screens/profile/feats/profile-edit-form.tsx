import React from 'react';

import { TranslationOptions } from 'src/contexts';
import { scaleByAspectRatio } from 'src/utils';

import Icon from 'src/assets/icons';
import { FormField } from 'src/components/forms/Base';
import { Theme } from 'src/constants/styles';

import { ProfileEditValidation } from '../validations';

interface ProfileEditFormFields {
  t: (key: string, options?: TranslationOptions) => string;
  theme: Theme;
  validation: ProfileEditValidation;
}

const createProfileEditFormFields = ({
  t,
  theme,
  validation,
}: ProfileEditFormFields): FormField[] => [
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
    name: 'phone_number',
    placeholder: t('form.input.phoneNumber'),
    type: 'text' as const,
    icon: (
      <Icon
        name="phone"
        size={scaleByAspectRatio(20)}
        color={{ mono: theme.color.textMuted }}
        strokeWidth={1}
      />
    ),
    inputMode: 'numeric',
    maxLength: 14,
    validation: validation.getPhoneNumberValidation(),
  },
  {
    name: 'address',
    placeholder: t('form.input.address'),
    type: 'text' as const,
    icon: (
      <Icon
        name="location"
        size={scaleByAspectRatio(20)}
        color={{ mono: theme.color.textMuted }}
        strokeWidth={1}
      />
    ),
    maxLength: 50,
    validation: validation.getMaxLimitValidation(50),
  },
  {
    name: 'bio',
    placeholder: t('form.input.bio'),
    type: 'textarea' as const,
    icon: (
      <Icon
        name="info"
        size={scaleByAspectRatio(20)}
        color={{ mono: theme.color.textMuted }}
        strokeWidth={1}
      />
    ),
    maxLength: 100,
    validation: validation.getMaxLimitValidation(100),
  },
];

export default createProfileEditFormFields;
