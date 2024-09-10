import React from 'react';
import { ColorValue, TouchableOpacity } from 'react-native';

import { useTheme } from 'styled-components/native';

import { Theme } from 'src/constants/styles/themes';
import { scaleByAspectRatio } from 'src/utils/dimensions';

import ArrowIcon from './arrow';
import EyesIcon from './eyes';
import MailIcon from './mail';
import ReactIcon from './react';
import ShortArrowIcon from './short-arrow';
import UserIcon from './user';

interface IconColor {
  grads?: ColorValue[];
  isGradient?: boolean;
  mono?: ColorValue;
}

interface BaseIconProps {
  color?: IconColor;
  isFill?: boolean;
  isOutline?: boolean;
  onPress?: () => void;
  size?: number;
  strokeWidth?: number;
}

interface ArrowIconProps extends BaseIconProps {
  direction:
    | 'up'
    | 'right'
    | 'down'
    | 'left'
    | 'up-right'
    | 'up-left'
    | 'down-right'
    | 'down-left';
  name: 'arrow';
}

interface ShortArrowIconProps extends BaseIconProps {
  direction: 'up' | 'right' | 'down' | 'left';
  name: 'short-arrow';
}

interface ReactIconProps extends BaseIconProps {
  name: 'react';
}

interface EyesIconProps extends BaseIconProps {
  name: 'eyes';
  isClose?: boolean;
}

interface MailIconProps extends BaseIconProps {
  name: 'mail';
}

interface UserIconProps extends BaseIconProps {
  name: 'user';
}

type IconProps =
  | ArrowIconProps
  | ShortArrowIconProps
  | ReactIconProps
  | EyesIconProps
  | MailIconProps
  | UserIconProps;

const Icon: React.FC<IconProps> = (props) => {
  const {
    color = {},
    name,
    isFill = false,
    isOutline = false,
    onPress,
    size = scaleByAspectRatio(24),
    strokeWidth = 1.5,
  } = props;
  const theme = useTheme() as Theme;
  const {
    grads = [theme.color.text],
    isGradient = false,
    mono = theme.color.text,
  } = color;

  const getIconComponent = (): React.ReactNode => {
    const iconProps = {
      color: { grads, isGradient, mono },
      isFill,
      isOutline,
      strokeWidth,
      size,
    };

    switch (name) {
      case 'arrow': {
        const { direction } = props as ArrowIconProps;
        return <ArrowIcon {...iconProps} direction={direction} />;
      }
      case 'short-arrow': {
        const { direction } = props as ShortArrowIconProps;
        return <ShortArrowIcon {...iconProps} direction={direction} />;
      }
      case 'react': {
        return <ReactIcon {...iconProps} />;
      }
      case 'eyes': {
        const { isClose = false } = props as EyesIconProps;
        return <EyesIcon {...iconProps} isClose={isClose} />;
      }
      case 'mail': {
        return <MailIcon {...iconProps} />;
      }
      case 'user': {
        return <UserIcon {...iconProps} />;
      }
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={{ width: size, height: size }}
      onPress={onPress}
      disabled={typeof onPress !== 'function'}
    >
      {getIconComponent()}
    </TouchableOpacity>
  );
};

export default Icon;
