export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure SafeAreaView is used in components',
    },
    schema: [],
  },
  create(context) {
    const filename = context.getFilename();

    if (!filename.endsWith('.tsx')) {
      return {};
    }

    let hasSafeAreaViewImport = false;
    let hasSafeAreaViewUsage = false;
    let importNode = null;

    return {
      ImportDeclaration(node) {
        node.specifiers.forEach((specifier) => {
          if (specifier.local.name === 'SafeAreaView') {
            hasSafeAreaViewImport = true;
            importNode = node;
          }
        });
      },
      JSXElement(node) {
        const openingElement = node.openingElement;
        if (openingElement.name.name === 'SafeAreaView') {
          hasSafeAreaViewUsage = true;
        }
      },
      'Program:exit'(programNode) {
        if (!hasSafeAreaViewImport) {
          context.report({
            message: 'SafeAreaView is not imported',
            node: programNode,
          });
        }
        if (!hasSafeAreaViewUsage && importNode) {
          context.report({
            message: 'SafeAreaView is not used',
            node: importNode,
          });
        }
      },
    };
  },
};
