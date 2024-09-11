import React from 'react';
import { ColorValue, TouchableOpacity } from 'react-native';

import { useTheme } from 'styled-components/native';

import { Theme } from 'src/constants/styles/themes';
import { scaleByAspectRatio } from 'src/utils/dimensions';

import ArrowIcon from './arrow';
import EyesIcon from './eyes';
import { GithubIcon, InstagramIcon, LinkedinIcon } from './follow';
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
  fillColor?: ColorValue;
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
  fillColor?: ColorValue;
  isClose?: boolean;
}

interface MailIconProps extends BaseIconProps {
  name: 'mail';
  fillColor?: ColorValue;
}

interface UserIconProps extends BaseIconProps {
  name: 'user';
  fillColor?: ColorValue;
}

interface FollowIconProps extends Omit<BaseIconProps, 'strokeWidth'> {
  name: 'github' | 'instagram' | 'linkedin';
}

type IconProps =
  | ArrowIconProps
  | ShortArrowIconProps
  | ReactIconProps
  | EyesIconProps
  | MailIconProps
  | UserIconProps
  | FollowIconProps;

const Icon: React.FC<IconProps> = (props) => {
  const { color = {}, name, onPress, size = scaleByAspectRatio(24) } = props;
  const theme = useTheme() as Theme;
  const {
    grads = [theme.color.text],
    isGradient = false,
    mono = theme.color.text,
  } = color;
  const strokeWidth = 'strokeWidth' in props ? (props.strokeWidth ?? 1.5) : undefined;

  const getIconComponent = (): React.ReactNode => {
    const iconProps = {
      color: { grads, isGradient, mono },
      strokeWidth,
      size,
    };

    switch (name) {
      case 'arrow': {
        const { direction, fillColor } = props as ArrowIconProps;
        return <ArrowIcon {...iconProps} direction={direction} fillColor={fillColor} />;
      }
      case 'short-arrow': {
        const { direction } = props as ShortArrowIconProps;
        return <ShortArrowIcon {...iconProps} direction={direction} />;
      }
      case 'react': {
        return <ReactIcon {...iconProps} />;
      }
      case 'eyes': {
        const { isClose, fillColor } = props as EyesIconProps;
        return <EyesIcon {...iconProps} isClose={isClose} fillColor={fillColor} />;
      }
      case 'mail': {
        const { fillColor } = props as MailIconProps;
        return <MailIcon {...iconProps} fillColor={fillColor} />;
      }
      case 'user': {
        const { fillColor } = props as UserIconProps;
        return <UserIcon {...iconProps} fillColor={fillColor} />;
      }
      case 'github': {
        return <GithubIcon {...iconProps} />;
      }
      case 'instagram': {
        return <InstagramIcon {...iconProps} />;
      }
      case 'linkedin': {
        return <LinkedinIcon {...iconProps} />;
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
