import safeAreaViewRule from "./safe-area-view.rule.mjs";
import touchableOpacityRule from "./touchable-opacity.rule.mjs";
import notInlineCssRule from "./not-inline-css.rule.mjs";

export default {
  rules: {
    "use-safe-area-view": safeAreaViewRule,
    "use-touchable-opacity": touchableOpacityRule,
    "not-inline-css": notInlineCssRule,
  },
};
