module.exports = {
  parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',  // Allows for the use of imports
    project: './tsconfig.json'
  },
  rules: {
    // region Possible Errors
    'no-prototype-builtins': 'off',
    'no-console': ['error', {allow: ['warn', 'error']}],
    'array-callback-return': 'error',
    'curly': 'error',
    // endregion

    // region Best Practices
    'no-alert': 'error',
    'no-eval': 'error',
    'eqeqeq': 'error',
    'no-else-return': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-lone-blocks': 'error',
    'no-multi-spaces': ['error', {ignoreEOLComments: true}],
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-proto': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-unused-expressions': [
      'error',
      {
        'allowShortCircuit': true,
        'allowTernary': true
      }
    ],
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'radix': 'error',
    'require-await': 'error',
    'vars-on-top': 'error',
    'wrap-iife': 'error',
    'yoda': 'error',
    // endregion

    // region Variables
    'no-undef': 'off',
    'no-label-var': 'off',
    'no-shadow': 'off',
    'no-undef-init': 'off',
    'no-undefined': 'off',
    'no-use-before-define': 'off',
    // endregion

    // region Stylistic Issues
    'array-bracket-spacing': ['error', 'never'],
    'array-element-newline': ['error', 'consistent'],
    'brace-style': ['error', '1tbs', {'allowSingleLine': false}],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', {'before': false, 'after': true}],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'func-call-spacing': 'off',
    'implicit-arrow-linebreak': ['error', 'beside'],
    'indent': 'off',
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'max-len': ['error', {'code': 180}],
    'new-parens': 'error',
    'no-array-constructor': 'error',
    'no-lonely-if': 'error',
    'no-multiple-empty-lines': ['error', {'max': 1, 'maxEOF': 1}],
    'no-new-object': 'error',
    'no-trailing-spaces': ['error', {'skipBlankLines': true}],
    'no-unneeded-ternary': 'error',
    'no-whitespace-before-property': 'error',
    'object-curly-spacing': ['error', 'always'],
    'one-var-declaration-per-line': 'error',
    'operator-assignment': 'error',
    'quotes': ['error', 'single', {'allowTemplateLiterals': true}],
    'semi': 'off',
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      {blankLine: 'always', prev: ['const', 'let', 'block-like'], next: '*'},
      {blankLine: 'always', prev: '*', next: ['const', 'let', 'block-like']},
      {blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let']},
      {blankLine: 'always', prev: '*', next: 'function'},
      {blankLine: 'always', prev: 'function', next: '*'},
      {blankLine: 'always', prev: '*', next: 'return'},
      {blankLine: 'always', prev: 'class', next: '*'},
      {blankLine: 'always', prev: '*', next: 'export'},
      {blankLine: 'always', prev: 'export', next: '*'},
      {blankLine: 'always', prev: '*', next: 'class'},
      {blankLine: 'always', prev: 'class', next: '*'},
      {blankLine: 'never', prev: '*', next: 'case'},
    ],
    'prefer-object-spread': 'error',
    'quote-props': ['error', 'as-needed'],
    'semi-spacing': ['error', {'before': false, 'after': true}],
    'semi-style': ['error', 'last'],
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': ['error', 'always'],
    'switch-colon-spacing': 'error',
    'template-tag-spacing': ['error', 'never'],
    'wrap-regex': 'error',
    'newline-per-chained-call': ['error', {'ignoreChainWithDepth': 3}],
    // endregion

    // region ES6
    'arrow-parens': ['error', 'as-needed', {'requireForBlockBody': true}],
    'arrow-spacing': 'error',
    'no-confusing-arrow': 'error',
    'no-duplicate-imports': 'error',
    'no-restricted-imports': ['error', 'primeng/primeng'],
    'no-useless-computed-key': 'error',
    'no-useless-rename': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'prefer-numeric-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'rest-spread-spacing': ['error', 'never'],
    'symbol-description': 'error',
    'template-curly-spacing': 'error',
    // endregion

    // region TypeScript
    '@typescript-eslint/no-object-literal-type-assertion': 'off', // added to support existing codebase
    '@typescript-eslint/no-unused-vars': ['error', {'args': 'none', 'ignoreRestSiblings': true}], // TODO discuss with team how we want arguments to be validated
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/explicit-member-accessibility': ['error', {
      accessibility: 'explicit',
      overrides: {
        accessors: 'no-public',
        constructors: 'off',
        methods: 'no-public',
        properties: 'no-public'
      }
    }],
    '@typescript-eslint/explicit-function-return-type': ['warn', {allowExpressions: true}],
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-use-before-define': ['error', {'classes': false, 'functions': false}],
    '@typescript-eslint/no-empty-interface': ['error', {allowSingleExtends: true}],
    '@typescript-eslint/func-call-spacing': ['error'],
    '@typescript-eslint/member-ordering': ['error', {
      default: [
        'public-static-field',
        'protected-static-field',
        'private-static-field',
        'public-static-method',
        'protected-static-method',
        'private-static-method',
        'instance-field',
        'constructor',
        'instance-method'
      ]
    }],
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-empty-function': ['error', {'allow': ['methods', 'arrowFunctions']}],
    // endregion
  },
  env: {
    browser: true,
    es2017: true,
    jasmine: true,
    worker: true,
    mocha: true,
    protractor: true
  }
};
