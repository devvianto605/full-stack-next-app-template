const booleanError =
  'It is better if your prop ({{ propName }}) matches this pattern: ({{ pattern }})';

module.exports = {
  // * Naming Conventions
  'react/jsx-handler-names': [
    'error',
    { eventHandlerPrefix: 'handle', eventHandlerPropPrefix: 'on' },
  ],

  // * Style and Formatting
  'react/self-closing-comp': ['error', { component: true, html: true }],
  'react/jsx-max-props-per-line': ['error', { maximum: 3, when: 'multiline' }],
  'react/jsx-max-depth': ['error', { max: 5 }],
  'react/jsx-sort-props': [
    'error',
    { callbacksLast: true, shorthandFirst: true, reservedFirst: true },
  ],

  // * Best Practices
  'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
  // Resolution needed: This throw unexpected error with unknown reason
  // 'react/boolean-prop-naming': [
  //   'warn',
  //   { rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+', message: booleanError },
  // ],
  'react/no-unused-prop-types': 'warn',
  'react/no-access-state-in-setstate': 'error',
  'react/destructuring-assignment': ['error', 'always'],
  'react/button-has-type': 'error',
  'react/function-component-definition': [
    'error',
    { namedComponents: 'arrow-function' },
  ],

  // * Exceptions
  'react/no-children-prop': 'off',
  'react/react-in-jsx-scope': 'off',
  'react/jsx-props-no-spreading': 'off',
};
