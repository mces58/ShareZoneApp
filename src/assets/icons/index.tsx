import React from 'react';
import { ColorValue, TouchableOpacity } from 'react-native';

import { useTheme } from 'styled-components/native';

import { scaleByAspectRatio } from 'src/utils';

import { Theme } from 'src/constants/styles';

import AddSquareIcon from './add';
import ArrowIcon from './arrow';
import CameraIcon from './camera';
import EditIcon from './edit';
import EyesIcon from './eyes';
import { GithubIcon, InstagramIcon, LinkedinIcon } from './follow';
import HeartIcon from './heart';
import LocationIcon from './location';
import LockIcon from './lock';
import MailIcon from './mail';
import PhoneIcon from './phone';
import ReactIcon from './react';
import ShortArrowIcon from './short-arrow';
import SignoutIcon from './signout';
import { CheckIcon, ErrorIcon, InfoIcon, WarningIcon } from './status';
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
  animated?: {
    duration?: number;
    rotate?: boolean;
    scale?: boolean;
  };
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

interface LockIconProps extends BaseIconProps {
  name: 'lock';
  fillColor?: ColorValue;
}

interface StatusIconProps extends BaseIconProps {
  name: 'check' | 'error' | 'info' | 'warning';
  fillColor?: ColorValue;
}

interface HeartIconProps extends BaseIconProps {
  name: 'heart';
  fillColor?: ColorValue;
}

interface AddIconProps extends BaseIconProps {
  name: 'add-square';
  fillColor?: ColorValue;
}

interface SignoutIconProps extends BaseIconProps {
  name: 'signout';
  fillColor?: ColorValue;
}

interface EditIconProps extends Omit<BaseIconProps, 'strokeWidth'> {
  name: 'edit';
  fillColor?: ColorValue;
}

interface CameraIconProps extends Omit<BaseIconProps, 'strokeWidth'> {
  name: 'camera';
  fillColor?: ColorValue;
}

interface PhoneIconProps extends BaseIconProps {
  name: 'phone';
  fillColor?: ColorValue;
}

interface LocationIconProps extends BaseIconProps {
  name: 'location';
  fillColor?: ColorValue;
}

type IconProps =
  | ArrowIconProps
  | ShortArrowIconProps
  | ReactIconProps
  | EyesIconProps
  | MailIconProps
  | UserIconProps
  | FollowIconProps
  | LockIconProps
  | StatusIconProps
  | HeartIconProps
  | AddIconProps
  | SignoutIconProps
  | EditIconProps
  | CameraIconProps
  | PhoneIconProps
  | LocationIconProps;

const Icon: React.FC<IconProps> = (props) => {
  const { color = {}, name, onPress, size = scaleByAspectRatio(24) } = props;
  const theme = useTheme() as Theme;
  const {
    grads = [theme.color.text],
    isGradient = false,
    mono = theme.color.text,
  } = color;
  const strokeWidth = 'strokeWidth' in props ? props.strokeWidth : 1.5;

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
        const { animated } = props as ReactIconProps;
        return <ReactIcon {...iconProps} animated={animated} />;
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
      case 'lock': {
        const { fillColor } = props as LockIconProps;
        return <LockIcon {...iconProps} fillColor={fillColor} />;
      }
      case 'check': {
        const { fillColor } = props as StatusIconProps;
        return <CheckIcon {...iconProps} fillColor={fillColor} />;
      }
      case 'error': {
        const { fillColor } = props as StatusIconProps;
        return <ErrorIcon {...iconProps} fillColor={fillColor} />;
      }
      case 'info': {
        const { fillColor } = props as StatusIconProps;
        return <InfoIcon {...iconProps} fillColor={fillColor} />;
      }
      case 'warning': {
        const { fillColor } = props as StatusIconProps;
        return <WarningIcon {...iconProps} fillColor={fillColor} />;
      }
      case 'heart': {
        const { fillColor } = props as HeartIconProps;
        return <HeartIcon {...iconProps} fillColor={fillColor} />;
      }
      case 'add-square': {
        const { fillColor } = props as AddIconProps;
        return <AddSquareIcon {...iconProps} fillColor={fillColor} />;
      }
      case 'signout': {
        const { fillColor } = props as SignoutIconProps;
        return <SignoutIcon {...iconProps} fillColor={fillColor} />;
      }
      case 'edit': {
        const { fillColor } = props as EditIconProps;
        return <EditIcon {...iconProps} fillColor={fillColor} />;
      }
      case 'camera': {
        const { fillColor } = props as CameraIconProps;
        return <CameraIcon {...iconProps} fillColor={fillColor} />;
      }
      case 'phone': {
        const { fillColor } = props as PhoneIconProps;
        return <PhoneIcon {...iconProps} fillColor={fillColor} />;
      }
      case 'location': {
        const { fillColor } = props as LocationIconProps;
        return <LocationIcon {...iconProps} fillColor={fillColor} />;
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
