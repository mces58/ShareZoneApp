/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { useTheme } from 'styled-components/native';

import * as Yup from 'yup';

import BaseInput from '../inputs/Base';
import { yupResolver } from '@hookform/resolvers/yup';
import { Theme } from 'src/constants/styles/themes';
import { scaleByAspectRatio } from 'src/utils/dimensions';

import { BaseText } from '../texts';

interface FormField {
  name: string;
  placeholder: string;
  type: 'text' | 'password';
  validation: Yup.StringSchema;
  icon?: React.ReactNode;
}

interface BaseFormProps {
  fields: FormField[];
  onSubmit: (data: unknown) => void;
}

const BaseForm = forwardRef(({ fields, onSubmit }: BaseFormProps, ref) => {
  const theme = useTheme() as Theme;

  const validationSchema = Yup.object().shape(
    fields.reduce(
      (acc, field) => {
        acc[field.name] = field.validation;
        return acc;
      },
      {} as Record<string, Yup.StringSchema>
    )
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
  }));

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View>
      {fields.map((field) => (
        <View key={field.name} style={{ marginBottom: scaleByAspectRatio(20), gap: 2 }}>
          <Controller
            control={control}
            name={field.name}
            render={({ field: { onChange, value } }) => (
              <BaseInput
                onChangeText={onChange}
                placeholder={field.placeholder}
                text={value || ''}
                isSecureText={field.type === 'password' && !showPassword}
                icon={
                  field.icon && field.type === 'password'
                    ? React.cloneElement(field.icon as React.ReactElement, {
                        onPress: () => setShowPassword(!showPassword),
                        isClose: !showPassword,
                      })
                    : field.icon
                }
              />
            )}
          />
          {errors[field.name] && (
            <BaseText
              text={errors[field.name]?.message ?? ''}
              color={theme.common.color.danger}
              flexStyle={{ marginLeft: scaleByAspectRatio(10) }}
              textStyle={{
                fontSize: theme.common.font.sizes._12,
                fontFamily: theme.common.font.families.medium,
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
});

export default BaseForm;
