export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Use only TouchableOpacity for touchable components',
    },
    schema: [],
  },
  create(context) {
    const allowedComponent = 'TouchableOpacity';
    const disallowedComponents = [
      'TouchableHighlight',
      'TouchableWithoutFeedback',
      'TouchableNativeFeedback',
    ];

    return {
      ImportDeclaration(node) {
        if (node.source.value === 'react-native') {
          node.specifiers.forEach((specifier) => {
            if (disallowedComponents.includes(specifier.local.name)) {
              context.report({
                node,
                message: `Avoid using ${specifier.local.name}. Use ${allowedComponent} instead.`,
              });
            }
          });
        }
      },
      JSXElement(node) {
        const openingElement = node.openingElement;
        if (disallowedComponents.includes(openingElement.name.name)) {
          context.report({
            node: openingElement,
            message: `Avoid using ${openingElement.name.name}. Use ${allowedComponent} instead.`,
          });
        }
      },
      'Program:exit'(programNode) {
        const sourceCode = context.getSourceCode();
        const text = sourceCode.getText();

        disallowedComponents.forEach((component) => {
          const regex = new RegExp(`styled\\.${component}`, 'g');
          let match;

          while ((match = regex.exec(text)) !== null) {
            const loc = sourceCode.getLocFromIndex(match.index);
            context.report({
              node: programNode,
              message: `Avoid using styled-components for touchable elements like ${component}. Use ${allowedComponent} instead.`,
              loc: {
                start: { line: loc.line, column: loc.column },
                end: { line: loc.line, column: loc.column + match[0].length },
              },
            });
          }
        });
      },
    };
  },
};
