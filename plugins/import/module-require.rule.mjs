export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure a specific module is imported in every .tsx file',
    },
    schema: [
      {
        type: 'object',
        properties: {
          moduleName: {
            type: 'string',
          },
        },
        required: ['moduleName'],
      },
    ],
  },
  create(context) {
    const moduleName = context.options[0]?.moduleName;
    const filename = context.getFilename();

    if (!filename.endsWith('.tsx')) {
      return {};
    }

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        if (importPath === moduleName) {
          return;
        }
      },
      Program(node) {
        const sourceCode = context.getSourceCode();
        const imports = sourceCode.ast.body.filter(
          (node) => node.type === 'ImportDeclaration'
        );

        const hasImport = imports.some(
          (importDeclaration) => importDeclaration.source.value === moduleName
        );

        if (!hasImport) {
          context.report({
            node,
            message: `Module '${moduleName}' must be imported in every .tsx file.`,
          });
        }
      },
    };
  },
};