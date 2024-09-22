/* eslint-disable security/detect-object-injection */

/* eslint-disable react/display-name */
import React, {
  forwardRef,
  ReactElement,
  ReactNode,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleProp } from 'react-native';

import { useTheme } from 'styled-components/native';

import { scaleProportionally } from 'src/utils';
import * as Yup from 'yup';

import BaseInput from '../inputs/Base';
import { yupResolver } from '@hookform/resolvers/yup';
import { Theme } from 'src/constants/styles/themes';
import {
  CustomFlexStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types/style-types';

import { Container } from '../containers';
import { BaseText } from '../texts';

export interface FormField {
  name: string;
  placeholder: string;
  type: 'text' | 'password' | 'textarea';
  extraIcon?: ReactNode;
  icon?: ReactNode;
  inputMode?: 'text' | 'numeric' | 'search' | 'email';
  maxLength?: number;
  validation?: Yup.StringSchema;
}

interface BaseFormProps {
  formFields: FormField[];
  onSubmit: (data: unknown) => void;
  inputStyle?: {
    flex?: StyleProp<Pick<CustomFlexStyle, 'alignSelf' | 'width' | 'height'>>;
    shadow?: StyleProp<Partial<CustomShadowStyle>>;
    text?: StyleProp<Partial<CustomTextStyle>>;
    view?: StyleProp<Partial<CustomViewStyle>>;
  };
}

const BaseForm = forwardRef(
  ({ formFields, onSubmit, inputStyle }: BaseFormProps, ref) => {
    const theme = useTheme() as Theme;

    const validationSchema = useMemo(
      () =>
        Yup.object().shape(
          formFields.reduce(
            (acc, field) => {
              if (field.validation) {
                acc[field.name] = field.validation;
              }
              return acc;
            },
            {} as Record<string, Yup.StringSchema>
          )
        ),
      [formFields]
    );

    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(validationSchema),
    });

    useImperativeHandle(ref, () => ({
      submit: handleSubmit(onSubmit),
      reset: (): void => reset(),
    }));

    const [showPassword, setShowPassword] = useState<Record<string, boolean>>(
      formFields.reduce(
        (acc, field) => {
          if (field.type === 'password') acc[field.name] = false;
          return acc;
        },
        {} as Record<string, boolean>
      )
    );

    const togglePasswordVisibility = (fieldName: string): void => {
      setShowPassword((prevState) => ({
        ...prevState,
        [fieldName]: !prevState[fieldName],
      }));
    };

    const renderErrorMessage = (fieldName: string): ReactNode => {
      const errorMessage = errors[fieldName]?.message ?? '';
      if (!errorMessage) return null;

      return (
        <BaseText
          text={errorMessage}
          color={theme.common.color.danger}
          flexStyle={{ marginLeft: scaleProportionally(10) }}
          textStyle={{
            fontSize: theme.common.font.sizes._12,
            fontFamily: theme.common.font.families.medium,
          }}
        />
      );
    };

    return (
      <Container>
        {formFields.map((field) => (
          <Container
            key={field.name}
            flexStyle={{
              gap: scaleProportionally(3),
              marginBottom: scaleProportionally(20),
            }}
          >
            <Controller
              control={control}
              name={field.name}
              render={({ field: { onChange, value } }) => (
                <BaseInput
                  onChangeText={onChange}
                  placeholder={field.placeholder}
                  text={value || ''}
                  icon={field.icon}
                  inputMode={field.inputMode}
                  isSecureText={field.type === 'password' && !showPassword[field.name]}
                  isMultiLine={field.type === 'textarea'}
                  maxLength={field.maxLength}
                  flexStyle={
                    field.type === 'textarea'
                      ? [
                          inputStyle?.flex,
                          {
                            height:
                              (typeof inputStyle?.flex === 'object' &&
                              inputStyle.flex &&
                              'height' in inputStyle.flex &&
                              typeof inputStyle.flex.height === 'number'
                                ? inputStyle.flex.height
                                : 0) * 2,
                          },
                        ]
                      : inputStyle?.flex
                  }
                  shadowStyle={
                    errors[field.name]?.message ? undefined : inputStyle?.shadow
                  }
                  textStyle={inputStyle?.text}
                  viewStyle={inputStyle?.view}
                  extraIcon={
                    field.extraIcon && field.type === 'password'
                      ? React.cloneElement(field.extraIcon as ReactElement, {
                          onPress: () => togglePasswordVisibility(field.name),
                          isClose: !showPassword[field.name],
                        })
                      : undefined
                  }
                />
              )}
            />
            {renderErrorMessage(field.name)}
          </Container>
        ))}
      </Container>
    );
  }
);

export default React.memo(BaseForm);
