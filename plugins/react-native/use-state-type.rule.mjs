export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure useState always has a type argument',
    },
    schema: [],
  },
  create(context) {
    const filename = context.getFilename();

    if (!filename.endsWith('.tsx')) {
      return {};
    }

    return {
      CallExpression(node) {
        if (node.callee.name === 'useState') {
          const typeArguments = node.typeArguments;

          if (!typeArguments || typeArguments.params.length === 0) {
            context.report({
              node,
              message: 'useState should always have a type argument.',
            });
          }
        }
      },
    };
  },
};
