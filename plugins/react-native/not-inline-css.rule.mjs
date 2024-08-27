export default {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow inline styles in React Native components",
    },
    schema: [],
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name === "style" && node.value) {
          if (
            node.value.type === "ObjectExpression" ||
            node.value.type === "JSXExpressionContainer"
          ) {
            context.report({
              node,
              message:
                "Inline styles are not allowed. Use StyleSheet or styled-components instead.",
            });
          }
        }
      },
    };
  },
};
