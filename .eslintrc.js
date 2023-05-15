module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // 当 ESLint 和 Prettier 规则冲突时，关闭 Prettier 的规则
    'prettier/prettier': 'off',
    // 不加分号，加了会报错
    semi: ['error', 'never'],
    // 仅当必要时才在箭头函数的参数列表中使用括号
    'arrow-parens': ['error', 'as-needed'],
    // 驼峰命名规范：https://cn.eslint.org/docs/rules/camelcase
    // 无法做到的是缩写词仅大写第一个字母这个没法检测
    camelcase: 'error',
    // 使用 lambda 表达式代替匿名函数，因此得禁用匿名函数
    'func-names': ['error', 'always'],
    // 大括号风格为 One True Brace Style
    'brace-style': 'error',
    // 在 JSX / HTML 中应使用双引号
    'jsx-quotes': ['error', 'prefer-double'],
    // 使用 undefined，不要使用 null，ESLint 只能限制部分
    'no-eq-null': 'error',
    // 私有属性名不要使用“_”前缀
    'no-underscore-dangle': 'error',
    // 使用两个空格的缩进，https://cn.eslint.org/docs/rules/indent
    // 单引号
    quotes: ['error', 'single'],
    // eslint的indent和prettier冲突
    indent: [
      'off',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: { parameters: 1, body: 1 },
        FunctionExpression: { parameters: 1, body: 1 },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoreComments: false,
        ignoredNodes: ['TemplateLiteral *'],
      },
    ],
    // 空格的各种处理
    'array-bracket-spacing': ['error', 'never'],
    'semi-spacing': ['error', { before: false, after: true }],
    'space-before-blocks': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'space-unary-ops': ['error', { words: true, nonwords: false }],
    'template-curly-spacing': ['error', 'never'],
    'template-tag-spacing': ['error', 'never'],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],

    // 扩展：帮助避免 BUG 的规则

    /**
     * 数组的方法除了 forEach 之外，回调函数必须有返回值
     */
    'array-callback-return': 'error',
    /**
     * 禁止函数的循环复杂度超过 20
     * @reason https://en.wikipedia.org/wiki/Cyclomatic_complexity
     */
    complexity: [
      'error',
      {
        max: 30,
      },
    ],
    /**
     * 禁止将常量作为分支条件判断中的测试表达式，但允许作为循环条件判断中的测试表达式
     */
    'no-constant-condition': [
      'error',
      {
        checkLoops: false,
      },
    ],
    /**
     * 禁止在构造函数中返回值
     */
    'no-constructor-return': 'error',
    /**
     * 禁止重复导入模块
     */
    'no-duplicate-imports': 'error',
    /**
     * 禁止出现空代码块，允许 catch 为空代码块
     */
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    /**
     * 禁止在 if 代码块内出现函数声明
     */
    'no-inner-declarations': ['error', 'both'],
    /**
     * 禁止对函数的参数重新赋值
     */
    'no-param-reassign': 'error',
    /**
     * 禁止使用 hasOwnProperty, isPrototypeOf 或 propertyIsEnumerable
     * @reason hasOwnProperty 比较常用
     */
    'no-prototype-builtins': 'off',
    /**
     * 禁止出现 location.href = 'javascript:void(0)';
     * @reason 有些场景下还是需要用到这个
     */
    'no-script-url': 'off',
    /**
     * 禁止变量名与上层作用域内的已定义的变量重复
     * @reason 很多时候函数的形参和传参是同名的
     */
    'no-shadow': 'off',
    /**
     * 禁止 throw 字面量，必须 throw 一个 Error 对象
     */
    'no-throw-literal': 'error',
    /**
     * 循环内必须对循环条件中的变量有修改
     */
    'no-unmodified-loop-condition': 'error',
    /**
     * 禁止无用的表达式
     */
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    /**
     * 禁止无用的变量和import
     * (仅警告)
     */
    'no-undef': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    /**
     * 变量必须先定义后使用
     */
    'no-use-before-define': [
      'warn', // 目前ts定义违反此条较多，暂时设置为warn
      {
        variables: false,
        functions: false,
        classes: false,
      },
    ],
    /**
     * 禁止出现没必要的 call 或 apply
     */
    'no-useless-call': 'error',
    /**
     * 禁止出现没必要的计算键名，如 ['x']
     */
    'no-useless-computed-key': 'error',
    /**
     * 禁止出现没必要的字符串连接，如 'a' + 'a'
     */
    'no-useless-concat': 'error',
    /**
     * 禁止出现没必要的 constructor
     */
    'no-useless-constructor': 'error',
    /**
     * 禁止解构赋值时出现同样名字的的重命名，比如 let { foo: foo } = bar;
     */
    'no-useless-rename': 'error',
    /**
     * 禁止使用 var
     */
    'no-var': 'error',
    /**
     * 禁止变量申明时用逗号一次申明多个
     */
    'one-var': ['error', 'never'],
    /**
     * Promise 的 reject 中必须传入 Error 对象，而不是字面量
     */
    'prefer-promise-reject-errors': 'error',
    /**
     * 优先使用正则表达式字面量，而不是 RegExp 构造函数
     */
    'prefer-regex-literals': 'error',
    /**
     * generator 函数内必须有 yield
     */
    'require-yield': 'error',
    /**
     * 注释的斜线或 * 后必须有空格
     */
    'spaced-comment': [
      'error',
      'always',
      {
        block: {
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
    /**
     * 创建 Symbol 时必须传入参数
     */
    'symbol-description': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
  },
}
