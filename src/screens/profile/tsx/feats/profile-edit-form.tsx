import React from 'react';

import Icon from 'src/assets/icons';
import { FormField } from 'src/components/forms/Base';
import { Theme } from 'src/constants/styles/themes';
import { TranslationOptions } from 'src/contexts/i18n-context';
import { scaleByAspectRatio } from 'src/utils/dimensions';
import { ProfileEditValidation } from 'src/validations/profile-edit';

interface ProfileEditFormFields {
  t: (key: string, options?: TranslationOptions) => string;
  theme: Theme;
  validation: ProfileEditValidation;
}

export const createProfileEditFormFields = ({
  t,
  theme,
  validation,
}: ProfileEditFormFields): FormField[] => [
  {
    name: 'userName',
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
    name: 'phoneNumber',
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
