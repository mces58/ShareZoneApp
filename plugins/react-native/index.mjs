import notInlineCssRule from './not-inline-css.rule.mjs';
import safeAreaViewRule from './safe-area-view.rule.mjs';
import touchableOpacityRule from './touchable-opacity.rule.mjs';
import useStateTypeRule from './use-state-type.rule.mjs';

export default {
  rules: {
    'use-safe-area-view': safeAreaViewRule,
    'use-touchable-opacity': touchableOpacityRule,
    'not-inline-css': notInlineCssRule,
    'use-state-type': useStateTypeRule,
  },
};
